// Game variables
let prestige = 0; // Number of times the player has prestiged
let voidenergy = 0;
let flickernode = 0;
let whisperengine = 0;
let darkmatterloop = 0;
let voidbloom = 0; // Number of Void Blooms
let gravitonseeder = 0; // Number of Graviton Seeders
let nullbeacon = 0; // Number of Null Beacons
let oblivionspire = 0; // Number of Oblivion Spires

// Helper function to calculate milestone multipliers
function calculateMilestoneMultiplier(count) {
    let multiplier = 1;

    if (count >= 10) multiplier *= 1.1; // +10% for x10
    if (count >= 25) multiplier *= 1.25; // +25% for x25
    if (count >= 50) multiplier *= 1.5; // +50% for x50
    if (count >= 100) multiplier *= 2; // +100% for x100
    if (count >= 500) multiplier *= 3; // +200% for x500
    if (count >= 1000) multiplier *= 5; // +400% for x1000

    return multiplier;
}

// Function to calculate Void Energy per second with scaling and milestones
function calculateVEPS() {
    const veps = flickernode + 
                 (whisperengine * (1000 / 200) * (1 + whisperengine * 0.05) * calculateMilestoneMultiplier(whisperengine)) + 
                 (darkmatterloop * (1000 / 50) * (1 + darkmatterloop * 0.1) * calculateMilestoneMultiplier(darkmatterloop)) + 
                 (voidbloom * (1000 / 20) * (1 + voidbloom * 0.15) * calculateMilestoneMultiplier(voidbloom)) + 
                 (gravitonseeder * (1000 / 10) * (1 + gravitonseeder * 0.2) * calculateMilestoneMultiplier(gravitonseeder)) + 
                 (nullbeacon * (1000 / 4) * (1 + nullbeacon * 0.25) * calculateMilestoneMultiplier(nullbeacon)) + 
                 (oblivionspire * (1000 / 2) * (1 + oblivionspire * 0.3) * calculateMilestoneMultiplier(oblivionspire));
    updateDisplay("veps", Math.ceil(veps)); // Round VEPS up to the nearest whole number
}

// Function to calculate costs with exponential scaling and soft caps
function calculateCost(baseCost, multiplier, count, softCap, postSoftCapMultiplier) {
    if (count < softCap) {
        return Math.floor(baseCost * Math.pow(multiplier, count));
    } else {
        // Apply steeper scaling after the soft cap
        return Math.floor(baseCost * Math.pow(multiplier, softCap) * Math.pow(postSoftCapMultiplier, count - softCap));
    }
}

// Function to calculate rewards with logarithmic scaling and diminishing returns
function calculateReward(baseReward, count, diminishingFactor) {
    return Math.floor(baseReward * Math.log2(count + 2) / diminishingFactor);
}

// Function to buy a Flicker Node
function buyflickernode() {
    const flickernodeCost = calculateCost(10, 1.1, flickernode, 50, 1.2); // Soft cap at 50 nodes

    if (voidenergy >= flickernodeCost) {
        flickernode++; // Increment the number of Flicker Nodes
        voidenergy = Math.floor(voidenergy - flickernodeCost); // Ensure voidenergy is an integer

        // Update the display for Flicker Nodes and Void Energy
        updateDisplay("flickernode", flickernode);
        updateDisplay("voidenergy", voidenergy);
    }

    // Update the cost of the next Flicker Node
    const nextCost = calculateCost(10, 1.1, flickernode, 50, 1.2);
    updateDisplay("flickernodeCost", nextCost);
}

// Function to buy a Whisper Engine
function buyWhisperengine() {
    const whisperengineCost = calculateCost(100, 1.15, whisperengine, 30, 1.25); // Soft cap at 30 engines

    if (voidenergy >= whisperengineCost) {
        whisperengine++;
        voidenergy -= whisperengineCost;

        // Update the display for Whisper Engines and Void Energy
        updateDisplay("whisperengine", whisperengine);
        updateDisplay("voidenergy", voidenergy);
    }

    // Update the cost of the next Whisper Engine
    const nextCost = calculateCost(100, 1.15, whisperengine, 30, 1.25);
    updateDisplay("whisperengineCost", nextCost);
}

// Function to buy a Dark Matter Loop
function buydarkmatterloop() {
    const darkmatterloopCost = calculateCost(1000, 1.2, darkmatterloop, 20, 1.3); // Soft cap at 20 loops

    if (voidenergy >= darkmatterloopCost) {
        darkmatterloop++;
        voidenergy -= darkmatterloopCost;

        // Update the display for Dark Matter Loops and Void Energy
        updateDisplay("darkmatterloop", darkmatterloop);
        updateDisplay("voidenergy", voidenergy);
    }

    // Update the cost of the next Dark Matter Loop
    const nextCost = calculateCost(1000, 1.2, darkmatterloop, 20, 1.3);
    updateDisplay("darkmatterloopCost", nextCost);
}

// Function to buy a Void Bloom
function buyvoidbloom() {
    const voidbloomCost = calculateCost(25000, 1.2, voidbloom, 10, 1.3); // Soft cap at 10 blooms

    if (voidenergy >= voidbloomCost) {
        voidbloom++;
        voidenergy -= voidbloomCost;

        // Update the display for Void Blooms and Void Energy
        updateDisplay("voidbloom", voidbloom);
        updateDisplay("voidenergy", voidenergy);
    }

    // Update the cost of the next Void Bloom
    const nextCost = calculateCost(25000, 1.2, voidbloom, 10, 1.3);
    updateDisplay("voidbloomCost", nextCost);
}

// Function to buy a Graviton Seeder
function buygravitonseeder() {
    const gravitonseederCost = calculateCost(500000, 1.25, gravitonseeder, 5, 1.4); // Soft cap at 5 seeders

    if (voidenergy >= gravitonseederCost) {
        gravitonseeder++;
        voidenergy -= gravitonseederCost;

        // Update the display for Graviton Seeders and Void Energy
        updateDisplay("gravitonseeder", gravitonseeder);
        updateDisplay("voidenergy", voidenergy);
    }

    // Update the cost of the next Graviton Seeder
    const nextCost = calculateCost(500000, 1.25, gravitonseeder, 5, 1.4);
    updateDisplay("gravitonseederCost", nextCost);
}

// Function to buy a Null Beacon
function buynullbeacon() {
    const nullbeaconCost = calculateCost(750000000, 1.3, nullbeacon, 3, 1.5); // Soft cap at 3 beacons

    if (voidenergy >= nullbeaconCost) {
        nullbeacon++;
        voidenergy -= nullbeaconCost;

        // Update the display for Null Beacons and Void Energy
        updateDisplay("nullbeacon", nullbeacon);
        updateDisplay("voidenergy", voidenergy);
    }

    // Update the cost of the next Null Beacon
    const nextCost = calculateCost(750000000, 1.3, nullbeacon, 3, 1.5);
    updateDisplay("nullbeaconCost", nextCost);
}

// Function to buy an Oblivion Spire
function buyoblivionspire() {
    const oblivionspireCost = calculateCost(1250000000000, 1.35, oblivionspire, 2, 1.6); // Soft cap at 2 spires

    if (voidenergy >= oblivionspireCost) {
        oblivionspire++;
        voidenergy -= oblivionspireCost;

        // Update the display for Oblivion Spires and Void Energy
        updateDisplay("oblivionspire", oblivionspire);
        updateDisplay("voidenergy", voidenergy);
    }

    // Update the cost of the next Oblivion Spire
    const nextCost = calculateCost(1250000000000, 1.35, oblivionspire, 2, 1.6);
    updateDisplay("oblivionspireCost", nextCost);
}

// Function to generate rewards with logarithmic scaling
function voidenergyClick(number) {
    const reward = calculateReward(1, number, 1.5); // Base reward of 1, diminishing factor of 1.5
    voidenergy = Math.ceil(voidenergy + reward); // Ensure voidenergy is rounded up
    updateDisplay("voidenergy", voidenergy); // Updates the display for void energy
}

// Helper function to update the DOM
function updateDisplay(elementId, value) {
    document.getElementById(elementId).innerHTML = value;
}

// Auto-clicker: Adds Void Energy based on VEPS
window.setInterval(() => {
    const veps = flickernode + 
                 (whisperengine * (1000 / 200) * (1 + whisperengine * 0.05) * calculateMilestoneMultiplier(whisperengine)) + 
                 (darkmatterloop * (1000 / 50) * (1 + darkmatterloop * 0.1) * calculateMilestoneMultiplier(darkmatterloop)) + 
                 (voidbloom * (1000 / 20) * (1 + voidbloom * 0.15) * calculateMilestoneMultiplier(voidbloom)) + 
                 (gravitonseeder * (1000 / 10) * (1 + gravitonseeder * 0.2) * calculateMilestoneMultiplier(gravitonseeder)) + 
                 (nullbeacon * (1000 / 4) * (1 + nullbeacon * 0.25) * calculateMilestoneMultiplier(nullbeacon)) + 
                 (oblivionspire * (1000 / 2) * (1 + oblivionspire * 0.3) * calculateMilestoneMultiplier(oblivionspire));
    voidenergy = Math.ceil(voidenergy + veps); // Add the full VEPS every second
    updateDisplay("voidenergy", voidenergy); // Display voidenergy as an integer
}, 1000); // Update every 1000ms (1 second)

// Update VEPS display every 500ms
window.setInterval(() => {
    calculateVEPS();
}, 500); // Update every 500ms

// Save and load game state
function saveGame() {
    const save = {
        voidenergy: voidenergy,
        flickernode: flickernode,
        whisperengine: whisperengine,
        darkmatterloop: darkmatterloop,
        voidbloom: voidbloom,
        gravitonseeder: gravitonseeder,
        nullbeacon: nullbeacon,
        oblivionspire: oblivionspire,
        prestige: prestige
    };
    localStorage.setItem("save", JSON.stringify(save)); // Saves the game to local storage
}

function loadGame() {
    const savegame = JSON.parse(localStorage.getItem("save")); // Loads the game from local storage

    if (savegame) {
        if (typeof savegame.voidenergy !== "undefined") voidenergy = savegame.voidenergy;
        if (typeof savegame.flickernode !== "undefined") flickernode = savegame.flickernode;
        if (typeof savegame.whisperengine !== "undefined") whisperengine = savegame.whisperengine;
        if (typeof savegame.darkmatterloop !== "undefined") darkmatterloop = savegame.darkmatterloop;
        if (typeof savegame.voidbloom !== "undefined") voidbloom = savegame.voidbloom;
        if (typeof savegame.gravitonseeder !== "undefined") gravitonseeder = savegame.gravitonseeder;
        if (typeof savegame.nullbeacon !== "undefined") nullbeacon = savegame.nullbeacon;
        if (typeof savegame.oblivionspire !== "undefined") oblivionspire = savegame.oblivionspire;
        if (typeof savegame.prestige !== "undefined") prestige = savegame.prestige;

        // Update the display with loaded values
        updateDisplay("voidenergy", voidenergy);
        updateDisplay("flickernode", flickernode);
        updateDisplay("whisperengine", whisperengine);
        updateDisplay("darkmatterloop", darkmatterloop);
        updateDisplay("voidbloom", voidbloom);
        updateDisplay("gravitonseeder", gravitonseeder);
        updateDisplay("nullbeacon", nullbeacon);
        updateDisplay("oblivionspire", oblivionspire);
        updateDisplay("flickernodeCost", calculateCost(10, 1.1, flickernode, 50, 1.2));
        updateDisplay("whisperengineCost", calculateCost(100, 1.15, whisperengine, 30, 1.25));
        updateDisplay("darkmatterloopCost", calculateCost(1000, 1.2, darkmatterloop, 20, 1.3));
        updateDisplay("voidbloomCost", calculateCost(25000, 1.2, voidbloom, 10, 1.3));
        updateDisplay("gravitonseederCost", calculateCost(500000, 1.25, gravitonseeder, 5, 1.4));
        updateDisplay("nullbeaconCost", calculateCost(750000000, 1.3, nullbeacon, 3, 1.5));
        updateDisplay("oblivionspireCost", calculateCost(1250000000000, 1.35, oblivionspire, 2, 1.6));
    }
}

// Remove saved game (for debugging or resetting)
function resetGame() {
    localStorage.removeItem("save");
}

// Load the game state on page load
loadGame();
resetGame(); // Uncomment this line to reset the game on load

function changePage(newPage) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear current content

    if (newPage === 'home') {
        content.innerHTML = `
            <h2>Welcome to Void Idle</h2>
            <p>Explore the void and build your empire!</p>
        `;
    } else if (newPage === 'generators') {
        content.innerHTML = `
            <div id="generator-tab">
                <div class="section-container">
                    <section>
                        <button onclick="voidenergyClick(1)">Click To Generate</button>
                        <p>Void Energy: <span id="voidenergy">0</span></p>
                        <p>Void Energy per Second: <span id="veps">0</span></p>
                    </section>

                    <section>
                        <button onclick="buyflickernode()">Buy Flicker Node</button>
                        <p>Flicker Node: <span id="flickernode">0</span></p>
                        <p>Flicker Node Cost: <span id="flickernodeCost">10</span></p>
                    </section>

                    <section>
                        <button onclick="buyWhisperengine()">Buy Whisper Engine</button>
                        <p>Whisper Engine: <span id="whisperengine">0</span></p>
                        <p>Whisper Engine Cost: <span id="whisperengineCost">100</span></p>
                    </section>

                    <section>
                        <button onclick="buydarkmatterloop()">Buy Dark Matter Loop</button>
                        <p>Dark Matter Loop: <span id="darkmatterloop">0</span></p>
                        <p>Dark Matter Loop Cost: <span id="darkmatterloopCost">1,000</span></p>
                    </section>

                    <section>
                        <button onclick="buyvoidbloom()">Buy Void Bloom</button>
                        <p>Void Bloom: <span id="voidbloom">0</span></p>
                        <p>Void Bloom Cost: <span id="voidbloomCost">25,000</span></p>
                    </section>

                    <section>
                        <button onclick="buygravitonseeder()">Buy Graviton Seeder</button>
                        <p>Graviton Seeder: <span id="gravitonseeder">0</span></p>
                        <p>Graviton Seeder Cost: <span id="gravitonseederCost">500,000</span></p>
                    </section>

                    <section>
                        <button onclick="buynullbeacon()">Buy Null Beacon</button>
                        <p>Null Beacon: <span id="nullbeacon">0</span></p>
                        <p>Null Beacon Cost: <span id="nullbeaconCost">750M</span></p>
                    </section>

                    <section>
                        <button onclick="buyoblivionspire()">Buy Oblivion Spire</button>
                        <p>Oblivion Spire: <span id="oblivionspire">0</span></p>
                        <p>Oblivion Spire Cost: <span id="oblivionspireCost">1.25T</span></p>
                    </section>
                </div>
            </div>
        `;
    } else if (newPage === 'upgrades') {
        content.innerHTML = `
            <h2>Upgrades</h2>
            <p>Upgrade your generators and increase efficiency!</p>
        `;
    } else if (newPage === 'stats') {
        content.innerHTML = `
            <h2>Stats</h2>
            <p>Track your progress</p>
        `;
    } else if (newPage === 'prestige') {
        content.innerHTML = `
            <h2>Prestige</h2>
            <p>Prestige to reset your progress for powerful bonuses.</p>
            <button onclick="prestige()">Prestige</button>
        `;
    } else if (newPage === 'achievements') {
        content.innerHTML = `
            <h2>Achievements</h2>
            <p>Unlock achievements for special rewards!</p>
        `;
    }
}