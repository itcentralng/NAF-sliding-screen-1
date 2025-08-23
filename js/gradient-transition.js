document.addEventListener('DOMContentLoaded', function() {
  // Get URL parameters to determine which section was selected
  const urlParams = new URLSearchParams(window.location.search);
  const targetSection = urlParams.get('section') || 'home';
  const targetPage = urlParams.get('page') || 'welcome.html';
  const fromSection = urlParams.get('from') || 'home';
  
  const container = document.querySelector('.gradient-container');
  const sectionLabel = document.getElementById('section-label');
  const sectionDots = document.querySelectorAll('.section-dot');
  
  // Section mapping with positions (0=home, 1=chiefs, 2=commanders, 3=commandants)
  const sectionMap = {
    'home': {
      class: 'slide-to-home',
      position: 0,
      name: 'Welcome Home'
    },
    'chiefs': {
      class: 'slide-to-chiefs',
      position: 1,
      name: 'Chiefs of Accounts & Budget'
    },
    'commanders': {
      class: 'slide-to-commanders', 
      position: 2,
      name: 'Commanders 081 PAG'
    },
    'commandants': {
      class: 'slide-to-commandants',
      position: 3,
      name: 'Commandants NAFSFA'
    }
  };
  
  const currentSection = sectionMap[targetSection];
  const fromSectionData = sectionMap[fromSection];
  
  let currentPosition = fromSectionData.position;
  const targetPosition = currentSection.position;
  const direction = targetPosition > currentPosition ? 1 : -1;
  const totalSteps = Math.abs(targetPosition - currentPosition);
  
  // Initialize the starting position
  container.classList.add(fromSectionData.class);
  updateSectionIndicators(currentPosition);
  updateSectionContent(currentPosition);
  
  // Show initial section label
  setTimeout(() => {
    sectionLabel.textContent = fromSectionData.name;
    sectionLabel.classList.add('visible');
  }, 300);
  
  // Start the sliding animation if we need to move
  if (totalSteps > 0) {
    setTimeout(() => {
      startSlidingTransition();
    }, 1000);
  } else {
    // If we're already at the target, just show completion
    setTimeout(() => {
      completeTransition();
    }, 2000);
  }
  
  function startSlidingTransition() {
    sectionLabel.textContent = `Moving to ${currentSection.name}...`;
    slideToNextSection();
  }
  
  function slideToNextSection() {
    if (currentPosition === targetPosition) {
      completeTransition();
      return;
    }
    
    // Move to the next position
    currentPosition += direction;
    
    // Remove all position classes
    container.classList.remove('slide-to-home', 'slide-to-chiefs', 'slide-to-commanders', 'slide-to-commandants');
    
    // Add the new position class for smooth transition
    const positionClasses = ['slide-to-home', 'slide-to-chiefs', 'slide-to-commanders', 'slide-to-commandants'];
    container.classList.add(positionClasses[currentPosition]);
    
    // Update indicators and content
    updateSectionIndicators(currentPosition);
    updateSectionContent(currentPosition);
    
    // Update section label
    const sectionKeys = Object.keys(sectionMap);
    const currentSectionName = sectionMap[sectionKeys[currentPosition]].name;
    sectionLabel.textContent = currentPosition === targetPosition ? 
      `Arriving at ${currentSectionName}` : 
      `Passing through ${currentSectionName}`;
    
    // Continue sliding after transition completes
    setTimeout(() => {
      slideToNextSection();
    }, 2200); // Slightly longer than CSS transition
  }
  
  function updateSectionIndicators(position) {
    sectionDots.forEach((dot, index) => {
      dot.classList.remove('active', 'passing');
      if (index === position) {
        dot.classList.add('active');
      } else if (Math.abs(index - position) === 1) {
        dot.classList.add('passing');
      }
    });
  }
  
  function updateSectionContent(position) {
    // Remove active class from all sections
    document.querySelectorAll('.gradient-section').forEach(section => {
      section.classList.remove('active');
    });
    
    // Add active class to current section
    const sectionKeys = Object.keys(sectionMap);
    if (position >= 0 && position < sectionKeys.length) {
      const sectionKey = sectionKeys[position];
      const activeSection = document.querySelector(`[data-section="${sectionKey}"]`);
      if (activeSection) {
        activeSection.classList.add('active');
      }
    }
  }
  
  function completeTransition() {
    sectionLabel.textContent = `Welcome to ${currentSection.name}!`;
    
    setTimeout(() => {
      sectionLabel.classList.remove('visible');
      
      // Add fade out effect
      setTimeout(() => {
        document.body.classList.add('fade-out');
        
        // Navigate to target page
        setTimeout(() => {
          window.location.href = targetPage;
        }, 1000);
      }, 500);
    }, 1500);
  }
  
  // Add floating particles effect
  createFloatingParticles();
});

function createFloatingParticles() {
  const particleContainer = document.createElement('div');
  particleContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  `;
  
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: floatParticle ${Math.random() * 15 + 10}s infinite linear;
    `;
    particleContainer.appendChild(particle);
  }
  
  document.body.appendChild(particleContainer);
  
  // Add particle animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0% {
        transform: translateX(-100px) translateY(100vh) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateX(100px) translateY(-100px) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}
