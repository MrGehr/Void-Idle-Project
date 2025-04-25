// home.js

// Define changelog only once on the window object
if (typeof window.changelogEntries === 'undefined') {
    window.changelogEntries = [
        // ... other entries ...
      {
        version: "v0.0.2",
        date:    "2025-04-24",
        notes: [
          "Implemented starfield overlay with twinkle & drift animations",
          "Added sprite-based starfield option using TransparentTextures tile",
          "Cleaned up interface.css (removed duplicates, slimmed selectors)",
          "Adjusted z-index stacking so all buttons/content remain interactive",
          "Added icons to Nodes page",
          "Added break-infinity.js",
        ]
      },
      {
        version: "v0.0.1",
        date:    "2025-04-23",
        notes: [
          "Added tick progress bar to Nodes page",
          "Fixed VEPT display bug on first load"
        ]
      }
    ];
  }
  
  function loadHomePage(content) {
    const playerName = localStorage.getItem("playerName") || "Player";
    const changelog = window.changelogEntries;
  
    // Build changelog HTML
    let logHtml = `<div class="changelog-container">
        <h3>Change Log</h3>
        <ul class="changelog-list">`;
    for (const entry of changelog) {
      logHtml += `
          <li>
            <strong>${entry.version}</strong> — <em>${entry.date}</em>
            <ul>
              ${entry.notes.map(n => `<li>${n}</li>`).join('')}
            </ul>
          </li>`;
    }
    logHtml += `
        </ul>
      </div>`;
  
    // Render Home content with changelog pinned
    content.innerHTML = `
      <div class="home-content">
        <h2>Welcome, ${playerName}!</h2>
        <p>Explore the void and build your empire!</p>
        ${logHtml}
      </div>
    `;
  }