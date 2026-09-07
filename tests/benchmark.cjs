const { performance } = require('node:perf_hooks');
const { game } = require('./harness.cjs');
const before = game({ original: true }), after = game();
for (const g of [before, after]) {
  g.run(`nodesData.forEach((n,i)=>{n.count=1000+i*100; n.productionMultiplier=new Decimal(1024);}); orbsData.forEach(o=>o.owned=true); achievementProdBonus=.75; achievementsData.forEach(a=>a.unlocked=true); voidenergy=1e30;`);
}
after.run('invalidateProduction();');
const cases = [
  ['production reads', 100000, 'calculateVEPT();'],
  ['number formatting', 50000, 'formatNumber(1.2345e21);'],
  ['completed achievement checks', 10000, 'tryUnlockAchievements();'],
  ['click calculations (no mounted UI)', 10000, 'voidenergyClick();'],
];
for (const [name, count, code] of cases) {
  const measure = g => {
    g.run(`for(let i=0;i<1000;i++){${code}}`);
    const samples=[];
    for(let round=0;round<5;round++) {
      const start=performance.now();
      g.run(`for(let i=0;i<${count};i++){${code}}`);
      samples.push(performance.now()-start);
    }
    return samples.sort((a,b)=>a-b)[2];
  };
  const oldMs = measure(before), newMs = measure(after);
  console.log(JSON.stringify({ case:name, operations:count, original_ms:+oldMs.toFixed(2), optimized_ms:+newMs.toFixed(2), speedup:+(oldMs/newMs).toFixed(2) }));
}
before.close(); after.close();
