// tutorial.js — New player tutorial system

const TUTORIAL_STEPS = [
  {
    title: 'Welcome to Void Idle',
    body: `You've entered the void — a place of endless energy waiting to be harnessed.<br><br>This short guide will walk you through the basics. You can skip at any time.`,
    highlight: null,
  },
  {
    title: 'Void Energy',
    body: `<strong style="color:#ff6aff">Void Energy (VE)</strong> is the lifeblood of everything you do here. You'll use it to buy nodes, upgrades, and powerful orbs.<br><br>Your current VE is displayed at the top of the home screen.`,
    highlight: '#voidenergy',
    position: 'below',
  },
  {
    title: 'The Void Orb',
    body: `Click the orb to generate Void Energy manually. Each click earns a percentage of your <strong style="color:#66fffa">VE per tick</strong>.<br><br>As you progress, your clicks will become much more powerful.`,
    highlight: '#void-orb-btn',
    position: 'right',
  },
  {
    title: 'The Tick System',
    body: `The void pulses with energy on a timer — each <strong style="color:#66fffa">tick</strong> generates VE passively. Watch the progress bar below the orb to see when the next tick fires.<br><br>You can upgrade your tick speed later to generate VE faster.`,
    highlight: '.home-tick-wrap',
    position: 'below',
  },
  {
    title: 'Nodes',
    body: `<strong style="color:#ff6aff">Nodes</strong> are your passive VE generators. Each node you buy adds production to every tick.<br><br>Visit the <strong style="color:#66fffa">Nodes</strong> tab in the navigation bar to purchase your first one.`,
    highlight: '#nav-nodes',
    position: 'below',
  },
  {
    title: 'Upgrades',
    body: `<strong style="color:#ff6aff">Upgrades</strong> multiply the output of your nodes, boost your click power, and reduce your tick speed.<br><br>Check the <strong style="color:#66fffa">Upgrades</strong> tab to see what's available.`,
    highlight: '#nav-upgrades',
    position: 'below',
  },
  {
    title: 'The Shop & Orbs',
    body: `The <strong style="color:#ff6aff">Shop</strong> sells powerful orbs. Each orb has a <strong style="color:#66fffa">passive bonus</strong> that applies when owned, and an <strong style="color:#ff6aff">active ability</strong> when equipped.<br><br>Collect them all for massive production multipliers.`,
    highlight: '#nav-shop',
    position: 'below',
  },
  {
    title: 'Your Journey Begins',
    body: `That covers the basics. As you progress you'll unlock achievements, prestige for permanent bonuses, and much more.<br><br>The void is patient. Take your time — or click furiously. The choice is yours.<br><br><strong style="color:#ff6aff">Good luck, Void Walker.</strong>`,
    highlight: null,
  },
];

function startTutorial() {
  if (localStorage.getItem('tutorialComplete')) return Promise.resolve();

  return new Promise((resolve) => {
    let step = 0;
    let highlightEl = null;
    let highlightOriginalZ = '';

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'tut-overlay';
    document.body.appendChild(overlay);

    // Create modal (appended to body, not overlay, so it can be positioned freely)
    const modal = document.createElement('div');
    modal.className = 'tut-modal';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.innerHTML = `
      <div class="tut-step-indicator" id="tut-step-ind"></div>
      <div class="tut-title" id="tut-title"></div>
      <div class="tut-body" id="tut-body"></div>
      <div class="tut-actions">
        <button class="tut-btn-skip" id="tut-skip">Skip Tutorial</button>
        <button class="tut-btn-next" id="tut-next">Next</button>
      </div>
    `;
    document.body.appendChild(modal);

    const titleEl = document.getElementById('tut-title');
    const bodyEl  = document.getElementById('tut-body');
    const indEl   = document.getElementById('tut-step-ind');
    const nextBtn = document.getElementById('tut-next');
    const skipBtn = document.getElementById('tut-skip');

    function clearHighlight() {
      if (highlightEl) {
        highlightEl.classList.remove('tut-highlight');
        highlightEl.style.zIndex = highlightOriginalZ;
        highlightEl = null;
      }
    }

    function positionModal(s) {
      // Reset all positioning
      modal.style.top = '';
      modal.style.left = '';
      modal.style.right = '';
      modal.style.bottom = '';
      modal.style.transform = 'none';

      if (!s.highlight) {
        // Center the modal
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        return;
      }

      const el = document.querySelector(s.highlight);
      if (!el) {
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        return;
      }

      const rect = el.getBoundingClientRect();
      const modalW = 400;
      const gap = 16;
      const pos = s.position || 'below';

      if (pos === 'below') {
        let top = rect.bottom + gap;
        let left = rect.left + rect.width / 2 - modalW / 2;
        // Clamp to viewport
        left = Math.max(12, Math.min(left, window.innerWidth - modalW - 12));
        if (top + 250 > window.innerHeight) top = rect.top - 250 - gap; // flip above if no room
        modal.style.top = top + 'px';
        modal.style.left = left + 'px';
      } else if (pos === 'above') {
        let left = rect.left + rect.width / 2 - modalW / 2;
        left = Math.max(12, Math.min(left, window.innerWidth - modalW - 12));
        let top = rect.top - gap;
        modal.style.bottom = (window.innerHeight - top) + 'px';
        modal.style.left = left + 'px';
      } else if (pos === 'right') {
        let left = rect.right + gap;
        let top = rect.top + rect.height / 2 - 100;
        // If not enough room on right, go left
        if (left + modalW > window.innerWidth - 12) {
          left = rect.left - modalW - gap;
        }
        left = Math.max(12, left);
        top = Math.max(12, Math.min(top, window.innerHeight - 280));
        modal.style.top = top + 'px';
        modal.style.left = left + 'px';
      } else if (pos === 'left') {
        let left = rect.left - modalW - gap;
        let top = rect.top + rect.height / 2 - 100;
        if (left < 12) left = rect.right + gap;
        left = Math.max(12, Math.min(left, window.innerWidth - modalW - 12));
        top = Math.max(12, Math.min(top, window.innerHeight - 280));
        modal.style.top = top + 'px';
        modal.style.left = left + 'px';
      }
    }

    function renderStep() {
      const s = TUTORIAL_STEPS[step];
      titleEl.textContent = s.title;
      bodyEl.innerHTML = s.body;
      indEl.textContent = `${step + 1} / ${TUTORIAL_STEPS.length}`;
      nextBtn.textContent = step === TUTORIAL_STEPS.length - 1 ? 'Begin' : 'Next';

      // Highlight target element
      clearHighlight();
      if (s.highlight) {
        const el = document.querySelector(s.highlight);
        if (el) {
          highlightEl = el;
          highlightOriginalZ = el.style.zIndex;
          el.classList.add('tut-highlight');
          el.style.zIndex = '10001';
        }
      }

      positionModal(s);
    }

    function finish() {
      clearHighlight();
      localStorage.setItem('tutorialComplete', 'true');
      overlay.classList.add('tut-fade-out');
      modal.classList.add('tut-fade-out');
      setTimeout(() => { overlay.remove(); modal.remove(); }, 400);
      document.removeEventListener('keydown', tutKey);
      resolve();
    }

    nextBtn.addEventListener('click', () => {
      step++;
      if (step >= TUTORIAL_STEPS.length) finish();
      else renderStep();
    });

    skipBtn.addEventListener('click', finish);

    function tutKey(e) {
      if (e.key === 'Enter') {
        step++;
        if (step >= TUTORIAL_STEPS.length) finish();
        else renderStep();
      }
    }
    document.addEventListener('keydown', tutKey);

    renderStep();
  });
}

window.startTutorial = startTutorial;
