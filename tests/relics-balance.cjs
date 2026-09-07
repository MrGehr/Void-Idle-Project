// A short fixed-production funding simulation, not a full-run speed prediction.
const { game } = require('./harness.cjs');
const assert = require('node:assert/strict');
const scenarios = [
  { name: 'Early: 10 Shards, one slot', counts: [10,0,0,0,0,0,0], reduction: 0, equipped: ['abyssal-seed'] },
  { name: 'Mid: first four node tiers, two slots', counts: [75,35,25,15,0,0,0], reduction: 4000, equipped: ['abyssal-seed','stillness-stone'] },
  { name: 'Late: all node tiers, three slots', counts: [1000,1000,1000,1000,1000,1000,1000], reduction: 7000, equipped: ['abyssal-seed','stillness-stone','architect-seal'] },
];
for (const scenario of scenarios) {
  const measure = enabled => {
    const g = game();
    g.run(`achievementsData.forEach(a=>a.unlocked=true); nodesData.forEach((n,i)=>n.count=${JSON.stringify(scenario.counts)}[i]); tickSpeedReduction=${scenario.reduction}; invalidateProduction(); checkRelicProgress({silent:true}); window.fundingTarget=new Decimal(calculateVEPT()).mul(100);`);
    if (enabled) for (const id of scenario.equipped) assert.equal(g.run(`equipRelic('${id}')`),true);
    const result=g.run(`(() => {
      let clock=Date.now(); Date.now=()=>clock;
      const price=getNodePurchaseCost({cost:fundingTarget}).toNumber();
      voidenergy=0; let ticks=0;
      while(voidenergy<price && ticks<1000) { clock+=getTickInterval(); generateResourcesPerTick(); ticks++; }
      return {seconds:ticks*getTickInterval()/1000, ticks, price, finalIncome:calculatePassiveVEPT(), slots:relicState.slots};
    })()`);
    g.close(); return result;
  };
  const baseline=measure(false), equipped=measure(true);
  assert.ok(equipped.ticks < baseline.ticks);
  console.log(JSON.stringify({ scenario:scenario.name, baseline_seconds:baseline.seconds, relic_seconds:equipped.seconds, reduction_percent:+(100*(1-equipped.seconds/baseline.seconds)).toFixed(1) }));
}
