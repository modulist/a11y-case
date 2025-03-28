(function() {
  'use strict';
  
  // Theme switching functionality
  document.addEventListener('DOMContentLoaded', function() {
    const themeSelect = document.getElementById('theme-select');
    const themeButtons = document.querySelectorAll('.theme-button');
    
    // Set the initial state based on localStorage or data-theme attribute
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'default';
    themeSelect.value = currentTheme;
    
    // Update aria-checked state
    themeButtons.forEach(button => {
      const buttonTheme = button.getAttribute('data-theme');
      if (buttonTheme === currentTheme) {
        button.setAttribute('aria-checked', 'true');
      } else {
        button.setAttribute('aria-checked', 'false');
      }
    });
    
    // Handle select change
    themeSelect.addEventListener('change', function() {
      const theme = this.value;
      setTheme(theme);
    });
    
    // Handle theme button clicks
    themeButtons.forEach(button => {
      button.addEventListener('click', function() {
        const theme = this.getAttribute('data-theme');
        setTheme(theme);
      });
      
      // Add keyboard support for theme buttons
      button.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          const theme = this.getAttribute('data-theme');
          setTheme(theme);
        }
      });
    });
    
    function setTheme(theme) {
      // Update document theme
      document.documentElement.setAttribute('data-theme', theme);
      
      // Update localStorage
      localStorage.setItem('a11y-theme', theme);
      
      // Update select value
      themeSelect.value = theme;
      
      // Update aria-checked states
      themeButtons.forEach(button => {
        const buttonTheme = button.getAttribute('data-theme');
        if (buttonTheme === theme) {
          button.setAttribute('aria-checked', 'true');
        } else {
          button.setAttribute('aria-checked', 'false');
        }
      });
      
      // Announce theme change for screen readers
      announceThemeChange(theme);
    }
    
    function announceThemeChange(theme) {
      // Create an ARIA live region for announcing the theme change
      let announcer = document.getElementById('theme-announcer');
      if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'theme-announcer';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.classList.add('visually-hidden');
        document.body.appendChild(announcer);
      }
      
      // Format the theme name for announcement
      let themeName;
      switch(theme) {
        case 'dark':
          themeName = 'Dark mode';
          break;
        case 'quiet':
          themeName = 'Quiet mode';
          break;
        case 'high-contrast':
          themeName = 'High contrast mode';
          break;
        default:
          themeName = 'Default theme';
      }
      
      // Announce the theme change
      announcer.textContent = `Theme changed to ${themeName}`;
    }
  });
})();