function loadStatsPage(content) {
    if (!document.getElementById("stats-css")) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "css/stats.css";
        link.id = "stats-css";
        document.head.appendChild(link);
    }

    content.innerHTML = `
        <div id="stats-tab" class="stats-container">
            <h2>📈 Game Statistics</h2>

            <section class="stats-card">
                <h3>🌌 Resource Stats</h3>
                <p>Total Void Energy Gained: <span id="totalVE">0</span></p>
                <p>Current VE per Tick: <span id="currentVEPT">0</span></p>
                <p>Current VE per Second: <span id="currentVEPS">0</span></p>
            </section>

            <section class="stats-card">
                <h3>🚀 Node Stats</h3>
                <table>
                    <thead>
                        <tr><th>Node</th><th>Owned</th><th>Production</th></tr>
                    </thead>
                    <tbody id="nodeStatsTable"></tbody>
                </table>
            </section>

            <section class="stats-card">
                <h3>✨ Prestige Stats</h3>
                <p>Total Prestiges: <span id="totalPrestiges">${prestige}</span></p>
                <p>Last Prestige: <span id="lastPrestigeStat">Never</span></p>
            </section>

            <section class="stats-card">
                <h3>⏱️ Session Stats</h3>
                <p>Total Playtime: <span id="totalPlaytime">0h 0m 0s</span></p>
            </section>
        </div>
    `;

    updateStatsPage();

    if (!window.statsInterval) {
        window.statsInterval = setInterval(() => {
            if (document.getElementById("stats-tab")) {
                updateStatsPage();
            }
        }, 50); // Update every 50 ms
    }
}

function updateStatsPage() {
    // Update Resource Stats
    document.getElementById("totalVE").textContent = formatNumber(lifetimeVE);
    document.getElementById("currentVEPT").textContent = formatNumber(calculateVEPT());
    document.getElementById("currentVEPS").textContent = formatNumber(calculateVEPT() / (tickInterval / 1000));

    // Update Node Stats
    const nodeStatsTable = document.getElementById("nodeStatsTable");
    nodeStatsTable.innerHTML = window.nodesData.map(node => `
        <tr>
            <td>${node.name}</td>
            <td>${formatNumber(node.count)}</td>
            <td>${formatNumber(getNodeProduction(node).mul(node.count))} VE/Tick</td>
        </tr>
    `).join('');

    // Prestige Stats
    const lastPrestige = localStorage.getItem("lastPrestige") || "Never";
    document.getElementById("totalPrestiges").textContent = prestige;
    document.getElementById("lastPrestigeStat").textContent = lastPrestige;

    // Session Playtime
    const totalPlaytime = calculatePlaytime();
    document.getElementById("totalPlaytime").textContent = totalPlaytime;
}

function calculatePlaytime() {
    const sessionStart = parseInt(localStorage.getItem("sessionStart"), 10) || Date.now();
    const elapsedMs = Date.now() - sessionStart;
    const totalSeconds = Math.floor(elapsedMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
}

// Initialize session timer if not already set
if (!localStorage.getItem("sessionStart")) {
    localStorage.setItem("sessionStart", Date.now());
}

window.loadStatsPage = loadStatsPage;
