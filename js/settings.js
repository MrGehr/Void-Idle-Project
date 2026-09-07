// settings.js

window.bgAudio        = window.bgAudio || new Audio('js/Sound Asset/stellar_trailblazer.mp3');
window.bgAudio.preload = 'none';
window.bgAudio.loop   = true;
window.bgAudio.volume = parseFloat(localStorage.getItem('bgSoundVolume')) || 0.1;

if (typeof window.backgroundSoundEnabled === 'undefined') {
  window.backgroundSoundEnabled = localStorage.getItem('bgSoundEnabled') !== 'false';
}

function loadSettingsPage(content) {
  const bgEnabled = localStorage.getItem('bgAnimationEnabled') !== 'false';

  content.innerHTML = `
    <div class="page-root">
      <div class="page-card" style="max-width:560px;margin:0 auto;width:100%">
        <div class="page-card-hdr">${gi('settings')} Settings</div>

        <div class="setting-item">
          <label>
            <input type="checkbox" id="toggle-bg-animation" ${bgEnabled ? 'checked' : ''}>
            Background Animation
          </label>
        </div>

        <div class="setting-item">
          <label>
            <input type="checkbox" id="toggle-click-effects" ${localStorage.getItem('clickEffectsEnabled') !== 'false' ? 'checked' : ''}>
            Click Effects (particles &amp; ripple on orb)
          </label>
        </div>

        <div class="setting-item">
          <label>
            <input type="checkbox" id="toggle-bg-sound" ${window.backgroundSoundEnabled ? 'checked' : ''}>
            Title Screen Music
          </label>
        </div>

        <div class="setting-item">
          <label for="volume-slider">
            Title Music Volume: <span id="volume-value">${Math.round(window.bgAudio.volume * 100)}</span>%
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

  const clickEffectsCheckbox = document.getElementById('toggle-click-effects');

  animationCheckbox.addEventListener('change', () => {
    const enabled = animationCheckbox.checked;
    localStorage.setItem('bgAnimationEnabled', enabled);
    window.backgroundAnimationEnabled = enabled;
    syncVisualSettings();
  });

  clickEffectsCheckbox.addEventListener('change', () => {
    localStorage.setItem('clickEffectsEnabled', clickEffectsCheckbox.checked);
    window.clickEffectsEnabled = clickEffectsCheckbox.checked;
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

// Title screen music is started/stopped by the title screen code in main.js
