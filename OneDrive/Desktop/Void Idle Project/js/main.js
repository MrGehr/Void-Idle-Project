// main.js
console.log("main.js loaded");

// === Game State ===
let prestige = 0;
let voidenergy = 0;
// total Void Energy gained since last prestige
let lifetimeVE = new Decimal(0);

let abyssalshard = 0;
let whisperengine = 0;
let darkmatterloop = 0;
let voidbloom = 0;
let gravitonseeder = 0;
let nullbeacon = 0;
let oblivionspire = 0;

let isNodesPageLoaded = false;
const tickInterval = 8000; // 8s per tick

// === Achievement Unlock Conditions ===
// Array of {id, check} so we can loop instead of many ifs
const achievementConditions = [
    { id: 'first-click',    threshold: 1,           check: () => voidenergy > 0 },
    { id: 'hundred-ve',     threshold: 100,         check: () => lifetimeVE.gte(100) },
    { id: 'tenthousand-ve', threshold: 10_000,      check: () => lifetimeVE.gte(10_000) },
    { id: 'million-ve',     threshold: 1_000_000,   check: () => lifetimeVE.gte(1_000_000) },
    { id: 'billion-ve',     threshold: 1_000_000_000,check: () => lifetimeVE.gte(1_000_000_000) }
  ];

// === Unlock Achievements ===
function tryUnlockAchievements() {
    achievementConditions.forEach(({id, check}) => {
      if (check()) window.unlockAchievement(id);
    });
  }

// === Tick Progress Tracking ===
let tickStartTime = Date.now();

// === Utility Functions ===
function calculateMilestoneMultiplier(count) {
  let m = 1;
  if (count >= 10) m *= 1.1;
  if (count >= 25) m *= 1.25;
  if (count >= 50) m *= 1.5;
  if (count >= 100) m *= 2;
  if (count >= 500) m *= 3;
  if (count >= 1000) m *= 5;
  return m;
}

function calculateVEPT() {
    let prod = new Decimal(20);   // always start with 20 VE/tick
  
    for (const node of window.nodesData) {
      const count = new Decimal(node.count);
      // this already has the 1.1× or 1.25× baked in
      prod = prod.add( getNodeProduction(node).mul(count) );
    }
  
    return prod.toNumber();
  }

function updateDisplay(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

// === Refresh stats on Nodes page (and Home) ===
function refreshNodeStats() {
  updateDisplay("voidenergy", new Decimal(voidenergy).ceil().toString());

  if (isNodesPageLoaded) {
    updateDisplay("VEPT", Math.ceil(calculateVEPT()));
    updateDisplay("abyssalshard", new Decimal(abyssalshard).floor().toString());
    updateDisplay("whisperengine", new Decimal(whisperengine).floor().toString());
    updateDisplay("darkmatterloop", new Decimal(darkmatterloop).floor().toString());
    updateDisplay("voidbloom", new Decimal(voidbloom).floor().toString());
    updateDisplay("gravitonseeder", new Decimal(gravitonseeder).floor().toString());
    updateDisplay("nullbeacon", new Decimal(nullbeacon).floor().toString());
    updateDisplay("oblivionspire", new Decimal(oblivionspire).floor().toString());
    for (const node of window.nodesData) {
      updateDisplay(
        `${node.id}Production`,
        `Production: ${formatNumber(getNodeProduction(node))}`
      );
    }
  } else {
    if (typeof updateHomeDynamic === 'function') updateHomeDynamic();
  }
}

// === Tick Progress Update ===
function updateTickProgress() {
  const elapsed = Date.now() - tickStartTime;
  const percent = Math.min(elapsed / tickInterval * 100, 100);
  const bar = document.getElementById('tickProgress');
  if (bar) bar.value = percent;
}

// === Idle Generation ===
function generateResourcesPerTick() {
  const gained = calculateVEPT();

  // 1) add to current energy
  voidenergy = Math.ceil(voidenergy + gained);

  // 2) track all gained energy toward lifetimeVE
  lifetimeVE = lifetimeVE.plus(gained);

  // 3) try to unlock achievements based on new values
  tryUnlockAchievements();

  // 4) update on-screen displays
  updateDisplay("voidenergy", voidenergy);
  updateDisplay("VEPT", Math.ceil(gained));

  // 5) if Home is visible, refresh its XP bar/text
  if (typeof updateHomeDynamic === "function") updateHomeDynamic();
}

function startIdleGeneration() {
  tickStartTime = Date.now();
  setInterval(() => {
    generateResourcesPerTick();
    tickStartTime = Date.now();
  }, tickInterval);
  setInterval(updateTickProgress, 50);
}

// === Persistence ===
function saveGame() {
  const save = { voidenergy, lifetimeVE: lifetimeVE.toString(), abyssalshard, whisperengine, darkmatterloop, voidbloom, gravitonseeder, nullbeacon, oblivionspire, prestige };
  localStorage.setItem("save", JSON.stringify(save));
}

function loadGame() {
  const data = JSON.parse(localStorage.getItem("save"));
  if (data) {
    voidenergy = data.voidenergy;
    lifetimeVE = new Decimal(data.lifetimeVE || 0);
    abyssalshard = data.abyssalshard;
    whisperengine = data.whisperengine;
    darkmatterloop = data.darkmatterloop;
    voidbloom = data.voidbloom;
    gravitonseeder = data.gravitonseeder;
    nullbeacon = data.nullbeacon;
    oblivionspire = data.oblivionspire;
    prestige = data.prestige || 0;
  }
  refreshNodeStats();
}

function resetGame() {
  localStorage.removeItem("save");
  voidenergy = abyssalshard = whisperengine = darkmatterloop = voidbloom = gravitonseeder = nullbeacon = oblivionspire = prestige = 0;
  lifetimeVE = new Decimal(0);
  refreshNodeStats();
}

// === Page Navigation ===
function changePage(page) {
  isNodesPageLoaded = (page === 'nodes');
  const content = document.getElementById('content');
  content.classList.remove('wide-home'); content.innerHTML = '';
  const script = document.createElement('script'); script.src = `js/${page}.js`;
  script.onload = () => { const fn = window[`load${page.charAt(0).toUpperCase()+page.slice(1)}Page`]; if (typeof fn === 'function') fn(content); refreshNodeStats(); };
  document.body.appendChild(script);
}

// === Character Creation ===
const usedNamesKey = "usedNames";
function isNameValid(name) { if (typeof name !== 'string') return false; const trimmed = name.trim(); if (!trimmed) return false; const used = JSON.parse(localStorage.getItem(usedNamesKey)) || []; return !used.includes(trimmed.toLowerCase()); }
function saveName(name) { const used = JSON.parse(localStorage.getItem(usedNamesKey)) || []; used.push(name.trim().toLowerCase()); localStorage.setItem(usedNamesKey, JSON.stringify(used)); localStorage.setItem("playerName", name); }
function createCharacter() { const stored = localStorage.getItem("playerName"); if (stored && stored.trim()) return; let name; do { name = prompt("Enter a unique character name:"); } while (!isNameValid(name)); saveName(name); }

// === Initialization ===
window.onload = () => { createCharacter(); loadGame(); changePage('home'); startIdleGeneration(); };

