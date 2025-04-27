// achievements.js

window.achievementsData = window.achievementsData || [
    { id: 'first-click',    title: 'First Click', description: 'Generate void energy for the first time.', unlocked: false, claimed: false },
    { id: 'hundred-ve',     title: '100 VE',      description: 'Accumulate 100 Void Energy.',               unlocked: false, claimed: false },
    { id: 'tenthousand-ve', title: '10K VE',      description: 'Accumulate 10K Void Energy.',              unlocked: false, claimed: false },
    { id: 'million-ve',     title: '1M VE',       description: 'Accumulate 1M Void Energy.',               unlocked: false, claimed: false },
    { id: 'billion-ve',     title: '1B VE',       description: 'Accumulate 1B Void Energy.',               unlocked: false, claimed: false }
  ];
  
  function unlockAchievement(id) {
    const ach = window.achievementsData.find(a => a.id === id);
    if (ach && !ach.unlocked) {
      ach.unlocked = true;
      console.log(`Achievement unlocked: ${ach.title}`);
      // if open, refresh UI
      const c = document.getElementById('content');
      if (c && document.getElementById('achievements-tab')) {
        loadAchievementsPage(c);
      }
    }
  }
  
  function loadAchievementsPage(content) {
    if (!document.getElementById('achievements-css')) {
      const link = document.createElement('link');
      link.rel  = 'stylesheet';
      link.href = 'css/achievements.css';
      link.id   = 'achievements-css';
      document.head.appendChild(link);
    }
  
    const unclaimed = window.achievementsData.filter(a => a.unlocked && !a.claimed);
    const next = unclaimed.length
      ? [unclaimed[0]]
      : window.achievementsData.filter(a => !a.unlocked).slice(0,1);
  
    content.innerHTML = `
      <div id="achievements-tab">
        <h2>Achievements</h2>
        <div class="achievements-list">
          ${next.map(a => `
            <div class="achievement-card" id="${a.id}">
              <div class="achievement-info">
                <h3>${a.title}</h3>
                <p>${a.description}</p>
              </div>
              <button class="claim-btn" ${(!a.unlocked||a.claimed)?'disabled':''}>
                ${a.claimed?'Claimed':(a.unlocked?'Claim':'Locked')}
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  
    content.querySelectorAll('.claim-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const id = btn.closest('.achievement-card').id;
        const a  = window.achievementsData.find(x=>x.id===id);
        if (a && a.unlocked && !a.claimed) {
          a.claimed = true;
          btn.textContent = 'Claimed';
          btn.disabled = true;
          loadAchievementsPage(content);
        }
      });
    });
  }
  
  window.loadAchievementsPage   = loadAchievementsPage;
  window.unlockAchievement      = unlockAchievement;
  