// main.js

// === Constants ===
const TICK_INTERVAL = 8000; // ms per tick
const USED_NAMES_KEY = 'usedNames';

// === Game State ===
let prestige   = 0;
let voidenergy = 0;
let lifetimeVE = new Decimal(0); // total VE gained since last prestige

let isNodesPageLoaded = false;
window.tickStartTime  = Date.now();
window.totalClicks    = 0;

// Accumulated ms reduction from tick-speed upgrades.
// getTickInterval() is the single place everything reads the live interval.
window.tickSpeedReduction     = window.tickSpeedReduction     || 0;
window.clickUpgradeMultiplier = window.clickUpgradeMultiplier || 1;
window.achievementProdBonus   = window.achievementProdBonus   || 0;
window.achievementClickBonus  = window.achievementClickBonus  || 0;
function getTickInterval() {
  return Math.max(1000, TICK_INTERVAL - (window.tickSpeedReduction || 0));
}

// === Node Definitions (single source of truth) ===
// baseCost is stored so resetGame can restore original costs.
window.nodesData = window.nodesData || [
  { id: 'abyssalshard',   name: 'Abyssal Shard',    count: 0, cost: new Decimal(10),        baseCost: new Decimal(10),        baseProduction: new Decimal(1),      costGrowth: 1.18 },
  { id: 'whisperengine',  name: 'Whisper Engine',   count: 0, cost: new Decimal(150),        baseCost: new Decimal(150),        baseProduction: new Decimal(10),     costGrowth: 1.18 },
  { id: 'darkmatterloop', name: 'Dark Matter Loop', count: 0, cost: new Decimal(2000),       baseCost: new Decimal(2000),       baseProduction: new Decimal(80),     costGrowth: 1.22 },
  { id: 'voidbloom',      name: 'Void Bloom',       count: 0, cost: new Decimal(30000),      baseCost: new Decimal(30000),      baseProduction: new Decimal(500),    costGrowth: 1.25 },
  { id: 'gravitonseeder', name: 'Graviton Seeder',  count: 0, cost: new Decimal(500000),     baseCost: new Decimal(500000),     baseProduction: new Decimal(4000),   costGrowth: 1.28 },
  { id: 'nullbeacon',     name: 'Null Beacon',      count: 0, cost: new Decimal('1e7'),       baseCost: new Decimal('1e7'),       baseProduction: new Decimal(30000),  costGrowth: 1.32 },
  { id: 'oblivionspire',  name: 'Oblivion Spire',   count: 0, cost: new Decimal('2.5e8'),    baseCost: new Decimal('2.5e8'),    baseProduction: new Decimal(200000), costGrowth: 1.35 },
];

// === Orb Definitions (shop source of truth) ===
// passive.veptBonus  — additive fraction added to the total VEPT multiplier when OWNED
// active.clickPct    — fraction of VEPT earned per manual click when EQUIPPED
// active.autoClick   — fires voidenergyClick every autoClickMs when equipped
// active.combo       — every 5th click while equipped is 5×
window.orbsData = window.orbsData || [
  {
    id: 'void-core',      name: 'Void Core',
    cost: 0,              owned: true,
    color: '#ff6aff',     glow: 'rgba(255,106,255,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #7a00c8 0%, #2a0055 50%, #010012 100%)',
    flavor: 'The primordial orb. A fragment of the first void.',
    passive: { label: 'No passive bonus.',               veptBonus: 0    },
    active:  { label: 'Clicks earn 1% of VEPT.',         clickPct: 0.01  },
  },
  {
    id: 'ember-shard',    name: 'Ember Shard',
    cost: 15_000,         owned: false,
    color: '#ff7a3d',     glow: 'rgba(255,122,61,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #7a2200 0%, #3a1000 50%, #010012 100%)',
    flavor: 'A smouldering crystal drawn from the void-flame rift.',
    passive: { label: '+15% VE per tick.',               veptBonus: 0.15 },
    active:  { label: 'Clicks earn 2% of VEPT.',         clickPct: 0.02  },
  },
  {
    id: 'frost-prism',    name: 'Frost Prism',
    cost: 200_000,        owned: false,
    color: '#66fffa',     glow: 'rgba(102,255,250,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #004a55 0%, #001820 50%, #010012 100%)',
    flavor: 'Harvested from ice formations at the edge of null-space.',
    passive: { label: '+30% VE per tick.',               veptBonus: 0.30 },
    active:  { label: 'Clicks earn 3% of VEPT.',         clickPct: 0.03  },
  },
  {
    id: 'shadow-wisp',    name: 'Shadow Wisp',
    cost: 2_000_000,      owned: false,
    color: '#b366ff',     glow: 'rgba(179,102,255,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #3a006b 0%, #150030 50%, #010012 100%)',
    flavor: 'A captured void-ghost that hungers for energy.',
    passive: { label: '+50% VE per tick.',                veptBonus: 0.50 },
    active:  { label: 'Clicks earn 2% of VEPT + auto-click every 5s.', clickPct: 0.02, autoClick: true, autoClickMs: 5000 },
  },
  {
    id: 'plasma-core',    name: 'Plasma Core',
    cost: 50_000_000,     owned: false,
    color: '#ffe566',     glow: 'rgba(255,229,102,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #5a4500 0%, #1e1500 50%, #010012 100%)',
    flavor: 'A miniature star — condensed void-plasma in crystalline suspension.',
    passive: { label: '+80% VE per tick.',               veptBonus: 0.80 },
    active:  { label: 'Clicks earn 5% of VEPT.',         clickPct: 0.05  },
  },
  {
    id: 'abyssal-crown',  name: 'Abyssal Crown',
    cost: 750_000_000,    owned: false,
    color: '#ff3d6e',     glow: 'rgba(255,61,110,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #6b0025 0%, #280010 50%, #010012 100%)',
    flavor: 'The apex of void power. Every 5th click unleashes an annihilation surge.',
    passive: { label: '+150% VE per tick (2.5×).',       veptBonus: 1.50 },
    active:  { label: 'Clicks earn 10% of VEPT. Every 5th click is 5×.', clickPct: 0.10, combo: true, comboN: 5, comboMult: 5 },
  },
  {
    id: 'void-rift',      name: 'Void Rift',
    cost: 25_000_000_000, owned: false,
    color: '#00ffcc',     glow: 'rgba(0,255,204,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #004a3a 0%, #001a14 50%, #010012 100%)',
    flavor: 'A fracture in reality where raw void energy bleeds through unchecked. Unpredictable. Hungry.',
    passive: { label: '+200% VE per tick (3×).',         veptBonus: 2.00 },
    active:  { label: 'Clicks earn 8% of VEPT. 30% chance to crit for 6×.', clickPct: 0.08, critChance: 0.30, critMult: 6 },
  },
  {
    id: 'temporal-lens',  name: 'Temporal Lens',
    cost: 500_000_000_000, owned: false,
    color: '#ffd700',     glow: 'rgba(255,215,0,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #5a4a00 0%, #1a1400 50%, #010012 100%)',
    flavor: 'Bends the flow of void-time itself — compressing cycles, accelerating harvests.',
    passive: { label: '+300% VE per tick (4×).',         veptBonus: 3.00 },
    active:  { label: 'Clicks earn 4% of VEPT. Auto-clicks every 2.5s. Every 4th click is 3×.', clickPct: 0.04, autoClick: true, autoClickMs: 2500, combo: true, comboN: 4, comboMult: 3 },
  },
  {
    id: 'entropy-engine', name: 'Entropy Engine',
    cost: 25_000_000_000_000, owned: false,
    color: '#7fff00',     glow: 'rgba(127,255,0,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #1a3a00 0%, #0a1400 50%, #010012 100%)',
    flavor: 'Converts disorder into power through cascading chain reactions. One click becomes many.',
    passive: { label: '+500% VE per tick (6×).',         veptBonus: 5.00 },
    active:  { label: 'Clicks earn 6% of VEPT and cascade into 4 sub-hits at 35% each.', clickPct: 0.06, cascadeCount: 4, cascadePct: 0.35 },
  },
  {
    id: 'null-sovereign', name: 'Null Sovereign',
    cost: 1_000_000_000_000_000, owned: false,
    color: '#c8c8ff',     glow: 'rgba(200,200,255,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #2a2a6b 0%, #0e0e2a 50%, #010012 100%)',
    flavor: 'An ancient null-point of supreme dominion. It does not merely use void energy — it commands it.',
    passive: { label: '+800% VE per tick (9×).',         veptBonus: 8.00 },
    active:  { label: 'Clicks earn 5% of VEPT. Auto-clicks every 1.5s. Every 7th click is 15×.', clickPct: 0.05, autoClick: true, autoClickMs: 1500, combo: true, comboN: 7, comboMult: 15 },
  },
  {
    id: 'eternal-collapse', name: 'Eternal Collapse',
    cost: 50_000_000_000_000_000, owned: false,
    color: '#ff0044',     glow: 'rgba(255,0,68,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #6b0015 0%, #200008 50%, #010012 100%)',
    flavor: 'The final convergence of all void matter. Its pull is inescapable. Its power, absolute.',
    passive: { label: '+1000% VE per tick (11×).',       veptBonus: 10.00 },
    active:  { label: 'Clicks earn 15% of VEPT. Every 3rd click is 20×. 40% chance to crit for 5×.', clickPct: 0.15, combo: true, comboN: 3, comboMult: 20, critChance: 0.40, critMult: 5 },
  },
];

window.equippedOrbId = window.equippedOrbId || 'void-core';
window.orbComboCount = window.orbComboCount  || 0;

// Equip an orb: manages auto-click lifecycle and resets combo counter.
function applyEquippedOrb(id) {
  const prev = (window.orbsData || []).find(o => o.id === window.equippedOrbId);
  const next = (window.orbsData || []).find(o => o.id === id);
  if (!next || !next.owned) return;

  // Stop any running auto-click from the previous orb
  if (prev && prev.active.autoClick && window.orbAutoClickInterval) {
    clearInterval(window.orbAutoClickInterval);
    window.orbAutoClickInterval = null;
  }

  window.equippedOrbId = id;
  window.orbComboCount = 0;

  // Start auto-click if the new orb has it
  if (next.active.autoClick) {
    window.orbAutoClickInterval = setInterval(() => {
      const result = voidenergyClick(1, 'auto');
      if (!document.hidden && window.clickEffectsEnabled && typeof window.spawnOrbClick === 'function') {
        const btn = document.getElementById('void-orb-btn');
        if (btn) {
          const rect = btn.getBoundingClientRect();
          const cx = rect.left + rect.width  / 2;
          const cy = rect.top  + rect.height / 2;
          const reward   = typeof result === 'object' ? result.reward   : result;
          const hitFlags = typeof result === 'object' ? result          : {};
          window.spawnOrbClick({ clientX: cx, clientY: cy }, reward, hitFlags);
        }
      }
    }, next.active.autoClickMs || 5000);
  }

  // Update the home screen orb visual if the page is loaded
  if (typeof updateHomeOrb === 'function') updateHomeOrb();
  requestGameRender();
}
window.applyEquippedOrb = applyEquippedOrb;

// === Decimal Extensions ===
Decimal.prototype.clamp = function (min, max) {
  if (this.lessThan(min))    return new Decimal(min);
  if (this.greaterThan(max)) return new Decimal(max);
  return this;
};

// === Achievement Unlock Conditions ===
const achievementConditions = [
  // Void Energy milestones
  { id: 'first-click',    check: () => voidenergy > 0 },
  { id: 'hundred-ve',     check: () => lifetimeVE.gte(100) },
  { id: 've-1k',          check: () => lifetimeVE.gte(1_000) },
  { id: 'tenthousand-ve', check: () => lifetimeVE.gte(10_000) },
  { id: 've-100k',        check: () => lifetimeVE.gte(100_000) },
  { id: 'million-ve',     check: () => lifetimeVE.gte(1_000_000) },
  { id: 've-10m',         check: () => lifetimeVE.gte(10_000_000) },
  { id: 'billion-ve',     check: () => lifetimeVE.gte(1_000_000_000) },
  { id: 've-1t',          check: () => lifetimeVE.gte('1e12') },
  { id: 've-1q',          check: () => lifetimeVE.gte('1e15') },

  // Clicking milestones
  { id: 'click-10',   check: () => window.totalClicks >= 25 },
  { id: 'click-100',  check: () => window.totalClicks >= 250 },
  { id: 'click-1k',   check: () => window.totalClicks >= 2_500 },
  { id: 'click-10k',  check: () => window.totalClicks >= 15_000 },
  { id: 'click-50k',  check: () => window.totalClicks >= 75_000 },

  // Node first purchase
  { id: 'node-abyssal-first',    check: () => (window.nodesData.find(n => n.id === 'abyssalshard')?.count   || 0) >= 1 },
  { id: 'node-whisper-first',    check: () => (window.nodesData.find(n => n.id === 'whisperengine')?.count  || 0) >= 1 },
  { id: 'node-darkmatter-first', check: () => (window.nodesData.find(n => n.id === 'darkmatterloop')?.count || 0) >= 1 },
  { id: 'node-voidbloom-first',  check: () => (window.nodesData.find(n => n.id === 'voidbloom')?.count      || 0) >= 1 },
  { id: 'node-graviton-first',   check: () => (window.nodesData.find(n => n.id === 'gravitonseeder')?.count || 0) >= 1 },
  { id: 'node-nullbeacon-first', check: () => (window.nodesData.find(n => n.id === 'nullbeacon')?.count     || 0) >= 1 },
  { id: 'node-oblivion-first',   check: () => (window.nodesData.find(n => n.id === 'oblivionspire')?.count  || 0) >= 1 },

  // Total node count
  { id: 'nodes-10',  check: () => window.nodesData.reduce((s, n) => s + n.count, 0) >= 25  },
  { id: 'nodes-25',  check: () => window.nodesData.reduce((s, n) => s + n.count, 0) >= 75  },
  { id: 'nodes-50',  check: () => window.nodesData.reduce((s, n) => s + n.count, 0) >= 150 },
  { id: 'nodes-100', check: () => window.nodesData.reduce((s, n) => s + n.count, 0) >= 350 },

  // Upgrades
  { id: 'upgrade-first', check: () => (window.upgradesData?.filter(u => u.purchased).length || 0) >= 3  },
  { id: 'upgrade-5',     check: () => (window.upgradesData?.filter(u => u.purchased).length || 0) >= 10 },
  { id: 'upgrade-10',    check: () => (window.upgradesData?.filter(u => u.purchased).length || 0) >= 20 },
  { id: 'upgrade-all',   check: () => !!(window.upgradesData?.length && window.upgradesData.every(u => u.purchased)) },

  // Tick speed
  { id: 'tick-speed-first', check: () => window.tickSpeedReduction > 0 },
  { id: 'tick-fast',        check: () => getTickInterval() <= 4000 },
  { id: 'tick-fastest',     check: () => getTickInterval() <= 1000 },

  // Prestige
  { id: 'prestige-first', check: () => prestige >= 1 },
  { id: 'prestige-5',     check: () => prestige >= 8 },

  // Special
  { id: 'idle-explorer', check: () => (Date.now() - (window.gameLoadTime || Date.now())) >= 600_000 },
  { id: 'void-rich',     check: () => voidenergy >= 5_000_000 },
  { id: 'hold-100m',     check: () => voidenergy >= 500_000_000 },
  { id: 'hold-1b',       check: () => voidenergy >= 10_000_000_000 },
  { id: 'hold-1t',       check: () => voidenergy >= 5e12 },
  { id: 'hold-1q',       check: () => voidenergy >= 5e15 },
  { id: 'idle-30min',    check: () => (Date.now() - (window.gameLoadTime || Date.now())) >= 1_800_000 },
  { id: 'idle-1hr',      check: () => (Date.now() - (window.gameLoadTime || Date.now())) >= 3_600_000 },
  { id: 'void-sage',     check: () => ((window.lifetimePlaytimeBase || 0) + (Date.now() - (window.sessionStartTime || Date.now()))) >= 36_000_000 },
  { id: 'node-all-types',  check: () => window.nodesData.every(n => n.count >= 3) },
  { id: 'void-symphony',   check: () => window.nodesData.every(n => n.count >= 15) },
  { id: 'void-colossus',   check: () => window.nodesData.every(n => n.count >= 50) },
  { id: 'first-combo',   check: () => (window.totalCombos   || 0) >= 5 },
  { id: 'first-crit',    check: () => (window.totalCrits    || 0) >= 5 },
  { id: 'first-cascade', check: () => (window.totalCascades || 0) >= 5 },
  { id: 'combo-50',      check: () => (window.totalCombos   || 0) >= 200 },
  { id: 'crit-50',       check: () => (window.totalCrits    || 0) >= 200 },
  { id: 'cascade-50',    check: () => (window.totalCascades || 0) >= 200 },
  { id: 'legendary',     check: () => !!(window.orbsData?.every(o => o.owned) && window.upgradesData?.every(u => u.purchased)) },

  // More Void Energy milestones
  { id: 've-100m', check: () => lifetimeVE.gte(100_000_000) },
  { id: 've-100b', check: () => lifetimeVE.gte('1e11') },
  { id: 've-100t', check: () => lifetimeVE.gte('1e14') },
  { id: 've-1qa',  check: () => lifetimeVE.gte('1e18') },
  { id: 've-1sx',  check: () => lifetimeVE.gte('1e21') },

  // More clicking milestones
  { id: 'click-500',  check: () => window.totalClicks >= 750 },
  { id: 'click-5k',   check: () => window.totalClicks >= 7_500 },
  { id: 'click-100k', check: () => window.totalClicks >= 150_000 },
  { id: 'click-250k', check: () => window.totalClicks >= 350_000 },
  { id: 'click-500k', check: () => window.totalClicks >= 750_000 },
  { id: 'click-1m',   check: () => window.totalClicks >= 1_500_000 },

  // Node counts per type
  { id: 'abyssal-10',    check: () => (window.nodesData.find(n => n.id === 'abyssalshard')?.count    || 0) >= 25 },
  { id: 'abyssal-25',    check: () => (window.nodesData.find(n => n.id === 'abyssalshard')?.count    || 0) >= 75 },
  { id: 'whisper-10',    check: () => (window.nodesData.find(n => n.id === 'whisperengine')?.count   || 0) >= 20 },
  { id: 'whisper-25',    check: () => (window.nodesData.find(n => n.id === 'whisperengine')?.count   || 0) >= 60 },
  { id: 'darkmatter-10', check: () => (window.nodesData.find(n => n.id === 'darkmatterloop')?.count  || 0) >= 18 },
  { id: 'darkmatter-25', check: () => (window.nodesData.find(n => n.id === 'darkmatterloop')?.count  || 0) >= 50 },
  { id: 'voidbloom-10',  check: () => (window.nodesData.find(n => n.id === 'voidbloom')?.count       || 0) >= 15 },
  { id: 'voidbloom-25',  check: () => (window.nodesData.find(n => n.id === 'voidbloom')?.count       || 0) >= 40 },
  { id: 'graviton-10',   check: () => (window.nodesData.find(n => n.id === 'gravitonseeder')?.count  || 0) >= 12 },
  { id: 'graviton-25',   check: () => (window.nodesData.find(n => n.id === 'gravitonseeder')?.count  || 0) >= 35 },
  { id: 'nullbeacon-10', check: () => (window.nodesData.find(n => n.id === 'nullbeacon')?.count      || 0) >= 10 },
  { id: 'nullbeacon-25', check: () => (window.nodesData.find(n => n.id === 'nullbeacon')?.count      || 0) >= 30 },
  { id: 'oblivion-10',   check: () => (window.nodesData.find(n => n.id === 'oblivionspire')?.count   || 0) >= 8 },
  { id: 'oblivion-25',   check: () => (window.nodesData.find(n => n.id === 'oblivionspire')?.count   || 0) >= 25 },

  // More total node milestones
  { id: 'nodes-200',  check: () => window.nodesData.reduce((s, n) => s + n.count, 0) >= 500  },
  { id: 'nodes-500',  check: () => window.nodesData.reduce((s, n) => s + n.count, 0) >= 1000 },
  { id: 'nodes-1000', check: () => window.nodesData.reduce((s, n) => s + n.count, 0) >= 2500 },

  // More upgrade milestones
  { id: 'upgrade-25',   check: () => (window.upgradesData?.filter(u => u.purchased).length || 0) >= 35 },
  { id: 'upgrade-50',   check: () => (window.upgradesData?.filter(u => u.purchased).length || 0) >= 60 },
  { id: 'upgrade-tree', check: () => {
    if (!window.upgradesData) return false;
    const nodes = [...new Set(window.upgradesData.map(u => u.targetNode))];
    return nodes.some(node => {
      const tree = window.upgradesData.filter(u => u.targetNode === node);
      return tree.length >= 10 && tree.every(u => u.purchased);
    });
  }},

  // More tick speed milestones
  { id: 'tick-6s', check: () => getTickInterval() <= 6000 },
  { id: 'tick-2s', check: () => getTickInterval() <= 2000 },

  // More prestige milestones
  { id: 'prestige-10', check: () => prestige >= 10 },
  { id: 'prestige-25', check: () => prestige >= 25 },
  { id: 'prestige-50', check: () => prestige >= 50 },

  // Orbs
  { id: 'orb-first', check: () => (window.orbsData?.filter(o => o.owned && o.cost > 0).length || 0) >= 1 },
  { id: 'orb-3',     check: () => (window.orbsData?.filter(o => o.owned).length || 0) >= 3 },
  { id: 'orb-5',     check: () => (window.orbsData?.filter(o => o.owned).length || 0) >= 5 },
  { id: 'orb-all',   check: () => !!(window.orbsData?.every(o => o.owned)) },
  { id: 'orb-auto',  check: () => !!(window.orbsData?.find(o => o.id === window.equippedOrbId)?.active?.autoClick) },

  // Production rate milestones
  { id: 'vept-100',  check: () => calculateVEPT() >= 100 },
  { id: 'vept-1k',   check: () => calculateVEPT() >= 1_000 },
  { id: 'vept-10k',  check: () => calculateVEPT() >= 10_000 },
  { id: 'vept-1m',   check: () => calculateVEPT() >= 1_000_000 },
  { id: 'vept-1b',   check: () => calculateVEPT() >= 1_000_000_000 },
];

let achievementIndexSource;
let achievementIndex;
function tryUnlockAchievements() {
  if (!window.achievementsData) return;
  if (achievementIndexSource !== window.achievementsData) {
    achievementIndexSource = window.achievementsData;
    achievementIndex = new Map(achievementIndexSource.map(ach => [ach.id, ach]));
  }
  for (const { id, check } of achievementConditions) {
    const ach = achievementIndex.get(id);
    if (ach && !ach.unlocked && check()) window.unlockAchievement(id);
  }
}

// === Utility: Format Large Numbers ===
const NUMBER_SUFFIXES = [
    { value: new Decimal('1e33'), symbol: 'D'  },
    { value: new Decimal('1e30'), symbol: 'N'  },
    { value: new Decimal('1e27'), symbol: 'o'  },
    { value: new Decimal('1e24'), symbol: 'Sp' },
    { value: new Decimal('1e21'), symbol: 'Sx' },
    { value: new Decimal('1e18'), symbol: 'Qu' },
    { value: new Decimal('1e15'), symbol: 'Qa' },
    { value: new Decimal('1e12'), symbol: 'T'  },
    { value: new Decimal('1e9'),  symbol: 'B'  },
    { value: new Decimal('1e6'),  symbol: 'M'  },
    { value: new Decimal('1e3'),  symbol: 'K'  },
  ].map(entry => ({ ...entry, upper: entry.value.mul(1000) }));
function formatNumber(num) {
  if (!(num instanceof Decimal)) num = new Decimal(num);

  for (const { value, symbol, upper } of NUMBER_SUFFIXES) {
    if (num.gte(value) && num.lt(upper)) {
      return num.div(value).toFixed(2).replace(/\.0+$/, '') + symbol;
    }
  }

  return num.gte('1e36') ? num.toExponential(2) : num.toFixed(0);
}

// === Utility: Update a DOM Element's Text ===
function updateDisplay(id, value) {
  const el = document.getElementById(id);
  setText(el, value);
}

// === Utility: Milestone Purchase Multiplier ===
function calculateMilestoneMultiplier(count) {
  let m = 1;
  if (count >= 10) m *= 1.1;
  if (count >= 25) m *= 1.25;
  if (count >= 50) m *= 1.5;
  if (count >= 100) m *= 2;
  if (count >= 500) m *= 3;
  if (count >= 1000) m *= 5;
  return m;
}

// Invalidated only by purchases, rewards, and save restoration.
let cachedVEPT;
function invalidateProduction() { cachedVEPT = undefined; }
function calculateVEPT() {
  if (cachedVEPT !== undefined) return cachedVEPT;
  let prod = new Decimal(20); // base 20 VE/tick

  for (const node of window.nodesData) {
    prod = prod.add(getNodeProduction(node).mul(node.count));
  }

  // Apply passive bonuses from ALL owned orbs (compound multiplicatively)
  (window.orbsData || []).forEach(orb => {
    if (orb.owned && orb.passive.veptBonus > 0) prod = prod.mul(1 + orb.passive.veptBonus);
  });
  const achBonus = window.achievementProdBonus || 0;
  if (achBonus > 0) prod = prod.mul(1 + achBonus);

  if (relicModifiers.production > 0) prod = prod.mul(1 + relicModifiers.production);
  cachedVEPT = prod.toNumber();
  return cachedVEPT;
}

// === Manual Click ===
function voidenergyClick(multiplier = 1, source = 'manual') {
  const equippedOrb = (window.orbsData || []).find(o => o.id === window.equippedOrbId);
  const clickPct    = equippedOrb ? equippedOrb.active.clickPct : 0.01;
  const vept        = calculateVEPT();

  // Combo: configurable threshold and multiplier
  let comboMult = 1;
  if (equippedOrb && equippedOrb.active.combo) {
    const comboN    = equippedOrb.active.comboN    || 5;
    const comboMult_ = equippedOrb.active.comboMult || 5;
    window.orbComboCount = (window.orbComboCount || 0) + 1;
    if (window.orbComboCount % comboN === 0) {
      comboMult = comboMult_;
      window.totalCombos = (window.totalCombos || 0) + 1;
    }
  }

  // Crit: random chance for a larger hit
  let critMult = 1;
  if (equippedOrb && equippedOrb.active.critChance && Math.random() < equippedOrb.active.critChance) {
    critMult = equippedOrb.active.critMult || 5;
    window.totalCrits = (window.totalCrits || 0) + 1;
  }

  const baseReward = Math.max(1, Math.floor(vept * clickPct * multiplier * comboMult * critMult * (window.clickUpgradeMultiplier || 1)));
  const reward = Math.ceil(baseReward * (1 + (window.achievementClickBonus || 0)));
  const ordinaryReward = relicModifiers.echo > 0 && source === 'manual'
    ? Math.ceil(Math.max(1, Math.floor(vept * clickPct * multiplier * (window.clickUpgradeMultiplier || 1))) * (1 + (window.achievementClickBonus || 0)))
    : 0;
  const relicHit = applyRelicClickEffects({ manual: source === 'manual', ordinaryReward, reward, isCrit: critMult > 1 });
  const relicReward = relicHit.echoReward + relicHit.criticalReward;
  voidenergy   = Math.ceil(voidenergy + reward);
  lifetimeVE   = lifetimeVE.plus(reward);
  window.totalClicks++;
  if (relicReward > 0) {
    voidenergy += relicReward;
    lifetimeVE = lifetimeVE.plus(relicReward);
  }

  // Cascade: each click also fires cascadeCount sub-hits at cascadePct power
  let cascadeReward = 0;
  let isCascade = false;
  if (equippedOrb && equippedOrb.active.cascadeCount) {
    cascadeReward = Math.floor(vept * clickPct * (equippedOrb.active.cascadePct || 0.3) * equippedOrb.active.cascadeCount * multiplier);
    if (cascadeReward > 0) {
      voidenergy = Math.ceil(voidenergy + cascadeReward);
      lifetimeVE = lifetimeVE.plus(cascadeReward);
      window.totalCascades = (window.totalCascades || 0) + 1;
      isCascade = true;
    }
  }

  try { tryUnlockAchievements(); } catch (err) { console.error('[Achievement error]', err); }
  requestGameRender();
  return { ...relicHit, reward: reward + relicReward, isCombo: comboMult > 1, isCrit: critMult > 1, isCascade, cascadeReward, comboMult, critMult };
}

// === Refresh Displays on Nodes Page (and Home) ===
function refreshNodeStats() {
  scheduleRender(updateCurrentPage);
  updateDisplay('voidenergy', new Decimal(voidenergy).ceil().toString());

  if (isNodesPageLoaded) {
    updateDisplay('VEPT', Math.ceil(calculatePassiveVEPT()));

    for (const node of window.nodesData) {
      updateDisplay(node.id, new Decimal(node.count).floor().toString());
      updateDisplay(`${node.id}Cost`, formatNumber(getNodePurchaseCost(node).ceil()));
      updateDisplay(`${node.id}Production`, `Production: ${formatNumber(getNodeProduction(node))}`);
    }
  } else if (typeof updateHomeDynamic === 'function') {
    updateHomeDynamic();
  }
}

// === Tick Progress Bar ===
// Drawn at most 30 times/second, only on a visible Home or Nodes page.
function updateTickProgress() {
  if (document.hidden) return;
  const elapsed   = Date.now() - (window.tickStartTime || Date.now());
  const interval  = getTickInterval();
  const percent   = Math.min((elapsed / interval) * 100, 100);

  // Nodes-page <progress> element
  const nodebar = document.getElementById('tickProgress');
  if (nodebar) nodebar.value = percent;

  // Home-page fill bar
  const homebar = document.getElementById('homeTickBar');
  if (homebar) {
    homebar.style.transform = `scaleX(${percent / 100})`;
    const label = document.getElementById('homeTickLabel');
    if (label) {
      const remSec = Math.max(0, (interval - elapsed) / 1000).toFixed(1);
      setText(label, `Next tick in ${remSec}s`);
    }
  }
}

// === Idle Generation ===
function generateResourcesPerTick() {
  const gained = calculatePassiveVEPT();

  voidenergy = Math.ceil(voidenergy + gained);
  lifetimeVE = lifetimeVE.plus(gained);

  try { tryUnlockAchievements(); } catch (err) { console.error('[Achievement error]', err); }

  requestGameRender();
}

function startIdleGeneration() {
  if (window._idleStarted) return;
  window._idleStarted = true;
  // Use recursive setTimeout so tick speed upgrades take effect on the next tick.
  function scheduleTick() {
    setTimeout(() => {
      window.tickStartTime = Date.now(); // reset before generating so bar snaps to 0% immediately
      try {
        generateResourcesPerTick();
      } catch (err) {
        console.error('[Tick error]', err);
      }
      scheduleTick();
    }, getTickInterval());
  }
  window.tickStartTime = Date.now();
  scheduleTick();

  // Auto-save every 30 seconds
  if (window._autoSaveInterval) clearInterval(window._autoSaveInterval);
  window._autoSaveInterval = setInterval(() => {
    try { saveGame(); } catch (e) { console.error('[Auto-save error]', e); }
  }, 30_000);
}

// === Persistence ===
let pendingSave = null;
function requestSave() {
  if (pendingSave === null) pendingSave = setTimeout(saveGame, 0);
}
function saveGame() {
  if (pendingSave !== null) clearTimeout(pendingSave);
  pendingSave = null;
  if (window._resetting) return;
  // Snapshot lifetime playtime up to this moment so it persists across sessions.
  const sessionMs = Date.now() - (window.sessionStartTime || Date.now());
  const save = {
    voidenergy,
    lifetimeVE: lifetimeVE.toString(),
    prestige,
    totalClicks: window.totalClicks || 0,
    relics: serializeRelics(),
    tickSpeedReduction:     window.tickSpeedReduction     || 0,
    clickUpgradeMultiplier: window.clickUpgradeMultiplier || 1,
    achievementProdBonus:   window.achievementProdBonus   || 0,
    achievementClickBonus:  window.achievementClickBonus  || 0,
    lifetimePlaytimeMs: (window.lifetimePlaytimeBase || 0) + sessionMs,
    equippedOrbId: window.equippedOrbId || 'void-core',
    orbsOwned: (window.orbsData || []).filter(o => o.owned).map(o => o.id),
    nodes: window.nodesData.map(n => ({
      id:    n.id,
      count: n.count,
      cost:  n.cost.toString(),
    })),
    upgrades: (window.upgradesData || []).filter(u => u.purchased).map(u => u.id),
    achievements: (window.achievementsData || []).map(a => ({
      id:      a.id,
      unlocked: a.unlocked,
      claimed:  a.claimed,
    })),
  };
  localStorage.setItem('save', JSON.stringify(save));
}

function loadGame() {
  invalidateProduction();
  const raw = localStorage.getItem('save');
  if (!raw) {
    refreshNodeStats();
    return;
  }

  const data = JSON.parse(raw);
  voidenergy = data.voidenergy || 0;
  lifetimeVE = new Decimal(data.lifetimeVE || 0);
  prestige   = data.prestige   || 0;
  window.totalClicks        = data.totalClicks        || 0;
  window.tickSpeedReduction     = data.tickSpeedReduction     || 0;
  window.clickUpgradeMultiplier = data.clickUpgradeMultiplier || 1;
  window.achievementProdBonus   = data.achievementProdBonus   || 0;
  window.achievementClickBonus  = data.achievementClickBonus  || 0;
  // Lifetime playtime from previous sessions; current session is tracked via window.sessionStartTime.
  window.lifetimePlaytimeBase = data.lifetimePlaytimeMs || 0;

  // Restore orb ownership and equipped state
  if (Array.isArray(data.orbsOwned)) {
    (window.orbsData || []).forEach(orb => {
      orb.owned = data.orbsOwned.includes(orb.id);
    });
  }
  if (data.equippedOrbId) {
    // Use applyEquippedOrb so auto-click starts if needed
    applyEquippedOrb(data.equippedOrbId);
  }

  // Restore achievement states silently (no toasts for already-earned achievements)
  if (Array.isArray(data.achievements) && window.achievementsData) {
    data.achievements.forEach(saved => {
      const ach = window.achievementsData.find(a => a.id === saved.id);
      if (ach) {
        ach.unlocked = saved.unlocked || false;
        ach.claimed  = saved.claimed  || false;
      }
    });
  }

  if (Array.isArray(data.nodes)) {
    // Current save format: restore node counts and costs from array
    data.nodes.forEach(saved => {
      const node = window.nodesData.find(n => n.id === saved.id);
      if (node) {
        node.count = saved.count || 0;
        node.cost  = new Decimal(saved.cost || node.baseCost);
      }
    });
  } else {
    // Legacy save format: node counts stored as individual named fields
    window.nodesData.forEach(node => {
      if (data[node.id] != null) node.count = data[node.id];
    });
  }

  window.nodesData.forEach(node => { node.productionMultiplier = new Decimal(1); });

  // Restore purchased upgrades and reapply node production multipliers.
  // tickSpeedReduction and clickUpgradeMultiplier are already restored from their own save fields.
  if (Array.isArray(data.upgrades) && window.upgradesData) {
    const purchasedIds = new Set(data.upgrades);
    window.upgradesData.forEach(u => {
      u.purchased = purchasedIds.has(u.id);
      if (u.purchased) {
        u.purchased = true;
        if (u.multiplier) {
          const targetNode = window.nodesData.find(n => n.id === u.targetNode);
          if (targetNode) {
            targetNode.productionMultiplier =
              (targetNode.productionMultiplier || new Decimal(1)).times(u.multiplier);
          }
        }
      }
    });
  }

  restoreRelics(data.relics);
  invalidateProduction();
  refreshNodeStats();
}

function resetGame() {
  window._resetting = true;
  localStorage.removeItem('save');
  localStorage.removeItem('playerName');
  localStorage.removeItem(USED_NAMES_KEY);
  localStorage.removeItem('tutorialComplete');
  location.reload();
}

// === Page Navigation ===
const pageScripts = new Map();
const validPages = new Set(['home', 'nodes', 'upgrades', 'shop', 'automation', 'prestige', 'stats', 'achievements', 'leaderboard', 'settings']);
let navigationVersion = 0;
let stopProgress = null;
async function changePage(page) {
  if (!validPages.has(page)) return;
  const version = ++navigationVersion;
  cleanupCurrentPage();
  if (stopProgress) stopProgress();
  stopProgress = null;
  isNodesPageLoaded = (page === 'nodes');
  document.querySelectorAll('nav button[data-page]').forEach(btn => {
    btn.classList.toggle('nav-active', btn.dataset.page === page);
    if (btn.dataset.page === page) btn.setAttribute('aria-current', 'page');
    else btn.removeAttribute('aria-current');
  });
  const content = document.getElementById('content');
  content.classList.remove('wide-home');
  content.replaceChildren();
  const fnName = `load${page.charAt(0).toUpperCase()}${page.slice(1)}Page`;
  try {
    if (typeof window[fnName] !== 'function') {
      if (!pageScripts.has(page)) {
        const promise = new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = `js/${page}.js?v=9`;
          script.onload = resolve;
          script.onerror = () => {
            script.remove();
            pageScripts.delete(page);
            reject(new Error(`Could not load ${page}`));
          };
          document.body.appendChild(script);
        });
        pageScripts.set(page, promise);
      }
      await pageScripts.get(page);
    }
    if (version !== navigationVersion) return;
    window[fnName](content);
    mountQualityOfLife(page, content);
    refreshNodeStats();
    if (page === 'home' || page === 'nodes') stopProgress = startVisualLoop(updateTickProgress);
    if (!document.getElementById('game-footer')) {
      const footer = document.createElement('footer');
      footer.id = 'game-footer';
      footer.className = 'game-footer';
      footer.innerHTML = `<span>&copy; ${new Date().getFullYear()} VoidByte Studio</span><span>v0.0.9</span>`;
      document.body.appendChild(footer);
    }
  } catch (error) {
    console.error('[Navigation error]', error);
    if (version === navigationVersion) content.textContent = 'This page could not load. Select its tab to retry.';
  }
}

// === Character Creation ===
function isNameValid(name) {
  if (typeof name !== 'string') return false;
  const trimmed = name.trim();
  if (!trimmed) return false;
  const used = JSON.parse(localStorage.getItem(USED_NAMES_KEY)) || [];
  return !used.includes(trimmed.toLowerCase());
}

function saveName(name) {
  const used = JSON.parse(localStorage.getItem(USED_NAMES_KEY)) || [];
  used.push(name.trim().toLowerCase());
  localStorage.setItem(USED_NAMES_KEY, JSON.stringify(used));
  localStorage.setItem('playerName', name);
}

function createCharacter() {
  const stored = localStorage.getItem('playerName');
  if (stored && stored.trim()) return Promise.resolve();

  return new Promise((resolve) => {
    const modal     = document.getElementById('ts-name-modal');
    const input     = document.getElementById('ts-name-input');
    const error     = document.getElementById('ts-name-error');
    const confirmBtn = document.getElementById('ts-name-confirm');
    if (!modal || !input || !confirmBtn) { resolve(); return; }

    modal.style.display = '';
    input.value = '';
    if (error) error.textContent = '';
    confirmBtn.disabled = true;
    setTimeout(() => input.focus(), 100);

    function validate() {
      const val = input.value.trim();
      if (!val) {
        confirmBtn.disabled = true;
        if (error) error.textContent = '';
        input.classList.remove('ts-input-error');
        return;
      }
      if (val.length < 2) {
        confirmBtn.disabled = true;
        if (error) error.textContent = 'Name must be at least 2 characters';
        input.classList.add('ts-input-error');
        return;
      }
      const used = JSON.parse(localStorage.getItem(USED_NAMES_KEY)) || [];
      if (used.includes(val.toLowerCase())) {
        confirmBtn.disabled = true;
        if (error) error.textContent = 'That name has already been used';
        input.classList.add('ts-input-error');
        return;
      }
      confirmBtn.disabled = false;
      if (error) error.textContent = '';
      input.classList.remove('ts-input-error');
    }

    function submit() {
      const val = input.value.trim();
      if (!val || val.length < 2) return;
      const used = JSON.parse(localStorage.getItem(USED_NAMES_KEY)) || [];
      if (used.includes(val.toLowerCase())) return;
      saveName(val);
      modal.style.display = 'none';
      input.removeEventListener('input', validate);
      input.removeEventListener('keydown', onKey);
      confirmBtn.removeEventListener('click', submit);
      resolve();
    }

    function onKey(e) {
      if (e.key === 'Enter' && !confirmBtn.disabled) submit();
    }

    input.addEventListener('input', validate);
    input.addEventListener('keydown', onKey);
    confirmBtn.addEventListener('click', submit);
  });
}

// === Initialization ===
// === Ambient Particle Canvas ===
// Creates a fixed canvas behind all UI with drifting void-coloured sparks.
function initParticleCanvas() {
  if (document.getElementById('particle-bg')) return;
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-bg';
  canvas.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['#ff6aff','#66fffa','#b366ff','#ff6aff','#66fffa','#ffe566','#ff3d6e'];
  const COUNT  = 55;

  function spawnP(initial) {
    return {
      x:     Math.random() * canvas.width,
      y:     initial ? Math.random() * canvas.height : canvas.height + 4,
      r:     Math.random() * 1.1 + 0.3,
      vx:    (Math.random() - 0.5) * 0.18,
      vy:    -(Math.random() * 0.32 + 0.08),
      alpha: initial ? Math.random() * 0.35 + 0.05 : 0.02,
      da:    Math.random() * 0.0025 + 0.0008,
      maxA:  Math.random() * 0.38 + 0.12,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rising: true,
    };
  }

  const particles = Array.from({ length: COUNT }, () => spawnP(true));

  function tick(delta) {
    const step = delta / (1000 / 60);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx * step;
      p.y += p.vy * step;
      if (p.rising) {
        p.alpha += p.da * step;
        if (p.alpha >= p.maxA) p.rising = false;
      } else {
        p.alpha -= p.da * 0.65 * step;
      }
      if (p.alpha <= 0 || p.y < -4) { particles[i] = spawnP(false); continue; }
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.shadowBlur  = 6;
      ctx.shadowColor = p.color;
      ctx.fillStyle   = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

  }
  startVisualLoop(tick, { decorative: true });
}

window.onload = () => {
  syncVisualSettings();
  // Hide game UI until title screen is dismissed
  const header  = document.querySelector('header');
  const nav     = document.getElementById('main-nav');
  const content = document.getElementById('content');
  if (header)  header.style.display  = 'none';
  if (nav)     nav.style.display     = 'none';
  if (content) content.style.display = 'none';

  const titleScreen = document.getElementById('title-screen');
  const tsMenu      = document.getElementById('ts-menu');
  const hasSave     = !!(localStorage.getItem('save') || localStorage.getItem('playerName'));

  // ── Build menu based on save state ──
  if (tsMenu) {
    if (hasSave) {
      tsMenu.innerHTML = `
        <button class="ts-btn-primary" data-action="continue">Continue</button>
        <button class="ts-btn-secondary ts-btn-danger" data-action="new-game">New Game</button>
        <button class="ts-btn-secondary" data-action="settings">Settings</button>
      `;
    } else {
      tsMenu.innerHTML = `
        <button class="ts-btn-primary" data-action="new-game">New Game</button>
        <button class="ts-btn-secondary" data-action="settings">Settings</button>
      `;
    }
    // Settings panel elements
    const tsSettings  = document.getElementById('ts-settings');
    const tsBgAnim    = document.getElementById('ts-bg-anim');
    const tsClickFx   = document.getElementById('ts-click-fx');
    const tsBgSound   = document.getElementById('ts-bg-sound');
    const tsVolSlider = document.getElementById('ts-vol-slider');
    const tsVolVal    = document.getElementById('ts-vol-val');
    const tsBack      = document.getElementById('ts-settings-back');

    // Init settings controls from localStorage
    if (tsBgAnim)    tsBgAnim.checked    = localStorage.getItem('bgAnimationEnabled') !== 'false';
    if (tsClickFx)   tsClickFx.checked   = localStorage.getItem('clickEffectsEnabled') !== 'false';
    if (tsBgSound)   tsBgSound.checked   = localStorage.getItem('bgSoundEnabled') !== 'false';
    const storedVol = Math.round((parseFloat(localStorage.getItem('bgSoundVolume')) || 0.1) * 100);
    if (tsVolSlider) tsVolSlider.value    = storedVol;
    if (tsVolVal)    tsVolVal.textContent = storedVol;

    // Settings change handlers
    if (tsBgAnim) tsBgAnim.addEventListener('change', () => {
      localStorage.setItem('bgAnimationEnabled', tsBgAnim.checked);
      window.backgroundAnimationEnabled = tsBgAnim.checked;
      syncVisualSettings();
    });
    if (tsClickFx) tsClickFx.addEventListener('change', () => {
      localStorage.setItem('clickEffectsEnabled', tsClickFx.checked);
      window.clickEffectsEnabled = tsClickFx.checked;
    });
    if (tsBgSound) tsBgSound.addEventListener('change', () => {
      localStorage.setItem('bgSoundEnabled', tsBgSound.checked);
      window.backgroundSoundEnabled = tsBgSound.checked;
      if (tsBgSound.checked) {
        window.bgAudio && window.bgAudio.play().catch(() => {});
      } else {
        window.bgAudio && window.bgAudio.pause();
      }
    });
    if (tsVolSlider) tsVolSlider.addEventListener('input', () => {
      const vol = tsVolSlider.value / 100;
      localStorage.setItem('bgSoundVolume', vol);
      if (window.bgAudio) window.bgAudio.volume = vol;
      if (tsVolVal) tsVolVal.textContent = tsVolSlider.value;
    });

    // New game confirmation modal elements
    const newGameModal   = document.getElementById('ts-newgame-modal');
    const confirmCheck   = document.getElementById('ts-confirm-check');
    const modalConfirm   = document.getElementById('ts-modal-confirm');
    const modalCancel    = document.getElementById('ts-modal-cancel');

    // Checkbox enables/disables the confirm button
    if (confirmCheck && modalConfirm) {
      confirmCheck.addEventListener('change', () => {
        modalConfirm.disabled = !confirmCheck.checked;
      });
    }

    // Cancel closes the modal
    if (modalCancel) modalCancel.addEventListener('click', () => {
      if (newGameModal) newGameModal.style.display = 'none';
      if (confirmCheck) confirmCheck.checked = false;
      if (modalConfirm) modalConfirm.disabled = true;
    });

    // Confirm erases and starts
    if (modalConfirm) modalConfirm.addEventListener('click', () => {
      if (newGameModal) newGameModal.style.display = 'none';
      localStorage.removeItem('save');
      localStorage.removeItem('playerName');
      localStorage.removeItem(USED_NAMES_KEY);
      localStorage.removeItem('tutorialComplete');
      startGame(true);
    });

    tsMenu.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      if (action === 'continue')  startGame(false);
      if (action === 'new-game') {
        if (hasSave) {
          // Show confirmation modal
          if (confirmCheck) confirmCheck.checked = false;
          if (modalConfirm) modalConfirm.disabled = true;
          if (newGameModal) newGameModal.style.display = '';
        } else {
          localStorage.removeItem('save');
          localStorage.removeItem('playerName');
          localStorage.removeItem(USED_NAMES_KEY);
          localStorage.removeItem('tutorialComplete');
          startGame(true);
        }
      }
      if (action === 'settings') {
        tsMenu.style.display = 'none';
        if (tsSettings) tsSettings.style.display = '';
      }
    });

    // Back button returns to menu
    if (tsBack) tsBack.addEventListener('click', () => {
      if (tsSettings) tsSettings.style.display = 'none';
      tsMenu.style.display = '';
    });
  }

  // ── Title screen music — start on first user interaction ──
  // Browsers require a user gesture before audio can play.
  function tryPlayTitleMusic() {
    if (window.backgroundSoundEnabled && window.bgAudio && window.bgAudio.paused) {
      window.bgAudio.play().catch(() => {});
    }
    document.removeEventListener('click', tryPlayTitleMusic);
    document.removeEventListener('keydown', tryPlayTitleMusic);
    document.removeEventListener('touchstart', tryPlayTitleMusic);
  }
  document.addEventListener('click', tryPlayTitleMusic, { once: false });
  document.addEventListener('keydown', tryPlayTitleMusic, { once: false });
  document.addEventListener('touchstart', tryPlayTitleMusic, { once: false });

  // ── Floating dust particles on title screen ──
  (function initTsParticles() {
    const canvas = document.getElementById('ts-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    const DUST_COUNT = 50;
    const dust = Array.from({ length: DUST_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.2 - 0.1,
      o: Math.random() * 0.4 + 0.1,
      hue: Math.random() > 0.5 ? '255,106,255' : '102,255,250',
    }));

    function tick(delta) {
      const step = delta / (1000 / 60);
      ctx.clearRect(0, 0, w, h);
      for (const p of dust) {
        p.x += p.dx * step;
        p.y += p.dy * step;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        ctx.globalAlpha = p.o;
        ctx.fillStyle = `rgba(${p.hue},${p.o})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

    }
    const stop = startVisualLoop(tick, { decorative: true });
    window._tsDustCleanup = () => { stop(); window.removeEventListener('resize', resize); };
  })();

  // ── Start Game ──
  async function startGame(isNew, goToPage) {
    if (window._gameStarted) return;
    window._gameStarted = true;

    // If new game, show name modal before proceeding
    if (isNew) {
      await createCharacter();
    }

    // Remove title music listeners so they can't fire after this point
    document.removeEventListener('click', tryPlayTitleMusic);
    document.removeEventListener('keydown', tryPlayTitleMusic);
    document.removeEventListener('touchstart', tryPlayTitleMusic);

    // Stop title screen particles
    if (window._tsDustCleanup) window._tsDustCleanup();

    // Stop title screen music immediately
    if (window.bgAudio) {
      window.bgAudio.pause();
      window.bgAudio.currentTime = 0;
      window.bgAudio.volume = parseFloat(localStorage.getItem('bgSoundVolume')) || 0.1;
    }

    // Fade out title screen
    if (titleScreen) titleScreen.classList.add('ts-hidden');

    // Show game UI
    if (header)  header.style.display  = '';
    if (nav)     nav.style.display     = '';
    if (content) content.style.display = '';

    // Initialize the game
    window.gameLoadTime     = Date.now();
    window.sessionStartTime = Date.now();
    initParticleCanvas();

    // Inject icons + labels into nav buttons
    const NAV_ICONS = {
      home: 'home', nodes: 'nodes', upgrades: 'upgrades', shop: 'shop',
      automation: 'automation', prestige: 'prestige', stats: 'stats',
      achievements: 'achievements', leaderboard: 'leaderboard', settings: 'settings'
    };
    const NAV_LABELS = {
      home: 'Home', nodes: 'Nodes', upgrades: 'Upgrades', shop: 'Shop',
      automation: 'Auto', prestige: 'Prestige', stats: 'Stats',
      achievements: 'Achieve', leaderboard: 'Ranks', settings: 'Settings'
    };
    document.querySelectorAll('nav button[data-page]').forEach(btn => {
      const page = btn.dataset.page;
      const icon = (window.GameIcons && window.GameIcons[NAV_ICONS[page]]) || '';
      btn.innerHTML = `${icon}<span class="nav-label">${NAV_LABELS[page] || page}</span>`;
    });

    if (!isNew) loadGame();
    else restoreRelics(null);
    changePage(goToPage || 'home');

    // Remove title screen from DOM after transition
    setTimeout(() => { if (titleScreen) titleScreen.remove(); }, 700);

    // For new players: run tutorial first, then start idle generation
    if (isNew && typeof startTutorial === 'function') {
      setTimeout(async () => {
        await startTutorial();
        startIdleGeneration();
      }, 800);
    } else {
      startIdleGeneration();
    }
  }
};

