# Runtime optimization

This change reduces repeated calculation, DOM work, storage writes, and asset transfer while preserving the current economy and tick intervals.

## Changes

- Cache total production until a node/upgrade/orb purchase, production achievement reward, or save load invalidates it. Any future feature that changes node production, node counts, orb ownership, or production bonuses must call `invalidateProduction()` before reading production.
- Skip conditions for unlocked achievements, retaining condition order and immediate reward application. Several achievements earned together schedule one save, with explicit saves and page exit flushing pending work. Reset prevents an exit save from recreating erased progress.
- Coalesce resource/home rendering into animation frames. Nodes, upgrades, and shop affordability update on game-state changes instead of continuous polling. Call `requestGameRender()` after future resource mutations.
- Load each page script once and ignore stale asynchronous navigation. Dispose page timers on navigation and prevent duplicate idle-generation chains.
- Limit decorative canvas drawing and the tick bar to 30 fps. Stop decorative loops when disabled or hidden, stop the tick bar on unrelated pages, and use elapsed time for particle movement. Use a transform for the home tick bar to avoid changing layout width.
- Reuse number-format suffix constants and skip unchanged text/HTML writes. Cache click-effect preferences instead of reading localStorage for each click. Avoid preloading title music.
- Serve pinned break_infinity.js 2.2.0 locally with its license, eliminating the startup CDN dependency. The vendored source directory remains available separately.
- Use lossless WebP node icons: 10,163,425 bytes → 6,908,974 bytes (32.0% reduction). Dimensions and every decoded RGBA pixel were verified identical. Original PNG source assets remain available.
- Make production-multiplier restoration idempotent when loading a save more than once.

## Reproducible checks

Requires Node.js 18+ and a Git checkout containing baseline commit `3444c3f4f26c6627cf9c5e7930eaa36cd74f7706`.

```sh
npm ci
npm test
npm run benchmark
```

`BASELINE_REF` can override the baseline for deliberate comparisons. Development dependencies are only used by tests; the game remains a static site with no build step.

All 11 regression tests passed, including original-versus-optimized production, purchases, reward ordering, and seeded hits from all 11 orbs; formatting through Decimal magnitudes of 1e1000; cache invalidation; current and legacy saves; repeated save loading; repeated navigation through all tabs; coalesced rendering/saves; affordability; visibility/settings; singular timers; and reset/save lifecycle safety. All first-party JavaScript passed syntax checks and the diff passed whitespace checks.

## Local benchmark results

Median of five runs after warmup, using the same Decimal library and seeded mature-game state in Node/JSDOM. Tests run inside isolated JavaScript contexts. These are targeted CPU measurements, not browser FPS or device-wide speedups. Completed-achievement and production-cache workloads deliberately exercise stable late-game state.

| Workload | Operations | Original (ms) | Optimized (ms) | Speedup |
| --- | ---: | ---: | ---: | ---: |
| Repeated production reads | 100,000 | 1,957.72 | 8.29 | 236.26× |
| Number formatting | 50,000 | 393.66 | 111.06 | 3.54× |
| Completed achievement checks | 10,000 | 1,601.81 | 15.74 | 101.75× |
| Click calculations, no mounted UI | 10,000 | 1,933.24 | 51.33 | 37.66× |

## Remaining validation and limits

The cloud browser rejected the local preview address with `ERR_BLOCKED_BY_CLIENT`. DOM tests verified behavior, but rendered browser performance, visual appearance, and real mobile/low-end hardware still need checking before merging. In particular, check title/home particles, the tick bar, and WebP icons in the deployed preview.

The game's spendable balance and final VEPT still use native JavaScript Number values; lifetime VE and intermediate node arithmetic use Decimal. This change does not extend Number precision or its finite range, add background/offline catch-up, change manual-click limits, or alter progression speed. Extremely large future economies need a separate consistent Decimal-balance migration with save compatibility tests. No universal FPS guarantee is implied.
