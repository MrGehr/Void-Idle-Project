// Prestige Page
function loadPrestigePage(content) {
    content.innerHTML = `
        <div id="prestige-tab" class="page-root">
            <h2 class="page-title">${gi('prestige', 22)} Prestige</h2>
            <div class="page-cards">

                <div class="page-card">
                    <div class="page-card-hdr">${gi('currentrun')} Current Run</div>
                    <ul class="page-kv-list">
                        <li><span>Lifetime VE</span><strong id="prestige-lifetime-ve">0</strong></li>
                        <li><span>Prestige Count</span><strong id="prestige-count">${prestige}</strong></li>
                    </ul>
                </div>

                <div class="page-card">
                    <div class="page-card-hdr">${gi('prestigebonus')} Prestige Bonus</div>
                    <ul class="page-kv-list">
                        <li><span>VE Multiplier</span><strong>+${prestige * 10}%</strong></li>
                        <li><span>Next Bonus</span><strong>+${(prestige + 1) * 10}%</strong></li>
                    </ul>
                </div>

            </div>
            <div class="page-card">
                <div class="shop-placeholder">
                    <div class="shop-placeholder-icon">${gi('prestige', 52)}</div>
                    <h3 class="shop-placeholder-title">Prestige Rewards</h3>
                    <p class="shop-placeholder-desc">Full prestige rewards, milestones, and meta-upgrades are in development. Check back in a future update!</p>
                    <div class="shop-placeholder-badge">Coming Soon</div>
                </div>
            </div>
        </div>
    `;

    const lifeEl = document.getElementById('prestige-lifetime-ve');
    if (lifeEl && typeof formatNumber !== 'undefined' && typeof lifetimeVE !== 'undefined') {
        lifeEl.textContent = formatNumber(lifetimeVE);
    }
}
window.loadPrestigePage = loadPrestigePage;