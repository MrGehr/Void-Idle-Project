// home.js

// Define changelog only once on the window object
if (typeof window.changelogEntries === 'undefined') {
  window.changelogEntries = [
    {
      version: "v0.0.4",
      date:    "2025-04-26",
      notes: [
        "Added background sound, volume control, and toggle mute option",
        "Changed UI to a grid layout for better organization",
        "Added achievements section with list of achievements",
        "Added achievements unlock conditions and claim button",
        "Added upgrade section with list of upgrades",
        "Added upgrade cost and purchase button",
        "Added upgrade effects and descriptions",
      ]
    },
    {
      version: "v0.0.3",
      date:    "2025-04-25",
      notes: [
        "Updated home page to include player name, level, and XP bar",
        "Added resource overview with VE, VEPT, and VEPS",
        "Added top production node display",
        "Added various game stats in stats page",
        "Added progress milestones for next prestige and node unlock",
        "Added stats page with resource, node stats, prestige stats, and total playtime stats.",
        "Add scrollable changelog section",
      ]
    },
    {
      version: "v0.0.2",
      date:    "2025-04-24",
      notes: [
        "Implemented starfield overlay with twinkle & drift animations",
        "Cleaned up interface.css (removed duplicates, slimmed selectors)",
        "Adjusted z-index stacking so all buttons/content remain interactive",
        "Added icons to Nodes page",
        "Added break-infinity.js",
      ]
    },
    {
      version: "v0.0.1",
      date:    "2025-04-23",
      notes: [
        "Added tick progress bar to Nodes page",
        "Fixed VEPT display bug on first load",
        "Created nav menu with Home, Nodes, Stats, etc.",
        "Copyright added to the bottom of the page",
      ]
    }
  ];
}

function loadHomePage(content) {
  document.getElementById('content').classList.add('wide-home');
  const playerName = localStorage.getItem("playerName") || "Player";

  content.innerHTML = `
    <div class="dashboard-container">
      <!-- Player Card -->
      <div class="dashboard-card" id="card-player">
        <h3>🌌 Welcome, ${playerName}!</h3>
        <div class="xp-bar">
          <div id="xpProgress" class="xp-fill" style="width:0%"></div>
        </div>
        <p><strong>Level:</strong> <span id="playerLevel">1</span></p>
        <p id="xpText">0 / 0 VE</p>
      </div>

      <!-- Resources Card -->
      <div class="dashboard-card" id="card-resources">
        <h3>🔮 Resources</h3>
        <ul class="dashboard-list">
          <li>VE: <span id="voidenergy">0</span></li>
          <li>VE per Tick: <span id="VEPT">0</span></li>
          <li>VE per Sec: <span id="VEPS">0</span></li>
        </ul>
      </div>

      <!-- Nodes Card -->
      <div class="dashboard-card" id="card-nodes">
        <h3>🚀 Nodes</h3>
        <ul class="dashboard-list">
          <li>Top Node: <span id="topNode">None Yet</span></li>
          <li>Total Nodes: <span id="totalNodes">0</span></li>
        </ul>
      </div>

      <!-- Milestones Card -->
      <div class="dashboard-card" id="card-milestones">
        <h3>🏆 Milestones</h3>
        <ul class="dashboard-list">
          <li>Next Prestige: <span id="nextPrestige">???</span></li>
          <li>Next Node Unlock: <span id="nextNodeUnlock">???</span></li>
        </ul>
      </div>

      <!-- Achievements Card -->
      <div class="dashboard-card" id="card-achievements">
        <h3>🎖️ Achievements</h3>
        <ul class="dashboard-list">
          <li>Next Unlock: <span id="nextAchievementReq">—</span></li>
          <li>Last Unlocked: <span id="lastAchievement">—</span></li>
          <li>Unlocked: <span id="achievementsUnlocked">0/0</span></li>
        </ul>
      </div>

      <!-- Changelog Card -->
      <div class="dashboard-card wide" id="card-changelog">
        <h3>📜 Change Log</h3>
        <ul class="changelog-list">
          ${window.changelogEntries.map(e => `
            <li>
              <strong>${e.version}</strong> — <em>${e.date}</em>
              <ul>${e.notes.map(n => `<li>${n}</li>`).join('')}</ul>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;

  updateHomeDynamic();
}

function updateHomeDynamic() {
  const lvlEl = document.getElementById("playerLevel");
  if (!lvlEl || typeof lifetimeVE === 'undefined') return;

  // Compute level from lifetimeVE...
  const rawLog = lifetimeVE.gt(0) ? Decimal.log10(lifetimeVE) : 0;
  let level = Math.floor(rawLog * 3);
  level = Math.max(level, 1);

  const currentVE = level > 1 ? Decimal.pow(10, level / 3) : new Decimal(0);
  const nextVE    = Decimal.pow(10, (level + 1) / 3);

  const gained    = lifetimeVE.minus(currentVE).clamp(0, nextVE.minus(currentVE));
  const progress  = gained.dividedBy(nextVE.minus(currentVE)).times(100).clamp(0,100);

  lvlEl.textContent = level;
  document.getElementById("xpProgress").style.width = `${progress.toFixed(2)}%`;
  document.getElementById("xpText").textContent =
    `${formatNumber(gained)} / ${formatNumber(nextVE.minus(currentVE))} XP`;

  // Resources
  document.getElementById("voidenergy").textContent = formatNumber(voidenergy);
  document.getElementById("VEPT").textContent       = formatNumber(calculateVEPT());
  document.getElementById("VEPS").textContent       =
    formatNumber(calculateVEPT() / (tickInterval / 1000));

  // Nodes summary
  const totalNodes = window.nodesData.reduce((sum, n) => sum + n.count, 0);
  document.getElementById("totalNodes").textContent = totalNodes;

  let topNode = "None Yet", topProd = new Decimal(0);
  window.nodesData.forEach(n => {
    const p = getNodeProduction(n).mul(n.count);
    if (p.gt(topProd)) { topProd = p; topNode = n.name; }
  });
  document.getElementById("topNode").textContent = topNode;

  // Achievements panel
  const conds = achievementConditions;
  const nextCond = conds.find(c => {
    const ach = window.achievementsData.find(a => a.id === c.id);
    return ach && !ach.unlocked;
  });
  const nextReq = nextCond ? nextCond.threshold.toLocaleString() : "—";
  document.getElementById("nextAchievementReq").textContent = `${nextReq} VE`;

  const unlocked = window.achievementsData.filter(a => a.unlocked);
  document.getElementById("lastAchievement").textContent = 
    unlocked.length ? unlocked[unlocked.length -1].title : "—";
  document.getElementById("achievementsUnlocked").textContent =
    `${unlocked.length}/${window.achievementsData.length}`;
}

// Extend Decimal for clamp
Decimal.prototype.clamp = function(min, max) {
  if (this.lessThan(min))    return new Decimal(min);
  if (this.greaterThan(max)) return new Decimal(max);
  return this;
};
