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
    const nodeElements = new Map();
    window.nodesData.forEach(node => {
      const row = document.createElement("tr");
      row.dataset.nodeId = node.id;
      row.innerHTML = `
        <td>
          <div class="node-entry">
            <img
              src="./Assets/icons/${node.id}.webp"
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
        <td id="${node.id}Cost">${formatNumber(getNodePurchaseCost(node).ceil())}</td>
        <td><button class="page-btn" id="${node.id}-buy-btn" onclick="buyNode('${node.id}')">Buy</button></td>
      `;
      tableBody.appendChild(row);
      nodeElements.set(node.id, { row, btn: row.querySelector('button') });
    });

    refreshNodeStats();

    setPageUpdater(() => {
      const tab = document.getElementById('nodes-tab');
      if (!tab) return;
      const balance = new Decimal(voidenergy);
      window.nodesData.forEach(node => {
        const { row, btn } = nodeElements.get(node.id);
        if (!row || !btn) return;

        const canAfford = balance.gte(getNodePurchaseCost(node));
        btn.disabled = !canAfford;
        btn.classList.toggle('can-afford', canAfford);
        row.classList.toggle('has-nodes', node.count > 0);
      });
    });
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
    if (!node) return;
    const price = getNodePurchaseCost(node);
    if (new Decimal(voidenergy).lt(price)) return;

    // Deduct cost
    voidenergy = new Decimal(voidenergy).minus(price).toNumber();
    updateDisplay("voidenergy", voidenergy);

    // Increase count
    node.count++;
    invalidateProduction();

    // Increase cost & update UI
    node.cost = node.cost.mul(node.costGrowth || 1.15);
    checkRelicProgress();
    updateDisplay(node.id, new Decimal(node.count).floor().toString());
    updateDisplay(`${node.id}Cost`, formatNumber(getNodePurchaseCost(node).ceil()));
    updateDisplay(`${node.id}Production`,
                  `+${formatNumber(getNodeProduction(node))} VE / tick`);

    refreshNodeStats();
    if (typeof updateHomeDynamic === 'function') updateHomeDynamic();
    try { if (typeof tryUnlockAchievements === 'function') tryUnlockAchievements(); } catch (err) { console.error('[Achievement error]', err); }
}

window.loadNodesPage    = loadNodesPage;
window.getNodeProduction = getNodeProduction;
