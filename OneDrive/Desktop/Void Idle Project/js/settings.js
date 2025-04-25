// settings.js

function loadSettingsPage(content) {
    // Read saved preference (default = ON)
    const bgEnabled = localStorage.getItem('bgAnimationEnabled') !== 'false';
  
    content.innerHTML = `
      <div id="settings-tab">
        <h2>Settings</h2>
        <label>
          <input type="checkbox" id="toggle-bg-animation" ${bgEnabled ? 'checked' : ''}>
          Background Animation
        </label>
      </div>
    `;
  
    const checkbox = document.getElementById('toggle-bg-animation');
  
    // Apply initial state
    document.body.classList.toggle('no-bg-animation', !bgEnabled);
  
    // When the user flips the switch:
    checkbox.addEventListener('change', () => {
      const enabled = checkbox.checked;
      // Persist choice
      localStorage.setItem('bgAnimationEnabled', enabled);
      // Toggle the class to enable/disable the animation
      document.body.classList.toggle('no-bg-animation', !enabled);
    });
  }
  
  // Expose loader
  window.loadSettingsPage = loadSettingsPage;