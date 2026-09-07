const test = require('node:test');
const assert = require('node:assert/strict');
const { game } = require('./harness.cjs');

test('formatting is unchanged at suffix boundaries and extreme Decimal magnitudes', () => {
  const before = game({ original: true }), after = game();
  const values = ['-100', '0', '0.99', '999', '999.99', '1000', '1001', '999999', '1000000', '1e33', '1e36', '1e300', '1e1000'];
  for (let exponent = 0; exponent <= 36; exponent++) for (const scale of [.999, 1, 1.001, 4.567]) values.push(String(scale * 10 ** exponent));
  for (const value of values) assert.equal(after.run(`formatNumber('${value}')`), before.run(`formatNumber('${value}')`), value);
  before.close(); after.close();
});

test('production, purchases, achievements and all orb hits match the original', () => {
  const before = game({ original: true }), after = game();
  for (const g of [before, after]) g.run('showAchievementToast = () => {};');
  for (let orb = 0; orb < 11; orb++) {
    for (const g of [before, after]) {
      g.run(`voidenergy=1e27; orbsData[${orb}].owned=true; applyEquippedOrb(orbsData[${orb}].id); nodesData.forEach((n,i)=>{n.count=10+${orb}*13+i; n.productionMultiplier=new Decimal(2**${orb});});`);
      if (g === after) g.run('invalidateProduction();');
      g.run("buyNode('abyssalshard'); generateResourcesPerTick(); for(let i=0;i<30;i++) voidenergyClick();");
    }
    assert.equal(after.snapshot(), before.snapshot(), `orb ${orb}`);
  }
  assert.deepEqual(after.errors, []);
  before.close(); after.close();
});

test('production cache invalidates on node, upgrade, orb purchases and rewards', async () => {
  const g = game();
  g.run('showAchievementToast=()=>{}; achievementsData.forEach(a=>a.unlocked=true); voidenergy=1e30;');
  assert.equal(g.run('calculateVEPT()'), 20);
  g.run("buyNode('abyssalshard')");
  assert.equal(g.run('calculateVEPT()'), 21);
  await g.w.changePage('upgrades'); g.frame();
  g.w.document.querySelector('.buy-btn').click(); g.frame();
  assert.equal(g.run('calculateVEPT()'), 22);
  await g.w.changePage('shop'); g.frame();
  g.w.document.querySelector('.orb-buy-btn[data-id="ember-shard"]').click(); g.frame();
  assert.ok(Math.abs(g.run('calculateVEPT()') - 25.3) < 1e-10);
  g.run("applyAchievementReward('hundred-ve')");
  assert.ok(Math.abs(g.run('calculateVEPT()') - 25.4265) < 1e-10);
  assert.deepEqual(g.errors, []);
  g.close();
});

test('save restoration keeps production stable, including repeated loads', () => {
  const g = game();
  g.run("voidenergy=1e20; nodesData[0].count=100; upgradesData[0].purchased=true; nodesData[0].productionMultiplier=new Decimal(2); orbsData[1].owned=true; achievementProdBonus=.05; invalidateProduction(); saveGame();");
  const production = g.run('calculateVEPT()');
  g.run('loadGame();'); assert.equal(g.run('calculateVEPT()'), production);
  g.run('loadGame();'); assert.equal(g.run('calculateVEPT()'), production);
  g.close();
});

test('legacy saves still restore node counts', () => {
  const g = game();
  g.w.localStorage.setItem('save', JSON.stringify({ voidenergy: 456, abyssalshard: 12, lifetimeVE: '1e12' }));
  g.run('loadGame();');
  assert.equal(g.run('nodesData[0].count'), 12);
  assert.equal(g.run('calculateVEPT()'), 32);
  g.close();
});

test('navigation loads each lazy module once and keeps the latest requested page', async () => {
  const g = game({ lazy: true });
  await Promise.all([g.w.changePage('home'), g.w.changePage('home'), g.w.changePage('nodes')]);
  assert.ok(g.w.document.querySelector('#nodes-tab'));
  for (let i = 0; i < 5; i++) {
    for (const page of ['home','nodes','upgrades','shop','stats','achievements','settings','automation','prestige','leaderboard']) {
      await g.w.changePage(page); g.frame();
    }
  }
  assert.equal(g.scripts.filter(s => s === 'js/home.js').length, 1);
  assert.equal(g.scripts.filter(s => s === 'js/shop.js').length, 1);
  assert.equal(g.intervals.size, 0, 'stats timer stops as soon as navigation leaves');
  assert.equal(g.frames.size, 0, 'no progress animation on unrelated pages');
  assert.deepEqual(g.errors, []);
  g.close();
});

test('bursts coalesce rendering and saves without dropping clicks or state', async () => {
  const g = game();
  await g.w.changePage('home'); g.frame();
  g.run('showAchievementToast=()=>{}; window.homeRenders=0; const realHomeRender=renderHomeDynamic; renderHomeDynamic=()=>{homeRenders++; realHomeRender();};');
  g.run('for(let i=0;i<100;i++) voidenergyClick();');
  assert.equal(g.run('totalClicks'), 100);
  assert.equal(g.run('homeRenders'), 0);
  assert.equal([...g.timers.values()].filter(t=>t.ms===0).length, 1, 'one save for multiple achievement unlocks');
  g.frame();
  assert.equal(g.run('homeRenders'), 1);
  assert.equal(g.w.document.querySelector('#voidenergy').textContent, g.run('formatNumber(voidenergy)'));
  const saveTimer = [...g.timers.values()].find(t=>t.ms===0); saveTimer.fn();
  assert.equal(JSON.parse(g.w.localStorage.getItem('save')).totalClicks, 100);
  assert.deepEqual(g.errors, []);
  g.close();
});

test('visible page affordability updates on clicks and ticks with no polling', async () => {
  const g = game();
  await g.w.changePage('nodes'); g.frame();
  assert.equal(g.w.document.querySelector('#abyssalshard-buy-btn').disabled, true);
  g.run('generateResourcesPerTick();'); g.frame();
  assert.equal(g.w.document.querySelector('#abyssalshard-buy-btn').disabled, false);
  assert.equal(g.intervals.size, 0);
  g.close();
});

test('hidden/disabled animations stop, foreground render resumes, timers stay singular', async () => {
  const g = game();
  g.run('initParticleCanvas(); startIdleGeneration(); startIdleGeneration();');
  assert.equal([...g.timers.values()].filter(t=>t.ms===8000).length, 1);
  assert.equal([...g.intervals.values()].filter(t=>t.ms===30000).length, 1);
  g.frame(); assert.ok(g.draws > 0);
  g.hidden(true); const draws = g.draws;
  g.frame(); assert.equal(g.draws, draws); assert.equal(g.frames.size, 0);
  g.run('voidenergyClick();'); assert.equal(g.frames.size, 0);
  g.hidden(false); g.frame(); assert.ok(g.draws > draws);
  g.run('backgroundAnimationEnabled=false; syncVisualSettings();');
  g.frame(); assert.equal(g.frames.size, 0);
  assert.ok(g.w.document.body.classList.contains('no-bg-animation'));
  assert.deepEqual(g.errors, []);
  g.close();
});

test('reset cannot be overwritten by a queued save or page-exit save', () => {
  const g = game();
  g.run('saveGame(); requestSave(); window._gameStarted=true; resetGame();');
  g.w.dispatchEvent(new g.w.Event('pagehide'));
  assert.equal(g.w.localStorage.getItem('save'), null);
  assert.equal([...g.timers.values()].filter(t=>t.ms===0).length, 0);
  // JSDOM cannot reload a document; this is the only expected diagnostic.
  assert.ok(g.errors.every(error => error.includes('Not implemented: navigation')));
  g.close();
});

test('startup honors stored visual settings and settings apply to click effects immediately', async () => {
  const g = game();
  g.run('backgroundAnimationEnabled=false; syncVisualSettings();');
  g.start();
  assert.equal(g.frames.size, 0, 'disabled title particles have no animation frame');
  await g.w.changePage('settings'); g.frame();
  const checkbox = g.w.document.querySelector('#toggle-click-effects');
  checkbox.checked = false;
  checkbox.dispatchEvent(new g.w.Event('change'));
  await g.w.changePage('home'); g.frame();
  g.run('spawnOrbClick({clientX:100,clientY:100}, 1);');
  assert.equal(g.w.document.querySelectorAll('.click-particle,.orb-burst-dot').length, 0);
  assert.deepEqual(g.errors, []);
  g.close();
});
