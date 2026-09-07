const test = require('node:test');
const assert = require('node:assert/strict');
const { game } = require('./harness.cjs');
const closeTo = (actual, expected) => assert.ok(Math.abs(actual - expected) < Math.max(1, Math.abs(expected)) * 1e-10, `${actual} != ${expected}`);
function setup() {
  const g = game();
  g.run('achievementsData.forEach(a => a.unlocked=true); showAchievementToast=()=>{};');
  return g;
}
function give(g, ranks, equipped = [], slots = 3) {
  g.run(`restoreRelics(${JSON.stringify({ ranks, equipped, slots })})`);
}

test('discoveries are earned, never equipped automatically, and awakenings/slots persist', () => {
  const g = setup();
  g.run('checkRelicProgress();');
  assert.equal(g.run("relicRank('abyssal-seed')"), -1);
  assert.equal(g.run("equipRelic('abyssal-seed')"), false);
  g.run('nodesData[0].count=10; checkRelicProgress();');
  assert.equal(g.run("relicRank('abyssal-seed')"), 0);
  assert.equal(g.run('relicModifiers.production'), 0);
  g.run('nodesData[1].count=10; checkRelicProgress();');
  assert.equal(g.run("relicRank('abyssal-seed')"), 1);
  g.run("nodesData.find(n=>n.id==='voidbloom').count=1; checkRelicProgress();");
  assert.equal(g.run('relicState.slots'), 2);
  g.run("nodesData.find(n=>n.id==='oblivionspire').count=1; checkRelicProgress(); saveGame(); nodesData.forEach(n=>n.count=0); checkRelicProgress();");
  assert.equal(g.run('relicState.slots'), 3);
  assert.equal(g.run("relicRank('abyssal-seed')"), 1);
  assert.deepEqual(g.errors, []); g.close();
});

test('all relics reach their advertised maximum through actual milestones', () => {
  const g = setup();
  g.run('nodesData.forEach(n=>n.count=1000); upgradesData.forEach(u=>u.purchased=true); orbsData.forEach(o=>o.owned=true); checkRelicProgress();');
  assert.equal(g.run('RELIC_DEFS.every(r=>relicRank(r.id)===4)'), true);
  assert.equal(g.run('relicState.slots'), 3);
  assert.equal(g.run('relicState.equipped.length'), 0);
  g.close();
});

test('Crown stays locked until a critical orb is owned, even with other milestones met', () => {
  const g = setup();
  g.run('nodesData.forEach(n=>n.count=1000); upgradesData.forEach(u=>u.purchased=true); checkRelicProgress();');
  assert.equal(g.run("relicRank('fractured-crown')"), -1);
  g.run("orbsData.find(o=>o.id==='void-rift').owned=true; checkRelicProgress();");
  assert.equal(g.run("relicRank('fractured-crown')"), 3);
  g.close();
});

test('equipment rejects locked, unknown, duplicate and over-capacity requests', () => {
  const g = setup();
  give(g, {'abyssal-seed':0, 'echo-shard':0}, [], 1);
  assert.equal(g.run("equipRelic('nope')"), false);
  assert.equal(g.run("equipRelic('stillness-stone')"), false);
  assert.equal(g.run("equipRelic('abyssal-seed')"), true);
  assert.equal(g.run("equipRelic('abyssal-seed')"), false);
  assert.equal(g.run("equipRelic('echo-shard')"), false);
  assert.equal(g.run("unequipRelic('abyssal-seed')"), true);
  assert.equal(g.run("equipRelic('echo-shard')"), true);
  assert.equal(g.run('relicModifiers.production'), 0);
  g.close();
});

test('Seed remains a separate percentage multiplier and updates the production cache', () => {
  const g = setup();
  give(g, {'abyssal-seed':0});
  g.run('nodesData[0].count=100; achievementProdBonus=.5; orbsData[1].owned=true; invalidateProduction();');
  const base = g.run('calculateVEPT()');
  g.run("equipRelic('abyssal-seed')"); closeTo(g.run('calculateVEPT()'), base*1.05);
  g.run("unequipRelic('abyssal-seed')"); closeTo(g.run('calculateVEPT()'), base);
  give(g, {'abyssal-seed':4}, ['abyssal-seed']); closeTo(g.run('calculateVEPT()'), base*1.25);
  g.close();
});

test('Architect uses discounted affordability and deduction without compounding discounts into cost growth', async () => {
  const g = setup();
  give(g, {'architect-seal':0}, ['architect-seal']);
  g.run('voidenergy=9.8;');
  await g.w.changePage('nodes'); g.frame();
  assert.equal(g.w.document.querySelector('#abyssalshard-buy-btn').disabled, false);
  g.run("buyNode('abyssalshard')"); g.frame();
  closeTo(g.run('voidenergy'), 0);
  closeTo(g.run('nodesData[0].cost.toNumber()'), 11.8);
  closeTo(g.run('getNodePurchaseCost(nodesData[0]).toNumber()'), 11.8*.98);
  g.run("unequipRelic('architect-seal')");
  closeTo(g.run('getNodePurchaseCost(nodesData[0]).toNumber()'),11.8);
  assert.deepEqual(g.errors, []); g.close();
});

test('Echo counts only manual clicks, does not recurse, and carries tiny rewards fairly', () => {
  const g = setup();
  give(g, {'echo-shard':0}, ['echo-shard']);
  g.run("for(let i=0;i<9;i++) voidenergyClick(); for(let i=0;i<20;i++) voidenergyClick(1,'auto');");
  assert.equal(g.run('relicState.echoCharge'), 9);
  const first = g.run('voidenergyClick()');
  assert.equal(first.isEcho, true); assert.equal(first.echoReward, 0);
  closeTo(g.run('relicState.fractions.echo'), .2);
  g.run('for(let i=0;i<40;i++) voidenergyClick();');
  closeTo(g.run('voidenergy'),71); // 70 ordinary rewards + one accumulated Echo VE.
  assert.equal(g.run('totalClicks'),70);
  assert.equal(g.run('relicState.echoCharge'),0);
  g.close();
});

test('Echo excludes actual combo/crit bursts and does not advance orb counters again', () => {
  const g = setup();
  give(g, {'echo-shard':4}, ['echo-shard']);
  g.run("orbsData.find(o=>o.id==='eternal-collapse').owned=true; applyEquippedOrb('eternal-collapse'); Math.random=()=>0; invalidateProduction(); orbComboCount=2; relicState.echoCharge=9;");
  const result = g.run('voidenergyClick()');
  assert.equal(result.isCombo,true); assert.equal(result.isCrit,true); assert.equal(result.isEcho,true);
  assert.equal(result.echoReward,33); // 20 base production * 11 passive * 15% ordinary click.
  assert.equal(g.run('orbComboCount'),3); assert.equal(g.run('totalCombos'),1); assert.equal(g.run('totalCrits'),1);
  g.close();
});

test('Crown boosts only critical main hits and leaves cascade rewards intact', () => {
  const g = setup();
  give(g, {'fractured-crown':4}, ['fractured-crown']);
  g.run("orbsData.find(o=>o.id==='void-rift').owned=true; applyEquippedOrb('void-rift'); nodesData[0].count=980; invalidateProduction(); Math.random=()=>0;");
  const crit=g.run('voidenergyClick()'); closeTo(crit.criticalReward,288); closeTo(crit.reward,1728);
  g.run('Math.random=()=>1;'); const normal=g.run('voidenergyClick()'); assert.equal(normal.criticalReward,0);
  g.run("orbsData.find(o=>o.id==='entropy-engine').owned=true; applyEquippedOrb('entropy-engine'); invalidateProduction();");
  const cascade=g.run('voidenergyClick()'); assert.equal(cascade.criticalReward,0); assert.equal(cascade.isCascade,true);
  g.close();
});

test('Stillness applies only to passive ticks, survives auto-clicks, resets on manual clicks and re-equipping', () => {
  const g = setup();
  give(g, {'stillness-stone':4}, ['stillness-stone']);
  assert.equal(g.run('calculatePassiveVEPT()'),20);
  g.frame(29999); assert.equal(g.run('getRelicIdleBonus()'),0);
  g.frame(1); assert.equal(g.run('calculatePassiveVEPT()'),25);
  const auto=g.run("voidenergyClick(1,'auto')"); assert.equal(auto.reward,1);
  assert.equal(g.run('calculateVEPT()'),20); assert.equal(g.run('getRelicIdleBonus()'),.25);
  g.run('voidenergy=0; generateResourcesPerTick();'); assert.equal(g.run('voidenergy'),25);
  g.run('voidenergyClick();'); assert.equal(g.run('getRelicIdleBonus()'),0);
  g.frame(30000); assert.equal(g.run('getRelicIdleBonus()'),.25);
  g.run("unequipRelic('stillness-stone'); equipRelic('stillness-stone');"); assert.equal(g.run('getRelicIdleBonus()'),0);
  g.close();
});

test('real automatic-orb callback cannot charge Echo or interrupt Stillness', () => {
  const g=setup();
  give(g, {'echo-shard':0,'stillness-stone':0}, ['echo-shard','stillness-stone']);
  g.run("orbsData.find(o=>o.id==='shadow-wisp').owned=true; applyEquippedOrb('shadow-wisp'); invalidateProduction();");
  g.frame(30000);
  const auto=[...g.intervals.values()].find(t=>t.ms===5000); assert.ok(auto); auto.fn();
  assert.equal(g.run('relicState.echoCharge'),0); assert.equal(g.run('getRelicIdleBonus()'),.08);
  g.close();
});

test('new relic saves round-trip without double bonuses; reload restarts Stillness', () => {
  const g=setup();
  give(g, {'abyssal-seed':4,'echo-shard':1,'stillness-stone':4}, ['abyssal-seed','echo-shard','stillness-stone']);
  g.run('for(let i=0;i<13;i++) voidenergyClick(); saveGame();');
  const saved=g.run('JSON.stringify(serializeRelics())'); const production=g.run('calculateVEPT()');
  g.frame(30000); assert.equal(g.run('getRelicIdleBonus()'),.25);
  g.run('loadGame();'); assert.equal(g.run('JSON.stringify(serializeRelics())'),saved);
  assert.equal(g.run('getRelicIdleBonus()'),0); assert.equal(g.run('calculateVEPT()'),production);
  g.run('loadGame();'); assert.equal(g.run('calculateVEPT()'),production);
  g.close();
});

test('old saves discover earned relics safely; malformed relic fields are sanitized', () => {
  const g=setup();
  g.w.localStorage.setItem('save',JSON.stringify({voidenergy:100, nodes:[{id:'abyssalshard',count:10,cost:'52'}]}));
  g.run('loadGame();'); assert.equal(g.run("relicRank('abyssal-seed')"),0); assert.equal(g.run('relicState.equipped.length'),0);
  give(g, {'abyssal-seed':999,'echo-shard':-9,'unknown':1}, ['unknown','abyssal-seed','abyssal-seed','echo-shard'], 99);
  assert.equal(g.run('relicState.equipped.join()'),'abyssal-seed'); assert.equal(g.run("relicRank('abyssal-seed')"),4);
  g.close();
});

test('collection UI equips, enforces capacity, retains open paths, and updates live status', async () => {
  const g=setup();
  give(g, {'abyssal-seed':0,'echo-shard':0}, [], 1);
  g.run("shopActivePage='relics'"); await g.w.changePage('shop'); g.frame();
  assert.equal(g.w.document.querySelectorAll('.relic-card').length,5);
  const path=g.w.document.querySelector('[data-relic-path="echo-shard"]');path.open=true;
  g.w.document.querySelector('[data-relic-card="echo-shard"] .relic-equip').click();g.frame();
  assert.equal(g.run("relicEquipped('echo-shard')"),true);
  assert.equal(g.w.document.querySelector('[data-relic-card="abyssal-seed"] .relic-equip').disabled,true);
  assert.equal(g.w.document.querySelector('[data-relic-path="echo-shard"]').open,true);
  const card=g.w.document.querySelector('[data-relic-card="echo-shard"]');
  g.run('voidenergyClick()');g.frame();
  assert.equal(g.w.document.querySelector('[data-relic-card="echo-shard"]'),card,'clicks patch status without rebuilding cards');
  assert.match(g.w.document.querySelector('[data-relic-status="echo-shard"]').textContent,/1 \/ 10/);
  g.w.document.querySelector('[data-relic-card="echo-shard"] .relic-equip').click();g.frame();
  assert.equal(g.w.document.querySelector('[data-relic-card="abyssal-seed"] .relic-equip').disabled,false);
  assert.deepEqual(g.errors,[]);g.close();
});
