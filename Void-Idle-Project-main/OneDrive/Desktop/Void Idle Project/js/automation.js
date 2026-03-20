// Automation Page
function loadAutomationPage(content) {
    content.innerHTML = `
        <div id="automation-tab" class="page-root">
            <h2 class="page-title">${gi('automation', 22)} Automation</h2>
            <div class="page-card">
                <div class="shop-placeholder">
                    <div class="shop-placeholder-icon">${gi('automation', 52)}</div>
                    <h3 class="shop-placeholder-title">Automation</h3>
                    <p class="shop-placeholder-desc">Set up automated purchases, triggers, and routines to keep your void running while you're away.</p>
                    <div class="shop-placeholder-badge">Coming Soon</div>
                </div>
            </div>
        </div>
    `;
}
window.loadAutomationPage = loadAutomationPage;