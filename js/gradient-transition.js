document.addEventListener('DOMContentLoaded', function() {
  // Get URL parameters to determine which section was selected
  const urlParams = new URLSearchParams(window.location.search);
  const targetSection = urlParams.get('section') || 'home';
  const targetPage = urlParams.get('page') || 'welcome.html';
  
  const container = document.querySelector('.gradient-container');
  const progressFill = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-text');
  
  // Section mapping
  const sectionMap = {
    'home': {
      class: 'slide-to-home',
      index: 0,
      messages: ['Welcome back...', 'Loading home...', 'Almost ready...']
    },
    'chiefs': {
      class: 'slide-to-chiefs',
      index: 1,
      messages: ['Loading financial leaders...', 'Preparing accounts data...', 'Almost ready...']
    },
    'commanders': {
      class: 'slide-to-commanders', 
      index: 2,
      messages: ['Loading PAG commanders...', 'Preparing personnel data...', 'Almost ready...']
    },
    'commandants': {
      class: 'slide-to-commandants',
      index: 3,
      messages: ['Loading NAFSFA leaders...', 'Preparing school data...', 'Almost ready...']
    }
  };
  
  const currentSection = sectionMap[targetSection];
  let progressValue = 0;
  let messageIndex = 0;
  
  // Initial slide to the correct section
  setTimeout(() => {
    container.classList.add(currentSection.class);
    
    // Activate the current section content
    const activeSection = document.querySelector(`[data-section="${targetSection}"]`);
    if (activeSection) {
      activeSection.classList.add('active');
    }
  }, 500);
  
  // Progress animation with messages
  const progressInterval = setInterval(() => {
    progressValue += Math.random() * 15 + 5; // Random increment between 5-20
    
    if (progressValue > 100) progressValue = 100;
    
    progressFill.style.width = progressValue + '%';
    
    // Update message
    if (messageIndex < currentSection.messages.length) {
      progressText.textContent = currentSection.messages[messageIndex];
      
      if (progressValue > (messageIndex + 1) * 30) {
        messageIndex++;
      }
    }
    
    // Complete the loading
    if (progressValue >= 100) {
      clearInterval(progressInterval);
      completeTransition();
    }
  }, 200);
  
  function completeTransition() {
    setTimeout(() => {
      progressText.textContent = 'Loading complete!';
      
      // Add fade out effect
      setTimeout(() => {
        document.body.classList.add('fade-out');
        
        // Navigate to target page
        setTimeout(() => {
          window.location.href = targetPage;
        }, 1000);
      }, 500);
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
