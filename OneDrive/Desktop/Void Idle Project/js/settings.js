// settings.js

// Prevent redeclaration of bgAudio and backgroundSoundEnabled when loaded multiple times
window.bgAudio = window.bgAudio || new Audio('js/Sound Asset/stellar_trailblazer.mp3');
window.bgAudio.loop = true;
window.bgAudio.volume = parseFloat(localStorage.getItem('bgSoundVolume')) || 0.1;

window.backgroundSoundEnabled = (typeof window.backgroundSoundEnabled !== 'undefined')
  ? window.backgroundSoundEnabled
  : (localStorage.getItem('bgSoundEnabled') !== 'false');

function loadSettingsPage(content) {
  const bgEnabled = localStorage.getItem('bgAnimationEnabled') !== 'false';

  content.innerHTML = `
    <div class="dashboard-container">
      <div class="dashboard-card">
        <h3>Settings</h3>

        <div class="setting-item">
          <label>
            <input type="checkbox" id="toggle-bg-animation" ${bgEnabled ? 'checked' : ''}>
            Background Animation
          </label>
        </div>

        <div class="setting-item">
          <label>
            <input type="checkbox" id="toggle-bg-sound" ${window.backgroundSoundEnabled ? 'checked' : ''}>
            Background Space Sound
          </label>
        </div>

        <div class="setting-item">
          <label for="volume-slider">
            Volume: <span id="volume-value">${Math.round(window.bgAudio.volume * 100)}</span>%
          </label>
          <input type="range" id="volume-slider" min="0" max="100" value="${Math.round(window.bgAudio.volume * 100)}">
        </div>
      </div>
    </div>
  `;

  const animationCheckbox = document.getElementById('toggle-bg-animation');
  const soundCheckbox = document.getElementById('toggle-bg-sound');
  const volumeSlider = document.getElementById('volume-slider');
  const volumeValue = document.getElementById('volume-value');

  document.body.classList.toggle('no-bg-animation', !bgEnabled);

  if (window.backgroundSoundEnabled) {
    window.bgAudio.play().catch(() => {});
  }

  animationCheckbox.addEventListener('change', () => {
    const enabled = animationCheckbox.checked;
    localStorage.setItem('bgAnimationEnabled', enabled);
    document.body.classList.toggle('no-bg-animation', !enabled);
  });

  soundCheckbox.addEventListener('change', () => {
    window.backgroundSoundEnabled = soundCheckbox.checked;
    localStorage.setItem('bgSoundEnabled', window.backgroundSoundEnabled);
    if (window.backgroundSoundEnabled) {
      window.bgAudio.play().catch(() => {});
    } else {
      window.bgAudio.pause();
    }
  });

  volumeSlider.addEventListener('input', () => {
    const volume = volumeSlider.value / 100;
    window.bgAudio.volume = volume;
    localStorage.setItem('bgSoundVolume', volume);
    volumeValue.textContent = volumeSlider.value;
  });
}

// Expose loader
window.loadSettingsPage = loadSettingsPage;

// Start background sound after first user interaction (click)
document.body.addEventListener('click', () => {
  if (window.backgroundSoundEnabled && window.bgAudio.paused) {
    window.bgAudio.play().catch(() => {});
  }
}, { once: true });
