# v0.0.9 interface refresh

Home prioritizes the orb, income, and three suggested next purchases. Suggested upgrade navigation selects the corresponding category and clears filters that could hide it. Progress and production are compact; detailed loadout effects expand on demand. Release notes remain available beneath the dashboard.

Every page shares navigation, typography, spacing, visible keyboard focus, a manual save button, and a Relics shortcut. Resource totals appear above secondary pages; Home uses its own resource display to avoid duplication. The navigation scrolls horizontally on narrow screens. Node tables retain horizontal scrolling within their card.

Nodes, Upgrades, Shop, and Achievements have search and state filters. Upgrade search applies to the selected category, as indicated by its default filter. Filters and the upgrade category persist for the session. Empty results have a clear recovery action. Achievement categories without visible results are hidden. Locked achievement names remain concealed.

Stats uses responsive summary and bonus grids. Settings adds a saved reduced-motion preference; system reduced-motion settings are also respected. This preference stops CSS animation and transitions; existing Background Animation and Click Effects settings control canvas decoration and click particles. Automation, Prestige, and Rankings retain their in-development status and offer links to current features.

The shared UI uses the existing render scheduler, with no new polling timers, third-party dependencies, network calls, or changes to purchase costs/rewards. Versioned script URLs load the matching release modules.

Validation: `npm test` (32 tests), including every page mounting, filters after purchases and achievement unlocks, shop subtab transitions, recommendation navigation, remembered category, save behavior, and existing economy/relic regressions. `git diff --check` passes. Desktop/mobile CSS has responsive breakpoints but has not been visually verified in a browser against this unpublished branch; review the layout before release.
