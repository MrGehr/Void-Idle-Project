function loadStatsPage(content) {
    if (!document.getElementById("stats-css")) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "css/stats.css";
        link.id = "stats-css";
        document.head.appendChild(link);
    }

    content.innerHTML = `
        <div id="stats-tab" class="page-root">
            <h2 class="page-title">${gi('stats', 22)} Game Statistics</h2>

            <!-- Three compact info cards in a row -->
            <div class="stats-top-row">

                <section class="page-card">
                    <div class="page-card-hdr">${gi('resources')} Resources</div>
                    <ul class="page-kv-list">
                        <li><span>Lifetime VE</span><strong id="totalVE">0</strong></li>
                        <li><span>VE / Tick</span><strong id="currentVEPT">0</strong></li>
                        <li><span>VE / Second</span><strong id="currentVEPS">0</strong></li>
                    </ul>
                </section>

                <section class="page-card">
                    <div class="page-card-hdr">${gi('prestige')} Prestige</div>
                    <ul class="page-kv-list">
                        <li><span>Total Prestiges</span><strong id="totalPrestiges">${prestige}</strong></li>
                        <li><span>Last Prestige</span><strong id="lastPrestigeStat">Never</strong></li>
                    </ul>
                </section>

                <section class="page-card">
                    <div class="page-card-hdr">${gi('session')} Session</div>
                    <ul class="page-kv-list">
                        <li><span>Session Playtime</span><strong id="sessionPlaytime">0h 0m 0s</strong></li>
                        <li><span>Lifetime Playtime</span><strong id="lifetimePlaytime">0h 0m 0s</strong></li>
                    </ul>
                </section>

            </div>

            <!-- Passive + Active bonus cards -->
            <div class="stats-bonus-row" id="statsBonusRow"></div>

            <!-- Full-width node table -->
            <section class="page-card">
                <div class="page-card-hdr">${gi('nodestats')} Node Stats</div>
                <table class="stats-table">
                    <thead>
                        <tr>
                            <th class="col-node">Node</th>
                            <th class="col-owned">Owned</th>
                            <th class="col-prod">Production / Tick</th>
                        </tr>
                    </thead>
                    <tbody id="nodeStatsTable"></tbody>
                </table>
            </section>

        </div>
    `;

    updateStatsPage();
    setPageUpdater(updateStatsPage);

    if (!window.statsInterval) {
        window.statsInterval = setInterval(() => {
            if (document.getElementById('stats-tab')) {
                if (!document.hidden) updateStatsPage();
            } else {
                clearInterval(window.statsInterval);
                window.statsInterval = null;
            }
        }, 1000);
    }
}

function renderBonusCards() {
    const orbs        = window.orbsData || [];
    const equippedOrb = orbs.find(o => o.id === window.equippedOrbId);
    const ownedOrbs   = orbs.filter(o => o.owned && o.passive.veptBonus > 0);
    const totalPassive = orbs.filter(o => o.owned).reduce((sum, o) => sum + o.passive.veptBonus, 0);
    const ownedCount  = orbs.filter(o => o.owned).length;

    // Tick speed bar: progress from base toward 1s minimum
    const tickMs   = getTickInterval();
    const baseMs   = TICK_INTERVAL;
    const minMs    = 1000;
    const tickFill = baseMs === minMs ? 100 : Math.round(((baseMs - tickMs) / (baseMs - minMs)) * 100);

    // --- Passive card ---
    const passiveRows = ownedOrbs.length > 0
        ? ownedOrbs.map(o => `
            <li>
                <span class="stats-orb-name" style="color:${o.color}">${o.name}</span>
                <strong>+${(o.passive.veptBonus * 100).toFixed(0)}%</strong>
            </li>`).join('')
        : `<li><span class="stat-muted">No passive orbs owned yet.</span></li>`;

    const achProd  = window.achievementProdBonus  || 0;
    const achClick = window.achievementClickBonus || 0;
    const claimedCount = (window.achievementsData || []).filter(a => a.unlocked).length;

    const passiveCard = `
        <section class="page-card">
            <div class="page-card-hdr">${gi('orb', 16)} Passive Bonuses</div>
            <ul class="page-kv-list">
                <li><span>Orb VE/Tick Bonus</span><strong>+${(totalPassive * 100).toFixed(0)}%</strong></li>
                <li class="stats-section-divider"><span colspan="2">Achievements (${claimedCount} unlocked)</span></li>
                <li><span>Achievement VE/Tick Bonus</span><strong class="${achProd > 0 ? 'stat-bonus-pos' : 'stat-muted'}">${achProd > 0 ? '+' + (achProd * 100).toFixed(1) + '%' : '—'}</strong></li>
                <li><span>Achievement Click Bonus</span><strong class="${achClick > 0 ? 'stat-bonus-pos' : 'stat-muted'}">${achClick > 0 ? '+' + (achClick * 100).toFixed(1) + '%' : '—'}</strong></li>
            </ul>
        </section>`;

    // --- Active card ---
    let activeRows = '';
    if (equippedOrb) {
        const a = equippedOrb.active;

        activeRows += `<li><span>Click Power</span><strong>${(a.clickPct * 100).toFixed(0)}% of VEPT</strong></li>`;

        if (a.critChance) {
            const capPct = Math.min(a.critChance * 100, 100);
            activeRows += `
                <li class="stats-cap-row">
                    <span>Crit Chance</span>
                    <div class="stats-cap-wrap">
                        <strong>${capPct.toFixed(0)}%</strong>
                        <div class="stats-bar"><div class="stats-bar-fill stats-bar-crit" style="width:${capPct}%"></div></div>
                        <span class="stats-cap-lbl">cap: 100%</span>
                    </div>
                </li>
                <li><span>Crit Multiplier</span><strong>${a.critMult || 5}×</strong></li>`;
        } else {
            activeRows += `<li><span>Crit Chance</span><strong class="stat-muted">—</strong></li>`;
        }

        if (a.combo) {
            activeRows += `<li><span>Combo</span><strong>Every ${a.comboN || 5}th click → ${a.comboMult || 5}×</strong></li>`;
        } else {
            activeRows += `<li><span>Combo</span><strong class="stat-muted">—</strong></li>`;
        }

        if (a.autoClick) {
            activeRows += `<li><span>Auto-Click</span><strong>Every ${(a.autoClickMs / 1000).toFixed(1)}s</strong></li>`;
        } else {
            activeRows += `<li><span>Auto-Click</span><strong class="stat-muted">—</strong></li>`;
        }

        if (a.cascadeCount) {
            activeRows += `<li><span>Cascade</span><strong>${a.cascadeCount} sub-hits @ ${((a.cascadePct || 0.3) * 100).toFixed(0)}% each</strong></li>`;
        } else {
            activeRows += `<li><span>Cascade</span><strong class="stat-muted">—</strong></li>`;
        }
    }

    const activeCard = `
        <section class="page-card">
            <div class="page-card-hdr">${gi('upgrades', 16)} Active Effects</div>
            ${equippedOrb
                ? `<p class="stats-equipped-label">Equipped: <span style="color:${equippedOrb.color}">${equippedOrb.name}</span></p>
                   <ul class="page-kv-list">${activeRows}</ul>`
                : `<p class="stat-muted">No orb equipped.</p>`
            }
        </section>`;

    return passiveCard + activeCard;
}

function updateStatsPage() {
    const totalVEEl      = document.getElementById('totalVE');
    const currentVEPTEl  = document.getElementById('currentVEPT');
    const currentVEPSEl  = document.getElementById('currentVEPS');
    const prestigesEl    = document.getElementById('totalPrestiges');
    const lastPrestigeEl = document.getElementById('lastPrestigeStat');
    const sessionPlaytimeEl  = document.getElementById('sessionPlaytime');
    const lifetimePlaytimeEl = document.getElementById('lifetimePlaytime');
    const nodeTable          = document.getElementById('nodeStatsTable');
    const bonusRow           = document.getElementById('statsBonusRow');
    if (!totalVEEl) return; // page was navigated away

    // Resource Stats
    totalVEEl.textContent     = formatNumber(lifetimeVE);
    currentVEPTEl.textContent = formatNumber(calculateVEPT());
    const veps = calculateVEPT() / (getTickInterval() / 1000);
    currentVEPSEl.textContent = veps < 100 ? veps.toFixed(2) : formatNumber(veps);

    // Bonus cards (passive + active)
    setMarkup(bonusRow, renderBonusCards());

    // Node Stats — surgical update: update cell text in place, only rebuild if row count changed
    const rows = nodeTable.querySelectorAll('tr');
    if (rows.length !== window.nodesData.length) {
        nodeTable.innerHTML = window.nodesData.map(node => `
            <tr>
                <td>${node.name}</td>
                <td class="stat-val">${formatNumber(node.count)}</td>
                <td class="stat-val">${formatNumber(getNodeProduction(node).mul(node.count))} VE/Tick</td>
            </tr>
        `).join('');
    } else {
        window.nodesData.forEach((node, i) => {
            const cells = rows[i].querySelectorAll('.stat-val');
            if (cells[0]) cells[0].textContent = formatNumber(node.count);
            if (cells[1]) cells[1].textContent = formatNumber(getNodeProduction(node).mul(node.count)) + ' VE/Tick';
        });
    }

    // Prestige Stats
    prestigesEl.textContent    = prestige;
    lastPrestigeEl.textContent = localStorage.getItem('lastPrestige') || 'Never';

    // Playtime
    const sessionMs  = Date.now() - (window.sessionStartTime || Date.now());
    const lifetimeMs = (window.lifetimePlaytimeBase || 0) + sessionMs;
    if (sessionPlaytimeEl)  sessionPlaytimeEl.textContent  = formatPlaytime(sessionMs);
    if (lifetimePlaytimeEl) lifetimePlaytimeEl.textContent = formatPlaytime(lifetimeMs);
}

function formatPlaytime(ms) {
    const totalSeconds = Math.floor(Math.max(0, ms) / 1000);
    const hours   = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
}

window.loadStatsPage = loadStatsPage;
