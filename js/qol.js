// Shared presentation tools. Purchases and rewards stay in the game systems.
const QOL_PAGES = {
  home: ['Home', 'Your next move starts here.'],
  nodes: ['Nodes', 'Grow passive income. Prices include equipped relic discounts.'],
  upgrades: ['Upgrades', 'Choose a category, compare boosts, and invest in your build.'],
  shop: ['Shop', 'Collect orbs and shape your build with milestone-earned relics.'],
  achievements: ['Achievements', 'Track milestones. Rewards apply automatically when unlocked.'],
  stats: ['Stats', 'A detailed look at your income, collection, and current run.'],
  settings: ['Settings', 'Tune the presentation to your device and playstyle.'],
  automation: ['Automation', 'Purchase automation is in development. Auto-click orbs are available in the Shop today.'],
  prestige: ['Prestige', 'Preview your current run. Prestige rewards are still in development.'],
  leaderboard: ['Rankings', 'Global rankings are in development. Track your own progress in Stats.'],
};
const qolFilters = new Map();
let qolPage = 'home';
let qolTools;
function qolGo(page, section) {
  if (section) window.shopActivePage = section;
  return changePage(page);
}
function mountQualityOfLife(page, content) {
  qolPage = page;
  document.body.classList.add('qol-game');
  if (!document.getElementById('qol-hud')) {
    const hud = document.createElement('section');
    hud.id = 'qol-hud'; hud.setAttribute('aria-label', 'Resources and shortcuts');
    hud.innerHTML = `<div><span>Void Energy</span><strong id="qol-energy"></strong></div>
      <div><span>Passive / sec</span><strong id="qol-income"></strong></div>
      <div><span>Tick interval</span><strong id="qol-interval"></strong></div>
      <div class="qol-hud-actions"><button type="button" data-qol-page="shop" data-section="relics">${gi('relic',16)} Relics</button><button type="button" id="qol-save">Save</button><span id="qol-save-status" role="status"></span></div>`;
    document.getElementById('main-nav').after(hud);
    hud.querySelector('#qol-save').onclick = () => {
      try { saveGame(); setText(document.getElementById('qol-save-status'), 'Saved'); }
      catch { setText(document.getElementById('qol-save-status'), 'Save failed'); }
    };
    hud.querySelector('[data-qol-page]').onclick = () => qolGo('shop', 'relics');
  }
  if (!qolTools) {
    qolTools = document.createElement('section'); qolTools.id = 'qol-tools';
    content.before(qolTools);
  }
  const config = {
    nodes: ['All nodes', 'Affordable', 'Owned'],
    shop: ['All items', 'Owned', 'Unowned', 'Equipped'],
    upgrades: ['All in category', 'Affordable', 'Unpurchased', 'Purchased'],
    achievements: ['All achievements', 'Locked', 'Unlocked'],
  }[page];
  const state = qolFilters.get(page) || { query: '', filter: 'all' };
  qolFilters.set(page, state);
  qolTools.innerHTML = `<div class="qol-page-intro"><h2>${QOL_PAGES[page][0]}</h2><p>${QOL_PAGES[page][1]}</p></div>` + (config ?
    `<div class="qol-filterbar"><label>Search ${page}<input id="qol-search" type="search" placeholder="Search by name" autocomplete="off"></label><label>Show<select id="qol-filter">${config.map((x,i)=>`<option value="${i ? x.toLowerCase() : 'all'}">${x}</option>`).join('')}</select></label><button type="button" id="qol-clear">Clear filters</button><span id="qol-result" role="status"></span></div>` : '');
  qolTools.hidden = page === 'home';
  if (config) {
    const search = qolTools.querySelector('input'); const select = qolTools.querySelector('select');
    search.value = state.query; select.value = state.filter;
    search.oninput = () => { state.query = search.value; applyQolFilters(); };
    select.onchange = () => { state.filter = select.value; applyQolFilters(); };
    qolTools.querySelector('#qol-clear').onclick = () => { state.query='';state.filter='all';search.value='';select.value='all';applyQolFilters();search.focus(); };
  }
  content.dataset.page = page;
  if (['automation','prestige','leaderboard'].includes(page)) {
    const actions=document.createElement('div');actions.className='qol-empty-actions';
    actions.innerHTML='<button type="button" class="page-btn">'+(page==='automation'?'Explore auto-click orbs':'View current stats')+'</button>';
    actions.firstElementChild.onclick=()=>qolGo(page==='automation'?'shop':'stats',page==='automation'?'orbs':null);
    content.querySelector('.shop-placeholder')?.append(actions);
  }
  if (page === 'settings') {
    const card=document.createElement('section');card.className='page-card qol-preferences';
    card.innerHTML=`<h3>Comfort &amp; navigation</h3><label><input type="checkbox" id="qol-motion" ${localStorage.getItem('reducedMotion')==='true'?'checked':''}> Reduce interface motion</label><p>Pause decorative animations and remove hover movement.</p><p>Press Tab to move between controls, Enter to activate, and use the navigation tabs to switch pages. Your upgrade category and list filters stay selected during this session.</p><button type="button" class="page-btn" id="qol-home">Return to Home</button>`;
    content.querySelector('.page-root').append(card);
    card.querySelector('input').onchange=e=>{localStorage.setItem('reducedMotion',e.target.checked);syncQolMotion();};
    card.querySelector('button').onclick=()=>qolGo('home');
  }
  document.getElementById('qol-hud').dataset.page=page;
  syncQolMotion();
  updateQualityOfLife();
}
function syncQolMotion() {
  document.body.classList.toggle('qol-reduced-motion',localStorage.getItem('reducedMotion')==='true');
}
function updateQualityOfLife() {
  const hud=document.getElementById('qol-hud');if(!hud)return;
  setText(document.getElementById('qol-energy'),formatNumber(voidenergy));
  setText(document.getElementById('qol-income'),formatNumber(calculatePassiveVEPT()/(getTickInterval()/1000)));
  setText(document.getElementById('qol-interval'),(getTickInterval()/1000).toFixed(1)+'s');
  applyQolFilters();
}
function applyQolFilters() {
  const selector={nodes:'#nodes-table-body tr',upgrades:'.upgrade-card',achievements:'.achievement-card',shop:'.orb-card, #content .relic-card'}[qolPage];
  if(!selector)return;
  const state=qolFilters.get(qolPage);if(!state)return;
  const query=state.query.trim().toLowerCase();
  const cards=[...document.querySelectorAll('#content '+selector)];let visible=0;
  if(qolPage==='shop') {
    const bar=qolTools?.querySelector('.qol-filterbar');
    if(bar)bar.hidden=!!document.querySelector('#content .shop-placeholder');
  }
  for(const card of cards){
    const name=card.querySelector('.node-name,.orb-card-title,h3,h4')?.textContent || card.textContent;
    const owned=qolPage==='shop'?(card.classList.contains('is-owned')||card.classList.contains('is-equipped')||(card.classList.contains('relic-card')&&!card.classList.contains('is-locked'))):qolPage==='nodes'?card.classList.contains('has-nodes'):qolPage==='upgrades'?card.classList.contains('is-purchased'):card.classList.contains('is-unlocked');
    const affordable=!!card.querySelector('button:not(:disabled)')&&!owned;
    // Owned nodes can still be purchased.
    const canBuy=qolPage==='nodes'?!!card.querySelector('button:not(:disabled)'):affordable;
    const matches=state.filter==='all'||(state.filter==='equipped'?card.classList.contains('is-equipped'):state.filter==='affordable'?canBuy:['owned','purchased','unlocked'].includes(state.filter)?owned:!owned);
    const hidden=!matches||!name.toLowerCase().includes(query);
    if(card.hidden!==hidden)card.hidden=hidden;
    if(!hidden)visible++;
  }
  document.querySelectorAll('#content .ach-category-header').forEach(header=>{
    let next=header.nextElementSibling,any=false;
    while(next&&!next.classList.contains('ach-category-header')){if(!next.hidden)any=true;next=next.nextElementSibling;}
    header.hidden=!any;
  });
  setText(document.getElementById('qol-result'),visible?`${visible} / ${cards.length} shown`:'No matches. Clear filters to see all.');
}
