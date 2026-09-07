// Permanent collection progress. Only equipped relics contribute effects.
// Keep relics in future prestige saves; a full New Game/Reset still erases them.
const RELIC_RANK_NAMES = ['I', 'II', 'III', 'IV', 'V'];
const RELIC_IDLE_DELAY = 30000;
const nodeGoal = (id, amount, name) => ({ kind: 'node', id, amount, label: `Own ${amount} ${name}` });
const upgradeGoal = amount => ({ kind: 'upgrades', amount, label: `Purchase ${amount} upgrades` });
const RELIC_DEFS = [
  { id: 'abyssal-seed', name: 'Seed of the Abyss', role: 'Production', icon: 'nodes', color: '#7fffba',
    flavor: 'A patient fragment of creation. Every new frontier feeds its roots.',
    effect: 'production', values: [.05, .10, .15, .20, .25],
    milestones: [nodeGoal('abyssalshard', 10, 'Abyssal Shards'), nodeGoal('whisperengine', 10, 'Whisper Engines'), nodeGoal('darkmatterloop', 25, 'Dark Matter Loops'), nodeGoal('gravitonseeder', 25, 'Graviton Seeders'), nodeGoal('oblivionspire', 25, 'Oblivion Spires')] },
  { id: 'echo-shard', name: 'Echo Shard', role: 'Manual clicks', icon: 'ach-click10', color: '#66fffa',
    flavor: 'The void remembers your touch. The tenth echo answers.',
    effect: 'echo', values: [.20, .40, .60, .80, 1],
    milestones: [3, 10, 25, 50, 70].map(upgradeGoal) },
  { id: 'architect-seal', name: 'Architect’s Seal', role: 'Node purchases', icon: 'upgrades', color: '#ffd700',
    flavor: 'An ancient blueprint that reveals how to build with less.',
    effect: 'discount', values: [.02, .035, .05, .065, .08],
    milestones: [25, 75, 150, 350, 750].map(amount => ({ kind: 'totalNodes', amount, label: `Own ${amount} nodes in total` })) },
  { id: 'stillness-stone', name: 'Stillness Stone', role: 'Idle income', icon: 'tickspeed', color: '#bfa0ff',
    flavor: 'When your hands are still, the void begins to breathe.',
    effect: 'idle', values: [.08, .12, .16, .20, .25],
    milestones: [nodeGoal('darkmatterloop', 1, 'Dark Matter Loop'), nodeGoal('darkmatterloop', 10, 'Dark Matter Loops'), nodeGoal('voidbloom', 10, 'Void Blooms'), nodeGoal('nullbeacon', 10, 'Null Beacons'), nodeGoal('oblivionspire', 25, 'Oblivion Spires')] },
  { id: 'fractured-crown', name: 'Fractured Crown', role: 'Critical hits', icon: 'prestige', color: '#ff789c',
    flavor: 'A broken sovereign’s promise: make the decisive strike count.',
    effect: 'critical', values: [.05, .08, .12, .16, .20],
    milestones: [{ kind: 'critOrb', amount: 1, label: 'Own an orb with critical hits' }, upgradeGoal(50), nodeGoal('nullbeacon', 25, 'Null Beacons'), nodeGoal('oblivionspire', 25, 'Oblivion Spires'), { kind: 'orb', id: 'eternal-collapse', amount: 1, label: 'Own Eternal Collapse' }] },
];
const RELIC_BY_ID = new Map(RELIC_DEFS.map(relic => [relic.id, relic]));
let relicState = { ranks: {}, equipped: [], slots: 1, echoCharge: 0, fractions: { echo: 0, critical: 0 } };
let relicModifiers = { production: 0, echo: 0, discount: 0, idle: 0, critical: 0 };
let relicViewRevision = 0;
let stillnessReadyAt = Infinity;
let stillnessTimer = null;

function relicRank(id) { return relicState.ranks[id] ?? -1; }
function relicEquipped(id) { return relicState.equipped.includes(id); }
function relicProgressSnapshot() {
  const counts = new Map(window.nodesData.map(n => [n.id, n.count]));
  const ownedOrbs = new Set((window.orbsData || []).filter(o => o.owned).map(o => o.id));
  return { counts, ownedOrbs,
    totalNodes: window.nodesData.reduce((sum, n) => sum + n.count, 0),
    upgrades: (window.upgradesData || []).reduce((sum, u) => sum + Number(u.purchased), 0),
    critOrb: Number((window.orbsData || []).some(o => o.owned && o.active.critChance > 0)),
  };
}
function relicGoalValue(goal, progress) {
  if (goal.kind === 'node') return progress.counts.get(goal.id) || 0;
  if (goal.kind === 'orb') return Number(progress.ownedOrbs.has(goal.id));
  return progress[goal.kind] || 0;
}
function rebuildRelicModifiers() {
  relicModifiers = { production: 0, echo: 0, discount: 0, idle: 0, critical: 0 };
  for (const id of relicState.equipped) {
    const relic = RELIC_BY_ID.get(id);
    if (relic && relicRank(id) >= 0) relicModifiers[relic.effect] += relic.values[relicRank(id)];
  }
  // A bounded discount protects the cost curve if future relics add discounts.
  relicModifiers.discount = Math.min(.08, relicModifiers.discount);
  invalidateProduction();
}
function checkRelicProgress({ silent = false } = {}) {
  const progress = relicProgressSnapshot();
  let changed = false;
  const notices = [];
  for (const relic of RELIC_DEFS) {
    let rank = relicRank(relic.id);
    while (rank + 1 < relic.values.length && relicGoalValue(relic.milestones[rank + 1], progress) >= relic.milestones[rank + 1].amount) rank++;
    if (rank !== relicRank(relic.id)) {
      notices.push(`${relic.name} ${relicRank(relic.id) < 0 ? 'discovered' : 'awakened'} · Rank ${RELIC_RANK_NAMES[rank]}`);
      relicState.ranks[relic.id] = rank;
      changed = true;
    }
  }
  const slots = (progress.counts.get('oblivionspire') || 0) >= 1 ? 3 : (progress.counts.get('voidbloom') || 0) >= 1 ? 2 : 1;
  if (slots > relicState.slots) { relicState.slots = slots; changed = true; notices.push(`${slots} relic slots unlocked`); }
  relicViewRevision++;
  if (changed) {
    rebuildRelicModifiers();
    if (!silent) { requestSave(); announceRelics(notices); }
  }
  if (!silent) requestGameRender();
  return changed;
}
function restartStillness() {
  if (stillnessTimer !== null) clearTimeout(stillnessTimer);
  stillnessTimer = null;
  stillnessReadyAt = Infinity;
  if (relicModifiers.idle > 0) {
    stillnessReadyAt = Date.now() + RELIC_IDLE_DELAY;
    // This timer only updates the view. Tick payouts always check the deadline directly.
    stillnessTimer = setTimeout(() => { stillnessTimer = null; requestGameRender(); }, RELIC_IDLE_DELAY);
  }
}
function equipRelic(id) {
  if (!RELIC_BY_ID.has(id) || relicRank(id) < 0 || relicEquipped(id) || relicState.equipped.length >= relicState.slots) return false;
  relicState.equipped.push(id);
  if (id === 'echo-shard') relicState.echoCharge = 0;
  rebuildRelicModifiers();
  if (id === 'stillness-stone') restartStillness();
  relicViewRevision++;
  requestGameRender();
  saveGame();
  return true;
}
function unequipRelic(id) {
  if (!relicEquipped(id)) return false;
  relicState.equipped = relicState.equipped.filter(equipped => equipped !== id);
  if (id === 'echo-shard') relicState.echoCharge = 0;
  rebuildRelicModifiers();
  if (id === 'stillness-stone') restartStillness();
  relicViewRevision++;
  requestGameRender();
  saveGame();
  return true;
}
function getRelicIdleBonus(now = Date.now()) {
  return now >= stillnessReadyAt ? relicModifiers.idle : 0;
}
function calculatePassiveVEPT() {
  return calculateVEPT() * (1 + getRelicIdleBonus());
}
function getNodePurchaseCost(node) {
  // Do not mutate node.cost or its exponential growth rate.
  return relicModifiers.discount > 0 ? node.cost.mul(1 - relicModifiers.discount) : node.cost;
}
function collectRelicFraction(kind, value, fraction) {
  // Carry sub-unit bonuses instead of rounding every proc up to a full VE.
  const total = new Decimal(value).mul(fraction).plus(relicState.fractions[kind]);
  const whole = total.floor();
  relicState.fractions[kind] = Math.max(0, Math.min(.9999999999999999, total.minus(whole).toNumber()));
  return whole.toNumber();
}
function applyRelicClickEffects({ manual, ordinaryReward, reward, isCrit }) {
  let echoReward = 0, criticalReward = 0, isEcho = false;
  if (manual) {
    if (relicModifiers.idle > 0) restartStillness();
    if (relicModifiers.echo > 0) {
      relicState.echoCharge++;
      if (relicState.echoCharge >= 10) {
        relicState.echoCharge = 0;
        isEcho = true;
        echoReward = collectRelicFraction('echo', ordinaryReward, relicModifiers.echo);
      }
    }
  }
  if (isCrit && relicModifiers.critical > 0) criticalReward = collectRelicFraction('critical', reward, relicModifiers.critical);
  return { echoReward, criticalReward, isEcho };
}
function serializeRelics() {
  return { version: 1, ranks: { ...relicState.ranks }, equipped: [...relicState.equipped], slots: relicState.slots,
    echoCharge: relicState.echoCharge, fractions: { ...relicState.fractions } };
}
function restoreRelics(saved) {
  const data = saved && typeof saved === 'object' ? saved : {};
  relicState = { ranks: {}, equipped: [], slots: 1, echoCharge: 0, fractions: { echo: 0, critical: 0 } };
  for (const relic of RELIC_DEFS) {
    const rank = data.ranks?.[relic.id];
    if (Number.isInteger(rank) && rank >= 0) relicState.ranks[relic.id] = Math.min(rank, relic.values.length - 1);
  }
  if (Number.isInteger(data.slots)) relicState.slots = Math.max(1, Math.min(3, data.slots));
  // Apply current milestones before validating equipped slots (also migrates older saves).
  checkRelicProgress({ silent: true });
  if (Array.isArray(data.equipped)) {
    relicState.equipped = [...new Set(data.equipped)].filter(id => RELIC_BY_ID.has(id) && relicRank(id) >= 0).slice(0, relicState.slots);
  }
  if (relicEquipped('echo-shard') && Number.isInteger(data.echoCharge)) relicState.echoCharge = Math.max(0, Math.min(9, data.echoCharge));
  for (const kind of ['echo', 'critical']) {
    const fraction = data.fractions?.[kind];
    if (Number.isFinite(fraction) && fraction >= 0 && fraction < 1) relicState.fractions[kind] = fraction;
  }
  rebuildRelicModifiers();
  // No saved deadline: loading or equipping starts a fresh uninterrupted wait.
  restartStillness();
  relicViewRevision++;
}
function relicPercent(value) { return Number((value * 100).toFixed(1)) + '%'; }
function relicEffectText(relic, rank) {
  const value = relicPercent(relic.values[Math.max(0, rank)]);
  if (relic.effect === 'production') return `+${value} production, including the production used by orb clicks.`;
  if (relic.effect === 'echo') return `Every 10th manual click echoes for ${value} of an ordinary click, before critical and combo bonuses.`;
  if (relic.effect === 'discount') return `Node purchases cost ${value} less. Normal cost growth is unchanged.`;
  if (relic.effect === 'idle') return `+${value} passive tick income after 30 seconds without manual clicks. Auto-clicks do not interrupt it or receive the bonus.`;
  return `Critical hits award ${value} more main-hit energy. Critical chance and cascade rewards are unchanged.`;
}
function relicLiveStatus(relic) {
  if (!relicEquipped(relic.id)) return relicRank(relic.id) >= 0 ? 'In your collection' : 'Undiscovered';
  if (relic.effect === 'echo') return `Echo charge: ${relicState.echoCharge} / 10 manual clicks`;
  if (relic.effect === 'idle') return getRelicIdleBonus() > 0 ? `Stillness active · +${relicPercent(relicModifiers.idle)} passive income` : 'Gathering stillness · requires 30s without manual clicks';
  if (relic.effect === 'critical' && !(window.orbsData.find(o => o.id === window.equippedOrbId)?.active.critChance > 0)) return 'Equip a critical-hit orb to use this effect';
  return 'Equipped · effect active';
}
function relicSummary() {
  const owned = RELIC_DEFS.filter(relic => relicRank(relic.id) >= 0).length;
  const names = relicState.equipped.map(id => RELIC_BY_ID.get(id).name).join(', ');
  return names || (owned ? `${owned} discovered · equip in Shop → Relics` : 'Discover your first relic with 10 Abyssal Shards or 3 upgrades');
}

function renderRelicCollection() {
  const progress = relicProgressSnapshot();
  const owned = RELIC_DEFS.filter(relic => relicRank(relic.id) >= 0).length;
  const slotGoals = ['Available from the start', 'Own a Void Bloom to unlock', 'Own an Oblivion Spire to unlock'];
  return `
    <div class="relic-intro">
      <div><p class="relic-eyebrow">Fragments of an older void</p><h3>Your relic collection</h3>
        <p>Discover relics through milestones. Awaken their power as you progress. Only equipped relics grant bonuses.</p></div>
      <div class="relic-collection-count"><strong>${owned}<span> / ${RELIC_DEFS.length}</span></strong><span>discovered</span></div>
    </div>
    <div class="relic-slots" aria-label="Relic equipment slots">
      ${[0, 1, 2].map(index => {
        const id = relicState.equipped[index], relic = RELIC_BY_ID.get(id);
        const locked = index >= relicState.slots;
        return `<div class="relic-slot ${locked ? 'is-locked' : relic ? 'is-filled' : 'is-empty'}">
          <span class="relic-eyebrow">Slot ${index + 1}${locked ? ' · Locked' : ''}</span>
          <strong>${relic ? relic.name : locked ? 'Awaiting discovery' : 'Choose a relic'}</strong>
          <span>${relic ? `Rank ${RELIC_RANK_NAMES[relicRank(id)]} · ${relic.role}` : locked ? slotGoals[index] : 'Equip from your collection below'}</span>
          ${relic ? `<button class="relic-unequip" data-relic-action="unequip" data-relic-id="${id}" aria-label="Unequip ${relic.name}">Unequip</button>` : ''}
        </div>`;
      }).join('')}
    </div>
    <p class="relic-permanence">Discovery, awakenings, and unlocked slots are permanent collection progress. Full New Game or Reset erases the collection.</p>
    <div class="relic-grid">
      ${RELIC_DEFS.map(relic => {
        const rank = relicRank(relic.id), owned = rank >= 0, equipped = relicEquipped(relic.id);
        const next = relic.milestones[rank + 1];
        const nextValue = next ? Math.min(next.amount, relicGoalValue(next, progress)) : 1;
        const fill = next ? Math.min(100, 100 * nextValue / next.amount) : 100;
        const full = relicState.equipped.length >= relicState.slots;
        return `<article class="relic-card ${equipped ? 'is-equipped' : owned ? 'is-owned' : 'is-locked'}" style="--relic-color:${relic.color}" data-relic-card="${relic.id}">
          <div class="relic-card-heading"><div class="relic-emblem" aria-hidden="true">${gi(relic.icon, 32)}</div>
            <div><span class="relic-eyebrow">${relic.role}</span><h4>${relic.name}</h4></div>
            <span class="relic-rank">${owned ? `Rank ${RELIC_RANK_NAMES[rank]}` : 'Locked'}</span></div>
          <p class="relic-flavor">${relic.flavor}</p>
          <p class="relic-effect">${owned ? '' : '<span class="relic-preview-label">On discovery: </span>'}${relicEffectText(relic, rank)}</p>
          <p class="relic-status" data-relic-status="${relic.id}">${relicLiveStatus(relic)}</p>
          <div class="relic-milestone">
            <span>${next ? owned ? 'Next awakening' : 'Discovery milestone' : 'Fully awakened'}</span>
            <strong>${next ? next.label : 'All five ranks earned'}</strong>
            <div class="relic-progress" role="progressbar" aria-label="${relic.name} ${owned ? 'awakening' : 'discovery'}" aria-valuemin="0" aria-valuemax="${next ? next.amount : 1}" aria-valuenow="${nextValue}"><span style="width:${fill}%"></span></div>
            <span>${next ? `${nextValue} / ${next.amount}` : 'Collection progress retained'}</span>
          </div>
          <details class="relic-path" data-relic-path="${relic.id}"><summary>Awakening path</summary><ol>
            ${relic.milestones.map((goal, i) => `<li class="${i <= rank ? 'is-earned' : ''}"><strong>Rank ${RELIC_RANK_NAMES[i]} · ${relicPercent(relic.values[i])}</strong><span>${goal.label}${i <= rank ? ' · Earned' : ''}</span></li>`).join('')}
          </ol></details>
          <button class="relic-equip" data-relic-action="${equipped ? 'unequip' : 'equip'}" data-relic-id="${relic.id}" ${!owned || (!equipped && full) ? 'disabled' : ''} aria-label="${equipped ? 'Unequip' : 'Equip'} ${relic.name}">${equipped ? 'Unequip' : !owned ? 'Reach milestone to discover' : full ? 'Unequip a relic to make room' : 'Equip relic'}</button>
        </article>`;
      }).join('')}
    </div>
    <p class="relic-rules">Echo counts manual clicks only; bonus hits never trigger more hits. Small Echo and Crown bonuses accumulate until they award a full VE. Unequipping Echo resets its charge. Equipping Stillness or loading a save starts a fresh 30-second wait.</p>
  `;
}
function renderRelicsSubPage() {
  return `<div id="relic-collection" data-revision="${relicViewRevision}">${renderRelicCollection()}</div>`;
}
function wireRelicCollection(content) {
  const root = content.querySelector('#relic-collection');
  if (!root) return;
  root.addEventListener('click', event => {
    const button = event.target.closest('button[data-relic-action]');
    if (!button || button.disabled || !root.contains(button)) return;
    if (button.dataset.relicAction === 'equip') equipRelic(button.dataset.relicId);
    else unequipRelic(button.dataset.relicId);
  });
}
function updateRelicCollection() {
  const root = document.getElementById('relic-collection');
  if (!root) return;
  if (root.dataset.revision !== String(relicViewRevision)) {
    const openPaths = [...root.querySelectorAll('details[open]')].map(path => path.dataset.relicPath);
    const focused = document.activeElement?.closest('[data-relic-card]')?.dataset.relicCard;
    root.innerHTML = renderRelicCollection();
    root.dataset.revision = relicViewRevision;
    for (const id of openPaths) root.querySelector(`[data-relic-path="${id}"]`).open = true;
    if (focused) root.querySelector(`[data-relic-card="${focused}"] .relic-equip`)?.focus();
  }
  for (const relic of RELIC_DEFS) setText(root.querySelector(`[data-relic-status="${relic.id}"]`), relicLiveStatus(relic));
}

let relicNoticeTimer = null;
function announceRelics(messages) {
  let notice = document.getElementById('relic-notice');
  if (!notice) {
    notice = document.createElement('div');
    notice.id = 'relic-notice';
    notice.className = 'relic-notice';
    notice.setAttribute('role', 'status');
    const text = document.createElement('span');
    const button = document.createElement('button');
    button.textContent = 'View relics';
    button.onclick = () => { window.shopActivePage = 'relics'; changePage('shop'); notice.hidden = true; };
    notice.append(text, button);
    document.body.appendChild(notice);
  }
  setText(notice.querySelector('span'), messages.join(' · '));
  notice.hidden = false;
  if (relicNoticeTimer !== null) clearTimeout(relicNoticeTimer);
  relicNoticeTimer = setTimeout(() => { notice.hidden = true; relicNoticeTimer = null; }, 6000);
}
