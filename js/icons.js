// icons.js — Hand-crafted SVG icon library for Void Idle
// All icons use stroke="currentColor" so they inherit whatever CSS color is set.
// Usage: GameIcons.nodes  →  raw SVG string, inject directly into innerHTML.

window.GameIcons = {

  // ─── Navigation ──────────────────────────────────────────────────────────────

  // Home: void portal — two mirrored arcs forming an eye, layered rings, iris dot
  home: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 12 C6 5, 18 5, 22 12" stroke-width="1.4" opacity="0.45"/>
    <path d="M2 12 C6 19, 18 19, 22 12" stroke-width="1.4" opacity="0.45"/>
    <path d="M5 12 C8 7.5, 16 7.5, 19 12" stroke-width="1.4" opacity="0.65"/>
    <path d="M5 12 C8 16.5, 16 16.5, 19 12" stroke-width="1.4" opacity="0.65"/>
    <circle cx="12" cy="12" r="3" stroke-width="1.4" opacity="0.85"/>
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" opacity="0.95"/>
    <line x1="12" y1="2" x2="12" y2="4.5" stroke-width="1.2" opacity="0.4"/>
    <line x1="12" y1="19.5" x2="12" y2="22" stroke-width="1.2" opacity="0.4"/>
  </svg>`,

  // Nodes: three circles in a triangle, connected by lines, junction dots
  nodes: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <circle cx="12" cy="3.5" r="2" stroke-width="1.4"/>
    <circle cx="3.5" cy="18.5" r="2" stroke-width="1.4"/>
    <circle cx="20.5" cy="18.5" r="2" stroke-width="1.4"/>
    <line x1="12" y1="5.5" x2="4.9" y2="16.9" stroke-width="1.2" opacity="0.7"/>
    <line x1="12" y1="5.5" x2="19.1" y2="16.9" stroke-width="1.2" opacity="0.7"/>
    <line x1="5.5" y1="18.5" x2="18.5" y2="18.5" stroke-width="1.2" opacity="0.7"/>
    <circle cx="8.5" cy="11.5" r="1" fill="currentColor" stroke="none" opacity="0.6"/>
    <circle cx="15.5" cy="11.5" r="1" fill="currentColor" stroke="none" opacity="0.6"/>
    <circle cx="12" cy="18.5" r="1" fill="currentColor" stroke="none" opacity="0.6"/>
  </svg>`,

  // Upgrades: three ascending crystal shards
  upgrades: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="5,20 5,13 7,10 9,13 9,20" stroke-width="1.4" opacity="0.7"/>
    <polygon points="11,20 11,9 13,5 15,9 15,20" stroke-width="1.4" opacity="0.85"/>
    <polygon points="17,20 17,13 19,10 21,13 21,20" stroke-width="1.4" opacity="0.7"/>
    <line x1="3" y1="20" x2="21" y2="20" stroke-width="1.2" opacity="0.5"/>
    <line x1="13" y1="5" x2="14" y2="3.5" stroke-width="1" opacity="0.4"/>
    <line x1="13" y1="5" x2="11.5" y2="3.5" stroke-width="1" opacity="0.4"/>
  </svg>`,

  // Orb: orb on a pedestal with sparkle rays — used for the Orbs sub-section
  orb: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="9" r="5" stroke-width="1.4" opacity="0.9"/>
    <circle cx="12" cy="9" r="2.2" stroke-width="1.1" opacity="0.55"/>
    <circle cx="12" cy="9" r="0.9" fill="currentColor" stroke="none" opacity="0.85"/>
    <line x1="12" y1="14" x2="12" y2="17" stroke-width="1.3" opacity="0.7"/>
    <line x1="8"  y1="19" x2="16" y2="19" stroke-width="1.4" opacity="0.8"/>
    <line x1="9"  y1="17" x2="15" y2="17" stroke-width="1.2" opacity="0.6"/>
    <line x1="12" y1="3"  x2="12" y2="1.5" stroke-width="1.1" opacity="0.45"/>
    <line x1="7"  y1="4.5" x2="6"  y2="3.5" stroke-width="1.1" opacity="0.45"/>
    <line x1="17" y1="4.5" x2="18" y2="3.5" stroke-width="1.1" opacity="0.45"/>
  </svg>`,

  // Shop: shopping bag — general shop / storefront icon for nav button and page heading
  shop: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 10 C8 6.8 9.7 5 12 5 C14.3 5 16 6.8 16 10" stroke-width="1.5" opacity="0.85"/>
    <path d="M5.5 10 L4.8 19.2 C4.75 19.65 5.1 20 5.55 20 L18.45 20 C18.9 20 19.25 19.65 19.2 19.2 L18.5 10 Z" stroke-width="1.4" opacity="0.9"/>
    <line x1="9" y1="14" x2="15" y2="14" stroke-width="1.1" opacity="0.45"/>
    <circle cx="9.5" cy="10" r="0.8" fill="currentColor" stroke="none" opacity="0.6"/>
    <circle cx="14.5" cy="10" r="0.8" fill="currentColor" stroke="none" opacity="0.6"/>
  </svg>`,

  // Relic: diamond gem — for the Relics placeholder sub-section
  relic: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3 L20 9.5 L12 21 L4 9.5 Z" stroke-width="1.4" opacity="0.88"/>
    <line x1="4" y1="9.5" x2="20" y2="9.5" stroke-width="1.1" opacity="0.6"/>
    <path d="M8.5 9.5 L12 3 L15.5 9.5" stroke-width="1.1" opacity="0.5"/>
    <line x1="12" y1="9.5" x2="12" y2="21" stroke-width="1.1" opacity="0.3"/>
  </svg>`,

  // Cosmetic: four-pointed star — for the Cosmetics placeholder sub-section
  cosmetic: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2 L13.6 9.2 L21 12 L13.6 14.8 L12 22 L10.4 14.8 L3 12 L10.4 9.2 Z" stroke-width="1.4" opacity="0.88"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" opacity="0.7"/>
  </svg>`,

  // Artifact: scroll with horizontal lines — for the Artifacts placeholder sub-section
  artifact: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 4 C8 4 6 4 6 6 C6 8 8 8 8 10 C8 12 6 12 6 14 C6 16 8 16 8 16 L16 16 C16 16 18 16 18 14 C18 12 16 12 16 10 C16 8 18 8 18 6 C18 4 16 4 16 4 Z" stroke-width="1.4" opacity="0.85"/>
    <line x1="9" y1="8"  x2="15" y2="8"  stroke-width="1.1" opacity="0.55"/>
    <line x1="9" y1="10" x2="15" y2="10" stroke-width="1.1" opacity="0.55"/>
    <line x1="9" y1="12" x2="15" y2="12" stroke-width="1.1" opacity="0.55"/>
    <line x1="12" y1="16" x2="12" y2="20" stroke-width="1.3" opacity="0.6"/>
    <line x1="9"  y1="20" x2="15" y2="20" stroke-width="1.2" opacity="0.55"/>
  </svg>`,

  // Automation: two interlocked orbital loops
  automation: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <ellipse cx="9" cy="12" rx="7" ry="4" stroke-width="1.4" opacity="0.75"/>
    <ellipse cx="15" cy="12" rx="7" ry="4" transform="rotate(60 15 12)" stroke-width="1.4" opacity="0.75"/>
    <ellipse cx="15" cy="12" rx="7" ry="4" transform="rotate(-60 15 12)" stroke-width="1.4" opacity="0.45"/>
    <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" opacity="0.9"/>
  </svg>`,

  // Prestige: open spiral with a starburst tail — rebirth symbol
  prestige: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21 C5.4 21, 3 16, 3 12 C3 6.5, 7 3, 12 3 C17 3, 20 6.5, 20 11 C20 14.5, 18 17, 15 17 C12.5 17, 11 15.5, 11 13.5 C11 11.5, 12.5 10, 14 10" stroke-width="1.5"/>
    <line x1="19.5" y1="10.5" x2="22" y2="9" stroke-width="1.2" opacity="0.6"/>
    <line x1="19.5" y1="10.5" x2="21.5" y2="12.5" stroke-width="1.2" opacity="0.6"/>
    <line x1="19.5" y1="10.5" x2="17" y2="9.5" stroke-width="1.2" opacity="0.6"/>
    <circle cx="19.5" cy="10.5" r="1.2" fill="currentColor" stroke="none" opacity="0.8"/>
  </svg>`,

  // Stats: rising line graph with dot markers
  stats: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="2,18 2,20 22,20" stroke-width="1.4" opacity="0.5"/>
    <polyline points="4,17 8,11 12,14 16,8 20,4" stroke-width="1.6"/>
    <circle cx="4" cy="17" r="1.3" fill="currentColor" stroke="none"/>
    <circle cx="8" cy="11" r="1.3" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="14" r="1.3" fill="currentColor" stroke="none"/>
    <circle cx="16" cy="8" r="1.3" fill="currentColor" stroke="none"/>
    <circle cx="20" cy="4" r="1.3" fill="currentColor" stroke="none"/>
  </svg>`,

  // Achievements: void medal — octagon outer ring, diamond inner, dot center
  achievements: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12,2 16,4 19,8 19,16 16,20 12,22 8,20 5,16 5,8 8,4" stroke-width="1.4" opacity="0.85"/>
    <polygon points="12,7 15,12 12,17 9,12" stroke-width="1.3" opacity="0.65"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" opacity="0.9"/>
  </svg>`,

  // Leaderboard: three podium columns with rank crown marks
  leaderboard: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <rect x="8" y="10" width="8" height="10" stroke-width="1.4" opacity="0.9"/>
    <rect x="1" y="14" width="7" height="6" stroke-width="1.4" opacity="0.7"/>
    <rect x="16" y="16" width="7" height="4" stroke-width="1.4" opacity="0.55"/>
    <polyline points="9,7 10,5 12,6.5 14,5 15,7" stroke-width="1.3" opacity="0.8"/>
    <line x1="2.5" y1="11.5" x2="4.5" y2="11.5" stroke-width="1.1" opacity="0.5"/>
    <line x1="3.5" y1="10.5" x2="3.5" y2="12.5" stroke-width="1.1" opacity="0.5"/>
  </svg>`,

  // Settings: hex cell with concentric inner hex — looks like a tech bolt
  settings: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12,2 19.9,6.5 19.9,17.5 12,22 4.1,17.5 4.1,6.5" stroke-width="1.4" opacity="0.85"/>
    <polygon points="12,7 16.3,9.5 16.3,14.5 12,17 7.7,14.5 7.7,9.5" stroke-width="1.3" opacity="0.6"/>
    <circle cx="12" cy="12" r="2" stroke-width="1.4" opacity="0.9"/>
    <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none"/>
  </svg>`,

  // ─── Chips & card headers ─────────────────────────────────────────────────────

  // Void Energy crystal: faceted hexagon with radial inner lines
  voidenergy: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12,2 19,7 19,17 12,22 5,17 5,7" stroke-width="1.5" opacity="0.9"/>
    <line x1="12" y1="2" x2="12" y2="22" stroke-width="1" opacity="0.3"/>
    <line x1="5" y1="7" x2="19" y2="17" stroke-width="1" opacity="0.3"/>
    <line x1="19" y1="7" x2="5" y2="17" stroke-width="1" opacity="0.3"/>
    <polygon points="12,6 16,9 16,15 12,18 8,15 8,9" stroke-width="1.2" opacity="0.55"/>
    <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" opacity="0.8"/>
  </svg>`,

  // Tick speed: layered pulse arcs — like a sonar / heartbeat
  tickspeed: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <path d="M2 12 L6 12 L8 7 L10 17 L12 10 L14 14 L16 12 L22 12" stroke-width="1.5" opacity="0.9"/>
    <path d="M4 4 C4 4, 1 8, 1 12 C1 16, 4 20, 4 20" stroke-width="1.1" opacity="0.4"/>
    <path d="M20 4 C20 4, 23 8, 23 12 C23 16, 20 20, 20 20" stroke-width="1.1" opacity="0.4"/>
  </svg>`,

  // Level / rank: three stacked upward chevrons
  level: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="4,19 12,14 20,19" stroke-width="2" opacity="0.5"/>
    <polyline points="4,14 12,9 20,14" stroke-width="2" opacity="0.7"/>
    <polyline points="4,9 12,4 20,9" stroke-width="2" opacity="0.95"/>
  </svg>`,

  // Player / profile: stylised void explorer helm — visor slit
  player: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3 C7 3, 4 7, 4 11 C4 16, 7 19, 12 20 C17 19, 20 16, 20 11 C20 7, 17 3, 12 3Z" stroke-width="1.5"/>
    <path d="M7 10 C8 8.5, 10 8, 12 8 C14 8, 16 8.5, 17 10" stroke-width="1.3" opacity="0.5"/>
    <path d="M8 12 L10 11 L14 11 L16 12" stroke-width="1.4" opacity="0.85"/>
    <line x1="4" y1="11" x2="2" y2="12" stroke-width="1.2" opacity="0.45"/>
    <line x1="20" y1="11" x2="22" y2="12" stroke-width="1.2" opacity="0.45"/>
  </svg>`,

  // Changelog / log: stacked entry rows with bullet dots
  changelog: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <circle cx="4.5" cy="6" r="1.2" fill="currentColor" stroke="none" opacity="0.8"/>
    <line x1="7.5" y1="6" x2="21" y2="6" stroke-width="1.4" opacity="0.8"/>
    <circle cx="4.5" cy="11" r="1.2" fill="currentColor" stroke="none" opacity="0.65"/>
    <line x1="7.5" y1="11" x2="18" y2="11" stroke-width="1.4" opacity="0.65"/>
    <circle cx="4.5" cy="16" r="1.2" fill="currentColor" stroke="none" opacity="0.5"/>
    <line x1="7.5" y1="16" x2="20" y2="16" stroke-width="1.4" opacity="0.5"/>
    <circle cx="4.5" cy="21" r="1.2" fill="currentColor" stroke="none" opacity="0.35"/>
    <line x1="7.5" y1="21" x2="15" y2="21" stroke-width="1.4" opacity="0.35"/>
  </svg>`,

  // Resources: clustered crystal facets
  resources: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12,3 16,8 14,14 10,14 8,8" stroke-width="1.5" opacity="0.9"/>
    <line x1="12" y1="3" x2="14" y2="14" stroke-width="0.9" opacity="0.4"/>
    <line x1="12" y1="3" x2="10" y2="14" stroke-width="0.9" opacity="0.4"/>
    <line x1="8" y1="8" x2="16" y2="8" stroke-width="0.9" opacity="0.3"/>
    <polygon points="7 ,15 9 ,12 12,14 10,19 5,18" stroke-width="1.3" opacity="0.7"/>
    <polygon points="17,15 15,12 12,14 14,19 19,18" stroke-width="1.3" opacity="0.7"/>
  </svg>`,

  // Session / time: crescent arc with orbital tick marks
  session: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <path d="M17 4.5 A9 9 0 1 0 17 19.5" stroke-width="1.5" opacity="0.9"/>
    <line x1="12" y1="3" x2="12" y2="5.5" stroke-width="1.3" opacity="0.6"/>
    <line x1="12" y1="18.5" x2="12" y2="21" stroke-width="1.3" opacity="0.6"/>
    <line x1="3" y1="12" x2="5.5" y2="12" stroke-width="1.3" opacity="0.5"/>
    <line x1="12" y1="12" x2="16" y2="8.5" stroke-width="1.5" opacity="0.9"/>
    <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" opacity="0.85"/>
  </svg>`,

  // Node stats: grid lattice — interconnected square grid
  nodestats: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <circle cx="5" cy="5" r="1.5" stroke-width="1.3" opacity="0.7"/>
    <circle cx="12" cy="5" r="1.5" stroke-width="1.3" opacity="0.7"/>
    <circle cx="19" cy="5" r="1.5" stroke-width="1.3" opacity="0.7"/>
    <circle cx="5" cy="12" r="1.5" stroke-width="1.3" opacity="0.7"/>
    <circle cx="12" cy="12" r="1.8" stroke-width="1.5" fill="currentColor" opacity="0.55"/>
    <circle cx="19" cy="12" r="1.5" stroke-width="1.3" opacity="0.7"/>
    <circle cx="5" cy="19" r="1.5" stroke-width="1.3" opacity="0.7"/>
    <circle cx="12" cy="19" r="1.5" stroke-width="1.3" opacity="0.7"/>
    <circle cx="19" cy="19" r="1.5" stroke-width="1.3" opacity="0.7"/>
    <line x1="6.5" y1="5" x2="10.5" y2="5" stroke-width="1" opacity="0.45"/>
    <line x1="13.5" y1="5" x2="17.5" y2="5" stroke-width="1" opacity="0.45"/>
    <line x1="6.5" y1="12" x2="10.2" y2="12" stroke-width="1" opacity="0.45"/>
    <line x1="13.8" y1="12" x2="17.5" y2="12" stroke-width="1" opacity="0.45"/>
    <line x1="6.5" y1="19" x2="10.5" y2="19" stroke-width="1" opacity="0.45"/>
    <line x1="13.5" y1="19" x2="17.5" y2="19" stroke-width="1" opacity="0.45"/>
    <line x1="5" y1="6.5" x2="5" y2="10.5" stroke-width="1" opacity="0.45"/>
    <line x1="5" y1="13.5" x2="5" y2="17.5" stroke-width="1" opacity="0.45"/>
    <line x1="12" y1="6.5" x2="12" y2="10.2" stroke-width="1" opacity="0.45"/>
    <line x1="12" y1="13.8" x2="12" y2="17.5" stroke-width="1" opacity="0.45"/>
    <line x1="19" y1="6.5" x2="19" y2="10.5" stroke-width="1" opacity="0.45"/>
    <line x1="19" y1="13.5" x2="19" y2="17.5" stroke-width="1" opacity="0.45"/>
  </svg>`,

  // Current run / active loop: circular arrow pointing inward
  currentrun: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12 A9 9 0 0 1 5.6 19.5" stroke-width="1.5"/>
    <path d="M3 12 A9 9 0 0 1 18.4 4.5" stroke-width="1.5"/>
    <polyline points="18.4,4.5 18.4,8.5 22,6" stroke-width="1.3" opacity="0.8"/>
    <polyline points="5.6,19.5 5.6,15.5 2,18" stroke-width="1.3" opacity="0.8"/>
    <circle cx="12" cy="12" r="2.5" stroke-width="1.4" opacity="0.7"/>
  </svg>`,

  // Prestige bonus: starburst multiplication — eight rays from center
  prestigebonus: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <line x1="12" y1="2" x2="12" y2="7" stroke-width="1.5" opacity="0.9"/>
    <line x1="12" y1="17" x2="12" y2="22" stroke-width="1.5" opacity="0.9"/>
    <line x1="2" y1="12" x2="7" y2="12" stroke-width="1.5" opacity="0.9"/>
    <line x1="17" y1="12" x2="22" y2="12" stroke-width="1.5" opacity="0.9"/>
    <line x1="4.9" y1="4.9" x2="8.4" y2="8.4" stroke-width="1.4" opacity="0.7"/>
    <line x1="15.6" y1="15.6" x2="19.1" y2="19.1" stroke-width="1.4" opacity="0.7"/>
    <line x1="19.1" y1="4.9" x2="15.6" y2="8.4" stroke-width="1.4" opacity="0.7"/>
    <line x1="8.4" y1="15.6" x2="4.9" y2="19.1" stroke-width="1.4" opacity="0.7"/>
    <circle cx="12" cy="12" r="3.5" stroke-width="1.5" opacity="0.85"/>
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" opacity="0.9"/>
  </svg>`,

  // Coming soon / wip: hourglass with particles
  comingsoon: `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <line x1="5" y1="3" x2="19" y2="3" stroke-width="1.5" opacity="0.8"/>
    <line x1="5" y1="21" x2="19" y2="21" stroke-width="1.5" opacity="0.8"/>
    <path d="M6 3 C6 3, 10 7, 12 12 C14 17, 18 21, 18 21" stroke-width="1.4" opacity="0.7"/>
    <path d="M18 3 C18 3, 14 7, 12 12 C10 17, 6 21, 6 21" stroke-width="1.4" opacity="0.7"/>
    <circle cx="11" cy="8" r="0.8" fill="currentColor" stroke="none" opacity="0.5"/>
    <circle cx="13" cy="10" r="0.8" fill="currentColor" stroke="none" opacity="0.5"/>
    <circle cx="12" cy="7" r="0.8" fill="currentColor" stroke="none" opacity="0.5"/>
    <line x1="9" y1="14" x2="15" y2="14" stroke-width="1" opacity="0.35"/>
  </svg>`,

  // ─── Achievement Icons ────────────────────────────────────────────────────────

  // VE: First spark — jagged lightning bolt
  'ach-spark': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="14,2 10,11 15,11 10,22" stroke-width="2"/>
    <line x1="3" y1="8"  x2="7"  y2="10" stroke-width="1.1" opacity="0.4"/>
    <line x1="21" y1="8"  x2="17" y2="10" stroke-width="1.1" opacity="0.4"/>
    <line x1="3" y1="16" x2="7"  y2="14" stroke-width="1.1" opacity="0.4"/>
    <line x1="21" y1="16" x2="17" y2="14" stroke-width="1.1" opacity="0.4"/>
  </svg>`,

  // VE: 100 — single needle crystal
  'ach-ve-100': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12,3 15,12 12,21 9,12" stroke-width="1.5"/>
    <line x1="9" y1="12" x2="15" y2="12" stroke-width="0.9" opacity="0.4"/>
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" opacity="0.8"/>
  </svg>`,

  // VE: 1K — twin spike crystals
  'ach-ve-1k': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="8,4 11,11 8,21 5,11"  stroke-width="1.4" opacity="0.85"/>
    <polygon points="16,4 19,11 16,21 13,11" stroke-width="1.4" opacity="0.85"/>
    <line x1="8" y1="13" x2="16" y2="13" stroke-width="0.9" opacity="0.3"/>
  </svg>`,

  // VE: 10K — triple spike cluster
  'ach-ve-10k': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12,2 14.5,8 12,19 9.5,8"  stroke-width="1.5" opacity="0.95"/>
    <polygon points="5,6 7,11 5,18 3,11"  stroke-width="1.3" opacity="0.65"/>
    <polygon points="19,6 21,11 19,18 17,11" stroke-width="1.3" opacity="0.65"/>
  </svg>`,

  // VE: 100K — crystal with orbital halo ring
  'ach-ve-100k': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12,3 15,11 12,21 9,11" stroke-width="1.5"/>
    <line x1="9" y1="11" x2="15" y2="11" stroke-width="0.9" opacity="0.4"/>
    <ellipse cx="12" cy="12" rx="9.5" ry="3.5" stroke-width="1.1" opacity="0.45"/>
    <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" opacity="0.85"/>
  </svg>`,

  // VE: 1M — hexagonal prism crystal
  'ach-ve-1m': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12,2 17,5 17,11 12,14 7,11 7,5" stroke-width="1.4"/>
    <polygon points="12,14 17,17 17,20 12,22 7,20 7,17" stroke-width="1.3" opacity="0.6"/>
    <line x1="12" y1="2" x2="12" y2="14" stroke-width="0.9" opacity="0.3"/>
    <line x1="7" y1="5"  x2="7"  y2="17" stroke-width="0.8" opacity="0.25"/>
    <line x1="17" y1="5" x2="17" y2="17" stroke-width="0.8" opacity="0.25"/>
  </svg>`,

  // VE: 10M — crystal with two orbit rings
  'ach-ve-10m': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12,3 15,12 12,21 9,12" stroke-width="1.5"/>
    <ellipse cx="12" cy="12" rx="8.5" ry="3"   stroke-width="1.1" opacity="0.5"/>
    <ellipse cx="12" cy="12" rx="8.5" ry="3" transform="rotate(60 12 12)" stroke-width="1.1" opacity="0.35"/>
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" opacity="0.9"/>
  </svg>`,

  // VE: 1B — tri-crystal cluster
  'ach-ve-1b': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12,2 14,9 12,19 10,9"    stroke-width="1.6"/>
    <polygon points="5,7 7,12 5,18 3,12"      stroke-width="1.3" opacity="0.7"/>
    <polygon points="19,7 21,12 19,18 17,12"  stroke-width="1.3" opacity="0.7"/>
    <circle cx="12" cy="11" r="1.4" fill="currentColor" stroke="none" opacity="0.85"/>
  </svg>`,

  // VE: 1T — ancient star-crystal with wing rays
  'ach-ve-1t': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12,2 15,9 12,22 9,9" stroke-width="1.5"/>
    <line x1="12" y1="7" x2="4"  y2="9"  stroke-width="1.1" opacity="0.55"/>
    <line x1="12" y1="7" x2="20" y2="9"  stroke-width="1.1" opacity="0.55"/>
    <line x1="12" y1="7" x2="3"  y2="13" stroke-width="1"   opacity="0.35"/>
    <line x1="12" y1="7" x2="21" y2="13" stroke-width="1"   opacity="0.35"/>
    <circle cx="12" cy="10" r="1.5" fill="currentColor" stroke="none" opacity="0.9"/>
  </svg>`,

  // VE: 1Q — transcendent burst crystal
  'ach-ve-1q': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <polygon points="12,2 14,9 12,22 10,9" stroke-width="1.6"/>
    <line x1="12" y1="4" x2="3"  y2="7"  stroke-width="1"   opacity="0.5"/>
    <line x1="12" y1="4" x2="21" y2="7"  stroke-width="1"   opacity="0.5"/>
    <line x1="12" y1="4" x2="1"  y2="12" stroke-width="1"   opacity="0.35"/>
    <line x1="12" y1="4" x2="23" y2="12" stroke-width="1"   opacity="0.35"/>
    <circle cx="12" cy="10" r="2"   stroke-width="1.4" opacity="0.7"/>
    <circle cx="12" cy="10" r="0.9" fill="currentColor" stroke="none" opacity="0.95"/>
  </svg>`,

  // Click: 10 — pointing finger cursor
  'ach-click10': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 4 L10 14 L8 14 L8 11 L6 11 L6 14 C6 18, 9 21, 13 21 C17 21, 20 18, 20 14 L20 11 L18 11 L18 14 L16 14 L16 4 L14 4 L14 14 L12 14 L12 4 Z" stroke-width="1.3"/>
  </svg>`,

  // Click: 100 — hand with left speed lines
  'ach-click100': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 5 L10 14 L8 14 L8 11 L6 11 L6 14 C6 18, 9 21, 13 21 C17 21, 20 18, 20 14 L20 11 L18 11 L18 14 L16 14 L16 5 L14 5 L14 14 L12 14 L12 5 Z" stroke-width="1.3"/>
    <line x1="1" y1="7"  x2="4.5" y2="7"  stroke-width="1.2" opacity="0.65"/>
    <line x1="1" y1="10" x2="4.5" y2="10" stroke-width="1.2" opacity="0.45"/>
    <line x1="1" y1="13" x2="4.5" y2="13" stroke-width="1.2" opacity="0.3"/>
  </svg>`,

  // Click: 1K — hand with impact starburst above
  'ach-click1k': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 7 L10 15 L8 15 L8 12 L6 12 L6 15 C6 18.5, 9 21, 13 21 C17 21, 20 18.5, 20 15 L20 12 L18 12 L18 15 L16 15 L16 7 L14 7 L14 15 L12 15 L12 7 Z" stroke-width="1.3"/>
    <line x1="5.5" y1="3.5" x2="7.5" y2="5.5"  stroke-width="1.3" opacity="0.65"/>
    <line x1="3"   y1="6"   x2="5.5" y2="7"    stroke-width="1.2" opacity="0.5"/>
    <line x1="3.5" y1="9.5" x2="5.5" y2="9.5"  stroke-width="1.1" opacity="0.4"/>
    <line x1="8"   y1="2"   x2="8"   y2="4.5"  stroke-width="1.2" opacity="0.55"/>
  </svg>`,

  // Click: 10K — hand with flame arcs at base
  'ach-click10k': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 6 L10 14 L8 14 L8 11 L6 11 L6 14 C6 18, 9 21, 13 21 C17 21, 20 18, 20 14 L20 11 L18 11 L18 14 L16 14 L16 6 L14 6 L14 14 L12 14 L12 6 Z" stroke-width="1.3"/>
    <path d="M7 5 C7 3, 9 2, 11 4 C11 2, 13.5 1, 15 3 C15 1.5, 17 2.5, 16 5" stroke-width="1.2" opacity="0.7"/>
  </svg>`,

  // Click: 50K — worn hand with crack lines
  'ach-click50k': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 6 L10 14 L8 14 L8 11 L6 11 L6 14 C6 18, 9 21, 13 21 C17 21, 20 18, 20 14 L20 11 L18 11 L18 14 L16 14 L16 6 L14 6 L14 14 L12 14 L12 6 Z" stroke-width="1.3"/>
    <path d="M12 6 L11 9 L13 10.5 L10.5 14" stroke-width="1.1" opacity="0.7"/>
    <line x1="2.5" y1="4.5" x2="5.5" y2="7.5"  stroke-width="1.3" opacity="0.5"/>
    <line x1="21.5" y1="4.5" x2="18.5" y2="7.5" stroke-width="1.3" opacity="0.5"/>
  </svg>`,

  // Node: Abyssal Shard — jagged many-pointed shard
  'ach-node-abyssal': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12,2 17,8 15,14 12,22 9,14 7,8" stroke-width="1.5"/>
    <line x1="7"  y1="8"  x2="17" y2="8"  stroke-width="0.9" opacity="0.35"/>
    <line x1="9"  y1="14" x2="15" y2="14" stroke-width="0.9" opacity="0.35"/>
    <line x1="12" y1="2"  x2="12" y2="22" stroke-width="0.8" opacity="0.22"/>
  </svg>`,

  // Node: Whisper Engine — sound waves from a point
  'ach-node-whisper': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <circle cx="4.5" cy="12" r="1.5" fill="currentColor" stroke="none" opacity="0.9"/>
    <path d="M9  8  C11 9,  11 15, 9  16" stroke-width="1.4" opacity="0.75"/>
    <path d="M13 5  C17 7,  17 17, 13 19" stroke-width="1.3" opacity="0.55"/>
    <path d="M17 3  C23 6,  23 18, 17 21" stroke-width="1.2" opacity="0.35"/>
  </svg>`,

  // Node: Dark Matter Loop — tight inward spiral
  'ach-node-darkmatter': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <path d="M12 12 C12 8,16 8,16 12 C16 16,8 17,8 12 C8 6,17 5,17 12 C17 19,5 20,5 12 C5 4,20 3,20 12" stroke-width="1.4"/>
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" opacity="0.9"/>
  </svg>`,

  // Node: Void Bloom — six-petal bloom
  'ach-node-voidbloom': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <circle cx="12" cy="12" r="2.8" stroke-width="1.4" opacity="0.95"/>
    <ellipse cx="12" cy="6"  rx="2" ry="3.5" stroke-width="1.2" opacity="0.6"/>
    <ellipse cx="12" cy="18" rx="2" ry="3.5" stroke-width="1.2" opacity="0.6"/>
    <ellipse cx="12" cy="6"  rx="2" ry="3.5" transform="rotate( 60 12 12)" stroke-width="1.2" opacity="0.6"/>
    <ellipse cx="12" cy="18" rx="2" ry="3.5" transform="rotate( 60 12 12)" stroke-width="1.2" opacity="0.6"/>
    <ellipse cx="12" cy="6"  rx="2" ry="3.5" transform="rotate(120 12 12)" stroke-width="1.2" opacity="0.6"/>
    <ellipse cx="12" cy="18" rx="2" ry="3.5" transform="rotate(120 12 12)" stroke-width="1.2" opacity="0.6"/>
  </svg>`,

  // Node: Graviton Seeder — gravity-well concentric ellipses
  'ach-node-graviton': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke-width="1"   opacity="0.35"/>
    <ellipse cx="12" cy="12" rx="7"  ry="3"   stroke-width="1.2" opacity="0.55"/>
    <ellipse cx="12" cy="12" rx="4"  ry="1.8" stroke-width="1.3" opacity="0.75"/>
    <circle  cx="12" cy="12" r="2"   stroke-width="1.5" opacity="0.9"/>
    <circle  cx="12" cy="12" r="0.8" fill="currentColor" stroke="none"/>
  </svg>`,

  // Node: Null Beacon — broadcast tower
  'ach-node-nullbeacon': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <line x1="12" y1="21" x2="12" y2="9"   stroke-width="1.5"/>
    <line x1="8"  y1="21" x2="12" y2="16"  stroke-width="1.3" opacity="0.7"/>
    <line x1="16" y1="21" x2="12" y2="16"  stroke-width="1.3" opacity="0.7"/>
    <path d="M7.5 7.5 C9 4.5, 15 4.5, 16.5 7.5"  stroke-width="1.3" opacity="0.6"/>
    <path d="M4.5 5.5 C7 0.5, 17 0.5, 19.5 5.5"  stroke-width="1.2" opacity="0.4"/>
    <circle cx="12" cy="9" r="1.5" fill="currentColor" stroke="none" opacity="0.9"/>
  </svg>`,

  // Node: Oblivion Spire — tapering tower with base
  'ach-node-oblivion': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12,2 15,8 14,14 13,20 11,20 10,14 9,8" stroke-width="1.5"/>
    <line x1="9"  y1="8"  x2="15" y2="8"  stroke-width="1"   opacity="0.4"/>
    <line x1="10" y1="14" x2="14" y2="14" stroke-width="1"   opacity="0.4"/>
    <line x1="5"  y1="20" x2="19" y2="20" stroke-width="1.3" opacity="0.55"/>
  </svg>`,

  // Nodes-10 — 2×3 dot grid
  'ach-nodes10': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <circle cx="7"  cy="6"  r="2.2" stroke-width="1.3" opacity="0.8"/>
    <circle cx="17" cy="6"  r="2.2" stroke-width="1.3" opacity="0.8"/>
    <circle cx="7"  cy="13" r="2.2" stroke-width="1.3" opacity="0.8"/>
    <circle cx="17" cy="13" r="2.2" stroke-width="1.3" opacity="0.8"/>
    <circle cx="7"  cy="20" r="2.2" stroke-width="1.3" opacity="0.8"/>
    <circle cx="17" cy="20" r="2.2" stroke-width="1.3" opacity="0.8"/>
    <line x1="9.2" y1="6"  x2="14.8" y2="6"  stroke-width="0.9" opacity="0.35"/>
    <line x1="9.2" y1="13" x2="14.8" y2="13" stroke-width="0.9" opacity="0.35"/>
    <line x1="9.2" y1="20" x2="14.8" y2="20" stroke-width="0.9" opacity="0.35"/>
  </svg>`,

  // Nodes-25 — pentagon node network
  'ach-nodes25': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <circle cx="12"  cy="3.5"  r="1.8" stroke-width="1.3"/>
    <circle cx="4.5" cy="10"   r="1.8" stroke-width="1.3" opacity="0.8"/>
    <circle cx="7.5" cy="19.5" r="1.8" stroke-width="1.3" opacity="0.8"/>
    <circle cx="16.5" cy="19.5" r="1.8" stroke-width="1.3" opacity="0.8"/>
    <circle cx="19.5" cy="10"  r="1.8" stroke-width="1.3" opacity="0.8"/>
    <line x1="12"  y1="5.3"  x2="6"   y2="8.6"   stroke-width="0.9" opacity="0.4"/>
    <line x1="12"  y1="5.3"  x2="18"  y2="8.6"   stroke-width="0.9" opacity="0.4"/>
    <line x1="5.8" y1="11.6" x2="8.2" y2="17.9"  stroke-width="0.9" opacity="0.4"/>
    <line x1="18.2" y1="11.6" x2="15.8" y2="17.9" stroke-width="0.9" opacity="0.4"/>
    <line x1="9.3" y1="20"   x2="14.7" y2="20"   stroke-width="0.9" opacity="0.4"/>
  </svg>`,

  // Nodes-50 — hexagonal ring of nodes
  'ach-nodes50': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="8.5" stroke-width="1" opacity="0.3"/>
    <circle cx="12"   cy="3.5"  r="1.5" stroke-width="1.2" opacity="0.9"/>
    <circle cx="19.4" cy="7.7"  r="1.5" stroke-width="1.2" opacity="0.9"/>
    <circle cx="19.4" cy="16.3" r="1.5" stroke-width="1.2" opacity="0.9"/>
    <circle cx="12"   cy="20.5" r="1.5" stroke-width="1.2" opacity="0.9"/>
    <circle cx="4.6"  cy="16.3" r="1.5" stroke-width="1.2" opacity="0.9"/>
    <circle cx="4.6"  cy="7.7"  r="1.5" stroke-width="1.2" opacity="0.9"/>
    <circle cx="12"   cy="12"   r="2.2" stroke-width="1.4" opacity="0.85"/>
  </svg>`,

  // Nodes-100 — dense web with inner + outer rings
  'ach-nodes100': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="9.5" stroke-width="1"   opacity="0.28"/>
    <circle cx="12" cy="12" r="5"   stroke-width="1.2" opacity="0.45"/>
    <circle cx="12" cy="7"   r="1.3" stroke-width="1.2" opacity="0.9"/>
    <circle cx="17" cy="12"  r="1.3" stroke-width="1.2" opacity="0.9"/>
    <circle cx="12" cy="17"  r="1.3" stroke-width="1.2" opacity="0.9"/>
    <circle cx="7"  cy="12"  r="1.3" stroke-width="1.2" opacity="0.9"/>
    <circle cx="12" cy="2.5" r="1"   stroke-width="1.1" opacity="0.7"/>
    <circle cx="21.5" cy="12" r="1"  stroke-width="1.1" opacity="0.7"/>
    <circle cx="12" cy="21.5" r="1"  stroke-width="1.1" opacity="0.7"/>
    <circle cx="2.5" cy="12"  r="1"  stroke-width="1.1" opacity="0.7"/>
    <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" opacity="0.55"/>
  </svg>`,

  // Upgrade-1 — single upward arrow with base steps
  'ach-upg1': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <line x1="12" y1="21" x2="12" y2="5" stroke-width="1.7"/>
    <polyline points="7,10 12,5 17,10" stroke-width="1.7"/>
    <line x1="9"  y1="16" x2="15" y2="16" stroke-width="1.1" opacity="0.45"/>
    <line x1="10" y1="19" x2="14" y2="19" stroke-width="1"   opacity="0.3"/>
    <circle cx="19" cy="6"  r="1"   fill="currentColor" stroke="none" opacity="0.6"/>
    <circle cx="21" cy="9"  r="0.8" fill="currentColor" stroke="none" opacity="0.4"/>
  </svg>`,

  // Upgrade-5 — five ascending bars like a bar chart
  'ach-upg5': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <line x1="3"  y1="21" x2="3"  y2="16" stroke-width="2.2" opacity="0.45"/>
    <line x1="7"  y1="21" x2="7"  y2="13" stroke-width="2.2" opacity="0.6"/>
    <line x1="11" y1="21" x2="11" y2="9"  stroke-width="2.2" opacity="0.8"/>
    <line x1="15" y1="21" x2="15" y2="6"  stroke-width="2.2" opacity="0.9"/>
    <line x1="19" y1="21" x2="19" y2="3"  stroke-width="2.2"/>
    <line x1="1"  y1="21" x2="21" y2="21" stroke-width="1.1" opacity="0.4"/>
  </svg>`,

  // Upgrade-10 — gear / cog with inner ring
  'ach-upg10': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <circle cx="12" cy="12" r="4" stroke-width="1.5" opacity="0.9"/>
    <circle cx="12" cy="12" r="7.5" stroke-width="1.1" opacity="0.4"/>
    <line x1="12" y1="1.5" x2="12" y2="4"    stroke-width="1.7" opacity="0.85"/>
    <line x1="12" y1="20"  x2="12" y2="22.5"  stroke-width="1.7" opacity="0.85"/>
    <line x1="1.5" y1="12" x2="4"  y2="12"    stroke-width="1.7" opacity="0.85"/>
    <line x1="20"  y1="12" x2="22.5" y2="12"  stroke-width="1.7" opacity="0.85"/>
    <line x1="4.3"  y1="4.3"  x2="6.1"  y2="6.1"  stroke-width="1.5" opacity="0.6"/>
    <line x1="17.9" y1="17.9" x2="19.7" y2="19.7" stroke-width="1.5" opacity="0.6"/>
    <line x1="19.7" y1="4.3"  x2="17.9" y2="6.1"  stroke-width="1.5" opacity="0.6"/>
    <line x1="6.1"  y1="17.9" x2="4.3"  y2="19.7" stroke-width="1.5" opacity="0.6"/>
    <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" opacity="0.7"/>
  </svg>`,

  // Upgrade-all — crown
  'ach-upgall': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="3,18 3,9 7,14 12,7 17,14 21,9 21,18" stroke-width="1.5"/>
    <line x1="3" y1="20" x2="21" y2="20" stroke-width="1.4" opacity="0.65"/>
    <circle cx="3"  cy="9"  r="1.3" fill="currentColor" stroke="none" opacity="0.8"/>
    <circle cx="12" cy="7"  r="1.3" fill="currentColor" stroke="none" opacity="0.8"/>
    <circle cx="21" cy="9"  r="1.3" fill="currentColor" stroke="none" opacity="0.8"/>
  </svg>`,

  // Tick-1 — simple clock face
  'ach-tick1': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <circle cx="12" cy="12" r="9" stroke-width="1.5"/>
    <line x1="12" y1="6"   x2="12" y2="12" stroke-width="1.6"/>
    <line x1="12" y1="12"  x2="16" y2="15" stroke-width="1.4" opacity="0.85"/>
    <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/>
    <line x1="12" y1="3"  x2="12" y2="4.5"  stroke-width="1.3" opacity="0.5"/>
    <line x1="21" y1="12" x2="19.5" y2="12" stroke-width="1.3" opacity="0.5"/>
    <line x1="3"  y1="12" x2="4.5"  y2="12" stroke-width="1.3" opacity="0.5"/>
  </svg>`,

  // Tick-fast — clock with right-side speed streaks
  'ach-tickfast': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <circle cx="11" cy="12" r="7" stroke-width="1.5"/>
    <line x1="11" y1="7"  x2="11" y2="12"  stroke-width="1.6"/>
    <line x1="11" y1="12" x2="14" y2="14"  stroke-width="1.4" opacity="0.85"/>
    <circle cx="11" cy="12" r="1.2" fill="currentColor" stroke="none"/>
    <line x1="19.5" y1="8"  x2="23" y2="8"  stroke-width="1.3" opacity="0.75"/>
    <line x1="19.5" y1="12" x2="23" y2="12" stroke-width="1.3" opacity="0.55"/>
    <line x1="19.5" y1="16" x2="23" y2="16" stroke-width="1.3" opacity="0.35"/>
  </svg>`,

  // Tick-max — blazing clock with flame above
  'ach-tickmax': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <circle cx="11" cy="14" r="6" stroke-width="1.6"/>
    <line x1="11" y1="10" x2="11" y2="14"  stroke-width="1.7"/>
    <line x1="11" y1="14" x2="14" y2="15.5" stroke-width="1.5" opacity="0.9"/>
    <circle cx="11" cy="14" r="1.2" fill="currentColor" stroke="none"/>
    <path d="M18 2 C18 4.5, 20.5 4, 20.5 2 C22 4, 22 7.5, 19 8.5 C16 7.5, 16 4, 18 2Z" stroke-width="1.2" opacity="0.75"/>
    <line x1="19" y1="9.5" x2="20" y2="12" stroke-width="1.1" opacity="0.45"/>
    <line x1="17" y1="9.5" x2="17" y2="12" stroke-width="1.1" opacity="0.35"/>
  </svg>`,

  // Prestige-1 — open spiral with arrowhead tail
  'ach-prestige1': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <path d="M12 21 C5.4 21, 3 16, 3 12 C3 6.5, 7 3, 12 3 C17 3, 20 6.5, 20 11 C20 14.5, 18 17, 15 17 C12.5 17, 11 15.5, 11 13.5 C11 11.5, 12.5 10, 14 10" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" opacity="0.85"/>
    <line x1="19.5" y1="10.5" x2="22"   y2="9"    stroke-width="1.2" opacity="0.65"/>
    <line x1="19.5" y1="10.5" x2="21.5" y2="12.5" stroke-width="1.2" opacity="0.65"/>
  </svg>`,

  // Prestige-5 — five-point star
  'ach-prestige5': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12,2 14.7,9.3 22.5,9.3 16.3,14.2 18.5,22 12,17.5 5.5,22 7.7,14.2 1.5,9.3 9.3,9.3" stroke-width="1.4"/>
    <circle cx="12" cy="13" r="2" fill="currentColor" stroke="none" opacity="0.75"/>
  </svg>`,

  // Idle — crescent moon with floating star dots
  'ach-idle': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round">
    <path d="M17 5 A9 9 0 1 0 17 19 A7 7 0 0 1 17 5Z" stroke-width="1.5" opacity="0.9"/>
    <circle cx="18.5" cy="6.5"  r="0.9" fill="currentColor" stroke="none" opacity="0.75"/>
    <circle cx="20.5" cy="10.5" r="0.7" fill="currentColor" stroke="none" opacity="0.55"/>
    <circle cx="21"   cy="15"   r="0.9" fill="currentColor" stroke="none" opacity="0.65"/>
    <circle cx="19"   cy="18.5" r="0.7" fill="currentColor" stroke="none" opacity="0.5"/>
  </svg>`,

  // Void-rich — overflowing gem vessel
  'ach-voidrich': `<svg class="gi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 21 L8 9 L16 9 L18 21 Z" stroke-width="1.5"/>
    <line x1="5" y1="9" x2="19" y2="9" stroke-width="1.3" opacity="0.65"/>
    <polygon points="12,2 14.5,6.5 12,9 9.5,6.5" stroke-width="1.3" opacity="0.9"/>
    <line x1="9"  y1="4.5" x2="7.5" y2="2.5" stroke-width="1.1" opacity="0.55"/>
    <line x1="15" y1="4.5" x2="16.5" y2="2.5" stroke-width="1.1" opacity="0.55"/>
    <line x1="12" y1="3.5" x2="12"   y2="1.5" stroke-width="1.2" opacity="0.65"/>
  </svg>`,

};

// Helper: render an icon at a given size (default 18px) — returns an HTML string
window.gi = function(name, size) {
  const s   = size || 18;
  const raw = window.GameIcons[name];
  if (!raw) return '';
  // Inject width/height onto the <svg> tag
  return raw.replace('<svg ', `<svg width="${s}" height="${s}" `);
};

// Inject icons into nav buttons once the DOM is fully ready
document.addEventListener('DOMContentLoaded', function () {
  const navMap = {
    home:          'home',
    nodes:         'nodes',
    upgrades:      'upgrades',
    automation:    'automation',
    prestige:      'prestige',
    stats:         'stats',
    achievements:  'achievements',
    leaderboard:   'leaderboard',
    settings:      'settings',
    shop:          'shop',
  };
  document.querySelectorAll('nav button[data-page]').forEach(btn => {
    const key = btn.dataset.page;
    if (navMap[key] && window.GameIcons[navMap[key]]) {
      const label = btn.textContent.trim();
      btn.innerHTML =
        window.gi(navMap[key], 15) +
        '<span class="nav-label">' + label + '</span>';
    }
  });
});
