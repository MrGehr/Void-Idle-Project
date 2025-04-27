// upgrades.js

// Define upgradesData on window only once
window.upgradesData = window.upgradesData || [
    {
      id: 'abyssal-tool-1',
      name: 'Sharper Shard Tools',
      description: 'Abyssal Shard nodes produce x2 more Void Energy.',
      cost: new Decimal(100),
      purchased: false
    },
    {
      id: 'abyssal-tool-2',
      name: 'Masterful Shard Tools',
      description: 'Abyssal Shard nodes produce x4 more Void Energy.',
      cost: new Decimal(1000),
      purchased: false
    }
    // …add more abyssal shard upgrades here…
];

// Upgrades Page Loader
function loadUpgradesPage(content) {
  // Inject CSS if not already present
  if (!document.getElementById('upgrades-css')) {
    const link = document.createElement('link');
    link.id   = 'upgrades-css';
    link.rel  = 'stylesheet';
    link.href = 'css/upgrades.css';
    document.head.appendChild(link);
  }

  // Render the upgrades
  content.innerHTML = `
    <div id="upgrades-tab">
      <h2>Upgrades</h2>
      <div class="upgrades-list">
        ${window.upgradesData.map(upg => {
          // disable if purchased or not enough VE
          const disabled = upg.purchased || new Decimal(voidenergy).lt(upg.cost);
          const label = upg.purchased ? 'Purchased' : formatNumber(upg.cost) + ' VE';
          return `
            <div class="upgrade-card" id="${upg.id}">
              <div class="upgrade-info">
                <h3>${upg.name}</h3>
                <p>${upg.description}</p>
              </div>
              <button class="buy-btn" ${disabled ? 'disabled' : ''}>
                ${label}
              </button>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Function to update button states based on current VE
  function updateUpgradeButtons() {
    const upgradeContainer = document.getElementById('upgrades-tab');
    if (!upgradeContainer) return;
    window.upgradesData.forEach(upg => {
      const btn = document.querySelector(`#${upg.id} .buy-btn`);
      if (!btn) return;
      if (upg.purchased) {
        btn.disabled = true;
        btn.textContent = 'Purchased';
      } else {
        if (new Decimal(voidenergy).gte(upg.cost)) {
          btn.disabled = false;
        } else {
          btn.disabled = true;
        }
        btn.textContent = formatNumber(upg.cost) + ' VE';
      }
    });
  }

  // Initial button update
  updateUpgradeButtons();
  // Poll every 500ms to keep buttons in sync as VE changes
  if (!window.upgradesInterval) {
    window.upgradesInterval = setInterval(updateUpgradeButtons, 500);
  }

  // Attach buy handlers
  content.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cardId = btn.closest('.upgrade-card').id;
      const upg    = window.upgradesData.find(u => u.id === cardId);
      if (!upg.purchased && new Decimal(voidenergy).gte(upg.cost)) {
        // Deduct cost
        voidenergy = new Decimal(voidenergy).minus(upg.cost).toNumber();
        updateDisplay('voidenergy', voidenergy);

        // Apply upgrade effect to Abyssal Shard only
        const node = window.nodesData.find(n => n.id === 'abyssalshard');
        let multiplier = upg.id === 'abyssal-tool-1' ? 2 : 4;
        node.productionMultiplier =
          (node.productionMultiplier || new Decimal(1)).times(multiplier);

        // Debug logs
        console.log(`Abyssal Shard multiplier set to: ${node.productionMultiplier}`);
        console.log(`New per-node production: ${getNodeProduction(node)} VE/tick`);
        console.log(`Total VE per tick now: ${calculateVEPT()} VE/tick`);

        // Mark purchased
        upg.purchased = true;
        updateUpgradeButtons();

        // Refresh stats/UI
        refreshNodeStats();
        if (typeof updateHomeDynamic === 'function') updateHomeDynamic();
      }
    });
  });
}

window.loadUpgradesPage = loadUpgradesPage;
