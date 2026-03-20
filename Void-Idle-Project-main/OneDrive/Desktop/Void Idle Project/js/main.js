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
  { id: 'abyssalshard',   name: 'Abyssal Shard',    count: 0, cost: new Decimal(10),        baseCost: new Decimal(10),        baseProduction: new Decimal(1)      },
  { id: 'whisperengine',  name: 'Whisper Engine',   count: 0, cost: new Decimal(150),        baseCost: new Decimal(150),        baseProduction: new Decimal(10)     },
  { id: 'darkmatterloop', name: 'Dark Matter Loop', count: 0, cost: new Decimal(2000),       baseCost: new Decimal(2000),       baseProduction: new Decimal(80)     },
  { id: 'voidbloom',      name: 'Void Bloom',       count: 0, cost: new Decimal(30000),      baseCost: new Decimal(30000),      baseProduction: new Decimal(500)    },
  { id: 'gravitonseeder', name: 'Graviton Seeder',  count: 0, cost: new Decimal(500000),     baseCost: new Decimal(500000),     baseProduction: new Decimal(4000)   },
  { id: 'nullbeacon',     name: 'Null Beacon',      count: 0, cost: new Decimal('1e7'),       baseCost: new Decimal('1e7'),       baseProduction: new Decimal(30000)  },
  { id: 'oblivionspire',  name: 'Oblivion Spire',   count: 0, cost: new Decimal('2.5e8'),    baseCost: new Decimal('2.5e8'),    baseProduction: new Decimal(200000) },
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
    cost: 5_000,          owned: false,
    color: '#ff7a3d',     glow: 'rgba(255,122,61,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #7a2200 0%, #3a1000 50%, #010012 100%)',
    flavor: 'A smouldering crystal drawn from the void-flame rift.',
    passive: { label: '+15% VE per tick.',               veptBonus: 0.15 },
    active:  { label: 'Clicks earn 2% of VEPT.',         clickPct: 0.02  },
  },
  {
    id: 'frost-prism',    name: 'Frost Prism',
    cost: 50_000,         owned: false,
    color: '#66fffa',     glow: 'rgba(102,255,250,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #004a55 0%, #001820 50%, #010012 100%)',
    flavor: 'Harvested from ice formations at the edge of null-space.',
    passive: { label: '+30% VE per tick.',               veptBonus: 0.30 },
    active:  { label: 'Clicks earn 3% of VEPT.',         clickPct: 0.03  },
  },
  {
    id: 'shadow-wisp',    name: 'Shadow Wisp',
    cost: 500_000,        owned: false,
    color: '#b366ff',     glow: 'rgba(179,102,255,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #3a006b 0%, #150030 50%, #010012 100%)',
    flavor: 'A captured void-ghost that hungers for energy.',
    passive: { label: '+60% VE per tick.',               veptBonus: 0.60 },
    active:  { label: 'Clicks earn 2% of VEPT + auto-click every 5s.', clickPct: 0.02, autoClick: true, autoClickMs: 5000 },
  },
  {
    id: 'plasma-core',    name: 'Plasma Core',
    cost: 5_000_000,      owned: false,
    color: '#ffe566',     glow: 'rgba(255,229,102,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #5a4500 0%, #1e1500 50%, #010012 100%)',
    flavor: 'A miniature star — condensed void-plasma in crystalline suspension.',
    passive: { label: '+100% VE per tick (2×).',        veptBonus: 1.00 },
    active:  { label: 'Clicks earn 5% of VEPT.',         clickPct: 0.05  },
  },
  {
    id: 'abyssal-crown',  name: 'Abyssal Crown',
    cost: 50_000_000,     owned: false,
    color: '#ff3d6e',     glow: 'rgba(255,61,110,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #6b0025 0%, #280010 50%, #010012 100%)',
    flavor: 'The apex of void power. Every 5th click unleashes an annihilation surge.',
    passive: { label: '+200% VE per tick (3×).',        veptBonus: 2.00 },
    active:  { label: 'Clicks earn 10% of VEPT. Every 5th click is 5×.', clickPct: 0.10, combo: true, comboN: 5, comboMult: 5 },
  },
  {
    id: 'void-rift',      name: 'Void Rift',
    cost: 500_000_000,    owned: false,
    color: '#00ffcc',     glow: 'rgba(0,255,204,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #004a3a 0%, #001a14 50%, #010012 100%)',
    flavor: 'A fracture in reality where raw void energy bleeds through unchecked. Unpredictable. Hungry.',
    passive: { label: '+350% VE per tick.',              veptBonus: 3.50 },
    active:  { label: 'Clicks earn 8% of VEPT. 30% chance to crit for 6×.', clickPct: 0.08, critChance: 0.30, critMult: 6 },
  },
  {
    id: 'temporal-lens',  name: 'Temporal Lens',
    cost: 5_000_000_000,  owned: false,
    color: '#ffd700',     glow: 'rgba(255,215,0,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #5a4a00 0%, #1a1400 50%, #010012 100%)',
    flavor: 'Bends the flow of void-time itself — compressing cycles, accelerating harvests.',
    passive: { label: '+700% VE per tick.',              veptBonus: 7.00 },
    active:  { label: 'Clicks earn 4% of VEPT. Auto-clicks every 2.5s. Every 4th click is 3×.', clickPct: 0.04, autoClick: true, autoClickMs: 2500, combo: true, comboN: 4, comboMult: 3 },
  },
  {
    id: 'entropy-engine', name: 'Entropy Engine',
    cost: 50_000_000_000, owned: false,
    color: '#7fff00',     glow: 'rgba(127,255,0,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #1a3a00 0%, #0a1400 50%, #010012 100%)',
    flavor: 'Converts disorder into power through cascading chain reactions. One click becomes many.',
    passive: { label: '+1500% VE per tick.',             veptBonus: 15.00 },
    active:  { label: 'Clicks earn 6% of VEPT and cascade into 4 sub-hits at 35% each.', clickPct: 0.06, cascadeCount: 4, cascadePct: 0.35 },
  },
  {
    id: 'null-sovereign', name: 'Null Sovereign',
    cost: 500_000_000_000, owned: false,
    color: '#c8c8ff',     glow: 'rgba(200,200,255,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #2a2a6b 0%, #0e0e2a 50%, #010012 100%)',
    flavor: 'An ancient null-point of supreme dominion. It does not merely use void energy — it commands it.',
    passive: { label: '+3000% VE per tick.',             veptBonus: 30.00 },
    active:  { label: 'Clicks earn 5% of VEPT. Auto-clicks every 1.5s. Every 7th click is 15×.', clickPct: 0.05, autoClick: true, autoClickMs: 1500, combo: true, comboN: 7, comboMult: 15 },
  },
  {
    id: 'eternal-collapse', name: 'Eternal Collapse',
    cost: 5_000_000_000_000, owned: false,
    color: '#ff0044',     glow: 'rgba(255,0,68,0.55)',
    bg:   'radial-gradient(circle at 38% 32%, #6b0015 0%, #200008 50%, #010012 100%)',
    flavor: 'The final convergence of all void matter. Its pull is inescapable. Its power, absolute.',
    passive: { label: '+6000% VE per tick.',             veptBonus: 60.00 },
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
      const result = voidenergyClick(1);
      if (typeof window.spawnOrbClick === 'function') {
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
  { id: 'click-10',   check: () => window.totalClicks >= 10 },
  { id: 'click-100',  check: () => window.totalClicks >= 100 },
  { id: 'click-1k',   check: () => window.totalClicks >= 1_000 },
  { id: 'click-10k',  check: () => window.totalClicks >= 10_000 },
  { id: 'click-50k',  check: () => window.totalClicks >= 50_000 },

  // Node first purchase
  { id: 'node-abyssal-first',    check: () => (window.nodesData.find(n => n.id === 'abyssalshard')?.count   || 0) >= 1 },
  { id: 'node-whisper-first',    check: () => (window.nodesData.find(n => n.id === 'whisperengine')?.count  || 0) >= 1 },
  { id: 'node-darkmatter-first', check: () => (window.nodesData.find(n => n.id === 'darkmatterloop')?.count || 0) >= 1 },
  { id: 'node-voidbloom-first',  check: () => (window.nodesData.find(n => n.id === 'voidbloom')?.count      || 0) >= 1 },
  { id: 'node-graviton-first',   check: () => (window.nodesData.find(n => n.id === 'gravitonseeder')?.count || 0) >= 1 },
  { id: 'node-nullbeacon-first', check: () => (window.nodesData.find(n => n.id === 'nullbeacon')?.count     || 0) >= 1 },
  { id: 'node-oblivion-first',   check: () => (window.nodesData.find(n => n.id === 'oblivionspire')?.count  || 0) >= 1 },

  // Total node count
  { id: 'nodes-10',  check: () => window.nodesData.reduce((s, n) => s + n.count, 0) >= 10  },
  { id: 'nodes-25',  check: () => window.nodesData.reduce((s, n) => s + n.count, 0) >= 25  },
  { id: 'nodes-50',  check: () => window.nodesData.reduce((s, n) => s + n.count, 0) >= 50  },
  { id: 'nodes-100', check: () => window.nodesData.reduce((s, n) => s + n.count, 0) >= 100 },

  // Upgrades
  { id: 'upgrade-first', check: () => (window.upgradesData?.filter(u => u.purchased).length || 0) >= 1  },
  { id: 'upgrade-5',     check: () => (window.upgradesData?.filter(u => u.purchased).length || 0) >= 5  },
  { id: 'upgrade-10',    check: () => (window.upgradesData?.filter(u => u.purchased).length || 0) >= 10 },
  { id: 'upgrade-all',   check: () => !!(window.upgradesData?.length && window.upgradesData.every(u => u.purchased)) },

  // Tick speed
  { id: 'tick-speed-first', check: () => window.tickSpeedReduction > 0 },
  { id: 'tick-fast',        check: () => getTickInterval() <= 4000 },
  { id: 'tick-fastest',     check: () => getTickInterval() <= 1000 },

  // Prestige
  { id: 'prestige-first', check: () => prestige >= 1 },
  { id: 'prestige-5',     check: () => prestige >= 5 },

  // Special
  { id: 'idle-explorer', check: () => (Date.now() - (window.gameLoadTime || Date.now())) >= 600_000 },
  { id: 'void-rich',     check: () => voidenergy >= 1_000_000 },
  { id: 'hold-100m',     check: () => voidenergy >= 100_000_000 },
  { id: 'hold-1b',       check: () => voidenergy >= 1_000_000_000 },
  { id: 'hold-1t',       check: () => voidenergy >= 1e12 },
  { id: 'hold-1q',       check: () => voidenergy >= 1e15 },
  { id: 'idle-30min',    check: () => (Date.now() - (window.gameLoadTime || Date.now())) >= 1_800_000 },
  { id: 'idle-1hr',      check: () => (Date.now() - (window.gameLoadTime || Date.now())) >= 3_600_000 },
  { id: 'void-sage',     check: () => ((window.lifetimePlaytimeBase || 0) + (Date.now() - (window.sessionStartTime || Date.now()))) >= 36_000_000 },
  { id: 'node-all-types',  check: () => window.nodesData.every(n => n.count >= 1) },
  { id: 'void-symphony',   check: () => window.nodesData.every(n => n.count >= 5) },
  { id: 'void-colossus',   check: () => window.nodesData.every(n => n.count >= 25) },
  { id: 'first-combo',   check: () => (window.totalCombos   || 0) >= 1 },
  { id: 'first-crit',    check: () => (window.totalCrits    || 0) >= 1 },
  { id: 'first-cascade', check: () => (window.totalCascades || 0) >= 1 },
  { id: 'combo-50',      check: () => (window.totalCombos   || 0) >= 50 },
  { id: 'crit-50',       check: () => (window.totalCrits    || 0) >= 50 },
  { id: 'cascade-50',    check: () => (window.totalCascades || 0) >= 50 },
  { id: 'legendary',     check: () => !!(window.orbsData?.every(o => o.owned) && window.upgradesData?.every(u => u.purchased)) },

  // More Void Energy milestones
  { id: 've-100m', check: () => lifetimeVE.gte(100_000_000) },
  { id: 've-100b', check: () => lifetimeVE.gte('1e11') },
  { id: 've-100t', check: () => lifetimeVE.gte('1e14') },
  { id: 've-1qa',  check: () => lifetimeVE.gte('1e18') },
  { id: 've-1sx',  check: () => lifetimeVE.gte('1e21') },

  // More clicking milestones
  { id: 'click-500',  check: () => window.totalClicks >= 500 },
  { id: 'click-5k',   check: () => window.totalClicks >= 5_000 },
  { id: 'click-100k', check: () => window.totalClicks >= 100_000 },
  { id: 'click-250k', check: () => window.totalClicks >= 250_000 },
  { id: 'click-500k', check: () => window.totalClicks >= 500_000 },
  { id: 'click-1m',   check: () => window.totalClicks >= 1_000_000 },

  // Node counts per type
  { id: 'abyssal-10',    check: () => (window.nodesData.find(n => n.id === 'abyssalshard')?.count    || 0) >= 10 },
  { id: 'abyssal-25',    check: () => (window.nodesData.find(n => n.id === 'abyssalshard')?.count    || 0) >= 25 },
  { id: 'whisper-10',    check: () => (window.nodesData.find(n => n.id === 'whisperengine')?.count   || 0) >= 10 },
  { id: 'whisper-25',    check: () => (window.nodesData.find(n => n.id === 'whisperengine')?.count   || 0) >= 25 },
  { id: 'darkmatter-10', check: () => (window.nodesData.find(n => n.id === 'darkmatterloop')?.count  || 0) >= 10 },
  { id: 'darkmatter-25', check: () => (window.nodesData.find(n => n.id === 'darkmatterloop')?.count  || 0) >= 25 },
  { id: 'voidbloom-10',  check: () => (window.nodesData.find(n => n.id === 'voidbloom')?.count       || 0) >= 10 },
  { id: 'voidbloom-25',  check: () => (window.nodesData.find(n => n.id === 'voidbloom')?.count       || 0) >= 25 },
  { id: 'graviton-10',   check: () => (window.nodesData.find(n => n.id === 'gravitonseeder')?.count  || 0) >= 10 },
  { id: 'graviton-25',   check: () => (window.nodesData.find(n => n.id === 'gravitonseeder')?.count  || 0) >= 25 },
  { id: 'nullbeacon-10', check: () => (window.nodesData.find(n => n.id === 'nullbeacon')?.count      || 0) >= 10 },
  { id: 'nullbeacon-25', check: () => (window.nodesData.find(n => n.id === 'nullbeacon')?.count      || 0) >= 25 },
  { id: 'oblivion-10',   check: () => (window.nodesData.find(n => n.id === 'oblivionspire')?.count   || 0) >= 10 },
  { id: 'oblivion-25',   check: () => (window.nodesData.find(n => n.id === 'oblivionspire')?.count   || 0) >= 25 },

  // More total node milestones
  { id: 'nodes-200',  check: () => window.nodesData.reduce((s, n) => s + n.count, 0) >= 200  },
  { id: 'nodes-500',  check: () => window.nodesData.reduce((s, n) => s + n.count, 0) >= 500  },
  { id: 'nodes-1000', check: () => window.nodesData.reduce((s, n) => s + n.count, 0) >= 1000 },

  // More upgrade milestones
  { id: 'upgrade-25',   check: () => (window.upgradesData?.filter(u => u.purchased).length || 0) >= 25 },
  { id: 'upgrade-50',   check: () => (window.upgradesData?.filter(u => u.purchased).length || 0) >= 50 },
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

function tryUnlockAchievements() {
  achievementConditions.forEach(({ id, check }) => {
    if (check()) window.unlockAchievement(id);
  });
}

// === Utility: Format Large Numbers ===
function formatNumber(num) {
  if (!(num instanceof Decimal)) num = new Decimal(num);

  const suffixes = [
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
  ];

  for (const { value, symbol } of suffixes) {
    if (num.gte(value) && num.lt(value.mul(1000))) {
      return num.div(value).toFixed(2).replace(/\.0+$/, '') + symbol;
    }
  }

  return num.gte('1e36') ? num.toExponential(2) : num.toFixed(0);
}

// === Utility: Update a DOM Element's Text ===
function updateDisplay(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
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

function calculateVEPT() {
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

  return prod.toNumber();
}

// === Manual Click ===
function voidenergyClick(multiplier = 1) {
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
  voidenergy   = Math.ceil(voidenergy + reward);
  lifetimeVE   = lifetimeVE.plus(reward);
  window.totalClicks++;

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
  updateDisplay('voidenergy', voidenergy);
  try { if (typeof updateHomeDynamic === 'function') updateHomeDynamic(); } catch (err) { console.error('[Home update error]', err); }
  return { reward, isCombo: comboMult > 1, isCrit: critMult > 1, isCascade, cascadeReward, comboMult, critMult };
}

// === Refresh Displays on Nodes Page (and Home) ===
function refreshNodeStats() {
  updateDisplay('voidenergy', new Decimal(voidenergy).ceil().toString());

  if (isNodesPageLoaded) {
    updateDisplay('VEPT', Math.ceil(calculateVEPT()));

    for (const node of window.nodesData) {
      updateDisplay(node.id, new Decimal(node.count).floor().toString());
      updateDisplay(`${node.id}Production`, `Production: ${formatNumber(getNodeProduction(node))}`);
    }
  } else if (typeof updateHomeDynamic === 'function') {
    updateHomeDynamic();
  }
}

// === Tick Progress Bar ===
// Runs every 50 ms regardless of which page is open.
function updateTickProgress() {
  const elapsed   = Date.now() - (window.tickStartTime || Date.now());
  const interval  = getTickInterval();
  const percent   = Math.min((elapsed / interval) * 100, 100);

  // Nodes-page <progress> element
  const nodebar = document.getElementById('tickProgress');
  if (nodebar) nodebar.value = percent;

  // Home-page fill bar
  const homebar = document.getElementById('homeTickBar');
  if (homebar) {
    homebar.style.width = percent.toFixed(2) + '%';
    const label = document.getElementById('homeTickLabel');
    if (label) {
      const remSec = Math.max(0, (interval - elapsed) / 1000).toFixed(1);
      label.textContent = `Next tick in ${remSec}s`;
    }
  }
}

// === Idle Generation ===
function generateResourcesPerTick() {
  const gained = calculateVEPT();

  voidenergy = Math.ceil(voidenergy + gained);
  lifetimeVE = lifetimeVE.plus(gained);

  try { tryUnlockAchievements(); } catch (err) { console.error('[Achievement error]', err); }

  updateDisplay('voidenergy', voidenergy);
  updateDisplay('VEPT', Math.ceil(gained));

  if (typeof updateHomeDynamic === 'function') updateHomeDynamic();
}

function startIdleGeneration() {
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

  // Drive the tick bar at display refresh rate instead of a fixed 50ms interval
  function tickProgressLoop() {
    updateTickProgress();
    window._tickProgressRaf = requestAnimationFrame(tickProgressLoop);
  }
  if (window._tickProgressRaf) cancelAnimationFrame(window._tickProgressRaf);
  window._tickProgressRaf = requestAnimationFrame(tickProgressLoop);
}

// === Persistence ===
function saveGame() {
  // Snapshot lifetime playtime up to this moment so it persists across sessions.
  const sessionMs = Date.now() - (window.sessionStartTime || Date.now());
  const save = {
    voidenergy,
    lifetimeVE: lifetimeVE.toString(),
    prestige,
    totalClicks: window.totalClicks || 0,
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

  // Restore purchased upgrades and reapply node production multipliers.
  // tickSpeedReduction and clickUpgradeMultiplier are already restored from their own save fields.
  if (Array.isArray(data.upgrades) && window.upgradesData) {
    window.upgradesData.forEach(u => {
      if (data.upgrades.includes(u.id)) {
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

  refreshNodeStats();
}

function resetGame() {
  localStorage.removeItem('save');
  voidenergy = 0;
  lifetimeVE = new Decimal(0);
  prestige   = 0;

  window.nodesData.forEach(n => {
    n.count = 0;
    n.cost  = new Decimal(n.baseCost);
    delete n.productionMultiplier;
  });

  window.tickSpeedReduction     = 0;
  window.clickUpgradeMultiplier = 1;
  window.achievementProdBonus   = 0;
  window.achievementClickBonus  = 0;
  window.totalClicks            = 0;
  window.tickStartTime          = Date.now();
  window.lifetimePlaytimeBase   = 0;
  window.sessionStartTime       = Date.now();

  // Reset orbs — only Void Core remains owned/equipped
  if (window.orbAutoClickInterval) {
    clearInterval(window.orbAutoClickInterval);
    window.orbAutoClickInterval = null;
  }
  (window.orbsData || []).forEach(orb => { orb.owned = (orb.id === 'void-core'); });
  window.equippedOrbId = 'void-core';
  window.orbComboCount = 0;

  if (window.upgradesData) {
    window.upgradesData.forEach(u => { u.purchased = false; });
  }

  if (window.achievementsData) {
    window.achievementsData.forEach(a => { a.unlocked = false; a.claimed = false; });
  }

  refreshNodeStats();
  changePage('home');
}

// === Page Navigation ===
function changePage(page) {
  isNodesPageLoaded = (page === 'nodes');

  // Highlight active nav button
  document.querySelectorAll('nav button[data-page]').forEach(btn => {
    btn.classList.toggle('nav-active', btn.dataset.page === page);
  });

  const content = document.getElementById('content');
  content.classList.remove('wide-home');
  content.innerHTML = '';

  const script  = document.createElement('script');
  script.src    = `js/${page}.js`;
  script.onload = () => {
    const fnName = `load${page.charAt(0).toUpperCase()}${page.slice(1)}Page`;
    const fn     = window[fnName];
    if (typeof fn === 'function') fn(content);
    refreshNodeStats();
    // Inject footer at the bottom of every page
    const footer = document.createElement('footer');
    footer.innerHTML = `<p>&copy; ${new Date().getFullYear()} VoidByte Studio. All rights reserved.</p>`;
    content.appendChild(footer);
  };
  document.body.appendChild(script);
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
  if (stored && stored.trim()) return;
  let name;
  do {
    name = prompt('Enter a unique character name:');
  } while (!isNameValid(name));
  saveName(name);
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

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.rising) {
        p.alpha += p.da;
        if (p.alpha >= p.maxA) p.rising = false;
      } else {
        p.alpha -= p.da * 0.65;
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
    requestAnimationFrame(tick);
  }
  tick();
}

window.onload = () => {
  window.gameLoadTime     = Date.now();
  window.sessionStartTime = Date.now(); // set once; never reset mid-session
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

  createCharacter();
  loadGame();
  changePage('home');
  startIdleGeneration();
};

