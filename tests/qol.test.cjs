const test=require('node:test');
const assert=require('node:assert/strict');
const {game}=require('./harness.cjs');
const navigate=async(g,page)=>{await g.w.changePage(page);g.frame();};
test('all ten pages mount shared navigation without duplicate HUDs or errors',async()=>{
  const g=game();
  for(const page of ['home','nodes','upgrades','shop','automation','prestige','stats','achievements','leaderboard','settings','home']){
    await navigate(g,page);
    assert.equal(g.w.document.querySelectorAll('#qol-hud').length,1);
    assert.equal(g.w.document.querySelectorAll('#qol-tools').length,1);
    assert.equal(g.w.document.querySelector('#main-nav [aria-current=page]').dataset.page,page);
  }
  assert.deepEqual(g.errors,[]);g.close();
});
test('node affordability filter follows actual purchases and retains search on navigation',async()=>{
  const g=game();g.run('voidenergy=10; achievementsData.forEach(a=>a.unlocked=true);');await navigate(g,'nodes');
  const filter=g.w.document.querySelector('#qol-filter');filter.value='affordable';filter.dispatchEvent(new g.w.Event('change'));
  assert.equal(g.w.document.querySelectorAll('#nodes-table-body tr:not([hidden])').length,1);
  g.run("buyNode('abyssalshard')");g.frame();
  assert.equal(g.w.document.querySelectorAll('#nodes-table-body tr:not([hidden])').length,0);
  const search=g.w.document.querySelector('#qol-search');search.value='Shard';search.dispatchEvent(new g.w.Event('input'));
  await navigate(g,'stats');await navigate(g,'nodes');assert.equal(g.w.document.querySelector('#qol-search').value,'Shard');
  g.w.document.querySelector('#qol-clear').click();assert.equal(g.w.document.querySelectorAll('#nodes-table-body tr:not([hidden])').length,7);
  g.close();
});
test('upgrade filter updates on purchase, category is retained, and click icon renders',async()=>{
  const g=game();g.run('voidenergy=1e10;');await navigate(g,'upgrades');
  g.w.document.querySelector('.node-tab[data-node=click]').click();
  assert.ok(g.w.document.querySelector('.node-tab[data-node=click] svg'));
  const filter=g.w.document.querySelector('#qol-filter');filter.value='unpurchased';filter.dispatchEvent(new g.w.Event('change'));
  const card=g.w.document.querySelector('.upgrade-card');card.querySelector('button').click();g.frame();assert.equal(card.hidden,true);
  await navigate(g,'home');await navigate(g,'upgrades');assert.equal(g.w.document.querySelector('.node-tab[aria-pressed=true]').dataset.node,'click');
  assert.deepEqual(g.errors,[]);g.close();
});
test('home upgrade shortcut matches its recommendation; player name is plain text',async()=>{
  const g=game();g.w.localStorage.setItem('playerName','<img src=x onerror=alert(1)>');await navigate(g,'home');
  assert.equal(g.w.document.querySelector('#home-player-name').children.length,0);
  const recommendation=g.w.document.querySelector('#goalUpgradeName').textContent;
  g.w.document.querySelector('[data-goal=upgrade]').click();await Promise.resolve();g.frame();
  assert.ok([...g.w.document.querySelectorAll('.upgrade-card')].some(c=>c.textContent.includes(recommendation)));
  assert.deepEqual(g.errors,[]);g.close();
});
test('achievement filters update when an achievement unlocks and hide empty categories',async()=>{
  const g=game();await navigate(g,'achievements');
  const filter=g.w.document.querySelector('#qol-filter');filter.value='unlocked';filter.dispatchEvent(new g.w.Event('change'));
  assert.equal(g.w.document.querySelectorAll('.achievement-card:not([hidden])').length,0);
  g.run('unlockAchievement(achievementsData[0].id); requestGameRender();');g.frame();
  assert.equal(g.w.document.querySelectorAll('.achievement-card:not([hidden])').length,1);
  assert.deepEqual(g.errors,[]);g.close();
});
test('shop filters survive subtab switches and relic equipment changes',async()=>{
  const g=game();await navigate(g,'shop');
  const filter=g.w.document.querySelector('#qol-filter');filter.value='owned';filter.dispatchEvent(new g.w.Event('change'));
  assert.equal(g.w.document.querySelectorAll('.orb-card:not([hidden])').length,1);
  g.w.document.querySelector('[data-section=relics]').click();g.frame();
  assert.equal(g.w.document.querySelectorAll('.relic-card:not([hidden])').length,0);
  g.run("restoreRelics({ranks:{'echo-shard':0},equipped:[]}); requestGameRender();");g.frame();
  assert.equal(g.w.document.querySelectorAll('.relic-card:not([hidden])').length,1);
  filter.value='equipped';filter.dispatchEvent(new g.w.Event('change'));
  g.run("equipRelic('echo-shard');");g.frame();
  assert.equal(g.w.document.querySelectorAll('.relic-card:not([hidden])').length,1);
  assert.deepEqual(g.errors,[]);g.close();
});
test('manual save preserves progress and reduced motion persists across pages',async()=>{
  const g=game();g.run('voidenergy=1234;');await navigate(g,'settings');
  g.w.document.querySelector('#qol-save').click();
  assert.equal(JSON.parse(g.w.localStorage.getItem('save')).voidenergy,1234);
  const toggle=g.w.document.querySelector('#qol-motion');toggle.checked=true;toggle.dispatchEvent(new g.w.Event('change'));
  await navigate(g,'home');assert.ok(g.w.document.body.classList.contains('qol-reduced-motion'));
  assert.equal(g.w.localStorage.getItem('reducedMotion'),'true');
  assert.deepEqual(g.errors,[]);g.close();
});
