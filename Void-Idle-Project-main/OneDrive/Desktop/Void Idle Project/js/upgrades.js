// upgrades.js

// Define upgradesData on window only once.
// targetNode: id of the nodesData entry this upgrade affects.
// multiplier: production multiplier applied when purchased.
window.upgradesData = window.upgradesData || [
  {
    id: 'abyssal-tool-1',
    name: 'Sharper Shard Tools',
    description: 'Doubles Abyssal Shard production. (×2 total)',
    cost: new Decimal(100),
    targetNode: 'abyssalshard',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'abyssal-tool-2',
    name: 'Masterful Shard Tools',
    description: 'Doubles Abyssal Shard production again. (×4 total)',
    cost: new Decimal(1000),
    targetNode: 'abyssalshard',
    multiplier: 2,
    purchased: false,
  },
  // === Tick Speed Upgrades ===
  {
    id: 'tick-speed-1',
    name: 'Quick Pulse',
    description: 'Reduce tick interval by 0.5s (8s → 7.5s).',
    cost: new Decimal(5000),
    targetNode: 'tick',
    tickReduction: 500,
    purchased: false,
  },
  {
    id: 'tick-speed-2',
    name: 'Rapid Cycle',
    description: 'Reduce tick interval by another 0.5s (7.5s → 7s).',
    cost: new Decimal(50000),
    targetNode: 'tick',
    tickReduction: 500,
    purchased: false,
  },
  {
    id: 'tick-speed-3',
    name: 'Accelerated Flow',
    description: 'Reduce tick interval by 1s (7s → 6s).',
    cost: new Decimal(500000),
    targetNode: 'tick',
    tickReduction: 1000,
    purchased: false,
  },
  {
    id: 'tick-speed-4',
    name: 'Temporal Shift',
    description: 'Reduce tick interval by 1s (6s → 5s).',
    cost: new Decimal(5000000),
    targetNode: 'tick',
    tickReduction: 1000,
    purchased: false,
  },
  {
    id: 'tick-speed-5',
    name: 'Void Haste',
    description: 'Reduce tick interval by 1s (5s → 4s).',
    cost: new Decimal(50000000),
    targetNode: 'tick',
    tickReduction: 1000,
    purchased: false,
  },
  {
    id: 'tick-speed-6',
    name: 'Singularity Pulse',
    description: 'Reduce tick interval by 1s (4s → 3s).',
    cost: new Decimal('5e8'),
    targetNode: 'tick',
    tickReduction: 1000,
    purchased: false,
  },
  {
    id: 'tick-speed-7',
    name: 'Time Fracture',
    description: 'Reduce tick interval by 1s (3s → 2s). Minimum tick speed.',
    cost: new Decimal('5e9'),
    targetNode: 'tick',
    tickReduction: 1000,
    purchased: false,
  },
  // --- TEMP TEST UPGRADES ---
  {
    id: 'whisper-boost-1',
    name: 'Whisper Amplifier',
    description: 'Doubles Whisper Engine production. (×2 total)',
    cost: new Decimal(1500),
    targetNode: 'whisperengine',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'whisper-boost-2',
    name: 'Resonance Core',
    description: 'Doubles Whisper Engine production again. (×4 total)',
    cost: new Decimal(15000),
    targetNode: 'whisperengine',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'darkmatter-boost-1',
    name: 'Loop Stabilizer',
    description: 'Doubles Dark Matter Loop production. (×2 total)',
    cost: new Decimal(20000),
    targetNode: 'darkmatterloop',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'darkmatter-boost-2',
    name: 'Loop Overclock',
    description: 'Doubles Dark Matter Loop production again. (×4 total)',
    cost: new Decimal(200000),
    targetNode: 'darkmatterloop',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'voidbloom-boost-1',
    name: 'Bloom Catalyst',
    description: 'Doubles Void Bloom production. (×2 total)',
    cost: new Decimal(300000),
    targetNode: 'voidbloom',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'voidbloom-boost-2',
    name: 'Bloom Surge',
    description: 'Doubles Void Bloom production again. (×4 total)',
    cost: new Decimal(3000000),
    targetNode: 'voidbloom',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'graviton-boost-1',
    name: 'Gravity Lens',
    description: 'Doubles Graviton Seeder production. (×2 total)',
    cost: new Decimal(5000000),
    targetNode: 'gravitonseeder',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'graviton-boost-2',
    name: 'Singularity Drive',
    description: 'Doubles Graviton Seeder production again. (×4 total)',
    cost: new Decimal(50000000),
    targetNode: 'gravitonseeder',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'nullbeacon-boost-1',
    name: 'Signal Enhancer',
    description: 'Doubles Null Beacon production. (×2 total)',
    cost: new Decimal('1e8'),
    targetNode: 'nullbeacon',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'nullbeacon-boost-2',
    name: 'Void Frequency',
    description: 'Doubles Null Beacon production again. (×4 total)',
    cost: new Decimal('1e9'),
    targetNode: 'nullbeacon',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'oblivion-boost-1',
    name: 'Spire Ascendant',
    description: 'Doubles Oblivion Spire production. (×2 total)',
    cost: new Decimal('2.5e9'),
    targetNode: 'oblivionspire',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'oblivion-boost-2',
    name: 'Oblivion Unleashed',
    description: 'Doubles Oblivion Spire production again. (×4 total)',
    cost: new Decimal('2.5e10'),
    targetNode: 'oblivionspire',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'abyssal-tool-3',
    name: 'Void-Forged Shard Tools',
    description: 'Doubles Abyssal Shard production again. (×8 total)',
    cost: new Decimal(10000),
    targetNode: 'abyssalshard',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'whisper-boost-3',
    name: 'Harmonic Cascade',
    description: 'Doubles Whisper Engine production again. (×8 total)',
    cost: new Decimal(150000),
    targetNode: 'whisperengine',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'abyssal-tool-4',
    name: 'Shard Singularity',
    description: 'Doubles Abyssal Shard production again. (×16 total)',
    cost: new Decimal(100000),
    targetNode: 'abyssalshard',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'darkmatter-boost-3',
    name: 'Dark Feedback Loop',
    description: 'Doubles Dark Matter Loop production again. (×8 total)',
    cost: new Decimal(2000000),
    targetNode: 'darkmatterloop',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'voidbloom-boost-3',
    name: 'Bloom Nova',
    description: 'Doubles Void Bloom production again. (×8 total)',
    cost: new Decimal(30000000),
    targetNode: 'voidbloom',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'graviton-boost-3',
    name: 'Event Horizon Tap',
    description: 'Doubles Graviton Seeder production again. (×8 total)',
    cost: new Decimal(500000000),
    targetNode: 'gravitonseeder',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'nullbeacon-boost-3',
    name: 'Null Resonator',
    description: 'Doubles Null Beacon production again. (×8 total)',
    cost: new Decimal('1e10'),
    targetNode: 'nullbeacon',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'oblivion-boost-3',
    name: 'Final Collapse',
    description: 'Doubles Oblivion Spire production again. (×8 total)',
    cost: new Decimal('2.5e11'),
    targetNode: 'oblivionspire',
    multiplier: 2,
    purchased: false,
  },
  // --- END TEMP TEST UPGRADES ---

  // === Abyssal Shard upgrades 5–10 ===
  {
    id: 'abyssal-tool-5',
    name: 'Void Crystallization',
    description: 'Doubles Abyssal Shard production again. (×32 total)',
    cost: new Decimal(1000000),
    targetNode: 'abyssalshard',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'abyssal-tool-6',
    name: 'Abyssal Resonance',
    description: 'Doubles Abyssal Shard production again. (×64 total)',
    cost: new Decimal(10000000),
    targetNode: 'abyssalshard',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'abyssal-tool-7',
    name: 'Deep Void Shatter',
    description: 'Doubles Abyssal Shard production again. (×128 total)',
    cost: new Decimal('1e8'),
    targetNode: 'abyssalshard',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'abyssal-tool-8',
    name: 'Fractal Shard Matrix',
    description: 'Doubles Abyssal Shard production again. (×256 total)',
    cost: new Decimal('1e9'),
    targetNode: 'abyssalshard',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'abyssal-tool-9',
    name: 'Infinite Edge',
    description: 'Doubles Abyssal Shard production again. (×512 total)',
    cost: new Decimal('1e10'),
    targetNode: 'abyssalshard',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'abyssal-tool-10',
    name: 'Shard Transcendence',
    description: 'Doubles Abyssal Shard production again. (×1024 total)',
    cost: new Decimal('1e11'),
    targetNode: 'abyssalshard',
    multiplier: 2,
    purchased: false,
  },

  // === Whisper Engine upgrades 4–10 ===
  {
    id: 'whisper-boost-4',
    name: 'Echo Chamber',
    description: 'Doubles Whisper Engine production again. (×16 total)',
    cost: new Decimal(1500000),
    targetNode: 'whisperengine',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'whisper-boost-5',
    name: 'Void Whisper Array',
    description: 'Doubles Whisper Engine production again. (×32 total)',
    cost: new Decimal(15000000),
    targetNode: 'whisperengine',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'whisper-boost-6',
    name: 'Spectral Amplification',
    description: 'Doubles Whisper Engine production again. (×64 total)',
    cost: new Decimal('1.5e8'),
    targetNode: 'whisperengine',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'whisper-boost-7',
    name: 'Dissonance Engine',
    description: 'Doubles Whisper Engine production again. (×128 total)',
    cost: new Decimal('1.5e9'),
    targetNode: 'whisperengine',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'whisper-boost-8',
    name: 'Phantom Resonance',
    description: 'Doubles Whisper Engine production again. (×256 total)',
    cost: new Decimal('1.5e10'),
    targetNode: 'whisperengine',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'whisper-boost-9',
    name: 'Silent Storm',
    description: 'Doubles Whisper Engine production again. (×512 total)',
    cost: new Decimal('1.5e11'),
    targetNode: 'whisperengine',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'whisper-boost-10',
    name: 'Whisper Singularity',
    description: 'Doubles Whisper Engine production again. (×1024 total)',
    cost: new Decimal('1.5e12'),
    targetNode: 'whisperengine',
    multiplier: 2,
    purchased: false,
  },

  // === Dark Matter Loop upgrades 4–10 ===
  {
    id: 'darkmatter-boost-4',
    name: 'Matter Compression',
    description: 'Doubles Dark Matter Loop production again. (×16 total)',
    cost: new Decimal(20000000),
    targetNode: 'darkmatterloop',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'darkmatter-boost-5',
    name: 'Void Loop Matrix',
    description: 'Doubles Dark Matter Loop production again. (×32 total)',
    cost: new Decimal('2e8'),
    targetNode: 'darkmatterloop',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'darkmatter-boost-6',
    name: 'Dark Cascade',
    description: 'Doubles Dark Matter Loop production again. (×64 total)',
    cost: new Decimal('2e9'),
    targetNode: 'darkmatterloop',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'darkmatter-boost-7',
    name: 'Gravitational Feedback',
    description: 'Doubles Dark Matter Loop production again. (×128 total)',
    cost: new Decimal('2e10'),
    targetNode: 'darkmatterloop',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'darkmatter-boost-8',
    name: 'Event Loop Collapse',
    description: 'Doubles Dark Matter Loop production again. (×256 total)',
    cost: new Decimal('2e11'),
    targetNode: 'darkmatterloop',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'darkmatter-boost-9',
    name: 'Dark Matter Surge',
    description: 'Doubles Dark Matter Loop production again. (×512 total)',
    cost: new Decimal('2e12'),
    targetNode: 'darkmatterloop',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'darkmatter-boost-10',
    name: 'Infinite Loop',
    description: 'Doubles Dark Matter Loop production again. (×1024 total)',
    cost: new Decimal('2e13'),
    targetNode: 'darkmatterloop',
    multiplier: 2,
    purchased: false,
  },

  // === Void Bloom upgrades 4–10 ===
  {
    id: 'voidbloom-boost-4',
    name: 'Spore Diffusion',
    description: 'Doubles Void Bloom production again. (×16 total)',
    cost: new Decimal('3e8'),
    targetNode: 'voidbloom',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'voidbloom-boost-5',
    name: 'Bloom Proliferation',
    description: 'Doubles Void Bloom production again. (×32 total)',
    cost: new Decimal('3e9'),
    targetNode: 'voidbloom',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'voidbloom-boost-6',
    name: 'Void Garden',
    description: 'Doubles Void Bloom production again. (×64 total)',
    cost: new Decimal('3e10'),
    targetNode: 'voidbloom',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'voidbloom-boost-7',
    name: 'Fractal Petals',
    description: 'Doubles Void Bloom production again. (×128 total)',
    cost: new Decimal('3e11'),
    targetNode: 'voidbloom',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'voidbloom-boost-8',
    name: 'Infinite Bloom',
    description: 'Doubles Void Bloom production again. (×256 total)',
    cost: new Decimal('3e12'),
    targetNode: 'voidbloom',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'voidbloom-boost-9',
    name: 'Bloom Transcendence',
    description: 'Doubles Void Bloom production again. (×512 total)',
    cost: new Decimal('3e13'),
    targetNode: 'voidbloom',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'voidbloom-boost-10',
    name: 'Void Blossom',
    description: 'Doubles Void Bloom production again. (×1024 total)',
    cost: new Decimal('3e14'),
    targetNode: 'voidbloom',
    multiplier: 2,
    purchased: false,
  },

  // === Graviton Seeder upgrades 4–10 ===
  {
    id: 'graviton-boost-4',
    name: 'Graviton Cascade',
    description: 'Doubles Graviton Seeder production again. (×16 total)',
    cost: new Decimal('5e9'),
    targetNode: 'gravitonseeder',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'graviton-boost-5',
    name: 'Seeder Overload',
    description: 'Doubles Graviton Seeder production again. (×32 total)',
    cost: new Decimal('5e10'),
    targetNode: 'gravitonseeder',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'graviton-boost-6',
    name: 'Dark Gravity Well',
    description: 'Doubles Graviton Seeder production again. (×64 total)',
    cost: new Decimal('5e11'),
    targetNode: 'gravitonseeder',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'graviton-boost-7',
    name: 'Spacetime Rift',
    description: 'Doubles Graviton Seeder production again. (×128 total)',
    cost: new Decimal('5e12'),
    targetNode: 'gravitonseeder',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'graviton-boost-8',
    name: 'Graviton Storm',
    description: 'Doubles Graviton Seeder production again. (×256 total)',
    cost: new Decimal('5e13'),
    targetNode: 'gravitonseeder',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'graviton-boost-9',
    name: 'Cosmic Collapse',
    description: 'Doubles Graviton Seeder production again. (×512 total)',
    cost: new Decimal('5e14'),
    targetNode: 'gravitonseeder',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'graviton-boost-10',
    name: 'Gravity Transcendence',
    description: 'Doubles Graviton Seeder production again. (×1024 total)',
    cost: new Decimal('5e15'),
    targetNode: 'gravitonseeder',
    multiplier: 2,
    purchased: false,
  },

  // === Null Beacon upgrades 4–10 ===
  {
    id: 'nullbeacon-boost-4',
    name: 'Void Transmitter',
    description: 'Doubles Null Beacon production again. (×16 total)',
    cost: new Decimal('1e11'),
    targetNode: 'nullbeacon',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'nullbeacon-boost-5',
    name: 'Beacon Amplification',
    description: 'Doubles Null Beacon production again. (×32 total)',
    cost: new Decimal('1e12'),
    targetNode: 'nullbeacon',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'nullbeacon-boost-6',
    name: 'Null Wave Pulse',
    description: 'Doubles Null Beacon production again. (×64 total)',
    cost: new Decimal('1e13'),
    targetNode: 'nullbeacon',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'nullbeacon-boost-7',
    name: 'Signal Collapse',
    description: 'Doubles Null Beacon production again. (×128 total)',
    cost: new Decimal('1e14'),
    targetNode: 'nullbeacon',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'nullbeacon-boost-8',
    name: 'Beacon Singularity',
    description: 'Doubles Null Beacon production again. (×256 total)',
    cost: new Decimal('1e15'),
    targetNode: 'nullbeacon',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'nullbeacon-boost-9',
    name: 'Null Cascade',
    description: 'Doubles Null Beacon production again. (×512 total)',
    cost: new Decimal('1e16'),
    targetNode: 'nullbeacon',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'nullbeacon-boost-10',
    name: 'Eternal Signal',
    description: 'Doubles Null Beacon production again. (×1024 total)',
    cost: new Decimal('1e17'),
    targetNode: 'nullbeacon',
    multiplier: 2,
    purchased: false,
  },

  // === Oblivion Spire upgrades 4–10 ===
  {
    id: 'oblivion-boost-4',
    name: 'Spire Overload',
    description: 'Doubles Oblivion Spire production again. (×16 total)',
    cost: new Decimal('2.5e12'),
    targetNode: 'oblivionspire',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'oblivion-boost-5',
    name: 'Oblivion Surge',
    description: 'Doubles Oblivion Spire production again. (×32 total)',
    cost: new Decimal('2.5e13'),
    targetNode: 'oblivionspire',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'oblivion-boost-6',
    name: 'Void Dominion',
    description: 'Doubles Oblivion Spire production again. (×64 total)',
    cost: new Decimal('2.5e14'),
    targetNode: 'oblivionspire',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'oblivion-boost-7',
    name: 'Spire Transcendence',
    description: 'Doubles Oblivion Spire production again. (×128 total)',
    cost: new Decimal('2.5e15'),
    targetNode: 'oblivionspire',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'oblivion-boost-8',
    name: 'Oblivion Matrix',
    description: 'Doubles Oblivion Spire production again. (×256 total)',
    cost: new Decimal('2.5e16'),
    targetNode: 'oblivionspire',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'oblivion-boost-9',
    name: 'Spire Singularity',
    description: 'Doubles Oblivion Spire production again. (×512 total)',
    cost: new Decimal('2.5e17'),
    targetNode: 'oblivionspire',
    multiplier: 2,
    purchased: false,
  },
  {
    id: 'oblivion-boost-10',
    name: 'Ultimate Collapse',
    description: 'Doubles Oblivion Spire production again. (×1024 total)',
    cost: new Decimal('2.5e18'),
    targetNode: 'oblivionspire',
    multiplier: 2,
    purchased: false,
  },

  // === Click Power upgrades 1–10 ===
  {
    id: 'click-power-1',
    name: 'Sharpened Focus',
    description: 'Increase click power by 1.5×. (1.5× total)',
    cost: new Decimal(10000),
    targetNode: 'click',
    clickMultiplier: 1.5,
    purchased: false,
  },
  {
    id: 'click-power-2',
    name: 'Void Attunement',
    description: 'Increase click power by 1.5×. (2.25× total)',
    cost: new Decimal(100000),
    targetNode: 'click',
    clickMultiplier: 1.5,
    purchased: false,
  },
  {
    id: 'click-power-3',
    name: 'Energy Channeling',
    description: 'Double click power. (4.5× total)',
    cost: new Decimal(1000000),
    targetNode: 'click',
    clickMultiplier: 2,
    purchased: false,
  },
  {
    id: 'click-power-4',
    name: 'Deep Strike',
    description: 'Double click power. (9× total)',
    cost: new Decimal(10000000),
    targetNode: 'click',
    clickMultiplier: 2,
    purchased: false,
  },
  {
    id: 'click-power-5',
    name: 'Resonant Touch',
    description: 'Double click power. (18× total)',
    cost: new Decimal('1e8'),
    targetNode: 'click',
    clickMultiplier: 2,
    purchased: false,
  },
  {
    id: 'click-power-6',
    name: 'Void Fist',
    description: 'Double click power. (36× total)',
    cost: new Decimal('1e9'),
    targetNode: 'click',
    clickMultiplier: 2,
    purchased: false,
  },
  {
    id: 'click-power-7',
    name: 'Shattering Impact',
    description: 'Double click power. (72× total)',
    cost: new Decimal('1e10'),
    targetNode: 'click',
    clickMultiplier: 2,
    purchased: false,
  },
  {
    id: 'click-power-8',
    name: 'Annihilation Tap',
    description: 'Triple click power. (216× total)',
    cost: new Decimal('1e11'),
    targetNode: 'click',
    clickMultiplier: 3,
    purchased: false,
  },
  {
    id: 'click-power-9',
    name: 'Void Judgment',
    description: 'Triple click power. (648× total)',
    cost: new Decimal('1e12'),
    targetNode: 'click',
    clickMultiplier: 3,
    purchased: false,
  },
  {
    id: 'click-power-10',
    name: 'Finger of Oblivion',
    description: 'Multiply click power by 5×. (3,240× total)',
    cost: new Decimal('1e13'),
    targetNode: 'click',
    clickMultiplier: 5,
    purchased: false,
  },

  // === Tick Speed upgrades 8–10 ===
  {
    id: 'tick-speed-8',
    name: 'Quantum Flicker',
    description: 'Reduce tick interval by 0.5s (2s → 1.5s).',
    cost: new Decimal('5e10'),
    targetNode: 'tick',
    tickReduction: 500,
    purchased: false,
  },
  {
    id: 'tick-speed-9',
    name: 'Void Acceleration',
    description: 'Reduce tick interval by 0.3s (1.5s → 1.2s).',
    cost: new Decimal('5e11'),
    targetNode: 'tick',
    tickReduction: 300,
    purchased: false,
  },
  {
    id: 'tick-speed-10',
    name: 'Temporal Mastery',
    description: 'Reduce tick interval by 0.2s (1.2s → 1s). Maximum speed reached.',
    cost: new Decimal('5e12'),
    targetNode: 'tick',
    tickReduction: 200,
    purchased: false,
  },
];

// Upgrades Page Loader
function loadUpgradesPage(content) {
  if (!document.getElementById('upgrades-css')) {
    const link = document.createElement('link');
    link.id   = 'upgrades-css';
    link.rel  = 'stylesheet';
    link.href = 'css/upgrades.css';
    document.head.appendChild(link);
  }

  // Track which node is selected (default to first node)
  let selectedNodeId = window.nodesData[0].id;

  content.innerHTML = `
    <div id="upgrades-tab">
      <h2 class="page-title" style="margin-bottom:8px;">${gi('upgrades', 22)} Upgrades</h2>
      <div class="upgrades-layout">
        <!-- Left: node column -->
        <div class="upgrades-node-list" id="upgrades-node-list"></div>
        <!-- Right: upgrades panel -->
        <div class="upgrades-panel" id="upgrades-panel"></div>
      </div>
    </div>
  `;

  // Render the node list (includes synthetic 'Tick Speed' entry at the top)
  function renderNodeList() {
    const list = document.getElementById('upgrades-node-list');
    if (!list) return;

    // Synthetic entries + real nodes
    const tabs = [
      { id: 'tick',  name: 'Tick Speed',  icon: null, syntheticIcon: 'tickspeed' },
      { id: 'click', name: 'Click Power', icon: null, syntheticIcon: 'click'     },
      ...window.nodesData.map(n => ({ id: n.id, name: n.name, icon: `./Assets/icons/${n.id}.png` })),
    ];

    list.innerHTML = tabs.map(tab => {
      const nodeUpgrades = window.upgradesData.filter(u => u.targetNode === tab.id);
      const available    = nodeUpgrades.filter(u => !u.purchased && new Decimal(voidenergy).gte(u.cost)).length;
      const totalOwned   = nodeUpgrades.filter(u => u.purchased).length;
      const isActive     = tab.id === selectedNodeId;
      const iconHtml     = tab.icon
        ? `<img src="${tab.icon}" alt="${tab.name}" class="node-tab-icon">`
        : `<span class="node-tab-icon node-tab-emoji">${gi(tab.syntheticIcon, 20)}</span>`;
      return `
        <div class="node-tab ${isActive ? 'active' : ''}" data-node="${tab.id}">
          ${iconHtml}
          <div class="node-tab-info">
            <span class="node-tab-name">${tab.name}</span>
            <span class="node-tab-meta">${totalOwned}/${nodeUpgrades.length} upgrades</span>
          </div>
          ${available > 0 ? `<span class="node-tab-badge">${available}</span>` : ''}
        </div>
      `;
    }).join('');

    list.querySelectorAll('.node-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        selectedNodeId = tab.dataset.node;
        renderNodeList();
        renderUpgrades();
      });
    });
  }

  // Render upgrades for the selected node
  function renderUpgrades() {
    const panel = document.getElementById('upgrades-panel');
    if (!panel) return;

    const upgrades   = window.upgradesData.filter(u => u.targetNode === selectedNodeId);
    const panelTitle = selectedNodeId === 'tick'  ? 'Tick Speed'
      : selectedNodeId === 'click' ? 'Click Power'
      : (window.nodesData.find(n => n.id === selectedNodeId) || {}).name || selectedNodeId;

    if (!upgrades.length) {
      panel.innerHTML = `<p class="upgrades-empty">No upgrades available for ${panelTitle} yet.</p>`;
      return;
    }

    const subheader = selectedNodeId === 'tick'
      ? `<p class="upgrades-tick-info">Current interval: <strong>${(getTickInterval() / 1000).toFixed(1)}s</strong> &mdash; base ${(TICK_INTERVAL / 1000).toFixed(1)}s &mdash; minimum 1s</p>`
      : selectedNodeId === 'click'
      ? `<p class="upgrades-tick-info">Current click multiplier: <strong>${(window.clickUpgradeMultiplier || 1).toFixed(2)}×</strong></p>`
      : '';

    const totalOwned   = upgrades.filter(u => u.purchased).length;
    const canAffordAny = upgrades.filter(u => !u.purchased && new Decimal(voidenergy).gte(u.cost)).length;

    // Category info row (node multiplier / tick / click summary)
    let categoryInfo = '';
    if (selectedNodeId === 'tick' || selectedNodeId === 'click') {
      categoryInfo = ''; // subheader already covers these
    } else {
      const targetNode = window.nodesData.find(n => n.id === selectedNodeId);
      const mult = targetNode ? (targetNode.productionMultiplier || new Decimal(1)).toNumber() : 1;
      categoryInfo = `
        <div class="upgrades-category-info">
          <span>Owned: <strong>${totalOwned} / ${upgrades.length}</strong></span>
          <span>Production: <strong>×${mult.toFixed(2)}</strong></span>
          ${canAffordAny > 0 ? `<span>Affordable: <strong>${canAffordAny}</strong></span>` : ''}
        </div>`;
    }

    panel.innerHTML = `
      <h3 class="upgrades-panel-title">${panelTitle} Upgrades</h3>
      ${subheader}
      ${categoryInfo}
      <div class="upgrades-list">
        ${upgrades.map(upg => {
          const canAffordNow = !upg.purchased && new Decimal(voidenergy).gte(upg.cost);
          const disabled = upg.purchased || !canAffordNow;
          const label    = upg.purchased ? 'Purchased' : formatNumber(upg.cost) + ' VE';
          const tag      = upg.tickReduction
            ? `<span class="upgrade-tag">−${upg.tickReduction / 1000}s per tick</span>`
            : upg.clickMultiplier
            ? `<span class="upgrade-tag">×${upg.clickMultiplier} click power</span>`
            : '';
          const stateClass = upg.purchased ? 'is-purchased' : canAffordNow ? 'can-afford' : '';
          return `
            <div class="upgrade-card ${stateClass}" id="${upg.id}">
              ${upg.purchased ? '<div class="upgrade-purchased-badge">✓ Owned</div>' : ''}
              <div class="upgrade-info">
                <h3>${upg.name}</h3>
                <p>${upg.description}</p>
                ${tag}
              </div>
              <button class="buy-btn" ${disabled ? 'disabled' : ''}>${label}</button>
            </div>
          `;
        }).join('')}
      </div>
    `;

    panel.querySelectorAll('.buy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cardId = btn.closest('.upgrade-card').id;
        const upg    = window.upgradesData.find(u => u.id === cardId);
        if (!upg || upg.purchased || new Decimal(voidenergy).lt(upg.cost)) return;

        voidenergy = new Decimal(voidenergy).minus(upg.cost).toNumber();
        updateDisplay('voidenergy', voidenergy);

        // Apply node production multiplier (for node upgrades)
        const targetNode = window.nodesData.find(n => n.id === upg.targetNode);
        if (targetNode && upg.multiplier) {
          targetNode.productionMultiplier =
            (targetNode.productionMultiplier || new Decimal(1)).times(upg.multiplier);
        }

        // Apply tick speed reduction (for tick upgrades)
        if (upg.tickReduction) {
          window.tickSpeedReduction = (window.tickSpeedReduction || 0) + upg.tickReduction;
        }

        // Apply click multiplier (for click upgrades)
        if (upg.clickMultiplier) {
          window.clickUpgradeMultiplier = (window.clickUpgradeMultiplier || 1) * upg.clickMultiplier;
        }

        upg.purchased = true;
        refreshNodeStats();
        if (typeof updateHomeDynamic === 'function') updateHomeDynamic();
        try { if (typeof tryUnlockAchievements === 'function') tryUnlockAchievements(); } catch (err) { console.error('[Achievement error]', err); }
        updateUpgradeButtons();
      });
    });
  }

  // Poll to keep buy buttons and badges in sync as VE changes.
  // Only mutates existing DOM elements — never rebuilds innerHTML — so hover states are preserved.
  function updateUpgradeButtons() {
    if (!document.getElementById('upgrades-tab')) {
      clearInterval(window.upgradesInterval);
      window.upgradesInterval = null;
      return;
    }

    // Update badge and meta for synthetic tabs (tick + click)
    ['tick', 'click'].forEach(syntheticId => {
      const syntheticTab = document.querySelector(`.node-tab[data-node="${syntheticId}"]`);
      if (!syntheticTab) return;
      const syntheticUpgrades = window.upgradesData.filter(u => u.targetNode === syntheticId);
      const available  = syntheticUpgrades.filter(u => !u.purchased && new Decimal(voidenergy).gte(u.cost)).length;
      const totalOwned = syntheticUpgrades.filter(u => u.purchased).length;
      const meta = syntheticTab.querySelector('.node-tab-meta');
      if (meta) meta.textContent = `${totalOwned}/${syntheticUpgrades.length} upgrades`;
      let badge = syntheticTab.querySelector('.node-tab-badge');
      if (available > 0) {
        if (!badge) { badge = document.createElement('span'); badge.className = 'node-tab-badge'; syntheticTab.appendChild(badge); }
        badge.textContent = available;
      } else if (badge) { badge.remove(); }
    });

    // Update badges on node tabs
    window.nodesData.forEach(node => {
      const tab = document.querySelector(`.node-tab[data-node="${node.id}"]`);
      if (!tab) return;
      const nodeUpgrades = window.upgradesData.filter(u => u.targetNode === node.id);
      const available    = nodeUpgrades.filter(u => !u.purchased && new Decimal(voidenergy).gte(u.cost)).length;
      const totalOwned   = nodeUpgrades.filter(u => u.purchased).length;

      // Update meta text
      const meta = tab.querySelector('.node-tab-meta');
      if (meta) meta.textContent = `${totalOwned}/${nodeUpgrades.length} upgrades`;

      // Add/remove/update badge without touching the tab itself
      let badge = tab.querySelector('.node-tab-badge');
      if (available > 0) {
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'node-tab-badge';
          tab.appendChild(badge);
        }
        badge.textContent = available;
      } else if (badge) {
        badge.remove();
      }
    });

    // Update buy buttons and card affordability state
    window.upgradesData.filter(u => u.targetNode === selectedNodeId).forEach(upg => {
      const card = document.getElementById(upg.id);
      const btn  = card ? card.querySelector('.buy-btn') : null;
      if (!btn) return;
      if (upg.purchased) {
        btn.disabled    = true;
        btn.textContent = 'Purchased';
        if (card) card.classList.remove('can-afford');
      } else {
        const canAfford = new Decimal(voidenergy).gte(upg.cost);
        btn.disabled    = !canAfford;
        btn.textContent = formatNumber(upg.cost) + ' VE';
        if (card) card.classList.toggle('can-afford', canAfford);
      }
    });

    // Live-refresh subheader info for tick and click tabs
    const tickInfo = document.querySelector('.upgrades-tick-info');
    if (tickInfo) {
      if (selectedNodeId === 'tick') {
        tickInfo.innerHTML = `Current interval: <strong>${(getTickInterval() / 1000).toFixed(1)}s</strong> &mdash; base ${(TICK_INTERVAL / 1000).toFixed(1)}s &mdash; minimum 1s`;
      } else if (selectedNodeId === 'click') {
        tickInfo.innerHTML = `Current click multiplier: <strong>${(window.clickUpgradeMultiplier || 1).toFixed(2)}×</strong>`;
      }
    }
  }

  renderNodeList();
  renderUpgrades();

  if (!window.upgradesInterval) {
    window.upgradesInterval = setInterval(updateUpgradeButtons, 500);
  }
}

window.loadUpgradesPage = loadUpgradesPage;
