// Performance optimized script with lazy loading and reduced complexity

// Optimized Particles System with reduced particle count
class OptimizedParticlesSystem {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.animationId = null;
    this.isVisible = true;
    
    // Reduced particle count for better performance
    this.maxParticles = Math.min(30, Math.floor((window.innerWidth * window.innerHeight) / 25000));
    
    this.init();
    this.setupEventListeners();
    this.animate();
  }
  
  init() {
    this.resizeCanvas();
    this.createParticles();
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles() {
    this.particles = [];
    
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: 'rgba(0, 255, 255, ',
        pulseSpeed: Math.random() * 0.01 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
  }
  
  setupEventListeners() {
    // Throttled resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.resizeCanvas();
        this.createParticles();
      }, 250);
    });
    
    // Throttled mouse move handler
    let mouseTimeout;
    this.canvas.addEventListener('mousemove', (e) => {
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      }, 16);
    });
    
    // Pause animation when tab is not visible
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;
    });
  }
  
  updateParticles() {
    if (!this.isVisible) return;
    
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Simple boundary collision
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
      
      // Keep in bounds
      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
      
      // Simple pulse effect
      particle.pulsePhase += particle.pulseSpeed;
      particle.currentOpacity = particle.opacity + Math.sin(particle.pulsePhase) * 0.2;
      
      // Damping
      particle.vx *= 0.995;
      particle.vy *= 0.995;
    });
  }
  
  drawParticles() {
    this.particles.forEach(particle => {
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, Math.min(1, particle.currentOpacity));
      this.ctx.fillStyle = particle.color + particle.currentOpacity + ')';
      
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      
      this.ctx.restore();
    });
  }
  
  drawConnections() {
    // Reduced connection drawing for performance
    for (let i = 0; i < this.particles.length; i += 2) {
      for (let j = i + 2; j < this.particles.length; j += 2) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const opacity = (100 - distance) / 100 * 0.3;
          
          this.ctx.save();
          this.ctx.globalAlpha = opacity;
          this.ctx.strokeStyle = 'rgba(0, 255, 255, ' + opacity + ')';
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    }
  }
  
  draw() {
    // Clear with simple background
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.drawConnections();
    this.drawParticles();
  }
  
  animate() {
    this.updateParticles();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Simplified Universe Background
class OptimizedUniverseBackground {
  constructor() {
    this.canvas = document.getElementById('universe-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.isVisible = true;
    
    this.init();
    this.animate();
  }
  
  init() {
    this.resizeCanvas();
    this.createStars();
    
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.createStars();
    });
    
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;
    });
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createStars() {
    this.stars = [];
    const numStars = Math.min(50, Math.floor((this.canvas.width * this.canvas.height) / 15000));
    
    for (let i = 0; i < numStars; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.01 + 0.005
      });
    }
  }
  
  drawStars() {
    if (!this.isVisible) return;
    
    this.stars.forEach(star => {
      star.opacity += Math.sin(Date.now() * star.twinkleSpeed) * 0.05;
      star.opacity = Math.max(0.1, Math.min(0.8, star.opacity));
      
      this.ctx.save();
      this.ctx.globalAlpha = star.opacity;
      this.ctx.fillStyle = '#ffffff';
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }
  
  draw() {
    // Simple gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#000814');
    gradient.addColorStop(1, '#000000');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.drawStars();
  }
  
  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

// Optimized App Carousel
class OptimizedAppCarousel {
  constructor() {
    this.slides = document.querySelectorAll('.carousel-slide');
    this.indicators = document.querySelectorAll('.carousel-indicators .indicator');
    this.prevBtn = document.querySelector('.prev-btn');
    this.nextBtn = document.querySelector('.next-btn');
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayInterval = null;
    
    this.init();
  }
  
  init() {
    if (this.slides.length === 0) return;
    
    this.setupEventListeners();
    this.startAutoPlay();
  }
  
  setupEventListeners() {
    this.prevBtn?.addEventListener('click', () => this.prevSlide());
    this.nextBtn?.addEventListener('click', () => this.nextSlide());
    
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });
    
    const carousel = document.querySelector('.app-carousel');
    carousel?.addEventListener('mouseenter', () => this.stopAutoPlay());
    carousel?.addEventListener('mouseleave', () => this.startAutoPlay());
  }
  
  goToSlide(index) {
    this.slides[this.currentSlide].classList.remove('active');
    this.indicators[this.currentSlide].classList.remove('active');
    
    this.currentSlide = index;
    
    this.slides[this.currentSlide].classList.add('active');
    this.indicators[this.currentSlide].classList.add('active');
  }
  
  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides;
    this.goToSlide(nextIndex);
  }
  
  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.goToSlide(prevIndex);
  }
  
  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

// Optimized Partners Carousel
class OptimizedPartnersCarousel {
  constructor() {
    this.track = document.querySelector('.carousel-track');
    this.indicators = document.querySelectorAll('.partners-carousel .indicator');
    this.currentSlide = 0;
    this.totalSlides = 3;
    this.autoPlayInterval = null;
    
    this.init();
  }

  init() {
    if (!this.track) return;
    
    this.setupIndicators();
    this.startAutoPlay();
  }

  setupIndicators() {
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.goToSlide(index);
      });
    });
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.updateCarousel();
  }

  updateCarousel() {
    const translateX = -this.currentSlide * (100 / this.totalSlides);
    this.track.style.transform = `translateX(${translateX}%)`;
    
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSlide);
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateCarousel();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
}

// Optimized Intersection Observer
const optimizedObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      optimizedObserver.unobserve(entry.target); // Stop observing once animated
    }
  });
}, { threshold: 0.1, rootMargin: '50px' });

// Counter animation with performance optimization
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 30; // Reduced iterations
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 50); // Increased interval
}

// Throttled scroll handler
let scrollTimeout;
function throttledScrollHandler() {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const currentScrollY = window.scrollY;
    const header = document.querySelector('.header');
    
    if (currentScrollY > 100) {
      header.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
      header.style.background = 'rgba(0, 0, 0, 0.95)';
    }
  }, 16);
}

// Optimized smooth scrolling
function smoothScrollTo(target) {
  const headerHeight = document.querySelector('.header').offsetHeight;
  const targetPosition = target.offsetTop - headerHeight;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize background systems with delay for better initial load
  setTimeout(() => {
    new OptimizedUniverseBackground();
    new OptimizedParticlesSystem();
  }, 100);
  
  // Initialize carousels
  new OptimizedAppCarousel();
  new OptimizedPartnersCarousel();
  
  // Setup scroll animations
  const animatedElements = document.querySelectorAll('.service-card, .finagro-project, .about-text, .about-visual');
  animatedElements.forEach(el => optimizedObserver.observe(el));
  
  // Setup counter animations
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.getAttribute('data-count'));
        animateCounter(target, finalValue);
        statsObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => statsObserver.observe(stat));
  
  // Setup smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        smoothScrollTo(target);
      }
    });
  });
  
  // Setup scroll handler
  window.addEventListener('scroll', throttledScrollHandler, { passive: true });
  
  // Mobile menu
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  
  mobileMenuBtn?.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
  });
});

// Preload critical images
const criticalImages = [
  'assets/visionx-logo.png',
  'assets/FInagro LOGO 3.png'
];

criticalImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

// Service Worker for caching (if supported)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed, but that's okay
    });
  });
}