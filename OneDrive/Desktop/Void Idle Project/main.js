// Game variables
let prestige = 0;
let voidenergy = 0;
let abyssalshard = 0;
let whisperengine = 0;
let darkmatterloop = 0;
let voidbloom = 0;
let gravitonseeder = 0;
let nullbeacon = 0;
let oblivionspire = 0;

let isNodesPageLoaded = false;
let tickInterval = 8000;

function calculateMilestoneMultiplier(count) {
    let multiplier = 1;
    if (count >= 10) multiplier *= 1.1;
    if (count >= 25) multiplier *= 1.25;
    if (count >= 50) multiplier *= 1.5;
    if (count >= 100) multiplier *= 2;
    if (count >= 500) multiplier *= 3;
    if (count >= 1000) multiplier *= 5;
    return multiplier;
}

function calculateVEPT() {
    const baseVEPT = 10;
    const VEPTPerTick = baseVEPT + 
        (abyssalshard * 1) +
        (whisperengine * (1000 / 200) * (1 + whisperengine * 0.05) * calculateMilestoneMultiplier(whisperengine)) +
        (darkmatterloop * (1000 / 50) * (1 + darkmatterloop * 0.1) * calculateMilestoneMultiplier(darkmatterloop)) +
        (voidbloom * (1000 / 20) * (1 + voidbloom * 0.15) * calculateMilestoneMultiplier(voidbloom)) +
        (gravitonseeder * (1000 / 10) * (1 + gravitonseeder * 0.2) * calculateMilestoneMultiplier(gravitonseeder)) +
        (nullbeacon * (1000 / 4) * (1 + nullbeacon * 0.25) * calculateMilestoneMultiplier(nullbeacon)) +
        (oblivionspire * (1000 / 2) * (1 + oblivionspire * 0.3) * calculateMilestoneMultiplier(oblivionspire));

    if (isNodesPageLoaded) {
        updateDisplay("VEPT", Math.ceil(VEPTPerTick));
    }
    return VEPTPerTick;
}

function calculateCost(baseCost, multiplier, count, softCap, postSoftCapMultiplier) {
    if (count < softCap) {
        return Math.floor(baseCost * Math.pow(multiplier, count));
    } else {
        return Math.floor(baseCost * Math.pow(multiplier, softCap) * Math.pow(postSoftCapMultiplier, count - softCap));
    }
}

function calculateReward(baseReward, count, diminishingFactor) {
    return Math.floor(baseReward * Math.log2(count + 2) / diminishingFactor);
}

function updateDisplay(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = value;
    }
}

function refreshNodeStats() {
    if (isNodesPageLoaded) {
        updateDisplay("VEPT", Math.ceil(calculateVEPT()));
        updateDisplay("voidenergy", voidenergy);
    }
}

function buyabyssalshard() {
    const cost = calculateCost(10, 1.1, abyssalshard, 50, 1.2);
    if (voidenergy >= cost) {
        abyssalshard++;
        voidenergy -= cost;
        updateDisplay("abyssalshard", abyssalshard);
        updateDisplay("abyssalshardCost", calculateCost(10, 1.1, abyssalshard, 50, 1.2));
        refreshNodeStats();
    }
}

function buyWhisperengine() {
    const cost = calculateCost(100, 1.15, whisperengine, 30, 1.25);
    if (voidenergy >= cost) {
        whisperengine++;
        voidenergy -= cost;
        updateDisplay("whisperengine", whisperengine);
        updateDisplay("whisperengineCost", calculateCost(100, 1.15, whisperengine, 30, 1.25));
        refreshNodeStats();
    }
}

function buydarkmatterloop() {
    const cost = calculateCost(1000, 1.2, darkmatterloop, 20, 1.3);
    if (voidenergy >= cost) {
        darkmatterloop++;
        voidenergy -= cost;
        updateDisplay("darkmatterloop", darkmatterloop);
        updateDisplay("darkmatterloopCost", calculateCost(1000, 1.2, darkmatterloop, 20, 1.3));
        refreshNodeStats();
    }
}

function buyvoidbloom() {
    const cost = calculateCost(25000, 1.2, voidbloom, 10, 1.3);
    if (voidenergy >= cost) {
        voidbloom++;
        voidenergy -= cost;
        updateDisplay("voidbloom", voidbloom);
        updateDisplay("voidbloomCost", calculateCost(25000, 1.2, voidbloom, 10, 1.3));
        refreshNodeStats();
    }
}

function buygravitonseeder() {
    const cost = calculateCost(500000, 1.25, gravitonseeder, 5, 1.4);
    if (voidenergy >= cost) {
        gravitonseeder++;
        voidenergy -= cost;
        updateDisplay("gravitonseeder", gravitonseeder);
        updateDisplay("gravitonseederCost", calculateCost(500000, 1.25, gravitonseeder, 5, 1.4));
        refreshNodeStats();
    }
}

function buynullbeacon() {
    const cost = calculateCost(750000000, 1.3, nullbeacon, 3, 1.5);
    if (voidenergy >= cost) {
        nullbeacon++;
        voidenergy -= cost;
        updateDisplay("nullbeacon", nullbeacon);
        updateDisplay("nullbeaconCost", calculateCost(750000000, 1.3, nullbeacon, 3, 1.5));
        refreshNodeStats();
    }
}

function buyoblivionspire() {
    const cost = calculateCost(1250000000000, 1.35, oblivionspire, 2, 1.6);
    if (voidenergy >= cost) {
        oblivionspire++;
        voidenergy -= cost;
        updateDisplay("oblivionspire", oblivionspire);
        updateDisplay("oblivionspireCost", calculateCost(1250000000000, 1.35, oblivionspire, 2, 1.6));
        refreshNodeStats();
    }
}

let clickQueue = 0;
function voidenergyClick(number) {
    clickQueue += number;
}

setInterval(() => {
    if (clickQueue > 0) {
        const reward = calculateReward(1, clickQueue, 1.5);
        voidenergy = Math.ceil(voidenergy + reward);
        updateDisplay("voidenergy", voidenergy);
        clickQueue = 0;
    }
}, 10);

function saveGame() {
    const save = {
        voidenergy,
        abyssalshard,
        whisperengine,
        darkmatterloop,
        voidbloom,
        gravitonseeder,
        nullbeacon,
        oblivionspire,
        prestige
    };
    localStorage.setItem("save", JSON.stringify(save));
}

function loadGame() {
    const savegame = JSON.parse(localStorage.getItem("save"));
    if (savegame) {
        voidenergy = savegame.voidenergy || 0;
        abyssalshard = savegame.abyssalshard || 0;
        whisperengine = savegame.whisperengine || 0;
        darkmatterloop = savegame.darkmatterloop || 0;
        voidbloom = savegame.voidbloom || 0;
        gravitonseeder = savegame.gravitonseeder || 0;
        nullbeacon = savegame.nullbeacon || 0;
        oblivionspire = savegame.oblivionspire || 0;
        prestige = savegame.prestige || 0;
    }
    updateDisplay("voidenergy", voidenergy);
    updateDisplay("abyssalshard", abyssalshard);
    updateDisplay("whisperengine", whisperengine);
    updateDisplay("darkmatterloop", darkmatterloop);
    updateDisplay("voidbloom", voidbloom);
    updateDisplay("gravitonseeder", gravitonseeder);
    updateDisplay("nullbeacon", nullbeacon);
    updateDisplay("oblivionspire", oblivionspire);
    updateDisplay("abyssalshardCost", calculateCost(10, 1.1, abyssalshard, 50, 1.2));
    updateDisplay("whisperengineCost", calculateCost(100, 1.15, whisperengine, 30, 1.25));
    updateDisplay("darkmatterloopCost", calculateCost(1000, 1.2, darkmatterloop, 20, 1.3));
    updateDisplay("voidbloomCost", calculateCost(25000, 1.2, voidbloom, 10, 1.3));
    updateDisplay("gravitonseederCost", calculateCost(500000, 1.25, gravitonseeder, 5, 1.4));
    updateDisplay("nullbeaconCost", calculateCost(750000000, 1.3, nullbeacon, 3, 1.5));
    updateDisplay("oblivionspireCost", calculateCost(1250000000000, 1.35, oblivionspire, 2, 1.6));
}

function resetGame() {
    localStorage.removeItem("save");
}

function changePage(newPage) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear current content

    if (newPage === 'home') {
        const playerName = localStorage.getItem("playerName") || "Player"; // Default to "Player" if no name is set
        content.innerHTML = `
            <h2>Welcome, ${playerName}!</h2>
            <p>Explore the void and build your empire!</p>
        `;
        isNodesPageLoaded = false;

    } else if (newPage === 'nodes') {
        content.innerHTML = `
            <div id="nodes-tab">
                <div class="section-container">
                    <section>
                        <p>Void Energy: <span id="voidenergy">0</span></p>
                        <p>Void Energy per Tick: <span id="VEPT">0</span></p>
                        <p>Tick Interval: <span id="tickInterval">8.00</span>s</p>
                    </section>
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
                    <tbody>
                        <tr>
                            <td class="nodes-name">Abyssal Shard</td>
                            <td class="nodes-count" id="abyssalshard">0</td>
                            <td class="nodes-cost" id="abyssalshardCost">10</td>
                            <td><button onclick="buyabyssalshard()">Buy</button></td>
                        </tr>
                        <tr>
                            <td class="nodes-name">Whisper Engine</td>
                            <td class="nodes-count" id="whisperengine">0</td>
                            <td class="nodes-cost" id="whisperengineCost">100</td>
                            <td><button onclick="buyWhisperengine()">Buy</button></td>
                        </tr>
                        <tr>
                            <td class="nodes-name">Dark Matter Loop</td>
                            <td class="nodes-count" id="darkmatterloop">0</td>
                            <td class="nodes-cost" id="darkmatterloopCost">1,000</td>
                            <td><button onclick="buydarkmatterloop()">Buy</button></td>
                        </tr>
                        <tr>
                            <td class="nodes-name">Void Bloom</td>
                            <td class="nodes-count" id="voidbloom">0</td>
                            <td class="nodes-cost" id="voidbloomCost">25,000</td>
                            <td><button onclick="buyvoidbloom()">Buy</button></td>
                        </tr>
                        <tr>
                            <td class="nodes-name">Graviton Seeder</td>
                            <td class="nodes-count" id="gravitonseeder">0</td>
                            <td class="nodes-cost" id="gravitonseederCost">500,000</td>
                            <td><button onclick="buygravitonseeder()">Buy</button></td>
                        </tr>
                        <tr>
                            <td class="nodes-name">Null Beacon</td>
                            <td class="nodes-count" id="nullbeacon">0</td>
                            <td class="nodes-cost" id="nullbeaconCost">750M</td>
                            <td><button onclick="buynullbeacon()">Buy</button></td>
                        </tr>
                        <tr>
                            <td class="nodes-name">Oblivion Spire</td>
                            <td class="nodes-count" id="oblivionspire">0</td>
                            <td class="nodes-cost" id="oblivionspireCost">1.25T</td>
                            <td><button onclick="buyoblivionspire()">Buy</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
        isNodesPageLoaded = true;

        updateDisplay("voidenergy", voidenergy);
        updateDisplay("VEPT", Math.ceil(calculateVEPT()));
        updateDisplay("abyssalshard", abyssalshard);
        updateDisplay("whisperengine", whisperengine);
        updateDisplay("darkmatterloop", darkmatterloop);
        updateDisplay("voidbloom", voidbloom);
        updateDisplay("gravitonseeder", gravitonseeder);
        updateDisplay("nullbeacon", nullbeacon);
        updateDisplay("oblivionspire", oblivionspire);

    } else if (newPage === 'upgrades') {
        content.innerHTML = `
            <h2>Upgrades</h2>
            <p>Upgrade your nodes to boost void energy production and unlock new abilities.</p>
        `;
        isNodesPageLoaded = false;

    } else if (newPage === 'stats') {
        content.innerHTML = `
            <h2>Statistics</h2>
            <p>Track your progress, node counts, and total void energy accumulated.</p>
        `;
        isNodesPageLoaded = false;

    } else if (newPage === 'prestige') {
        content.innerHTML = `
            <h2>Prestige</h2>
            <p>Reset your progress for permanent bonuses. Plan your strategy carefully!</p>
        `;
        isNodesPageLoaded = false;

    } else if (newPage === 'achievements') {
        content.innerHTML = `
            <h2>Achievements</h2>
            <p>Complete challenges and milestones to earn powerful bonuses and show off your progress.</p>
        `;
        isNodesPageLoaded = false;
    }
}

// List of used names stored in local storage
const usedNamesKey = "usedNames";

// Function to check if a name is valid and not a duplicate
function isNameValid(name) {
    const usedNames = JSON.parse(localStorage.getItem(usedNamesKey)) || [];
    const trimmedName = name.trim().toLowerCase(); // Trim spaces and make lowercase for comparison
    return !usedNames.includes(trimmedName);
}

// Function to save the name and add it to the list of used names
function saveName(name) {
    const usedNames = JSON.parse(localStorage.getItem(usedNamesKey)) || [];
    const trimmedName = name.trim().toLowerCase();
    usedNames.push(trimmedName);
    localStorage.setItem(usedNamesKey, JSON.stringify(usedNames));
    localStorage.setItem("playerName", name); // Save the player's name
}

// Function to prompt the user to create their character
function createCharacter() {
    let playerName = localStorage.getItem("playerName");

    if (!playerName) {
        let name = "";
        do {
            name = prompt("Enter your character's name (no duplicates allowed):");
            if (!name) {
                alert("Name cannot be empty. Please try again.");
            } else if (!isNameValid(name)) {
                alert("This name is already taken. Please choose a different name.");
            }
        } while (!name || !isNameValid(name));

        saveName(name);
        alert(`Welcome, ${name}! Your character has been created.`);
    }
}

// Function to handle resource generation per tick
function generateResourcesPerTick() {
    let VEPT = 0;
    if (isNodesPageLoaded) {
        VEPT = calculateVEPT();
        voidenergy = Math.ceil(voidenergy + VEPT);
        updateDisplay("voidenergy", voidenergy);
    } else {
        VEPT = calculateVEPT();
        voidenergy = Math.ceil(voidenergy + VEPT);
    }
    console.log(`Generating resources: VEPT = ${VEPT}`);
}

function startIdleGeneration() {
    console.log("Idle generation started.");
    console.log(`Tick interval: ${tickInterval}ms`);
    generateResourcesPerTick();
    setInterval(() => {
        generateResourcesPerTick();
    }, tickInterval);
}

window.onload = () => {
    createCharacter();
    loadGame();
    changePage('home');
    startIdleGeneration();
};