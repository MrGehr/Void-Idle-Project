# Relics — v0.0.8

Five relics are discovered automatically through progression. No currency, random drops, additional click grinding, or claim step is required. Reaching the next milestone automatically awakens a relic. Discovery and awakening alone grant no power: players explicitly equip relics in Shop → Relics.

One slot is available initially. Owning a Void Bloom unlocks the second; owning an Oblivion Spire unlocks the third. Discovery, ranks, and unlocked slots never decrease. Equip and unequip are free. A full New Game/Reset erases the collection. Prestige is still a placeholder in the game; future prestige code must retain the `relics` save object.

## Ranks and milestones

Each relic has five ranks. Milestones are evaluated in order. Meeting later requirements does not bypass an earlier requirement. Returning players receive all ranks their current saved progression qualifies for, with nothing automatically equipped.

| Relic | I | II | III | IV | V |
| --- | --- | --- | --- | --- | --- |
| Seed: production | +5% | +10% | +15% | +20% | +25% |
| Milestone | 10 Shards | 10 Whisper Engines | 25 Dark Matter Loops | 25 Graviton Seeders | 25 Oblivion Spires |
| Echo: ordinary-click reward every 10 manual clicks | 20% | 40% | 60% | 80% | 100% |
| Milestone | 3 upgrades | 10 upgrades | 25 upgrades | 50 upgrades | 70 upgrades |
| Architect: node purchase discount | 2% | 3.5% | 5% | 6.5% | 8% |
| Milestone | 25 total nodes | 75 total nodes | 150 total nodes | 350 total nodes | 750 total nodes |
| Stillness: passive tick bonus after 30 seconds | +8% | +12% | +16% | +20% | +25% |
| Milestone | 1 Dark Matter Loop | 10 Dark Matter Loops | 10 Void Blooms | 10 Null Beacons | 25 Oblivion Spires |
| Crown: critical main-hit reward | +5% | +8% | +12% | +16% | +20% |
| Milestone | Own any critical-hit orb | 50 upgrades | 25 Null Beacons | 25 Oblivion Spires | Own Eternal Collapse |

Upgrade milestones include node, tick-speed, and click-power upgrades. Crown stays locked until a critical-hit orb is owned, even if other milestones are already met.

## Effect order

- `calculateVEPT()` includes node, orb, achievement, and equipped production relic bonuses. Production relic bonuses add within their category and form one separate multiplier. This also increases the production basis used by orb clicks.
- `calculatePassiveVEPT()` multiplies that result by the active Stillness bonus. Only passive tick payouts and their displays use this function. Orb clicks use `calculateVEPT()`, so they do not receive Stillness.
- Each manual click interrupts Stillness. Automatic orb callbacks explicitly pass `source='auto'`; they do not interrupt Stillness or charge Echo. Tick payouts compare the activation deadline directly; the one-shot timeout only refreshes the UI. Equipping Stillness or loading a save starts a fresh wait.
- An ordinary click uses the current production, equipped orb click percentage, click upgrades, and click achievement bonuses, with existing normal-click rounding. It excludes critical/combo multipliers and cascade sub-hits.
- Echo grants its rank percentage of that ordinary click every tenth manual click. It does not invoke the click function or advance orb counters again. Unequipping Echo resets its charge; saves preserve charge while equipped.
- Crown grants its rank percentage of the original critical main-hit reward, including a coincident combo. It does not increase critical chance or amplify Echo/cascade payouts. Only genuine critical hits qualify.
- Echo and Crown carry separate fractional remainders in saves, paying whole VE when accumulated. This avoids turning a 0.2 VE early bonus into 1 VE on every activation.
- Architect changes the purchase price, affordability check, and displayed price. It never changes the stored base cost or growth rate. Discounts add within their category and are capped at 8% for this release.

## Performance and persistence

Relic modifiers are rebuilt only when equipment or progression changes, then invalidate the production cache. Milestone checks run on node/upgrade/orb purchases and save restoration, not on every click or animation frame. Collection cards rebuild only for structural changes; click charge and idle status patch text in place. Open awakening details are preserved across equipment changes.

The versioned `save.relics` object stores ranks, unique equipped IDs, capacity, Echo charge, and fractional remainders. Restoration filters unknown IDs and invalid fields, clamps rank/capacity/charge ranges, and recomputes modifiers. Old saves lacking relic data migrate from current node, upgrade, and orb progress. Existing manual/auto click counters, orb combo rules, and the game's native Number limits remain unchanged.

## Validation

Run `npm test` for the existing regressions plus relic tests. Coverage includes no-equipped-relic equivalence with the original economy, discovery/rank/slot permanence, every maximum rank, Crown gating, equipment capacity, cache invalidation, discounted purchases/cost growth, manual-versus-auto callbacks, Echo rounding/recursion/critical-combo isolation, Crown hit scope, Stillness deadlines/swaps, saved/reloaded bonuses, old/malformed saves, and the collection's equip/status controls.

Run `node tests/relics-balance.cjs` for a controlled funding comparison. Each scenario starts at zero VE and funds a hypothetical node purchase whose undiscounted price equals 100 baseline ticks. Node counts and production remain fixed; no clicks, reinvestment, new achievements, or other purchases occur. Only actually earned relic ranks/slots are used. Stillness's initial 30-second wait is included.

| Scenario | Equipped | Baseline | With relics | Less waiting |
| --- | --- | ---: | ---: | ---: |
| Early: 10 Shards; 8s ticks | Seed I | 800s | 752s | 6% |
| Mid: 75 Shards, 35 Whispers, 25 Dark Matter, 15 Blooms; 4s ticks | Seed III, Stillness III | 400s | 304s | 24% |
| Late: 1,000 of every node; 1s ticks | Seed V, Stillness V, Architect V | 100s | 65s | 35% |

These are fixed-production tests, not estimates of total run acceleration. Integer tick payouts affect the small early result. After activation, Seed V plus Stillness V gives 1.5625× passive production; Architect V lowers node prices to 92% of normal. Active-build results depend on the orb: Echo favors steady manual clicks and is a smaller fraction of income for heavily amplified critical/combo orbs; Crown is specific to critical builds. No single relic is intended to be best for every orb.

The collection uses existing SVG icons and responsive CSS, with no new image downloads or dependencies. Live browser/device layout validation remains outstanding; the local preview address was blocked in the earlier optimization work. This release should be reviewed before merging into the live GitHub Pages branch.
