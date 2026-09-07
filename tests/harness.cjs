const { JSDOM, VirtualConsole } = require('jsdom');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
// Commit reviewed before the optimization. Keeps regression/benchmark comparisons reproducible.
const baseline = '3444c3f4f26c6627cf9c5e7930eaa36cd74f7706';
function source(file, original = false) {
  return original ? execFileSync('git', ['show', `${process.env.BASELINE_REF || baseline}:${file}`], { cwd: root, encoding: 'utf8' }) : fs.readFileSync(path.join(root, file), 'utf8');
}
function game({ original = false, lazy = false } = {}) {
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', e => errors.push(e.message));
  const html = source('index.html', original).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  const dom = new JSDOM(html, { url: 'https://void-idle.test/', runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole });
  const w = dom.window;
  const context = dom.getInternalVMContext();
  const run = code => vm.runInContext(code, context);
  let id = 0, clock = 1000000, random = 123;
  const timers = new Map(), frames = new Map(), intervals = new Map(), scripts = [];
  w.console = { log() {}, warn() {}, error(...args) { errors.push(args.map(String).join(' ')); } };
  w.Date.now = () => clock;
  w.Math.random = () => { random = (1664525 * random + 1013904223) >>> 0; return random / 2 ** 32; };
  w.setTimeout = (fn, ms) => { timers.set(++id, { fn, ms }); return id; };
  w.clearTimeout = key => timers.delete(key);
  w.setInterval = (fn, ms) => { intervals.set(++id, { fn, ms }); return id; };
  w.clearInterval = key => intervals.delete(key);
  w.requestAnimationFrame = fn => { frames.set(++id, fn); return id; };
  w.cancelAnimationFrame = key => frames.delete(key);
  let draws = 0;
  w.HTMLCanvasElement.prototype.getContext = () => new Proxy({}, { get: (_, key) => key === 'clearRect' ? () => draws++ : () => {} });
  w.Audio = class { constructor() { this.volume = .1; this.paused = true; } play() { this.paused = false; return Promise.resolve(); } pause() { this.paused = true; } };
  run(fs.readFileSync(path.join(root, 'node_modules/break_infinity.js/dist/break_infinity.min.js'), 'utf8'));
  if (!original) run(source('js/runtime.js'));
  const files = ['icons', 'main', 'nodes', 'upgrades', 'prestige', 'stats', 'achievements', 'settings', 'tutorial'];
  if (!original) files.splice(2, 0, 'relics');
  if (!lazy) files.push('home', 'shop', 'automation', 'leaderboard');
  files.forEach(name => run(source(`js/${name}.js`, original)));
  // Tests explicitly drive startup or navigation; don't let JSDOM's load event start it again.
  const start = w.onload;
  w.onload = null;
  const append = w.document.body.appendChild.bind(w.document.body);
  w.document.body.appendChild = element => {
    const result = append(element);
    if (element.tagName === 'SCRIPT') {
      const file = new URL(element.src).pathname.slice(1);
      scripts.push(file);
      Promise.resolve().then(() => {
        try { run(source(file, original)); element.onload?.(); }
        catch (error) { errors.push(error.message); element.onerror?.(); }
      });
    }
    return result;
  };
  function frame(ms = 17) {
    clock += ms;
    const callbacks = [...frames.values()]; frames.clear();
    callbacks.forEach(fn => fn(clock));
  }
  function hidden(value) {
    Object.defineProperty(w.document, 'hidden', { configurable: true, value });
    w.document.dispatchEvent(new w.Event('visibilitychange'));
  }
  function snapshot() {
    return run(`JSON.stringify({ve:voidenergy, lifetime:lifetimeVE.toString(), production:calculateVEPT(), clicks:totalClicks, combos:totalCombos||0, crits:totalCrits||0, cascades:totalCascades||0, prodBonus:achievementProdBonus, clickBonus:achievementClickBonus, achievements:achievementsData.filter(a=>a.unlocked).map(a=>a.id), nodes:nodesData.map(n=>[n.id,n.count,n.cost.toString()])})`);
  }
  // Counters referenced by snapshot are not initialized by the legacy game.
  run('window.totalCombos=0; window.totalCrits=0; window.totalCascades=0;');
  return { w, run, frame, hidden, snapshot, scripts, errors, timers, frames, intervals, start, get draws() { return draws; }, close: () => dom.window.close() };
}
module.exports = { game, source };
