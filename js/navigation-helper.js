/**
 * Navigation Helper for NAFSFA Sliding Screen Application
 * Handles section transitions with calculated timing based on distance
 */

// Section positions mapping
const SECTION_POSITIONS = {
  'welcome.html': { section: 'home', position: 0 },
  'distinguished-personalities.html': { section: 'home', position: 0 },
  'chiefs-accounts-budget.html': { section: 'chiefs', position: 1 },
  'commanders-081-pag.html': { section: 'commanders', position: 2 },
  'commandants-nafsfa.html': { section: 'commandants', position: 3 }
};

/**
 * Get current section based on current page
 */
function getCurrentSection() {
  const currentPage = window.location.pathname.split('/').pop();
  return SECTION_POSITIONS[currentPage] || { section: 'home', position: 0 };
}

/**
 * Navigate to a section with sliding transition
 * @param {string} targetPage - Target page filename
 * @param {string} targetSection - Target section identifier
 */
function navigateWithSlide(targetPage, targetSection) {
  const currentSectionData = getCurrentSection();
  const fromSection = currentSectionData.section;
  
  // Construct the gradient transition URL with from and to parameters
  const transitionUrl = `gradient-transition.html?section=${targetSection}&page=${targetPage}&from=${fromSection}`;
  
  // Add transition effect to current page before navigation
  document.body.style.transition = 'opacity 0.5s ease-out';
  document.body.style.opacity = '0.7';
  
  setTimeout(() => {
    window.location.href = transitionUrl;
  }, 300);
}

/**
 * Add sliding navigation to all navigation links
 */
function initializeSlidingNavigation() {
  document.addEventListener('DOMContentLoaded', function() {
    // Find all navigation links that should use sliding transition
    const navLinks = document.querySelectorAll('a[href*=".html"]');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Skip if it's already a gradient transition link or external link
      if (href.includes('gradient-transition.html') || href.startsWith('http')) {
        return;
      }
      
      // Determine target section based on href
      let targetSection = 'home';
      if (href.includes('chiefs-accounts-budget.html')) {
        targetSection = 'chiefs';
      } else if (href.includes('commanders-081-pag.html')) {
        targetSection = 'commanders';
      } else if (href.includes('commandants-nafsfa.html')) {
        targetSection = 'commandants';
      }
      
      // Add click event listener for sliding transition
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        this.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 200);
        
        // Navigate with sliding effect
        navigateWithSlide(href, targetSection);
      });
    });
  });
}

/**
 * Add enhanced back button functionality
 */
function enhanceBackButtons() {
  document.addEventListener('DOMContentLoaded', function() {
    const backButtons = document.querySelectorAll('.back-btn');
    
    backButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Enhanced back button animation
        this.style.transform = 'translateX(-5px) scale(0.95)';
        this.style.transition = 'transform 0.3s ease';
        
        // Create sliding effect overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6));
          z-index: 9999;
          opacity: 0;
          transition: opacity 0.5s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: 'Cinzel', serif;
        `;
        
        overlay.innerHTML = `
          <div style="text-align: center;">
            <i class="fas fa-arrow-left" style="font-size: 30px; margin-bottom: 20px; animation: slideLeft 1s infinite;"></i>
            <br>Sliding back to sections...
          </div>
        `;
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
          overlay.style.opacity = '1';
        }, 50);
        
        setTimeout(() => {
          navigateWithSlide('distinguished-personalities.html', 'home');
        }, 800);
      });
    });
  });
}

// Initialize the sliding navigation system
initializeSlidingNavigation();
enhanceBackButtons();

// Add slideLeft animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideLeft {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-10px); }
  }
`;
document.head.appendChild(style);
