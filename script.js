// SOS Malhas - Optimized JavaScript for ultra-fast performance

// Performance optimized with minimal DOM queries and efficient event handling
class SiteOptimizer {
  constructor() {
    this.header = document.getElementById('header');
    this.nav = document.getElementById('nav');
    this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    this.quoteForm = document.getElementById('quoteForm');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.statNumbers = document.querySelectorAll('.stat-number');
    
    this.isScrolling = false;
    this.lastScrollY = 0;
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.setupIntersectionObserver();
    this.preloadCriticalResources();
  }
  
  setupEventListeners() {
    // Optimized scroll handler with throttling
    window.addEventListener('scroll', this.throttledScrollHandler.bind(this), { passive: true });
    
    // Mobile menu toggle
    this.mobileMenuBtn?.addEventListener('click', this.toggleMobileMenu.bind(this));
    
    // Smooth scrolling for navigation links
    this.navLinks.forEach(link => {
      link.addEventListener('click', this.handleNavClick.bind(this));
    });
    
    // Form submission
    this.quoteForm?.addEventListener('submit', this.handleFormSubmit.bind(this));
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', this.handleDocumentClick.bind(this));
    
    // Keyboard navigation
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }
  
  throttledScrollHandler() {
    if (!this.isScrolling) {
      requestAnimationFrame(() => {
        this.handleScroll();
        this.isScrolling = false;
      });
      this.isScrolling = true;
    }
  }
  
  handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Header background change
    if (currentScrollY > 100) {
      this.header?.classList.add('scrolled');
    } else {
      this.header?.classList.remove('scrolled');
    }
    
    // Update active navigation link
    this.updateActiveNavLink();
    
    this.lastScrollY = currentScrollY;
  }
  
  updateActiveNavLink() {
    const sections = ['home', 'sobre', 'servicos', 'galeria', 'orcamento', 'contato'];
    let currentSection = '';
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = section;
          break;
        }
      }
    }
    
    // Update active class efficiently
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSection}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  toggleMobileMenu() {
    this.nav?.classList.toggle('active');
    this.mobileMenuBtn?.classList.toggle('active');
  }
  
  handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = this.header?.offsetHeight || 0;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      this.nav?.classList.remove('active');
      this.mobileMenuBtn?.classList.remove('active');
    }
  }
  
  handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.quoteForm);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    const requiredFields = ['nome', 'empresa', 'tipo', 'quantidade', 'telefone'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      this.showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
      return;
    }
    
    // Create WhatsApp message
    const message = this.createWhatsAppMessage(data);
    const whatsappUrl = `https://wa.me/5598987800178?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    this.showNotification('Redirecionando para o WhatsApp...', 'success');
    
    // Reset form
    this.quoteForm.reset();
  }
  
  createWhatsAppMessage(data) {
    return `*Solicitação de Orçamento - SOS Malhas*

*Nome:* ${data.nome}
*Empresa/Escola:* ${data.empresa}
*Tipo de Fardamento:* ${data.tipo}
*Quantidade:* ${data.quantidade}
*Telefone:* ${data.telefone}
${data.mensagem ? `*Mensagem:* ${data.mensagem}` : ''}

Gostaria de receber um orçamento personalizado.`;
  }
  
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      borderRadius: '10px',
      color: '#fff',
      fontWeight: '600',
      zIndex: '10000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      backgroundColor: type === 'error' ? '#e74c3c' : '#27ae60'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
  
  handleDocumentClick(e) {
    // Close mobile menu when clicking outside
    if (!this.nav?.contains(e.target) && !this.mobileMenuBtn?.contains(e.target)) {
      this.nav?.classList.remove('active');
      this.mobileMenuBtn?.classList.remove('active');
    }
  }
  
  handleKeydown(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
      this.nav?.classList.remove('active');
      this.mobileMenuBtn?.classList.remove('active');
    }
  }
  
  setupIntersectionObserver() {
    // Optimized intersection observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // Animate counters for stats
          if (entry.target.classList.contains('stat-number')) {
            this.animateCounter(entry.target);
          }
          
          // Stop observing once animated
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .stat-number');
    animatedElements.forEach(el => observer.observe(el));
  }
  
  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const start = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(target * easeOutQuart);
      
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = target;
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  preloadCriticalResources() {
    // Preload critical images and resources
    const criticalImages = [
      // Add any critical images here when available
    ];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
}

// Optimized DOM ready function
function domReady(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
}

// Initialize site when DOM is ready
domReady(() => {
  new SiteOptimizer();
});

// Service Worker registration for caching (if available)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed, but that's okay
      console.log('Service Worker registration failed');
    });
  });
}

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      if (perfData) {
        console.log(`Page load time: ${perfData.loadEventEnd - perfData.fetchStart}ms`);
      }
    }, 0);
  });
}

// Galeria Carrossel com previews e autoplay
document.addEventListener('DOMContentLoaded', function() {
  const images = [
    { src: 'assets/MaranhaoCamisa.jpg', alt: 'Maranhão Camisa' },
    { src: 'assets/ColegioSantaTeresa.jpg', alt: 'Colégio Santa Teresa' },
    { src: 'assets/SagradaFamilia.jpg', alt: 'Sagrada Família' },
    { src: 'assets/Educar.jpg', alt: 'Educar' },
    { src: 'assets/NossaSenhora.jpg', alt: 'Nossa Senhora' },
    { src: 'assets/Protemes.jpg', alt: 'Protemes' },
    { src: 'assets/SaoFrancisco.jpg', alt: 'São Francisco' }
  ];
  const track = document.querySelector('.gallery-track');
  const prevBtn = document.querySelector('.gallery-btn.prev-btn');
  const nextBtn = document.querySelector('.gallery-btn.next-btn');
  let current = 0;
  let interval;

  function renderSlides() {
    track.innerHTML = '';
    images.forEach((img, i) => {
      const div = document.createElement('div');
      div.className = 'gallery-slide';
      if (i === current) div.classList.add('active');
      else if (i === (current - 1 + images.length) % images.length) div.classList.add('prev');
      else if (i === (current + 1) % images.length) div.classList.add('next');
      else div.classList.add('behind');
      div.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
      track.appendChild(div);
    });
  }

  function showSlide(idx) {
    current = (idx + images.length) % images.length;
    renderSlides();
  }

  function nextSlide() {
    showSlide(current + 1);
  }
  function prevSlide() {
    showSlide(current - 1);
  }

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });
  nextBtn?.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  function startAutoplay() {
    interval = setInterval(nextSlide, 3500);
  }
  function resetAutoplay() {
    clearInterval(interval);
    startAutoplay();
  }

  renderSlides();
  startAutoplay();

  // Swipe support for mobile
  let startX = null;
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });
  track.addEventListener('touchend', e => {
    if (startX === null) return;
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 40) prevSlide();
    else if (startX - endX > 40) nextSlide();
    resetAutoplay();
    startX = null;
  });
});