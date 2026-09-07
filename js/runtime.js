// Rendering is independent of resource generation. Never run game logic in this queue.
const pendingRenders = new Set();
let renderFrame = null;
let rendering = false;
let pageUpdater = null;
let pageCleanup = null;
function scheduleRender(render) {
  pendingRenders.add(render);
  if (renderFrame === null && !rendering && !document.hidden) {
    renderFrame = requestAnimationFrame(() => {
      renderFrame = null;
      rendering = true;
      pendingRenders.forEach(fn => {
        pendingRenders.delete(fn);
        try { fn(); } catch (error) { console.error('[Render error]', error); }
      });
      rendering = false;
    });
  }
}
function setPageUpdater(update, cleanup) {
  pageUpdater = update;
  pageCleanup = cleanup || null;
  scheduleRender(updateCurrentPage);
}
function updateCurrentPage() { if (pageUpdater) pageUpdater(); }
function cleanupCurrentPage() {
  if (pageCleanup) pageCleanup();
  pageCleanup = pageUpdater = null;
  // Clear legacy page timers immediately, before a replacement page mounts.
  for (const key of ['nodesRefreshInterval', 'upgradesInterval', 'shopRefreshInterval', 'statsInterval']) {
    clearInterval(window[key]);
    window[key] = null;
  }
}
function renderGameState() {
  refreshNodeStats();
}
function requestGameRender() { scheduleRender(renderGameState); }
function setText(element, value) {
  if (element && element.textContent !== String(value)) element.textContent = value;
}
// Cache the generated string separately: innerHTML serialization can normalize markup.
const renderedMarkup = new WeakMap();
function setMarkup(element, html) {
  if (element && renderedMarkup.get(element) !== html) {
    element.innerHTML = html;
    renderedMarkup.set(element, html);
  }
}

// One scheduler per visual, capped independently of the monitor refresh rate.
// Hidden tabs and disabled decorations do no drawing and have no outstanding rAF.
const visualLoops = new Set();
function startVisualLoop(draw, { fps = 30, decorative = false } = {}) {
  let frame = null;
  let last = null;
  let stopped = false;
  const active = () => !document.hidden && (!decorative || window.backgroundAnimationEnabled);
  function tick(now) {
    frame = null;
    if (!active() || stopped) return;
    if (last === null || now - last >= 1000 / fps - 0.5) {
      const delta = last === null ? 1000 / 60 : Math.min(now - last, 100);
      last = now;
      draw(delta);
    }
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    last = null;
    if (active() && !stopped) frame = requestAnimationFrame(tick);
  }
  visualLoops.add(sync);
  sync();
  return () => {
    stopped = true;
    if (frame !== null) cancelAnimationFrame(frame);
    visualLoops.delete(sync);
  };
}
window.backgroundAnimationEnabled = localStorage.getItem('bgAnimationEnabled') !== 'false';
window.clickEffectsEnabled = localStorage.getItem('clickEffectsEnabled') !== 'false';
function syncVisualSettings() {
  document.body.classList.toggle('no-bg-animation', !window.backgroundAnimationEnabled);
  visualLoops.forEach(sync => sync());
}
document.addEventListener('visibilitychange', () => {
  visualLoops.forEach(sync => sync());
  if (document.hidden) {
    if (renderFrame !== null) cancelAnimationFrame(renderFrame);
    renderFrame = null;
    if (window._gameStarted) saveGame();
  } else {
    requestGameRender();
  }
});
window.addEventListener('pagehide', () => {
  if (window._gameStarted) saveGame();
});
