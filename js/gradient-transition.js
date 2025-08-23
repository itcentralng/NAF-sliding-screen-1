document.addEventListener('DOMContentLoaded', function() {
  // Get URL parameters to determine which section was selected
  const urlParams = new URLSearchParams(window.location.search);
  const targetSection = urlParams.get('section') || 'home';
  const targetPage = urlParams.get('page') || 'welcome.html';
  const fromSection = urlParams.get('from') || 'home';
  
  const container = document.querySelector('.gradient-container');
  const progressFill = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-text');
  
  // Section mapping with positions (0=home, 1=chiefs, 2=commanders, 3=commandants, 4=achievements)
  const sectionMap = {
    'home': {
      class: 'slide-to-home',
      position: 0,
      name: 'Home',
      messages: ['Welcome back...', 'Loading home...', 'Almost ready...']
    },
    'chiefs': {
      class: 'slide-to-chiefs',
      position: 1,
      name: 'Chiefs of Accounts & Budget',
      messages: ['Loading financial leaders...', 'Preparing accounts data...', 'Almost ready...']
    },
    'commanders': {
      class: 'slide-to-commanders', 
      position: 2,
      name: 'Commanders 081 PAG',
      messages: ['Loading PAG commanders...', 'Preparing personnel data...', 'Almost ready...']
    },
    'commandants': {
      class: 'slide-to-commandants',
      position: 3,
      name: 'Commandants NAFSFA',
      messages: ['Loading NAFSFA leaders...', 'Preparing school data...', 'Almost ready...']
    },
    'achievements': {
      class: 'slide-to-achievements',
      position: 4,
      name: 'Legacy Achievements',
      messages: ['Loading achievements...', 'Preparing milestone data...', 'Almost ready...']
    }
  };
  
  const currentSection = sectionMap[targetSection];
  const fromSectionData = sectionMap[fromSection];
  
  // Calculate sliding distance and time (5 seconds per section)
  const distance = Math.abs(currentSection.position - fromSectionData.position);
  const slidingTime = distance * 5000; // 5 seconds per section in milliseconds
  const progressInterval = slidingTime / 100; // Divide the sliding time into 100 progress steps
  
  let progressValue = 0;
  let messageIndex = 0;
  let currentPosition = fromSectionData.position;
  const direction = currentSection.position > fromSectionData.position ? 1 : -1;
  
  // Update progress text with sliding information
  updateSlidingMessage();
  
  // Start the sliding animation
  setTimeout(() => {
    container.classList.add('sliding');
    slideToTarget();
  }, 500);
  
  function updateSlidingMessage() {
    if (distance === 0) {
      progressText.textContent = `Already at ${currentSection.name}`;
    } else {
      const verb = direction > 0 ? 'forward' : 'backward';
      progressText.textContent = `Sliding ${verb} ${distance} section${distance > 1 ? 's' : ''} to ${currentSection.name}...`;
    }
  }
  
  function slideToTarget() {
    const slideInterval = setInterval(() => {
      progressValue += 100 / (slidingTime / 100); // Progress based on sliding time
      
      if (progressValue > 100) progressValue = 100;
      
      progressFill.style.width = progressValue + '%';
      
      // Update sliding position visualization
      const currentStep = Math.floor((progressValue / 100) * distance);
      const newPosition = fromSectionData.position + (direction * currentStep);
      
      if (newPosition !== currentPosition) {
        currentPosition = newPosition;
        updateScreenPosition(currentPosition);
      }
      
      // Update messages based on progress
      const messageProgress = Math.floor((progressValue / 100) * currentSection.messages.length);
      if (messageProgress < currentSection.messages.length && messageProgress !== messageIndex) {
        messageIndex = messageProgress;
        progressText.textContent = currentSection.messages[messageIndex];
      }
      
      // Show intermediate sections during sliding
      if (progressValue < 100 && distance > 1) {
        const intermediateMessages = [
          'Sliding through sections...',
          'Passing intermediate stations...',
          'Continuing the journey...',
          'Almost at destination...'
        ];
        const msgIndex = Math.floor((progressValue / 100) * intermediateMessages.length);
        if (msgIndex < intermediateMessages.length) {
          progressText.textContent = intermediateMessages[msgIndex];
        }
      }
      
      // Complete the sliding
      if (progressValue >= 100) {
        clearInterval(slideInterval);
        completeTransition();
      }
    }, progressInterval);
  }
  
  function updateScreenPosition(position) {
    // Remove all position classes
    container.classList.remove('slide-to-home', 'slide-to-chiefs', 'slide-to-commanders', 'slide-to-commandants');
    
    // Add the current position class
    const positionClasses = ['slide-to-home', 'slide-to-chiefs', 'slide-to-commanders', 'slide-to-commandants', 'slide-to-achievements'];
    if (position >= 0 && position < positionClasses.length) {
      container.classList.add(positionClasses[position]);
    }
    
    // Activate the current section content
    document.querySelectorAll('.gradient-section').forEach(section => {
      section.classList.remove('active');
    });
    
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
    setTimeout(() => {
      progressText.textContent = `Arrived at ${currentSection.name}!`;
      
      // Final position update
      updateScreenPosition(currentSection.position);
      
      // Add fade out effect
      setTimeout(() => {
        document.body.classList.add('fade-out');
        
        // Navigate to target page
        setTimeout(() => {
          window.location.href = targetPage;
        }, 1000);
      }, 1000);
    }, 500);
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
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: floatParticle ${Math.random() * 10 + 10}s infinite linear;
    `;
    particleContainer.appendChild(particle);
  }
  
  document.body.appendChild(particleContainer);
  
  // Add particle animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100px) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}
