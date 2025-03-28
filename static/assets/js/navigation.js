(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', function() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        sidebar.classList.toggle('active');
        
        // Change menu icon appearance for open/closed state
        if (!isExpanded) {
          menuToggle.querySelector('.menu-icon').classList.add('open');
          // Lock body scroll when menu is open on mobile
          document.body.style.overflow = 'hidden';
        } else {
          menuToggle.querySelector('.menu-icon').classList.remove('open');
          // Restore body scroll when menu is closed
          document.body.style.overflow = '';
        }
      });
      
      // Close menu when clicking outside on mobile
      document.addEventListener('click', function(event) {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded && 
            !sidebar.contains(event.target) && 
            !menuToggle.contains(event.target)) {
          menuToggle.setAttribute('aria-expanded', 'false');
          sidebar.classList.remove('active');
          menuToggle.querySelector('.menu-icon').classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }
    
    // Dynamic navigation highlighting
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
    
    // Handle "Further reading" expandable sections
    const furtherReadingSections = document.querySelectorAll('.further-reading');
    
    furtherReadingSections.forEach(section => {
      const title = section.querySelector('.further-reading-title');
      const content = section.querySelector('.further-reading-content');
      
      if (title && content) {
        // Set initial ARIA attributes
        title.setAttribute('aria-expanded', 'false');
        title.setAttribute('aria-controls', content.id);
        
        title.addEventListener('click', function() {
          const isExpanded = title.getAttribute('aria-expanded') === 'true';
          
          title.setAttribute('aria-expanded', !isExpanded);
          section.classList.toggle('expanded');
        });
        
        // Add keyboard support
        title.addEventListener('keydown', function(e) {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            const isExpanded = title.getAttribute('aria-expanded') === 'true';
            
            title.setAttribute('aria-expanded', !isExpanded);
            section.classList.toggle('expanded');
          }
        });
      }
    });
    
    // Add smooth scrolling for in-page navigation
    const inPageLinks = document.querySelectorAll('a[href^="#"]');
    
    inPageLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            e.preventDefault();
            
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
            
            // Set focus to the target element
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus();
            
            // Update URL hash without scrolling
            history.pushState(null, null, `#${targetId}`);
          }
        }
      });
    });
  });
})();