// achievements.js

window.achievementsData = window.achievementsData || [

  // ── Void Energy ────────────────────────────────────────────────────────────
  { id: 'first-click',    category: 'Void Energy', icon: 'ach-spark',   title: 'First Spark',          description: 'Generate Void Energy for the first time.',        unlocked: false, claimed: false },
  { id: 'hundred-ve',     category: 'Void Energy', icon: 'ach-ve-100',  title: 'Faint Glow',           description: 'Accumulate 100 Void Energy.',                     unlocked: false, claimed: false },
  { id: 've-1k',          category: 'Void Energy', icon: 'ach-ve-1k',   title: 'Flickering Shard',     description: 'Accumulate 1,000 Void Energy.',                   unlocked: false, claimed: false },
  { id: 'tenthousand-ve', category: 'Void Energy', icon: 'ach-ve-10k',  title: 'Void Cluster',         description: 'Accumulate 10,000 Void Energy.',                  unlocked: false, claimed: false },
  { id: 've-100k',        category: 'Void Energy', icon: 'ach-ve-100k', title: 'Resonant Crystal',     description: 'Accumulate 100,000 Void Energy.',                 unlocked: false, claimed: false },
  { id: 'million-ve',     category: 'Void Energy', icon: 'ach-ve-1m',   title: 'Prismatic Core',       description: 'Accumulate 1 Million Void Energy.',               unlocked: false, claimed: false },
  { id: 've-10m',         category: 'Void Energy', icon: 'ach-ve-10m',  title: 'Orbital Nexus',        description: 'Accumulate 10 Million Void Energy.',              unlocked: false, claimed: false },
  { id: 've-100m',        category: 'Void Energy', icon: 'ach-ve-1b',   title: 'Dark Reservoir',       description: 'Accumulate 100 Million Void Energy.',             unlocked: false, claimed: false },
  { id: 'billion-ve',     category: 'Void Energy', icon: 'ach-ve-1b',   title: 'Abyssal Trove',        description: 'Accumulate 1 Billion Void Energy.',               unlocked: false, claimed: false },
  { id: 've-100b',        category: 'Void Energy', icon: 'ach-ve-1t',   title: 'Void Flood',           description: 'Accumulate 100 Billion Void Energy.',             unlocked: false, claimed: false },
  { id: 've-1t',          category: 'Void Energy', icon: 'ach-ve-1t',   title: 'Ancient Conduit',      description: 'Accumulate 1 Trillion Void Energy.',              unlocked: false, claimed: false },
  { id: 've-100t',        category: 'Void Energy', icon: 'ach-ve-1t',   title: 'Eternal Stream',       description: 'Accumulate 100 Trillion Void Energy.',            unlocked: false, claimed: false },
  { id: 've-1q',          category: 'Void Energy', icon: 'ach-ve-1q',   title: 'Transcendence',        description: 'Accumulate 1 Quadrillion Void Energy.',           unlocked: false, claimed: false },
  { id: 've-1qa',         category: 'Void Energy', icon: 'ach-ve-1q',   title: 'Quintessence',         description: 'Accumulate 1 Quintillion Void Energy.',           unlocked: false, claimed: false },
  { id: 've-1sx',         category: 'Void Energy', icon: 'ach-ve-1q',   title: 'Beyond Measure',       description: 'Accumulate 1 Sextillion Void Energy.',            unlocked: false, claimed: false },

  // ── Clicking ───────────────────────────────────────────────────────────────
  { id: 'click-10',   category: 'Clicking', icon: 'ach-click10',   title: 'Curious Touch',       description: 'Click the void orb 25 times.',                     unlocked: false, claimed: false },
  { id: 'click-100',  category: 'Clicking', icon: 'ach-click100',  title: 'Persistent Hand',     description: 'Click the void orb 250 times.',                    unlocked: false, claimed: false },
  { id: 'click-500',  category: 'Clicking', icon: 'ach-click100',  title: 'Getting Warmed Up',   description: 'Click the void orb 750 times.',                    unlocked: false, claimed: false },
  { id: 'click-1k',   category: 'Clicking', icon: 'ach-click1k',   title: 'Void Tapper',         description: 'Click the void orb 2,500 times.',                  unlocked: false, claimed: false },
  { id: 'click-5k',   category: 'Clicking', icon: 'ach-click1k',   title: 'Void Rhythm',         description: 'Click the void orb 7,500 times.',                  unlocked: false, claimed: false },
  { id: 'click-10k',  category: 'Clicking', icon: 'ach-click10k',  title: 'Relentless',          description: 'Click the void orb 15,000 times.',                 unlocked: false, claimed: false },
  { id: 'click-50k',  category: 'Clicking', icon: 'ach-click50k',  title: 'Devoted to the Void', description: 'Click the void orb 75,000 times. Your finger hurts.', unlocked: false, claimed: false },
  { id: 'click-100k', category: 'Clicking', icon: 'ach-click10k',  title: 'Callused Finger',     description: 'Click the void orb 150,000 times.',                unlocked: false, claimed: false },
  { id: 'click-250k', category: 'Clicking', icon: 'ach-click50k',  title: 'Compulsive',          description: 'Click the void orb 350,000 times.',                unlocked: false, claimed: false },
  { id: 'click-500k', category: 'Clicking', icon: 'ach-click50k',  title: 'Half a Million Taps', description: 'Click the void orb 750,000 times.',                unlocked: false, claimed: false },
  { id: 'click-1m',   category: 'Clicking', icon: 'ach-click50k',  title: 'One in a Million',    description: 'Click the void orb 1,500,000 times. Click God!',   unlocked: false, claimed: false },

  // ── Nodes ──────────────────────────────────────────────────────────────────
  { id: 'node-abyssal-first',    category: 'Nodes', icon: 'ach-node-abyssal',    title: 'First Fragment',    description: 'Purchase your first Abyssal Shard.',     unlocked: false, claimed: false },
  { id: 'abyssal-10',            category: 'Nodes', icon: 'ach-node-abyssal',    title: 'Shard Collection',  description: 'Own 25 Abyssal Shards.',                  unlocked: false, claimed: false },
  { id: 'abyssal-25',            category: 'Nodes', icon: 'ach-node-abyssal',    title: 'Crystal Array',     description: 'Own 75 Abyssal Shards.',                  unlocked: false, claimed: false },
  { id: 'node-whisper-first',    category: 'Nodes', icon: 'ach-node-whisper',    title: 'Faint Signal',      description: 'Purchase your first Whisper Engine.',     unlocked: false, claimed: false },
  { id: 'whisper-10',            category: 'Nodes', icon: 'ach-node-whisper',    title: 'Echo Chamber',      description: 'Own 20 Whisper Engines.',                 unlocked: false, claimed: false },
  { id: 'whisper-25',            category: 'Nodes', icon: 'ach-node-whisper',    title: 'Resonance Field',   description: 'Own 60 Whisper Engines.',                 unlocked: false, claimed: false },
  { id: 'node-darkmatter-first', category: 'Nodes', icon: 'ach-node-darkmatter', title: 'Looping Darkness',  description: 'Purchase your first Dark Matter Loop.',   unlocked: false, claimed: false },
  { id: 'darkmatter-10',         category: 'Nodes', icon: 'ach-node-darkmatter', title: 'Loop Network',      description: 'Own 18 Dark Matter Loops.',               unlocked: false, claimed: false },
  { id: 'darkmatter-25',         category: 'Nodes', icon: 'ach-node-darkmatter', title: 'Dark Web',          description: 'Own 50 Dark Matter Loops.',               unlocked: false, claimed: false },
  { id: 'node-voidbloom-first',  category: 'Nodes', icon: 'ach-node-voidbloom',  title: 'First Petal',       description: 'Purchase your first Void Bloom.',         unlocked: false, claimed: false },
  { id: 'voidbloom-10',          category: 'Nodes', icon: 'ach-node-voidbloom',  title: 'Flower Bed',        description: 'Own 15 Void Blooms.',                     unlocked: false, claimed: false },
  { id: 'voidbloom-25',          category: 'Nodes', icon: 'ach-node-voidbloom',  title: 'Blooming Fields',   description: 'Own 40 Void Blooms.',                     unlocked: false, claimed: false },
  { id: 'node-graviton-first',   category: 'Nodes', icon: 'ach-node-graviton',   title: "Gravity's Pull",    description: 'Purchase your first Graviton Seeder.',    unlocked: false, claimed: false },
  { id: 'graviton-10',           category: 'Nodes', icon: 'ach-node-graviton',   title: 'Gravity Well Array',description: 'Own 12 Graviton Seeders.',                unlocked: false, claimed: false },
  { id: 'graviton-25',           category: 'Nodes', icon: 'ach-node-graviton',   title: 'Orbital Cluster',   description: 'Own 35 Graviton Seeders.',                unlocked: false, claimed: false },
  { id: 'node-nullbeacon-first', category: 'Nodes', icon: 'ach-node-nullbeacon', title: 'Broadcasting Null', description: 'Purchase your first Null Beacon.',        unlocked: false, claimed: false },
  { id: 'nullbeacon-10',         category: 'Nodes', icon: 'ach-node-nullbeacon', title: 'Signal Network',    description: 'Own 10 Null Beacons.',                    unlocked: false, claimed: false },
  { id: 'nullbeacon-25',         category: 'Nodes', icon: 'ach-node-nullbeacon', title: 'Null Grid',         description: 'Own 30 Null Beacons.',                    unlocked: false, claimed: false },
  { id: 'node-oblivion-first',   category: 'Nodes', icon: 'ach-node-oblivion',   title: 'The Spire Rises',   description: 'Purchase your first Oblivion Spire.',     unlocked: false, claimed: false },
  { id: 'oblivion-10',           category: 'Nodes', icon: 'ach-node-oblivion',   title: 'Spire Forest',      description: 'Own 8 Oblivion Spires.',                  unlocked: false, claimed: false },
  { id: 'oblivion-25',           category: 'Nodes', icon: 'ach-node-oblivion',   title: 'Pillars of Oblivion',description: 'Own 25 Oblivion Spires.',                unlocked: false, claimed: false },
  { id: 'nodes-10',   category: 'Nodes', icon: 'ach-nodes10',  title: 'Node Cluster',      description: 'Own 25 nodes total across all types.',      unlocked: false, claimed: false },
  { id: 'nodes-25',   category: 'Nodes', icon: 'ach-nodes25',  title: 'Void Network',      description: 'Own 75 nodes total across all types.',      unlocked: false, claimed: false },
  { id: 'nodes-50',   category: 'Nodes', icon: 'ach-nodes50',  title: 'Node Constellation',description: 'Own 150 nodes total across all types.',     unlocked: false, claimed: false },
  { id: 'nodes-100',  category: 'Nodes', icon: 'ach-nodes100', title: 'Infinite Web',      description: 'Own 350 nodes total across all types.',     unlocked: false, claimed: false },
  { id: 'nodes-200',  category: 'Nodes', icon: 'ach-nodes100', title: 'Void Empire',       description: 'Own 500 nodes total across all types.',     unlocked: false, claimed: false },
  { id: 'nodes-500',  category: 'Nodes', icon: 'ach-nodes100', title: 'Infinite Expanse',  description: 'Own 1,000 nodes total across all types.',   unlocked: false, claimed: false },
  { id: 'nodes-1000', category: 'Nodes', icon: 'ach-nodes100', title: 'Voidlord',          description: 'Own 2,500 nodes total across all types.',   unlocked: false, claimed: false },

  // ── Upgrades ───────────────────────────────────────────────────────────────
  { id: 'upgrade-first', category: 'Upgrades', icon: 'ach-upg1',   title: 'Enhanced',        description: 'Purchase 3 upgrades.',                               unlocked: false, claimed: false },
  { id: 'upgrade-5',     category: 'Upgrades', icon: 'ach-upg5',   title: 'Power Surge',     description: 'Purchase 10 upgrades.',                              unlocked: false, claimed: false },
  { id: 'upgrade-10',    category: 'Upgrades', icon: 'ach-upg10',  title: 'Optimised',       description: 'Purchase 20 upgrades.',                              unlocked: false, claimed: false },
  { id: 'upgrade-25',    category: 'Upgrades', icon: 'ach-upg10',  title: 'Refined',         description: 'Purchase 35 upgrades.',                              unlocked: false, claimed: false },
  { id: 'upgrade-50',    category: 'Upgrades', icon: 'ach-upgall', title: 'Perfected',       description: 'Purchase 60 upgrades.',                              unlocked: false, claimed: false },
  { id: 'upgrade-tree',  category: 'Upgrades', icon: 'ach-upgall', title: 'Fully Committed', description: 'Purchase all 10 upgrades in a single tree.',         unlocked: false, claimed: false },
  { id: 'upgrade-all',   category: 'Upgrades', icon: 'ach-upgall', title: 'Void Mastery',    description: 'Purchase every available upgrade.',                  unlocked: false, claimed: false },

  // ── Tick Speed ─────────────────────────────────────────────────────────────
  { id: 'tick-speed-first', category: 'Tick Speed', icon: 'ach-tick1',    title: 'A Little Faster', description: 'Purchase your first tick speed upgrade.',                unlocked: false, claimed: false },
  { id: 'tick-6s',          category: 'Tick Speed', icon: 'ach-tick1',    title: 'Picking Up Pace', description: 'Reduce your tick interval to 6 seconds or below.',        unlocked: false, claimed: false },
  { id: 'tick-fast',        category: 'Tick Speed', icon: 'ach-tickfast', title: 'Accelerating',    description: 'Reduce your tick interval to 4 seconds or below.',        unlocked: false, claimed: false },
  { id: 'tick-2s',          category: 'Tick Speed', icon: 'ach-tickfast', title: 'Nearly Instant',  description: 'Reduce your tick interval to 2 seconds or below.',        unlocked: false, claimed: false },
  { id: 'tick-fastest',     category: 'Tick Speed', icon: 'ach-tickmax',  title: 'Infinite Loop',   description: 'Reduce your tick interval to its minimum (1 second).', unlocked: false, claimed: false },

  // ── Prestige ───────────────────────────────────────────────────────────────
  { id: 'prestige-first', category: 'Prestige', icon: 'ach-prestige1', title: 'Reborn',              description: 'Perform your first prestige reset.', unlocked: false, claimed: false },
  { id: 'prestige-5',     category: 'Prestige', icon: 'ach-prestige5', title: 'Cycle of the Void',   description: 'Prestige 8 times.',                  unlocked: false, claimed: false },
  { id: 'prestige-10',    category: 'Prestige', icon: 'ach-prestige5', title: 'Veteran of the Void', description: 'Prestige 10 times.',                 unlocked: false, claimed: false },
  { id: 'prestige-25',    category: 'Prestige', icon: 'ach-prestige5', title: 'Eternal Seeker',      description: 'Prestige 25 times.',                 unlocked: false, claimed: false },
  { id: 'prestige-50',    category: 'Prestige', icon: 'ach-prestige5', title: 'Void Incarnate',      description: 'Prestige 50 times.',                 unlocked: false, claimed: false },

  // ── Orbs ───────────────────────────────────────────────────────────────────
  { id: 'orb-first', category: 'Orbs', icon: 'ach-spark',    title: 'Awakened',         description: 'Purchase your first orb from the shop.',  unlocked: false, claimed: false },
  { id: 'orb-3',     category: 'Orbs', icon: 'ach-spark',    title: 'Collector',        description: 'Own 3 orbs.',                              unlocked: false, claimed: false },
  { id: 'orb-5',     category: 'Orbs', icon: 'ach-spark',    title: 'Orb Hoarder',      description: 'Own 5 orbs.',                              unlocked: false, claimed: false },
  { id: 'orb-all',   category: 'Orbs', icon: 'ach-upgall',   title: 'The Full Arsenal', description: 'Own every orb in the shop.',               unlocked: false, claimed: false },
  { id: 'orb-auto',  category: 'Orbs', icon: 'ach-tickfast', title: 'Set and Forget',   description: 'Equip an orb with an auto-click ability.', unlocked: false, claimed: false },

  // ── Production ─────────────────────────────────────────────────────────────
  { id: 'vept-100', category: 'Production', icon: 'ach-ve-100', title: 'Productive',       description: 'Reach 100 Void Energy per tick.',          unlocked: false, claimed: false },
  { id: 'vept-1k',  category: 'Production', icon: 'ach-ve-1k',  title: 'Power Plant',      description: 'Reach 1,000 Void Energy per tick.',        unlocked: false, claimed: false },
  { id: 'vept-10k', category: 'Production', icon: 'ach-ve-10k', title: 'Void Reactor',     description: 'Reach 10,000 Void Energy per tick.',       unlocked: false, claimed: false },
  { id: 'vept-1m',  category: 'Production', icon: 'ach-ve-1m',  title: 'Limitless Output', description: 'Reach 1 Million Void Energy per tick.',    unlocked: false, claimed: false },
  { id: 'vept-1b',  category: 'Production', icon: 'ach-ve-1b',  title: 'Industrial Void',  description: 'Reach 1 Billion Void Energy per tick.',    unlocked: false, claimed: false },

  // ── Special ────────────────────────────────────────────────────────────────
  { id: 'idle-explorer',  category: 'Special', icon: 'ach-idle',     title: 'Idle Explorer',         description: 'Keep the game open for 10 continuous minutes.',       unlocked: false, claimed: false },
  { id: 'idle-30min',     category: 'Special', icon: 'ach-idle',     title: 'Patient One',           description: 'Keep the game open for 30 continuous minutes.',       unlocked: false, claimed: false },
  { id: 'idle-1hr',       category: 'Special', icon: 'ach-idle',     title: 'Dedicated Void Keeper', description: 'Keep the game open for 1 continuous hour.',           unlocked: false, claimed: false },
  { id: 'void-sage',      category: 'Special', icon: 'ach-idle',     title: 'Void Sage',             description: 'Accumulate 10 hours of total lifetime playtime.',     unlocked: false, claimed: false },
  { id: 'void-rich',      category: 'Special', icon: 'ach-voidrich', title: 'Void Wealthy',          description: 'Hold 5 Million Void Energy at one time.',             unlocked: false, claimed: false },
  { id: 'hold-100m',      category: 'Special', icon: 'ach-voidrich', title: 'Sitting on a Fortune',  description: 'Hold 500 Million Void Energy at one time.',           unlocked: false, claimed: false },
  { id: 'hold-1b',        category: 'Special', icon: 'ach-voidrich', title: 'Billionaire',           description: 'Hold 10 Billion Void Energy at one time.',            unlocked: false, claimed: false },
  { id: 'hold-1t',        category: 'Special', icon: 'ach-voidrich', title: 'Beyond Wealth',         description: 'Hold 5 Trillion Void Energy at one time.',            unlocked: false, claimed: false },
  { id: 'hold-1q',        category: 'Special', icon: 'ach-voidrich', title: 'Incomprehensible',      description: 'Hold 5 Quadrillion Void Energy at one time.',         unlocked: false, claimed: false },
  { id: 'node-all-types', category: 'Special', icon: 'ach-nodes50',  title: 'Diversified',           description: 'Own at least 3 of every node type.',                 unlocked: false, claimed: false },
  { id: 'void-symphony',  category: 'Special', icon: 'ach-nodes50',  title: 'In Harmony',            description: 'Own at least 15 of every node type.',                unlocked: false, claimed: false },
  { id: 'void-colossus',  category: 'Special', icon: 'ach-nodes100', title: 'Void Colossus',         description: 'Own at least 50 of every node type.',                unlocked: false, claimed: false },
  { id: 'first-combo',    category: 'Special', icon: 'ach-spark',    title: 'Combo Starter',         description: 'Land 5 combo hits.',                                 unlocked: false, claimed: false },
  { id: 'combo-50',       category: 'Special', icon: 'ach-click100', title: 'On a Roll',             description: 'Land 200 combo hits.',                                unlocked: false, claimed: false },
  { id: 'first-crit',     category: 'Special', icon: 'ach-spark',    title: 'Critical Moment',       description: 'Land 5 critical hits.',                              unlocked: false, claimed: false },
  { id: 'crit-50',        category: 'Special', icon: 'ach-click100', title: 'Sharp Eye',             description: 'Land 200 critical hits.',                             unlocked: false, claimed: false },
  { id: 'first-cascade',  category: 'Special', icon: 'ach-spark',    title: 'Chain Reaction',        description: 'Trigger 5 cascades.',                                unlocked: false, claimed: false },
  { id: 'cascade-50',     category: 'Special', icon: 'ach-click100', title: 'Cascading Power',       description: 'Trigger 200 cascades.',                               unlocked: false, claimed: false },
  { id: 'legendary',      category: 'Special', icon: 'ach-upgall',   title: 'Legendary',             description: 'Own every orb and purchase every upgrade.',           unlocked: false, claimed: false },

];

// ── Achievement Rewards ────────────────────────────────────────────────────
// type 'prod'  → permanent additive % bonus to VE/tick  (value = fraction, e.g. 0.01 = +1%)
// type 'click' → permanent additive % bonus to click power (value = fraction)
// type 've'    → one-time VE payout (value = raw VE amount)
// null         → reward TBD (prestige achievements)
const ACHIEVEMENT_REWARDS = {
  // Void Energy milestones
  'first-click':    { type: 'prod',  value: 0.005, label: '+0.5% VE/tick'     },
  'hundred-ve':     { type: 'prod',  value: 0.005, label: '+0.5% VE/tick'     },
  've-1k':          { type: 'prod',  value: 0.005, label: '+0.5% VE/tick'     },
  'tenthousand-ve': { type: 'prod',  value: 0.01,  label: '+1% VE/tick'       },
  've-100k':        { type: 'prod',  value: 0.01,  label: '+1% VE/tick'       },
  'million-ve':     { type: 'prod',  value: 0.01,  label: '+1% VE/tick'       },
  've-10m':         { type: 'prod',  value: 0.02,  label: '+2% VE/tick'       },
  've-100m':        { type: 'prod',  value: 0.02,  label: '+2% VE/tick'       },
  'billion-ve':     { type: 'prod',  value: 0.02,  label: '+2% VE/tick'       },
  've-100b':        { type: 'prod',  value: 0.03,  label: '+3% VE/tick'       },
  've-1t':          { type: 'prod',  value: 0.03,  label: '+3% VE/tick'       },
  've-100t':        { type: 'prod',  value: 0.03,  label: '+3% VE/tick'       },
  've-1q':          { type: 'prod',  value: 0.05,  label: '+5% VE/tick'       },
  've-1qa':         { type: 'prod',  value: 0.05,  label: '+5% VE/tick'       },
  've-1sx':         { type: 'prod',  value: 0.05,  label: '+5% VE/tick'       },

  // Clicking milestones
  'click-10':   { type: 'click', value: 1, label: '+100% click power' },
  'click-100':  { type: 'click', value: 1, label: '+100% click power' },
  'click-500':  { type: 'click', value: 1, label: '+100% click power' },
  'click-1k':   { type: 'click', value: 1, label: '+100% click power' },
  'click-5k':   { type: 'click', value: 1, label: '+100% click power' },
  'click-10k':  { type: 'click', value: 1, label: '+100% click power' },
  'click-50k':  { type: 'click', value: 1, label: '+100% click power' },
  'click-100k': { type: 'click', value: 1, label: '+100% click power' },
  'click-250k': { type: 'click', value: 1, label: '+100% click power' },
  'click-500k': { type: 'click', value: 1, label: '+100% click power' },
  'click-1m':   { type: 'click', value: 1, label: '+100% click power' },

  // Node first purchase — VE payouts to bootstrap the next tier
  'node-abyssal-first':    { type: 've', value: 100,        label: '+100 VE'       },
  'node-whisper-first':    { type: 've', value: 500,        label: '+500 VE'       },
  'node-darkmatter-first': { type: 've', value: 2000,       label: '+2,000 VE'     },
  'node-voidbloom-first':  { type: 've', value: 25000,      label: '+25,000 VE'    },
  'node-graviton-first':   { type: 've', value: 150000,     label: '+150,000 VE'   },
  'node-nullbeacon-first': { type: 've', value: 1000000,    label: '+1M VE'        },
  'node-oblivion-first':   { type: 've', value: 10000000,   label: '+10M VE'       },

  // Node total count
  'nodes-10':   { type: 'prod', value: 0.01, label: '+1% VE/tick'  },
  'nodes-25':   { type: 'prod', value: 0.01, label: '+1% VE/tick'  },
  'nodes-50':   { type: 'prod', value: 0.02, label: '+2% VE/tick'  },
  'nodes-100':  { type: 'prod', value: 0.02, label: '+2% VE/tick'  },
  'nodes-200':  { type: 'prod', value: 0.03, label: '+3% VE/tick'  },
  'nodes-500':  { type: 'prod', value: 0.05, label: '+5% VE/tick'  },
  'nodes-1000': { type: 'prod', value: 0.05, label: '+5% VE/tick'  },

  // Node counts per type
  'abyssal-10':    { type: 'prod', value: 0.01, label: '+1% VE/tick' },
  'abyssal-25':    { type: 'prod', value: 0.01, label: '+1% VE/tick' },
  'whisper-10':    { type: 'prod', value: 0.01, label: '+1% VE/tick' },
  'whisper-25':    { type: 'prod', value: 0.01, label: '+1% VE/tick' },
  'darkmatter-10': { type: 'prod', value: 0.01, label: '+1% VE/tick' },
  'darkmatter-25': { type: 'prod', value: 0.01, label: '+1% VE/tick' },
  'voidbloom-10':  { type: 'prod', value: 0.01, label: '+1% VE/tick' },
  'voidbloom-25':  { type: 'prod', value: 0.02, label: '+2% VE/tick' },
  'graviton-10':   { type: 'prod', value: 0.02, label: '+2% VE/tick' },
  'graviton-25':   { type: 'prod', value: 0.02, label: '+2% VE/tick' },
  'nullbeacon-10': { type: 'prod', value: 0.02, label: '+2% VE/tick' },
  'nullbeacon-25': { type: 'prod', value: 0.03, label: '+3% VE/tick' },
  'oblivion-10':   { type: 'prod', value: 0.03, label: '+3% VE/tick' },
  'oblivion-25':   { type: 'prod', value: 0.03, label: '+3% VE/tick' },

  // Upgrades
  'upgrade-first': { type: 'prod', value: 0.01,  label: '+1% VE/tick'  },
  'upgrade-5':     { type: 'prod', value: 0.01,  label: '+1% VE/tick'  },
  'upgrade-10':    { type: 'prod', value: 0.02,  label: '+2% VE/tick'  },
  'upgrade-25':    { type: 'prod', value: 0.02,  label: '+2% VE/tick'  },
  'upgrade-50':    { type: 'prod', value: 0.03,  label: '+3% VE/tick'  },
  'upgrade-tree':  { type: 'prod', value: 0.05,  label: '+5% VE/tick'  },
  'upgrade-all':   { type: 'prod', value: 0.10,  label: '+10% VE/tick' },

  // Tick speed
  'tick-speed-first': { type: 'prod', value: 0.01, label: '+1% VE/tick' },
  'tick-6s':          { type: 'prod', value: 0.02, label: '+2% VE/tick' },
  'tick-fast':        { type: 'prod', value: 0.03, label: '+3% VE/tick' },
  'tick-2s':          { type: 'prod', value: 0.03, label: '+3% VE/tick' },
  'tick-fastest':     { type: 'prod', value: 0.05, label: '+5% VE/tick' },

  // Prestige — TBD
  'prestige-first': null,
  'prestige-5':     null,
  'prestige-10':    null,
  'prestige-25':    null,
  'prestige-50':    null,

  // Special
  'idle-explorer':  { type: 'prod',  value: 0.02,     label: '+2% VE/tick'    },
  'void-rich':      { type: 've',    value: 500000,    label: '+500,000 VE'    },
  'hold-100m':      { type: 'prod',  value: 0.01,      label: '+1% VE/tick'    },
  'hold-1b':        { type: 'prod',  value: 0.02,      label: '+2% VE/tick'    },
  'hold-1t':        { type: 'prod',  value: 0.03,      label: '+3% VE/tick'    },
  'hold-1q':        { type: 'prod',  value: 0.05,      label: '+5% VE/tick'    },
  'idle-30min':     { type: 'prod',  value: 0.02,      label: '+2% VE/tick'    },
  'idle-1hr':       { type: 'prod',  value: 0.03,      label: '+3% VE/tick'    },
  'void-sage':      { type: 'prod',  value: 0.05,      label: '+5% VE/tick'    },
  'node-all-types': { type: 'prod',  value: 0.03,      label: '+3% VE/tick'    },
  'void-symphony':  { type: 'prod',  value: 0.05,      label: '+5% VE/tick'    },
  'void-colossus':  { type: 'prod',  value: 0.10,      label: '+10% VE/tick'   },
  'first-combo':    { type: 'click', value: 1, label: '+100% click power' },
  'first-crit':     { type: 'click', value: 1, label: '+100% click power' },
  'first-cascade':  { type: 'click', value: 1, label: '+100% click power' },
  'combo-50':       { type: 'click', value: 1, label: '+100% click power' },
  'crit-50':        { type: 'click', value: 1, label: '+100% click power' },
  'cascade-50':     { type: 'click', value: 1, label: '+100% click power' },
  'legendary':      { type: 'prod',  value: 0.25,      label: '+25% VE/tick'   },

  // Orbs
  'orb-first': { type: 'click', value: 1, label: '+100% click power' },
  'orb-3':     { type: 'click', value: 1, label: '+100% click power' },
  'orb-5':     { type: 'click', value: 1, label: '+100% click power' },
  'orb-all':   { type: 'click', value: 1, label: '+100% click power' },
  'orb-auto':  { type: 'click', value: 1, label: '+100% click power' },

  // Production rate
  'vept-100':  { type: 'prod', value: 0.01, label: '+1% VE/tick'  },
  'vept-1k':   { type: 'prod', value: 0.02, label: '+2% VE/tick'  },
  'vept-10k':  { type: 'prod', value: 0.03, label: '+3% VE/tick'  },
  'vept-1m':   { type: 'prod', value: 0.05, label: '+5% VE/tick'  },
  'vept-1b':   { type: 'prod', value: 0.05, label: '+5% VE/tick'  },
};
window.ACHIEVEMENT_REWARDS = ACHIEVEMENT_REWARDS;

function applyAchievementReward(id) {
  const reward = ACHIEVEMENT_REWARDS[id];
  if (!reward) return;
  if (reward.type === 'prod') {
    window.achievementProdBonus = (window.achievementProdBonus || 0) + reward.value;
  } else if (reward.type === 'click') {
    window.achievementClickBonus = (window.achievementClickBonus || 0) + reward.value;
  } else if (reward.type === 've') {
    voidenergy   = Math.ceil(voidenergy + reward.value);
    lifetimeVE   = lifetimeVE.plus(reward.value);
    updateDisplay('voidenergy', voidenergy);
  }
}

function unlockAchievement(id) {
  const ach = window.achievementsData.find(a => a.id === id);
  if (ach && !ach.unlocked) {
    ach.unlocked = true;
    ach.claimed  = true;
    applyAchievementReward(id);
    if (typeof saveGame === 'function') saveGame();
    showAchievementToast(ach);
    // If the achievements page is open, patch the specific card in-place (preserves scroll).
    const card = document.getElementById(id);
    if (card) {
      const reward = ACHIEVEMENT_REWARDS[id];
      card.className = 'achievement-card is-unlocked';
      const iconWrap = card.querySelector('.ach-icon-wrap');
      if (iconWrap) iconWrap.className = 'ach-icon-wrap';
      const info = card.querySelector('.achievement-info');
      if (info) {
        const rewardHtml = reward ? `<span class="ach-reward-badge">${reward.label}</span>` : '';
        info.innerHTML = `<h3>${ach.title}</h3><p>${ach.description}</p>${rewardHtml}`;
      }
      const countBadge = document.querySelector('.ach-count-badge');
      if (countBadge) countBadge.textContent = `${window.achievementsData.filter(a => a.unlocked).length} / ${window.achievementsData.length}`;
    }
  }
}

function showAchievementToast(ach) {
  let container = document.getElementById('ach-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'ach-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'ach-toast';
  toast.innerHTML = `
    <div class="ach-toast-header">
      <span class="ach-toast-icon">${gi(ach.icon, 22)}</span>
      <span class="ach-toast-label">Achievement Unlocked</span>
    </div>
    <div class="ach-toast-title">${ach.title}</div>
    <div class="ach-toast-desc">${ach.description}</div>
    <div class="ach-toast-bar"></div>
  `;
  container.appendChild(toast);

  const DISPLAY_MS = 3200;
  const OUT_MS     = 350;
  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), OUT_MS);
  }, DISPLAY_MS);
}

function loadAchievementsPage(content) {
  if (!document.getElementById('achievements-css')) {
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'css/achievements.css';
    link.id   = 'achievements-css';
    document.head.appendChild(link);
  }

  const categories = [...new Set(window.achievementsData.map(a => a.category))];

  content.innerHTML = `
    <div id="achievements-tab" class="page-root">
      <h2 class="page-title">${gi('achievements', 22)} Achievements
        <span class="ach-count-badge">${window.achievementsData.filter(a => a.unlocked).length} / ${window.achievementsData.length}</span>
      </h2>
      <div class="page-card">
      <div class="achievements-list">
        ${categories.map(cat => {
          const group = window.achievementsData.filter(a => a.category === cat);
          return `
            <div class="ach-category-header">${cat}</div>
            ${group.map(a => {
              const reward = ACHIEVEMENT_REWARDS[a.id];
              const rewardHtml = reward
                ? `<span class="ach-reward-badge ${a.unlocked ? '' : 'is-claimed'}">${reward.label}</span>`
                : '';
              return `
              <div class="achievement-card ${a.unlocked ? 'is-unlocked' : 'is-locked'}" id="${a.id}">
                <div class="ach-icon-wrap${a.unlocked ? '' : ' ach-icon-locked'}">${gi(a.icon, 30)}</div>
                <div class="achievement-info">
                  <h3>${a.unlocked ? a.title : '???'}</h3>
                  <p>${a.unlocked ? a.description : 'Keep playing to unlock.'}</p>
                  ${rewardHtml}
                </div>
              </div>
            `}).join('')}
          `;
        }).join('')}
      </div>
      </div>
    </div>
  `;
}

window.loadAchievementsPage = loadAchievementsPage;
window.unlockAchievement    = unlockAchievement;
