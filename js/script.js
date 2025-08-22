const swiper = new Swiper('.swiper', {
  loop: true,
  speed: 1300,
  autoplay: { delay: 5000 },
  effect: 'slide'
});

// Page transition effects
document.addEventListener('DOMContentLoaded', function() {
  // Fade in animation for the page
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease-in';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
  
  // Handle explore button click with transition
  const exploreButton = document.querySelector('.welcome-btn a');
  if (exploreButton) {
    exploreButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add loading effect to button
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
      this.style.pointerEvents = 'none';
      
      // Create transition overlay
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, rgba(0,0,0,0.8), rgba(0,0,0,0.9));
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.6s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-family: 'cinzel', sans-serif;
        font-size: 18px;
      `;
      overlay.innerHTML = '<div style="text-align: center;"><i class="fas fa-plane" style="font-size: 30px; margin-bottom: 20px; animation: fly 2s infinite;"></i><br>Preparing Distinguished Personalities...</div>';
      
      document.body.appendChild(overlay);
      
      // Trigger fade out
      setTimeout(() => {
        overlay.style.opacity = '1';
      }, 50);
      
      // Navigate after animation
      setTimeout(() => {
        window.location.href = this.href;
      }, 1200);
    });
  }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fly {
    0%, 100% { transform: translateX(0) rotate(0deg); }
    25% { transform: translateX(10px) rotate(5deg); }
    75% { transform: translateX(-10px) rotate(-5deg); }
  }
  
  .fade-in {
    animation: fadeIn 0.8s ease-in;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);