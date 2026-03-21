// nodes.js
// nodesData is defined in main.js (loaded before this file).

console.log('nodes.js loaded');

function loadNodesPage(content) {
    isNodesPageLoaded = true;

    content.innerHTML = `
      <div class="page-root" id="nodes-tab">
        <div class="page-card">
          <table class="nodes-table">
            <thead>
              <tr>
                <th>Node</th>
                <th>Count</th>
                <th>Cost</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="nodes-table-body"></tbody>
          </table>
        </div>
      </div>
    `;

    const tableBody = content.querySelector("#nodes-table-body");
    window.nodesData.forEach(node => {
      const row = document.createElement("tr");
      row.dataset.nodeId = node.id;
      row.innerHTML = `
        <td>
          <div class="node-entry">
            <img
              src="./Assets/icons/${node.id}.png"
              alt="${node.name}"
              class="node-icon"
            >
            <div class="node-text">
              <span class="node-name">${node.name}</span><br>
              <span class="node-production" id="${node.id}Production">
                +${formatNumber(getNodeProduction(node))} VE / tick
              </span>
            </div>
          </div>
        </td>
        <td><span class="node-count" id="${node.id}">${new Decimal(node.count).floor().toString()}</span></td>
        <td id="${node.id}Cost">${formatNumber(node.cost.ceil())}</td>
        <td><button class="page-btn" id="${node.id}-buy-btn" onclick="buyNode('${node.id}')">Buy</button></td>
      `;
      tableBody.appendChild(row);
    });

    refreshNodeStats();

    // Poll to sync affordability state and owned-row highlights
    if (window.nodesRefreshInterval) clearInterval(window.nodesRefreshInterval);
    window.nodesRefreshInterval = setInterval(() => {
      const tab = document.getElementById('nodes-tab');
      if (!tab) {
        clearInterval(window.nodesRefreshInterval);
        window.nodesRefreshInterval = null;
        return;
      }
      window.nodesData.forEach(node => {
        const row = tableBody.querySelector(`tr[data-node-id="${node.id}"]`);
        const btn = document.getElementById(`${node.id}-buy-btn`);
        if (!row || !btn) return;

        const canAfford = new Decimal(voidenergy).gte(node.cost);
        btn.disabled = !canAfford;
        btn.classList.toggle('can-afford', canAfford);
        row.classList.toggle('has-nodes', node.count > 0);
      });
    }, 200);
}

// getNodeProduction: returns VE/tick for a single owned node.
// Uses a fixed baseProduction per tier so values are predictable and balanced.
function getNodeProduction(node) {
    const base = node.baseProduction || new Decimal(1);
    const mult = node.productionMultiplier || new Decimal(1);
    return base.mul(mult);
}

function buyNode(nodeId) {
    const node = window.nodesData.find(n => n.id === nodeId);
    if (!node || new Decimal(voidenergy).lt(node.cost)) return;

    // Deduct cost
    voidenergy = new Decimal(voidenergy).minus(node.cost).toNumber();
    updateDisplay("voidenergy", voidenergy);

    // Increase count
    node.count++;

    // Increase cost & update UI
    node.cost = node.cost.mul(node.costGrowth || 1.15);
    updateDisplay(node.id, new Decimal(node.count).floor().toString());
    updateDisplay(`${node.id}Cost`, formatNumber(node.cost.ceil()));
    updateDisplay(`${node.id}Production`,
                  `+${formatNumber(getNodeProduction(node))} VE / tick`);

    refreshNodeStats();
    if (typeof updateHomeDynamic === 'function') updateHomeDynamic();
    try { if (typeof tryUnlockAchievements === 'function') tryUnlockAchievements(); } catch (err) { console.error('[Achievement error]', err); }
}

window.loadNodesPage    = loadNodesPage;
window.getNodeProduction = getNodeProduction;
