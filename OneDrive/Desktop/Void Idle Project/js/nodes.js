// nodes.js with break_infinity.js support

console.log("nodes.js loaded");

// Define global nodesData only once
if (typeof window.nodesData === 'undefined') {
    window.nodesData = [
        { id: "abyssalshard",   name: "Abyssal Shard",   count: 0, cost: new Decimal(10) },
        { id: "whisperengine",  name: "Whisper Engine",  count: 0, cost: new Decimal(50000) },
        { id: "darkmatterloop", name: "Dark Matter Loop",count: 0, cost: new Decimal(250000000) },
        { id: "voidbloom",      name: "Void Bloom",      count: 0, cost: new Decimal("2e27") },
        { id: "gravitonseeder", name: "Graviton Seeder", count: 0, cost: new Decimal("3e75") },
        { id: "nullbeacon",     name: "Null Beacon",     count: 0, cost: new Decimal("6e300") },
        { id: "oblivionspire",  name: "Oblivion Spire",  count: 0, cost: new Decimal("1e999") }
    ];
}

function loadNodesPage(content) {
    isNodesPageLoaded = true;

    content.innerHTML = `
      <div id="nodes-tab">
        <div class="stats-container">
          <p>Void Energy: <span id="voidenergy">0</span></p>
          <p>Void Energy gained per Tick: <span id="VEPT">0</span></p>
          <p>Tick Interval: <span id="tickInterval">0</span>s</p>
          <progress id="tickProgress" max="100" value="0" class="tick-progress"></progress>
        </div>
        <table>
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
    `;

    const tableBody = content.querySelector("#nodes-table-body");
    window.nodesData.forEach(node => {
      const row = document.createElement("tr");
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
                Production: ${formatNumber(getNodeProduction(node))}
              </span>
            </div>
          </div>
        </td>
        <td id="${node.id}">${new Decimal(node.count).floor().toString()}</td>
        <td id="${node.id}Cost">${formatNumber(node.cost.ceil())}</td>
        <td><button onclick="buyNode('${node.id}')">Buy</button></td>
      `;
      tableBody.appendChild(row);
    });

    updateDisplay("voidenergy", voidenergy);
    updateDisplay("tickInterval", (tickInterval / 1000).toFixed(2));
    refreshNodeStats();
}

// getNodeProduction now logs base, multiplier, production, and increase
function getNodeProduction(node) {
    const base = node.cost.pow(0.5).floor();
    const mult = node.productionMultiplier || new Decimal(1);
    const prod = base.mul(mult);
    const increase = prod.minus(base);
    console.log(
//      `DEBUG: ${node.name} — base=${base.toString()}, mult=${mult.toString()}, prod=${prod.toString()}, +inc=${increase.toString()}`  /* uncomment for debug */
    );
    return prod;
}

function buyNode(nodeId) {
    const node = window.nodesData.find(n => n.id === nodeId);
    if (!node || new Decimal(voidenergy).lt(node.cost)) return;

    // Deduct cost
    voidenergy = new Decimal(voidenergy).minus(node.cost).toNumber();
    updateDisplay("voidenergy", voidenergy);

    // Increase count & sync globals
    node.count++;
    switch (nodeId) {
      case 'abyssalshard':   abyssalshard   = node.count; break;
      case 'whisperengine':  whisperengine  = node.count; break;
      case 'darkmatterloop': darkmatterloop = node.count; break;
      case 'voidbloom':      voidbloom      = node.count; break;
      case 'gravitonseeder': gravitonseeder = node.count; break;
      case 'nullbeacon':     nullbeacon     = node.count; break;
      case 'oblivionspire':  oblivionspire  = node.count; break;
    }

    // Increase cost & update UI
    node.cost = node.cost.mul(1.15);
    updateDisplay(node.id, new Decimal(node.count).floor().toString());
    updateDisplay(`${node.id}Cost`, formatNumber(node.cost.ceil()));
    updateDisplay(`${node.id}Production`,
                  `Production: ${formatNumber(getNodeProduction(node))}`);

    refreshNodeStats();
    if (typeof updateHomeDynamic === 'function') updateHomeDynamic();
}

function formatNumber(num) {
    if (!(num instanceof Decimal)) num = new Decimal(num);

    const suffixes = [
      { value: new Decimal("1e33"), symbol: 'D' },
      { value: new Decimal("1e30"), symbol: 'N' },
      { value: new Decimal("1e27"), symbol: 'o' },
      { value: new Decimal("1e24"), symbol: 'Sp' },
      { value: new Decimal("1e21"), symbol: 'Sx' },
      { value: new Decimal("1e18"), symbol: 'Qu' },
      { value: new Decimal("1e15"), symbol: 'Qa' },
      { value: new Decimal("1e12"), symbol: 'T' },
      { value: new Decimal("1e9"),  symbol: 'B' },
      { value: new Decimal("1e6"),  symbol: 'M' },
      { value: new Decimal("1e3"),  symbol: 'K' }
    ];

    for (const { value, symbol } of suffixes) {
      if (num.gte(value) && num.lt(value.mul(1000))) {
        return num.div(value).toFixed(2).replace(/\.0+$/, '') + symbol;
      }
    }
    return num.gte("1e36")
      ? num.toExponential(2)
      : num.toFixed(0);
}

window.loadNodesPage = loadNodesPage;
