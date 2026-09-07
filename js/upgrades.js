// upgrades.js

// === Node Production Upgrades (generated from compact tables) ===
// Each entry: [idPrefix, targetNode, displayName, names[], costs[]]
// All tiers double production (×2 multiplier). Description is auto-generated.
const NODE_UPGRADE_DEFS = [
  ['abyssal-tool', 'abyssalshard', 'Abyssal Shard', [
    'Sharper Shard Tools', 'Masterful Shard Tools', 'Void-Forged Shard Tools', 'Shard Singularity',
    'Void Crystallization', 'Abyssal Resonance', 'Deep Void Shatter', 'Fractal Shard Matrix',
    'Infinite Edge', 'Shard Transcendence',
  ], [175, 2200, 18500, 165000, 1.4e6, 1.85e7, 7.2e9, 8.5e11, 6.3e13, 4.8e15]],

  ['whisper-boost', 'whisperengine', 'Whisper Engine', [
    'Whisper Amplifier', 'Resonance Core', 'Harmonic Cascade', 'Echo Chamber',
    'Void Whisper Array', 'Spectral Amplification', 'Dissonance Engine', 'Phantom Resonance',
    'Silent Storm', 'Whisper Singularity',
  ], [2800, 24000, 215000, 2.2e6, 2.75e7, 3.2e8, 9.5e10, 1.15e13, 8.8e14, 6.5e16]],

  ['darkmatter-boost', 'darkmatterloop', 'Dark Matter Loop', [
    'Loop Stabilizer', 'Loop Overclock', 'Dark Feedback Loop', 'Matter Compression',
    'Void Loop Matrix', 'Dark Cascade', 'Gravitational Feedback', 'Event Loop Collapse',
    'Dark Matter Surge', 'Infinite Loop',
  ], [35000, 380000, 3.5e6, 3.8e7, 4.2e8, 4.75e9, 1.6e12, 2.1e14, 1.75e16, 1.3e18]],

  ['voidbloom-boost', 'voidbloom', 'Void Bloom', [
    'Bloom Catalyst', 'Bloom Surge', 'Bloom Nova', 'Spore Diffusion',
    'Bloom Proliferation', 'Void Garden', 'Fractal Petals', 'Infinite Bloom',
    'Bloom Transcendence', 'Void Blossom',
  ], [485000, 5.5e6, 5.8e7, 6.5e8, 7.2e9, 6.8e10, 2.4e13, 2.8e15, 2.15e17, 1.7e19]],

  ['graviton-boost', 'gravitonseeder', 'Graviton Seeder', [
    'Gravity Lens', 'Singularity Drive', 'Event Horizon Tap', 'Graviton Cascade',
    'Seeder Overload', 'Dark Gravity Well', 'Spacetime Rift', 'Graviton Storm',
    'Cosmic Collapse', 'Gravity Transcendence',
  ], [8.5e6, 9.2e7, 8.75e8, 1.15e10, 1.35e11, 1.2e12, 3.8e14, 4.5e16, 3.6e18, 2.8e20]],

  ['nullbeacon-boost', 'nullbeacon', 'Null Beacon', [
    'Signal Enhancer', 'Void Frequency', 'Null Resonator', 'Void Transmitter',
    'Beacon Amplification', 'Null Wave Pulse', 'Signal Collapse', 'Beacon Singularity',
    'Null Cascade', 'Eternal Signal',
  ], [1.8e8, 2.15e9, 1.95e10, 2.4e11, 2.7e12, 2.35e13, 7.5e15, 8.8e17, 7.2e19, 5.5e21]],

  ['oblivion-boost', 'oblivionspire', 'Oblivion Spire', [
    'Spire Ascendant', 'Oblivion Unleashed', 'Final Collapse', 'Spire Overload',
    'Oblivion Surge', 'Void Dominion', 'Spire Transcendence', 'Oblivion Matrix',
    'Spire Singularity', 'Ultimate Collapse',
  ], [4.2e9, 4.8e10, 3.75e11, 4.5e12, 5.2e13, 4.65e14, 1.5e17, 1.8e19, 1.4e21, 1.1e23]],
];

function generateNodeUpgrades() {
  const upgrades = [];
  for (const [prefix, target, display, names, costs] of NODE_UPGRADE_DEFS) {
    for (let i = 0; i < names.length; i++) {
      const tier = i + 1;
      const totalMult = Math.pow(2, tier);
      const desc = tier === 1
        ? `Doubles ${display} production. (\u00d7${totalMult} total)`
        : `Doubles ${display} production again. (\u00d7${totalMult} total)`;
      upgrades.push({
        id: `${prefix}-${tier}`,
        name: names[i],
        description: desc,
        cost: new Decimal(costs[i]),
        targetNode: target,
        multiplier: 2,
        purchased: false,
      });
    }
  }
  return upgrades;
}

// === Tick Speed Upgrades ===
const TICK_UPGRADES = [
  { id: 'tick-speed-1',  name: 'Quick Pulse',        desc: 'Reduce tick interval by 0.5s (8s \u2192 7.5s).',                    cost: 8500,     ms: 500  },
  { id: 'tick-speed-2',  name: 'Rapid Cycle',        desc: 'Reduce tick interval by another 0.5s (7.5s \u2192 7s).',            cost: 72000,    ms: 500  },
  { id: 'tick-speed-3',  name: 'Accelerated Flow',   desc: 'Reduce tick interval by 1s (7s \u2192 6s).',                        cost: 685000,   ms: 1000 },
  { id: 'tick-speed-4',  name: 'Temporal Shift',     desc: 'Reduce tick interval by 1s (6s \u2192 5s).',                        cost: 7.8e6,    ms: 1000 },
  { id: 'tick-speed-5',  name: 'Void Haste',         desc: 'Reduce tick interval by 1s (5s \u2192 4s).',                        cost: 8.5e7,    ms: 1000 },
  { id: 'tick-speed-6',  name: 'Singularity Pulse',  desc: 'Reduce tick interval by 1s (4s \u2192 3s).',                        cost: 7.25e8,   ms: 1000 },
  { id: 'tick-speed-7',  name: 'Time Fracture',      desc: 'Reduce tick interval by 1s (3s \u2192 2s).',                        cost: 8.8e9,    ms: 1000 },
  { id: 'tick-speed-8',  name: 'Quantum Flicker',    desc: 'Reduce tick interval by 0.5s (2s \u2192 1.5s).',                    cost: 3.75e13,  ms: 500  },
  { id: 'tick-speed-9',  name: 'Void Acceleration',  desc: 'Reduce tick interval by 0.3s (1.5s \u2192 1.2s).',                  cost: 4.2e15,   ms: 300  },
  { id: 'tick-speed-10', name: 'Temporal Mastery',   desc: 'Reduce tick interval by 0.2s (1.2s \u2192 1s). Maximum speed reached.', cost: 3.5e17, ms: 200  },
].map(t => ({ id: t.id, name: t.name, description: t.desc, cost: new Decimal(t.cost), targetNode: 'tick', tickReduction: t.ms, purchased: false }));

// === Click Power Upgrades ===
const CLICK_UPGRADES = [
  { id: 'click-power-1',  name: 'Sharpened Focus',    desc: 'Increase click power by 1.5\u00d7. (1.5\u00d7 total)',       cost: 14500,   mult: 1.5 },
  { id: 'click-power-2',  name: 'Void Attunement',    desc: 'Increase click power by 1.5\u00d7. (2.25\u00d7 total)',      cost: 135000,  mult: 1.5 },
  { id: 'click-power-3',  name: 'Energy Channeling',  desc: 'Double click power. (4.5\u00d7 total)',                      cost: 1.65e6,  mult: 2   },
  { id: 'click-power-4',  name: 'Deep Strike',        desc: 'Double click power. (9\u00d7 total)',                        cost: 1.85e7,  mult: 2   },
  { id: 'click-power-5',  name: 'Resonant Touch',     desc: 'Double click power. (18\u00d7 total)',                       cost: 1.55e8,  mult: 2   },
  { id: 'click-power-6',  name: 'Void Fist',          desc: 'Double click power. (36\u00d7 total)',                       cost: 1.75e9,  mult: 2   },
  { id: 'click-power-7',  name: 'Shattering Impact',  desc: 'Double click power. (72\u00d7 total)',                       cost: 6.5e12,  mult: 2   },
  { id: 'click-power-8',  name: 'Annihilation Tap',   desc: 'Triple click power. (216\u00d7 total)',                      cost: 7.8e14,  mult: 3   },
  { id: 'click-power-9',  name: 'Void Judgment',      desc: 'Triple click power. (648\u00d7 total)',                      cost: 6.2e16,  mult: 3   },
  { id: 'click-power-10', name: 'Finger of Oblivion', desc: 'Multiply click power by 5\u00d7. (3,240\u00d7 total)',       cost: 7.5e18,  mult: 5   },
].map(c => ({ id: c.id, name: c.name, description: c.desc, cost: new Decimal(c.cost), targetNode: 'click', clickMultiplier: c.mult, purchased: false }));

// === Combine all upgrades ===
window.upgradesData = window.upgradesData || [
  ...generateNodeUpgrades(),
  ...TICK_UPGRADES,
  ...CLICK_UPGRADES,
];

// Upgrades Page Loader
function loadUpgradesPage(content) {
  if (!document.getElementById('upgrades-css')) {
    const link = document.createElement('link');
    link.id   = 'upgrades-css';
    link.rel  = 'stylesheet';
    link.href = 'css/upgrades.css';
    document.head.appendChild(link);
  }

  // Track which node is selected (default to first node)
  let selectedNodeId = window.nodesData[0].id;

  content.innerHTML = `
    <div id="upgrades-tab">
      <h2 class="page-title" style="margin-bottom:8px;">${gi('upgrades', 22)} Upgrades</h2>
      <div class="upgrades-layout">
        <!-- Left: node column -->
        <div class="upgrades-node-list" id="upgrades-node-list"></div>
        <!-- Right: upgrades panel -->
        <div class="upgrades-panel" id="upgrades-panel"></div>
      </div>
    </div>
  `;

  // Render the node list (includes synthetic 'Tick Speed' entry at the top)
  function renderNodeList() {
    const list = document.getElementById('upgrades-node-list');
    if (!list) return;

    // Synthetic entries + real nodes
    const tabs = [
      { id: 'tick',  name: 'Tick Speed',  icon: null, syntheticIcon: 'tickspeed' },
      { id: 'click', name: 'Click Power', icon: null, syntheticIcon: 'click'     },
      ...window.nodesData.map(n => ({ id: n.id, name: n.name, icon: `./Assets/icons/${n.id}.webp` })),
    ];

    list.innerHTML = tabs.map(tab => {
      const nodeUpgrades = window.upgradesData.filter(u => u.targetNode === tab.id);
      const available    = nodeUpgrades.filter(u => !u.purchased && new Decimal(voidenergy).gte(u.cost)).length;
      const totalOwned   = nodeUpgrades.filter(u => u.purchased).length;
      const isActive     = tab.id === selectedNodeId;
      const iconHtml     = tab.icon
        ? `<img src="${tab.icon}" alt="${tab.name}" class="node-tab-icon">`
        : `<span class="node-tab-icon node-tab-emoji">${gi(tab.syntheticIcon, 20)}</span>`;
      return `
        <div class="node-tab ${isActive ? 'active' : ''}" data-node="${tab.id}">
          ${iconHtml}
          <div class="node-tab-info">
            <span class="node-tab-name">${tab.name}</span>
            <span class="node-tab-meta">${totalOwned}/${nodeUpgrades.length} upgrades</span>
          </div>
          ${available > 0 ? `<span class="node-tab-badge">${available}</span>` : ''}
        </div>
      `;
    }).join('');

    list.querySelectorAll('.node-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        selectedNodeId = tab.dataset.node;
        renderNodeList();
        renderUpgrades();
        updateUpgradeButtons();
      });
    });
  }

  // Render upgrades for the selected node
  function renderUpgrades() {
    const panel = document.getElementById('upgrades-panel');
    if (!panel) return;

    const upgrades   = window.upgradesData.filter(u => u.targetNode === selectedNodeId);
    const panelTitle = selectedNodeId === 'tick'  ? 'Tick Speed'
      : selectedNodeId === 'click' ? 'Click Power'
      : (window.nodesData.find(n => n.id === selectedNodeId) || {}).name || selectedNodeId;

    if (!upgrades.length) {
      panel.innerHTML = `<p class="upgrades-empty">No upgrades available for ${panelTitle} yet.</p>`;
      return;
    }

    const subheader = selectedNodeId === 'tick'
      ? `<p class="upgrades-tick-info">Current interval: <strong>${(getTickInterval() / 1000).toFixed(1)}s</strong> &mdash; base ${(TICK_INTERVAL / 1000).toFixed(1)}s &mdash; minimum 1s</p>`
      : selectedNodeId === 'click'
      ? `<p class="upgrades-tick-info">Current click multiplier: <strong>${(window.clickUpgradeMultiplier || 1).toFixed(2)}×</strong></p>`
      : '';

    const totalOwned   = upgrades.filter(u => u.purchased).length;
    const canAffordAny = upgrades.filter(u => !u.purchased && new Decimal(voidenergy).gte(u.cost)).length;

    // Category info row (node multiplier / tick / click summary)
    let categoryInfo = '';
    if (selectedNodeId === 'tick' || selectedNodeId === 'click') {
      categoryInfo = ''; // subheader already covers these
    } else {
      const targetNode = window.nodesData.find(n => n.id === selectedNodeId);
      const mult = targetNode ? (targetNode.productionMultiplier || new Decimal(1)).toNumber() : 1;
      categoryInfo = `
        <div class="upgrades-category-info">
          <span>Owned: <strong>${totalOwned} / ${upgrades.length}</strong></span>
          <span>Production: <strong>×${mult.toFixed(2)}</strong></span>
          ${canAffordAny > 0 ? `<span>Affordable: <strong>${canAffordAny}</strong></span>` : ''}
        </div>`;
    }

    panel.innerHTML = `
      <h3 class="upgrades-panel-title">${panelTitle} Upgrades</h3>
      ${subheader}
      ${categoryInfo}
      <div class="upgrades-list">
        ${upgrades.map(upg => {
          const canAffordNow = !upg.purchased && new Decimal(voidenergy).gte(upg.cost);
          const disabled = upg.purchased || !canAffordNow;
          const label    = upg.purchased ? 'Purchased' : formatNumber(upg.cost) + ' VE';
          const tag      = upg.tickReduction
            ? `<span class="upgrade-tag">−${upg.tickReduction / 1000}s per tick</span>`
            : upg.clickMultiplier
            ? `<span class="upgrade-tag">×${upg.clickMultiplier} click power</span>`
            : '';
          const stateClass = upg.purchased ? 'is-purchased' : canAffordNow ? 'can-afford' : '';
          return `
            <div class="upgrade-card ${stateClass}" id="${upg.id}">
              ${upg.purchased ? '<div class="upgrade-purchased-badge">✓ Owned</div>' : ''}
              <div class="upgrade-info">
                <h3>${upg.name}</h3>
                <p>${upg.description}</p>
                ${tag}
              </div>
              <button class="buy-btn" ${disabled ? 'disabled' : ''}>${label}</button>
            </div>
          `;
        }).join('')}
      </div>
    `;

    panel.querySelectorAll('.buy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cardId = btn.closest('.upgrade-card').id;
        const upg    = window.upgradesData.find(u => u.id === cardId);
        if (!upg || upg.purchased || new Decimal(voidenergy).lt(upg.cost)) return;

        voidenergy = new Decimal(voidenergy).minus(upg.cost).toNumber();
        updateDisplay('voidenergy', voidenergy);

        // Apply node production multiplier (for node upgrades)
        const targetNode = window.nodesData.find(n => n.id === upg.targetNode);
        if (targetNode && upg.multiplier) {
          targetNode.productionMultiplier =
            (targetNode.productionMultiplier || new Decimal(1)).times(upg.multiplier);
        }

        // Apply tick speed reduction (for tick upgrades)
        if (upg.tickReduction) {
          window.tickSpeedReduction = (window.tickSpeedReduction || 0) + upg.tickReduction;
        }

        // Apply click multiplier (for click upgrades)
        if (upg.clickMultiplier) {
          window.clickUpgradeMultiplier = (window.clickUpgradeMultiplier || 1) * upg.clickMultiplier;
        }

        upg.purchased = true;
        invalidateProduction();
        checkRelicProgress();
        refreshNodeStats();
        if (typeof updateHomeDynamic === 'function') updateHomeDynamic();
        try { if (typeof tryUnlockAchievements === 'function') tryUnlockAchievements(); } catch (err) { console.error('[Achievement error]', err); }
        updateUpgradeButtons();
      });
    });
  }

  // Refresh buy buttons and badges only when game state changes.
  // Only mutates existing DOM elements — never rebuilds innerHTML — so hover states are preserved.
  function updateUpgradeButtons() {
    const balance = new Decimal(voidenergy);
    if (!document.getElementById('upgrades-tab')) {
      clearInterval(window.upgradesInterval);
      window.upgradesInterval = null;
      return;
    }

    // Update badge and meta for synthetic tabs (tick + click)
    ['tick', 'click'].forEach(syntheticId => {
      const syntheticTab = document.querySelector(`.node-tab[data-node="${syntheticId}"]`);
      if (!syntheticTab) return;
      const syntheticUpgrades = window.upgradesData.filter(u => u.targetNode === syntheticId);
      const available  = syntheticUpgrades.filter(u => !u.purchased && balance.gte(u.cost)).length;
      const totalOwned = syntheticUpgrades.filter(u => u.purchased).length;
      const meta = syntheticTab.querySelector('.node-tab-meta');
      if (meta) meta.textContent = `${totalOwned}/${syntheticUpgrades.length} upgrades`;
      let badge = syntheticTab.querySelector('.node-tab-badge');
      if (available > 0) {
        if (!badge) { badge = document.createElement('span'); badge.className = 'node-tab-badge'; syntheticTab.appendChild(badge); }
        badge.textContent = available;
      } else if (badge) { badge.remove(); }
    });

    // Update badges on node tabs
    window.nodesData.forEach(node => {
      const tab = document.querySelector(`.node-tab[data-node="${node.id}"]`);
      if (!tab) return;
      const nodeUpgrades = window.upgradesData.filter(u => u.targetNode === node.id);
      const available    = nodeUpgrades.filter(u => !u.purchased && balance.gte(u.cost)).length;
      const totalOwned   = nodeUpgrades.filter(u => u.purchased).length;

      // Update meta text
      const meta = tab.querySelector('.node-tab-meta');
      if (meta) meta.textContent = `${totalOwned}/${nodeUpgrades.length} upgrades`;

      // Add/remove/update badge without touching the tab itself
      let badge = tab.querySelector('.node-tab-badge');
      if (available > 0) {
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'node-tab-badge';
          tab.appendChild(badge);
        }
        badge.textContent = available;
      } else if (badge) {
        badge.remove();
      }
    });

    // Update buy buttons and card affordability state
    window.upgradesData.filter(u => u.targetNode === selectedNodeId).forEach(upg => {
      const card = document.getElementById(upg.id);
      const btn  = card ? card.querySelector('.buy-btn') : null;
      if (!btn) return;
      if (upg.purchased) {
        btn.disabled    = true;
        btn.textContent = 'Purchased';
        if (card) card.classList.remove('can-afford');
      } else {
        const canAfford = balance.gte(upg.cost);
        btn.disabled    = !canAfford;
        btn.textContent = formatNumber(upg.cost) + ' VE';
        if (card) card.classList.toggle('can-afford', canAfford);
      }
    });

    // Live-refresh subheader info for tick and click tabs
    const tickInfo = document.querySelector('.upgrades-tick-info');
    if (tickInfo) {
      if (selectedNodeId === 'tick') {
        setMarkup(tickInfo, `Current interval: <strong>${(getTickInterval() / 1000).toFixed(1)}s</strong> &mdash; base ${(TICK_INTERVAL / 1000).toFixed(1)}s &mdash; minimum 1s`);
      } else if (selectedNodeId === 'click') {
        setMarkup(tickInfo, `Current click multiplier: <strong>${(window.clickUpgradeMultiplier || 1).toFixed(2)}×</strong>`);
      }
    }
  }

  renderNodeList();
  renderUpgrades();

  setPageUpdater(updateUpgradeButtons);
}

window.loadUpgradesPage = loadUpgradesPage;
