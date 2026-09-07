// shop.js — Shop page with sub-section navigation

// ── Sub-page routing ───────────────────────────────────────────────────
window.shopActivePage = window.shopActivePage || 'orbs';

const SHOP_SECTIONS = [
  {
    id:   'orbs',
    label: 'Orbs',
    icon:  'orb',
    desc:  'Equippable power cores that transform how you generate and click Void Energy.',
  },
  {
    id:   'relics',
    label: 'Relics',
    icon:  'relic',
    desc:  'Ancient relics that bestow permanent passive abilities across all resets.',
  },
  {
    id:   'cosmetics',
    label: 'Cosmetics',
    icon:  'cosmetic',
    desc:  'Visual themes and effects that customise the look of your void.',
  },
  {
    id:   'artifacts',
    label: 'Artifacts',
    icon:  'artifact',
    desc:  'Powerful one-use items that can reshape your run in dramatic ways.',
  },
];

function loadShopPage(content) {
  if (!document.getElementById('shop-css')) {
    const link = document.createElement('link');
    link.rel   = 'stylesheet';
    link.href  = 'css/shop.css';
    link.id    = 'shop-css';
    document.head.appendChild(link);
  }
  renderShopPage(content);

  setPageUpdater(() => {
    const tab = document.getElementById('shop-tab');
    if (!tab) return;
    const equippedOrb = (window.orbsData || []).find(o => o.id === window.equippedOrbId);
    tab.querySelectorAll('.orb-combo-hint').forEach(el => {
      if (!equippedOrb) return;
      const n = equippedOrb.active.comboN || 5;
      el.textContent = `Combo: ${window.orbComboCount % n} / ${n} — next hit ${equippedOrb.active.comboMult || 5}×`;
    });
    tab.querySelectorAll('.orb-buy-btn').forEach(btn => {
      const orb = (window.orbsData || []).find(o => o.id === btn.dataset.id);
      if (!orb) return;
      const canAfford = voidenergy >= orb.cost;
      btn.disabled    = !canAfford;
      btn.classList.toggle('disabled', !canAfford);
      btn.textContent = canAfford ? `Buy — ${formatNumber(orb.cost)} VE` : `Need ${formatNumber(orb.cost)} VE`;

      // Sync card's is-available state live
      const card = btn.closest('.orb-card');
      if (card && !orb.owned) {
        card.classList.toggle('is-available', canAfford);
        card.classList.toggle('is-locked', !canAfford);
      }
    });
  });
}

function renderShopPage(content) {
  const active   = window.shopActivePage;
  const tabsHTML = SHOP_SECTIONS.map(s => `
    <button class="shop-tab ${s.id === active ? 'is-active' : ''}"
            data-section="${s.id}">
      ${window.gi ? window.gi(s.icon, 15) : ''}
      <span>${s.label}</span>
    </button>
  `).join('');

  const bodyHTML = active === 'orbs'
    ? renderOrbsSubPage()
    : renderPlaceholderSubPage(SHOP_SECTIONS.find(s => s.id === active));

  content.innerHTML = `
    <div class="page-root" id="shop-tab">
      <h2 class="page-title">${gi('shop', 22)} Shop</h2>
      <nav class="shop-tabs">${tabsHTML}</nav>
      <div class="shop-body" id="shop-body">
        ${bodyHTML}
      </div>
    </div>
  `;

  // Tab navigation
  content.querySelectorAll('.shop-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      window.shopActivePage = btn.dataset.section;
      renderShopPage(content);
    });
  });

  // Wire up buy and equip buttons (only relevant in orbs sub-page)
  content.querySelectorAll('.orb-buy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id  = btn.dataset.id;
      const orb = (window.orbsData || []).find(o => o.id === id);
      if (!orb || orb.owned) return;
      if (voidenergy < orb.cost) return;

      voidenergy -= orb.cost;
      orb.owned = true;
      invalidateProduction();
      applyEquippedOrb(orb.id);
      updateDisplay('voidenergy', voidenergy);
      try { if (typeof tryUnlockAchievements === 'function') tryUnlockAchievements(); } catch (err) { console.error('[Achievement error]', err); }
      saveGame();
      renderShopPage(content);
    });
  });

  content.querySelectorAll('.orb-equip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      applyEquippedOrb(id);
      saveGame();
      renderShopPage(content);
    });
  });
}

function renderOrbsSubPage() {
  const orbs        = window.orbsData || [];
  const ownedCount  = orbs.filter(o => o.owned).length;
  const equippedOrb = orbs.find(o => o.id === window.equippedOrbId);

  return `
    <div class="shop-context-bar">
      <span class="shop-ctx-item">Equipped:
        <strong style="color:${equippedOrb ? equippedOrb.color : 'var(--primary)'}">
          ${equippedOrb ? equippedOrb.name : 'None'}
        </strong>
      </span>
      <span class="shop-ctx-item">Owned: <strong>${ownedCount} / ${orbs.length}</strong></span>
      <span class="shop-ctx-tip">All owned orbs contribute their passive bonus every tick</span>
    </div>
    <div class="orb-grid">
      ${orbs.map(orb => renderOrbCard(orb)).join('')}
    </div>
  `;
}

function renderPlaceholderSubPage(sec) {
  return `
    <div class="shop-placeholder">
      <div class="shop-placeholder-icon">${window.gi ? window.gi(sec.icon, 52) : ''}</div>
      <h3 class="shop-placeholder-title">${sec.label}</h3>
      <p class="shop-placeholder-desc">${sec.desc}</p>
      <div class="shop-placeholder-badge">Coming Soon</div>
    </div>
  `;
}

function renderOrbCard(orb) {
  const isEquipped  = window.equippedOrbId === orb.id;
  const canAfford   = voidenergy >= orb.cost;
  const isAvailable = !orb.owned && canAfford;

  // Combo tracker (dynamic threshold)
  const comboN    = orb.active.comboN || 5;
  const comboHint = (orb.active.combo && isEquipped)
    ? `<div class="orb-combo-hint">Combo: ${window.orbComboCount % comboN} / ${comboN} — next hit ${orb.active.comboMult || 5}×</div>`
    : '';

  // Auto-click status
  const autoHint = (orb.active.autoClick && isEquipped)
    ? `<div class="orb-auto-hint">Auto-clicking every ${(orb.active.autoClickMs / 1000).toFixed(1)}s</div>`
    : '';

  // Crit chance indicator
  const critHint = (orb.active.critChance && isEquipped)
    ? `<div class="orb-crit-hint">Crit: ${(orb.active.critChance * 100).toFixed(0)}% chance for ${orb.active.critMult || 5}×</div>`
    : '';

  // Cascade indicator
  const cascadeHint = (orb.active.cascadeCount && isEquipped)
    ? `<div class="orb-cascade-hint">Cascade: +${orb.active.cascadeCount} sub-hits at ${((orb.active.cascadePct || 0.3) * 100).toFixed(0)}% each</div>`
    : '';

  let actionBtn = '';
  if (!orb.owned) {
    actionBtn = `
      <button class="orb-buy-btn ${canAfford ? '' : 'disabled'}"
              data-id="${orb.id}"
              ${canAfford ? '' : 'disabled'}>
        ${canAfford ? `Buy — ${formatNumber(orb.cost)} VE` : `Need ${formatNumber(orb.cost)} VE`}
      </button>`;
  } else if (!isEquipped) {
    actionBtn = `<button class="orb-equip-btn" data-id="${orb.id}">Equip</button>`;
  } else {
    actionBtn = `<div class="orb-equipped-badge">Equipped</div>`;
  }

  const stateClass = isEquipped  ? 'is-equipped'
    : orb.owned    ? 'is-owned'
    : isAvailable  ? 'is-available'
    : 'is-locked';

  const ownedBadge = (orb.owned && !isEquipped)
    ? '<div class="orb-owned-badge">Owned</div>'
    : '';

  return `
    <div class="orb-card ${stateClass}"
         style="--orb-color:${orb.color}; --orb-glow:${orb.glow}">
      ${ownedBadge}

      <!-- Visual orb sphere -->
      <div class="orb-preview" style="background:${orb.bg}; border-color:${orb.color};
           box-shadow: 0 0 14px ${orb.color}, 0 0 32px ${orb.glow}, inset 0 0 16px ${orb.glow};">
        <span class="orb-shine"></span>
        <span class="orb-orbit"></span>
        <span class="orb-orbit orb-orbit-2"></span>
        <span class="orb-preview-ring" style="border-color:${orb.color}"></span>
        <span class="orb-spark" style="--i:0"></span>
        <span class="orb-spark" style="--i:1"></span>
        <span class="orb-spark" style="--i:2"></span>
        <span class="orb-spark" style="--i:3"></span>
        <span class="orb-spark" style="--i:4"></span>
        <span class="orb-spark" style="--i:5"></span>
      </div>

      <div class="orb-card-body">
        <div class="orb-card-title" style="color:${orb.color}">${orb.name}</div>
        <p class="orb-flavor">${orb.flavor}</p>

        <ul class="orb-effects">
          <li>
            <span class="orb-effect-lbl passive">Passive</span>
            <span>${orb.passive.label}</span>
          </li>
          <li>
            <span class="orb-effect-lbl active">Active</span>
            <span>${orb.active.label}</span>
          </li>
        </ul>

        ${comboHint}${autoHint}${critHint}${cascadeHint}

        <div class="orb-card-footer">
          ${actionBtn}
        </div>
      </div>
    </div>
  `;
}

window.loadShopPage = loadShopPage;
