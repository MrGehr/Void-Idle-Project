// Leaderboard Page
function loadLeaderboardPage(content) {
    if (!document.getElementById('leaderboard-css')) {
        const link = document.createElement('link');
        link.rel  = 'stylesheet';
        link.href = 'css/leaderboard.css';
        link.id   = 'leaderboard-css';
        document.head.appendChild(link);
    }
    content.innerHTML = `
        <div id="leaderboard-tab" class="page-root">
            <h2 class="page-title">${gi('leaderboard', 22)} Leaderboard</h2>
            <div class="page-card">
                <div class="shop-placeholder">
                    <div class="shop-placeholder-icon">${gi('leaderboard', 52)}</div>
                    <h3 class="shop-placeholder-title">Global Rankings</h3>
                    <p class="shop-placeholder-desc">Compete with other players and see how your void stacks up against the best in the world.</p>
                    <div class="shop-placeholder-badge">Coming Soon</div>
                </div>
            </div>
        </div>
    `;
}
window.loadLeaderboardPage = loadLeaderboardPage;