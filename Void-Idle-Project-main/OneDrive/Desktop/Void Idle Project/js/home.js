// home.js

// Define changelog only once on the window object
if (typeof window.changelogEntries === 'undefined') {
  window.changelogEntries = [
    {
      version: "v0.0.6",
      date:    "2026-03-19",
      summary: "UI polish, home page redesign, and shop/upgrade state improvements",
      highlights: [
        "Home page redesigned — Production, Active Bonuses, and Recommended Next cards",
        "Upgrades: affordable / locked / purchased card states with live feedback",
        "Shop: equipped, owned, available, and locked orb states with context bar",
        "Nodes: live buy button states and owned-row highlights",
      ],
      sections: [
        { tag: 'Added', notes: [
          "Combo, crit, and cascade hits now show floating labels next to the VE popup",
          "Auto-click orbs animate the home orb and spawn VE popups on each auto-click",
          "Home orb now shows orbit rings, sparks, halo ring, and reflective sweep",
          "Equipped orb name displayed above the home orb in its own color",
          "Home orb glow now matches the equipped orb color across all states",
          "Nav buttons now show icons above labels with an active page highlight",
          "Upgrades page: state-aware card styling with affordable, locked, and purchased tiers",
          "Upgrades page: category info row showing owned count, production multiplier, and affordable count",
          "Upgrades page: purchased badge on completed upgrades",
          "Shop page: context bar showing equipped orb, owned count, and passive tip",
          "Shop page: four distinct card states — equipped, owned, available, and locked",
          "Shop page: owned badge on non-equipped purchased orbs",
          "Nodes page: live affordable/locked state on buy buttons with 200ms polling",
          "Nodes page: owned-row highlight with teal border and bright count when count > 0",
        ]},
        { tag: 'Changed', notes: [
          "Orb passive bonuses now compound multiplicatively instead of additively",
          "Full UI refresh: glassmorphism panels, refined nav, enlarged orb, polished glows",
          "Orb and card glow tightened — crisp rim and inner radiance, reduced outer bloom",
          "Tick bar and XP bar thicker with a subtle glow fill",
          "Changelog condensed on home screen with dimmer bullet text",
          "Upgrades list: stronger active tab highlight, panel title glow",
          "Shop orbs: preview sphere enlarged, flavor text brighter, effect labels more readable",
          "Shop orbs: equipped card uses 2px colored border and rim glow distinct from owned",
          "Nodes table: larger icons, bolder names, production label reformatted to +X VE / tick",
          "Nodes table: richer header with sharper letter-spacing and teal bottom border",
        ]},
        { tag: 'Fixed', notes: [
          "Orb buy buttons not updating in real-time without leaving the shop",
          "Upgrades not persisting correctly after a page reload",
          "Buying upgrades or unlocking achievements scrolling the page to the top",
          "Tick bar not resetting on dev reset",
          "Lifetime playtime not resetting on dev reset",
          "Orb clicking no longer overlaps the tick bar",
          "First upgrade card in a category not lifting on hover due to overflow clipping",
        ]},
      ]
    },
    {
      version: "v0.0.5",
      date:    "2026-03-18",
      sections: [
        { tag: 'Added', notes: [
          "10 upgrades per upgrade tree across all nodes and tick speed",
          "5 new orbs to the shop with unique mechanics (crit, cascade, variable combo)",
          "Passive bonuses and active effects section to stats page",
          "Crit chance and tick interval progress bars with caps to stats page",
          "Expanded achievements from 37 to 100 across new and existing categories",
          "New achievement categories: Orbs and Production",
          "Combo, crit, and cascade hit tracking for special achievements",
        ]},
        { tag: 'QoL', notes: [
          "Orb shop cost now shown directly on the buy button",
        ]},
        { tag: 'Fixed', notes: [
          "VE/Second rounding showing incorrect decimal values",
          "Achievements claim button scrolling page to top on click",
        ]},
      ]
    },
    {
      version: "v0.0.4",
      date:    "2026-02-26",
      sections: [
        { tag: 'Added', notes: [
          "Background sound, volume control, and toggle mute option",
          "Achievements section with unlock conditions and claim button",
          "Upgrade section with costs, purchase button, effects, and descriptions",
        ]},
        { tag: 'QoL', notes: [
          "Redesigned UI to a grid layout for better organization",
        ]},
      ]
    },
    {
      version: "v0.0.3",
      date:    "2026-02-25",
      sections: [
        { tag: 'Added', notes: [
          "Home page player name, level, and XP bar",
          "Resource overview with VE, VEPT, and VEPS",
          "Stats page with resource, node, prestige, and playtime stats",
          "Progress milestones for next prestige and node unlock",
          "Scrollable changelog section",
        ]},
      ]
    },
    {
      version: "v0.0.2",
      date:    "2026-02-24",
      sections: [
        { tag: 'Added', notes: [
          "Starfield overlay with twinkle and drift animations",
          "Icons to Nodes page",
          "break-infinity.js for large number support",
        ]},
        { tag: 'QoL', notes: [
          "Cleaned up interface.css and slimmed selectors",
        ]},
        { tag: 'Fixed', notes: [
          "Z-index stacking so all buttons and content remain interactive",
        ]},
      ]
    },
    {
      version: "v0.0.1",
      date:    "2026-02-23",
      sections: [
        { tag: 'Added', notes: [
          "Tick progress bar to Nodes page",
          "Nav menu with Home, Nodes, Stats, and more",
          "Copyright footer",
        ]},
        { tag: 'Fixed', notes: [
          "VEPT display bug on first load",
        ]},
      ]
    },
  ];
}

function loadHomePage(content) {
  document.getElementById('content').classList.add('wide-home');
  const playerName = localStorage.getItem("playerName") || "Player";

  content.innerHTML = `
    <div class="home-root">

      <!-- ── Hero: VE counter • orb • tick bar ── -->
      <div class="home-hero">
        <div class="home-ve-block">
          <span class="home-ve-label">Void Energy</span>
          <span class="home-ve-value" id="voidenergy">0</span>
        </div>

        <div class="home-orb-wrap">
        <span class="home-orb-name" id="home-orb-name"></span>
        <button class="void-orb" id="void-orb-btn" onclick="orbClick(event)" title="Click to generate Void Energy">
          <span class="orb-halo"></span>
          <span class="orb-inner"></span>
          <span class="orb-shine"></span>
          <span class="orb-sweep"></span>
          <span class="orb-orbit"></span>
          <span class="orb-orbit orb-orbit-2"></span>
          <span class="orb-spark" style="--i:0"></span>
          <span class="orb-spark" style="--i:1"></span>
          <span class="orb-spark" style="--i:2"></span>
          <span class="orb-spark" style="--i:3"></span>
          <span class="orb-spark" style="--i:4"></span>
          <span class="orb-spark" style="--i:5"></span>
        </button>
        </div>

        <div class="home-tick-wrap">
          <div class="home-tick-track">
            <div id="homeTickBar" class="home-tick-fill"></div>
          </div>
          <div class="home-tick-meta">
            <span id="homeTickLabel">Next tick in --</span>
            <span>+<span id="VEPT">0</span> VE / tick</span>
          </div>
        </div>
      </div>

      <!-- ── Info cards ── -->
      <div class="home-cards">

        <!-- Progress -->
        <div class="home-card">
          <div class="home-card-hdr">${gi('player')} ${playerName}</div>
          <div class="home-card-level">Level <strong id="playerLevelLabel">1</strong></div>
          <div class="xp-bar"><div id="xpProgress" class="xp-fill" style="width:0%"></div></div>
          <p class="xp-label" id="xpText">0 / 0 XP</p>
          <ul class="home-kv-list" style="margin-top:12px">
            <li><span>Achievements</span><strong id="achievementsUnlocked">0/0</strong></li>
            <li><span>Prestiges</span><strong id="homePrestiges">0</strong></li>
            <li><span>Next Goal</span><strong id="homeNextMilestone" style="color:var(--accent);font-size:0.8rem">—</strong></li>
          </ul>
        </div>

        <!-- Production -->
        <div class="home-card">
          <div class="home-card-hdr">${gi('voidenergy')} Production</div>
          <ul class="home-kv-list">
            <li><span>VE / Tick</span><strong id="homeVEPT">0</strong></li>
            <li><span>VE / Second</span><strong id="homeVEPS">0</strong></li>
            <li><span>Tick Speed</span><strong><span id="homeTickInterval">${(getTickInterval() / 1000).toFixed(1)}</span>s</strong></li>
            <li><span>Click Power</span><strong id="homeClickPower">1.00×</strong></li>
            <li id="homeAutoRow" style="display:none"><span>Auto Source</span><strong id="homeAutoSource">—</strong></li>
            <li><span>Total Nodes</span><strong id="totalNodes">0</strong></li>
          </ul>
        </div>

        <!-- Active Bonuses -->
        <div class="home-card">
          <div class="home-card-hdr">${gi('orb')} Active Bonuses</div>
          <ul class="home-kv-list">
            <li><span>Equipped Orb</span><strong id="homeActivOrbName" style="font-size:0.8rem">—</strong></li>
            <li><span>Passive</span><strong id="homeActivePassive" style="color:var(--accent);font-size:0.78rem;text-align:right;max-width:60%">—</strong></li>
            <li><span>Active</span><strong id="homeActiveActive" style="color:var(--primary);font-size:0.78rem;text-align:right;max-width:60%">—</strong></li>
            <li id="homeNodeMultRow" style="display:none"><span>Best Node Mult</span><strong id="homeNodeMult">1.00×</strong></li>
            <li id="homeClickMultRow" style="display:none"><span>Click Mult</span><strong id="homeClickMult">1.00×</strong></li>
          </ul>
        </div>

      </div>

      <!-- ── Next Goals strip ── -->
      <div class="home-next-goal">
        <div class="home-goal-hdr">${gi('upgrades', 13)} Recommended Next</div>
        <div class="home-goal-items">
          <div class="home-goal-item">
            <span class="home-goal-label">Upgrade</span>
            <span class="home-goal-name" id="goalUpgradeName">—</span>
            <span class="home-goal-cost" id="goalUpgradeCost"></span>
          </div>
          <div class="home-goal-sep"></div>
          <div class="home-goal-item">
            <span class="home-goal-label">Node</span>
            <span class="home-goal-name" id="goalNodeName">—</span>
            <span class="home-goal-cost" id="goalNodeCost"></span>
          </div>
          <div class="home-goal-sep"></div>
          <div class="home-goal-item">
            <span class="home-goal-label">Next Orb</span>
            <span class="home-goal-name" id="goalOrbName">—</span>
            <span class="home-goal-cost" id="goalOrbCost"></span>
          </div>
        </div>
      </div>

      <!-- ── Latest Update card ── -->
      ${(() => {
        const latest = window.changelogEntries[0];
        return `
        <div class="home-changelog">
          <div class="home-changelog-label">${gi('changelog', 13)} Latest Update</div>
          <div class="home-changelog-ver">
            <span class="cl-version">${latest.version}</span>
            <span class="cl-date">${latest.date}</span>
          </div>
          <p class="home-changelog-summary">${latest.summary || ''}</p>
          <button class="home-changelog-btn" id="open-changelog-btn">View Full Changelog</button>
        </div>`;
      })()}

    </div>
  `;

  updateHomeDynamic();
  updateHomeOrb();
  if (typeof updateTickProgress === 'function') updateTickProgress();

  const clBtn = content.querySelector('#open-changelog-btn');
  if (clBtn) clBtn.addEventListener('click', openChangelogModal);

  // Match home-root width exactly to the nav bar width
  requestAnimationFrame(() => {
    const nav  = document.querySelector('nav');
    const root = document.querySelector('.home-root');
    if (nav && root) {
      root.style.maxWidth = Math.min(nav.getBoundingClientRect().width, 860) + 'px';
      root.style.margin   = '0 auto';
    }
  });
}

function updateHomeOrb() {
  const btn = document.getElementById('void-orb-btn');
  if (!btn) return;
  const orb = (window.orbsData || []).find(o => o.id === window.equippedOrbId);
  if (!orb) return;

  const nameEl = document.getElementById('home-orb-name');
  if (nameEl) { nameEl.textContent = orb.name; nameEl.style.color = orb.color; }

  btn.style.background   = orb.bg;
  btn.style.borderColor  = orb.color;
  btn.style.setProperty('--primary',   orb.color);
  btn.style.setProperty('--orb-color', orb.color);
  btn.style.setProperty('--orb-glow',  orb.glow);

  // Tint the inner ring to match
  const inner = btn.querySelector('.orb-inner');
  if (inner) inner.style.borderColor = orb.color;

  // Auto-click indicator: animate the orb in sync with the auto-click interval
  if (orb.active.autoClick) {
    btn.style.setProperty('--auto-ms', (orb.active.autoClickMs / 1000) + 's');
    btn.classList.add('is-auto');
  } else {
    btn.classList.remove('is-auto');
  }
}
function openChangelogModal() {
  if (document.getElementById('changelog-modal')) return;

  const modal = document.createElement('div');
  modal.id        = 'changelog-modal';
  modal.className = 'changelog-modal';
  modal.innerHTML = `
    <div class="changelog-modal-backdrop"></div>
    <div class="changelog-modal-panel">
      <div class="changelog-modal-hdr">
        <span>${gi('changelog')} Full Changelog</span>
        <button class="changelog-modal-close">✕</button>
      </div>
      <div class="changelog-modal-body">
        <ul class="changelog-list">
          ${window.changelogEntries.map(e => `
            <li>
              <span class="cl-version">${e.version}</span>
              <span class="cl-date">${e.date}</span>
              ${e.sections.map(s => `
                <div class="cl-section">
                  <span class="cl-tag cl-tag-${s.tag.toLowerCase()}">${s.tag}</span>
                  <ul>${s.notes.map(n => `<li>${n}</li>`).join('')}</ul>
                </div>
              `).join('')}
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  requestAnimationFrame(() => modal.classList.add('is-open'));

  modal.querySelector('.changelog-modal-backdrop').addEventListener('click', closeChangelogModal);
  modal.querySelector('.changelog-modal-close').addEventListener('click', closeChangelogModal);
  document.addEventListener('keydown', _changelogEscHandler);
}

function _changelogEscHandler(e) {
  if (e.key === 'Escape') closeChangelogModal();
}

function closeChangelogModal() {
  const modal = document.getElementById('changelog-modal');
  if (!modal) return;
  modal.classList.remove('is-open');
  document.removeEventListener('keydown', _changelogEscHandler);
  modal.addEventListener('transitionend', () => modal.remove(), { once: true });
}

window.updateHomeOrb = updateHomeOrb;
window.spawnOrbClick = spawnOrbClick;

function updateHomeDynamic() {
  if (typeof lifetimeVE === 'undefined') return;
  if (!window.achievementsData) return;

  const el = id => document.getElementById(id);
  if (!el('playerLevelLabel')) return; // page not loaded

  // Level from lifetimeVE
  const rawLog = lifetimeVE.gt(0) ? Decimal.log10(lifetimeVE) : 0;
  const level  = Math.max(1, Math.floor(rawLog * 3));

  const currentVE = level > 1 ? Decimal.pow(10, level / 3) : new Decimal(0);
  const nextVE    = Decimal.pow(10, (level + 1) / 3);
  const gained    = lifetimeVE.minus(currentVE).clamp(0, nextVE.minus(currentVE));
  const progress  = gained.dividedBy(nextVE.minus(currentVE)).times(100).clamp(0, 100);

  const vept       = calculateVEPT();
  const totalNodes = window.nodesData.reduce((sum, n) => sum + n.count, 0);
  const unlocked   = window.achievementsData.filter(a => a.unlocked);
  const tickSec    = getTickInterval() / 1000;
  const clickMult  = window.clickUpgradeMultiplier || 1;
  const equippedOrb = (window.orbsData || []).find(o => o.id === window.equippedOrbId);

  // ── Hero
  if (el('voidenergy')) el('voidenergy').textContent = formatNumber(voidenergy);
  if (el('VEPT'))       el('VEPT').textContent       = formatNumber(vept);

  // ── Progress card
  if (el('playerLevelLabel'))     el('playerLevelLabel').textContent     = level;
  if (el('xpProgress'))           el('xpProgress').style.width           = `${progress.toFixed(2)}%`;
  if (el('xpText'))               el('xpText').textContent               = `${formatNumber(gained)} / ${formatNumber(nextVE.minus(currentVE))} XP`;
  if (el('achievementsUnlocked')) el('achievementsUnlocked').textContent = `${unlocked.length} / ${window.achievementsData.length}`;
  if (el('homePrestiges'))        el('homePrestiges').textContent        = prestige;

  // Next milestone: first affordable upgrade, else cheapest upcoming
  const unownedUpgrades  = (window.upgradesData || []).filter(u => !u.purchased);
  const affordableUpg    = unownedUpgrades.find(u => new Decimal(voidenergy).gte(u.cost));
  const cheapestUpg      = unownedUpgrades.reduce((min, u) => (!min || u.cost.lt(min.cost)) ? u : min, null);
  if (el('homeNextMilestone')) {
    if (affordableUpg) {
      el('homeNextMilestone').textContent = affordableUpg.name;
      el('homeNextMilestone').style.color = 'var(--accent)';
    } else if (cheapestUpg) {
      el('homeNextMilestone').textContent = formatNumber(cheapestUpg.cost) + ' VE';
      el('homeNextMilestone').style.color = 'rgba(224,224,224,0.5)';
    } else {
      el('homeNextMilestone').textContent = 'All upgrades purchased';
    }
  }

  // ── Production card
  if (el('homeVEPT'))         el('homeVEPT').textContent         = formatNumber(vept);
  if (el('homeVEPS'))         el('homeVEPS').textContent         = formatNumber(vept / tickSec);
  if (el('homeTickInterval')) el('homeTickInterval').textContent = tickSec.toFixed(1);
  if (el('totalNodes'))       el('totalNodes').textContent       = totalNodes;
  if (el('homeClickPower'))   el('homeClickPower').textContent   = clickMult.toFixed(2) + '×';
  if (equippedOrb && equippedOrb.active.autoClick) {
    if (el('homeAutoRow'))    el('homeAutoRow').style.display    = '';
    if (el('homeAutoSource')) { el('homeAutoSource').textContent = equippedOrb.name; el('homeAutoSource').style.color = equippedOrb.color; }
  } else {
    if (el('homeAutoRow'))    el('homeAutoRow').style.display    = 'none';
  }

  // ── Active Bonuses card
  if (equippedOrb) {
    if (el('homeActivOrbName')) { el('homeActivOrbName').textContent = equippedOrb.name; el('homeActivOrbName').style.color = equippedOrb.color; }
    if (el('homeActivePassive')) el('homeActivePassive').textContent = equippedOrb.passive.label;
    if (el('homeActiveActive'))  el('homeActiveActive').textContent  = equippedOrb.active.label;
  } else {
    if (el('homeActivOrbName'))  el('homeActivOrbName').textContent  = 'None';
    if (el('homeActivePassive')) el('homeActivePassive').textContent = '—';
    if (el('homeActiveActive'))  el('homeActiveActive').textContent  = '—';
  }
  const bestNodeMult = window.nodesData.reduce((best, n) => {
    const m = (n.productionMultiplier || new Decimal(1)).toNumber();
    return m > best ? m : best;
  }, 1);
  if (bestNodeMult > 1) {
    if (el('homeNodeMultRow')) el('homeNodeMultRow').style.display = '';
    if (el('homeNodeMult'))    el('homeNodeMult').textContent      = bestNodeMult.toFixed(2) + '×';
  } else {
    if (el('homeNodeMultRow')) el('homeNodeMultRow').style.display = 'none';
  }
  if (clickMult > 1) {
    if (el('homeClickMultRow')) el('homeClickMultRow').style.display = '';
    if (el('homeClickMult'))    el('homeClickMult').textContent      = clickMult.toFixed(2) + '×';
  } else {
    if (el('homeClickMultRow')) el('homeClickMultRow').style.display = 'none';
  }

  // ── Next Goals strip
  const cheapestNode    = window.nodesData.reduce((min, n) => (!min || n.cost.lt(min.cost)) ? n : min, null);
  const nodeAffordable  = cheapestNode && new Decimal(voidenergy).gte(cheapestNode.cost);
  const unownedOrbs     = (window.orbsData || []).filter(o => !o.owned);
  const nextOrb         = unownedOrbs.reduce((min, o) => (!min || o.cost < min.cost) ? o : min, null);
  const orbAffordable   = nextOrb && voidenergy >= nextOrb.cost;

  if (el('goalUpgradeName')) el('goalUpgradeName').textContent = affordableUpg ? affordableUpg.name : (cheapestUpg ? cheapestUpg.name : 'All purchased');
  if (el('goalUpgradeCost')) {
    el('goalUpgradeCost').textContent = affordableUpg ? '✓ Ready to buy' : (cheapestUpg ? formatNumber(cheapestUpg.cost) + ' VE' : '');
    el('goalUpgradeCost').className   = 'home-goal-cost' + (affordableUpg ? ' is-ready' : '');
  }
  if (el('goalNodeName')) el('goalNodeName').textContent = cheapestNode ? cheapestNode.name : '—';
  if (el('goalNodeCost')) {
    el('goalNodeCost').textContent = cheapestNode ? (nodeAffordable ? '✓ Ready to buy' : formatNumber(cheapestNode.cost.ceil()) + ' VE') : '';
    el('goalNodeCost').className   = 'home-goal-cost' + (nodeAffordable ? ' is-ready' : '');
  }
  if (el('goalOrbName')) el('goalOrbName').textContent = nextOrb ? nextOrb.name : 'All owned';
  if (el('goalOrbCost')) {
    el('goalOrbCost').textContent = nextOrb ? (orbAffordable ? '✓ Ready to buy' : formatNumber(nextOrb.cost) + ' VE') : '';
    el('goalOrbCost').className   = 'home-goal-cost' + (orbAffordable ? ' is-ready' : '');
  }
}

// Decimal.prototype.clamp is defined in main.js.

// ── Orb click rate-limiter + visual effects ─────────────────────────────────
const ORB_CLICK_INTERVAL_MS  = 50;  // game logic: 20 clicks/sec max
const ORB_EFFECT_INTERVAL_MS = 120; // visuals:     ~8 bursts/sec max
let   _lastOrbClick  = 0;
let   _lastOrbEffect = 0;

function orbClick(e) {
  const now = performance.now();
  if (now - _lastOrbClick < ORB_CLICK_INTERVAL_MS) return;
  _lastOrbClick = now;
  const result = voidenergyClick(1);
  const reward = typeof result === 'object' ? result.reward : result;
  if (localStorage.getItem('clickEffectsEnabled') !== 'false') {
    if (now - _lastOrbEffect >= ORB_EFFECT_INTERVAL_MS) {
      _lastOrbEffect = now;
      spawnOrbClick(e, reward, typeof result === 'object' ? result : {});
    }
  }
}

function spawnOrbClick(e, reward = 1, hitFlags = {}) {
  const btn = document.getElementById('void-orb-btn');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const cx   = rect.left + rect.width  / 2;
  const cy   = rect.top  + rect.height / 2;

  const equippedOrb = (window.orbsData || []).find(o => o.id === window.equippedOrbId);
  const orbColor    = equippedOrb ? equippedOrb.color : '#ff6aff';

  // 1. Floating "+X VE" text at cursor with random x-drift
  const drift = (Math.random() * 36 - 18);
  const p = document.createElement('div');
  p.className = 'click-particle';
  p.textContent = `+${typeof formatNumber === 'function' ? formatNumber(reward) : reward} VE`;
  p.style.cssText = `left:${e.clientX}px; top:${e.clientY}px; --drift:${drift}px`;
  document.body.appendChild(p);
  p.addEventListener('animationend', () => p.remove(), { once: true });

  // Special hit labels — appear beside the main "+X VE" particle
  let specialOffset = 0;
  if (hitFlags.isCombo) {
    const sp = document.createElement('div');
    sp.className = 'click-particle click-special-particle';
    sp.textContent = `COMBO ×${hitFlags.comboMult || 5}!`;
    sp.style.cssText = `left:${e.clientX + 80}px; top:${e.clientY + specialOffset}px; --drift:${drift}px; color:${orbColor}; text-shadow: 0 0 8px ${orbColor}; font-weight:700; font-size:0.85em;`;
    document.body.appendChild(sp);
    sp.addEventListener('animationend', () => sp.remove(), { once: true });
    specialOffset -= 20;
  }

  if (hitFlags.isCrit) {
    const sp = document.createElement('div');
    sp.className = 'click-particle click-special-particle';
    sp.textContent = `CRIT! ×${hitFlags.critMult || 5}`;
    sp.style.cssText = `left:${e.clientX + 80}px; top:${e.clientY + specialOffset}px; --drift:${drift}px; color:#ffd700; text-shadow: 0 0 8px rgba(255,215,0,0.9); font-weight:700; font-size:0.85em;`;
    document.body.appendChild(sp);
    sp.addEventListener('animationend', () => sp.remove(), { once: true });
    specialOffset -= 20;
  }

  if (hitFlags.isCascade) {
    const sp = document.createElement('div');
    sp.className = 'click-particle click-special-particle';
    sp.textContent = `+${typeof formatNumber === 'function' ? formatNumber(hitFlags.cascadeReward || 0) : (hitFlags.cascadeReward || 0)} CASCADE`;
    sp.style.cssText = `left:${e.clientX + 80}px; top:${e.clientY + specialOffset}px; --drift:${drift}px; color:#7fff00; text-shadow: 0 0 8px rgba(127,255,0,0.9); font-weight:600; font-size:0.78em;`;
    document.body.appendChild(sp);
    sp.addEventListener('animationend', () => sp.remove(), { once: true });
  }

  // 3. Void energy burst — 12 glowing dots from the orb center
  const burstColors = ['#ff6aff','#66fffa','#b366ff','#ffe566','#ff3d6e','#00ffcc','#ffd700','#c0a0ff'];
  const COUNT = 8;
  for (let i = 0; i < COUNT; i++) {
    const angle = (i / COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const dist  = 38 + Math.random() * 52;
    const size  = 2 + Math.floor(Math.random() * 4);
    const dur   = (0.35 + Math.random() * 0.25).toFixed(3);
    const col   = burstColors[i];
    const tx    = Math.cos(angle) * dist;
    const ty    = Math.sin(angle) * dist;
    const dot   = document.createElement('div');
    dot.className = 'orb-burst-dot';
    dot.style.cssText = `left:${cx}px;top:${cy}px;width:${size}px;height:${size}px;background:${col};box-shadow:0 0 ${size + 3}px 1px ${col};--tx:${tx}px;--ty:${ty}px;animation-duration:${dur}s`;
    document.body.appendChild(dot);
    dot.addEventListener('animationend', () => dot.remove(), { once: true });
  }
}
