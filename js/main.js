// ==================== 
// DOM Ready
// ==================== 
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initBlogFilters();
  initGalleryFilters();
  initCarousel();
  initLightbox();
  initMapModal();
  initContactForm();
  initSubscribeForm();
  initBackToTop();
  initLazyLoading();
  initScrollSpy();
  initAnimations();
});

// ==================== 
// Navigation
// ==================== 
function initNavigation() {
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const header = document.querySelector('.header');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ==================== 
// Blog Filters & Search
// ==================== 
function initBlogFilters() {
  const filterBtns = document.querySelectorAll('.blog__filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');
  const searchInput = document.querySelector('.blog__search-input');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;

      blogCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    blogCards.forEach(card => {
      const title = card.querySelector('.blog-card__title').textContent.toLowerCase();
      const excerpt = card.querySelector('.blog-card__excerpt').textContent.toLowerCase();
      const category = card.querySelector('.blog-card__category').textContent.toLowerCase();

      if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// ==================== 
// Gallery Filters
// ==================== 
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.gallery__filter-btn');
  const galleryItems = document.querySelectorAll('.gallery__item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const album = btn.dataset.album;

      galleryItems.forEach(item => {
        if (album === 'all' || item.dataset.album === album) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ==================== 
// Carousel
// ==================== 
function initCarousel() {
  const track = document.querySelector('.carousel__track');
  const slides = document.querySelectorAll('.carousel__slide');
  const prevBtn = document.querySelector('.carousel__btn--prev');
  const nextBtn = document.querySelector('.carousel__btn--next');
  const dots = document.querySelectorAll('.carousel__dot');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let autoplayInterval;

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoplay();
    startAutoplay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoplay();
    startAutoplay();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      stopAutoplay();
      startAutoplay();
    });
  });

  const carousel = document.querySelector('.carousel');
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}

// ==================== 
// Lightbox
// ==================== 
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.querySelector('.lightbox__image');
  const lightboxCaption = document.querySelector('.lightbox__caption');
  const lightboxClose = document.querySelector('.lightbox__close');
  const lightboxPrev = document.querySelector('.lightbox__prev');
  const lightboxNext = document.querySelector('.lightbox__next');
  const galleryItems = document.querySelectorAll('.gallery__item');

  let currentIndex = 0;
  let visibleItems = [];

  function updateVisibleItems() {
    visibleItems = Array.from(galleryItems).filter(item => 
      item.style.display !== 'none'
    );
  }

  function openLightbox(index) {
    updateVisibleItems();
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxImage() {
    const item = visibleItems[currentIndex];
    if (!item) return;

    const img = item.querySelector('img');
    lightboxImage.src = img.src;
    lightboxCaption.textContent = img.alt;
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    updateLightboxImage();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    updateLightboxImage();
  }

  galleryItems.forEach((item, index) => {
    const btn = item.querySelector('.gallery__item-btn');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(index);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', nextImage);
  lightboxPrev.addEventListener('click', prevImage);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
    }
  });
}

// ==================== 
// Map Modal
// ==================== 
function initMapModal() {
  const mapModal = document.getElementById('mapModal');
  const mapClose = document.querySelector('.map-modal__close');
  const mapTitle = document.getElementById('mapTitle');
  const mapFrame = document.getElementById('mapFrame');

  const destinations = {
    kyoto: {
      title: '日本·京都',
      url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52238.25747809607!2d135.7391286921478!3d34.99483989056204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60010890770c90b1%3A0x575cf1fe98961010!2z44CSNjA0LTgwMCDlm77lubTpnZfkuqzku50g5Zub56Ge5Yy6IOW3peWPt%2BWPtyAh5a6M!5e0!3m2!1sja!2sjp!4v1234567890'
    },
    santorini: {
      title: '希腊·圣托里尼',
      url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51588.15723032149!2d25.39785854176394!3d36.41369639999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1497a675c68a3e7d%3A0xe9ae5e8e3a93c6c3!2sSantorini%2C%20Greece!5e0!3m2!1sen!2sus!4v1234567890'
    },
    machu: {
      title: '秘鲁·马丘比丘',
      url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.517486778264!2d-72.5451773845879!3d-13.16314119037459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916d96d2ed86a6c1%3A0x86c76e6d3d5c1c8b!2sMachu%20Picchu!5e0!3m2!1sen!2sus!4v1234567890'
    }
  };

  window.showMap = function(destination) {
    const dest = destinations[destination];
    if (dest) {
      mapTitle.textContent = dest.title;
      mapFrame.src = dest.url;
      mapModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  function closeMapModal() {
    mapModal.classList.remove('active');
    mapFrame.src = '';
    document.body.style.overflow = '';
  }

  mapClose.addEventListener('click', closeMapModal);

  mapModal.addEventListener('click', (e) => {
    if (e.target === mapModal) {
      closeMapModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mapModal.classList.contains('active')) {
      closeMapModal();
    }
  });
}

// ==================== 
// Contact Form
// ==================== 
function initContactForm() {
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.form__submit');
    submitBtn.classList.add('loading');

    const formData = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    submitBtn.classList.remove('loading');

    // Success message
    formMessage.textContent = '消息已发送成功！我会尽快回复您。';
    formMessage.className = 'form__message success';

    form.reset();

    setTimeout(() => {
      formMessage.className = 'form__message';
    }, 5000);
  });
}

// ==================== 
// Subscribe Form
// ==================== 
function initSubscribeForm() {
  const form = document.getElementById('subscribeForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const input = form.querySelector('.footer__subscribe-input');
    const btn = form.querySelector('.btn');
    const originalText = btn.textContent;

    btn.textContent = '订阅中...';
    btn.disabled = true;

    await new Promise(resolve => setTimeout(resolve, 1000));

    btn.textContent = '✓ 已订阅';
    input.value = '';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 2000);
  });
}

// ==================== 
// Back to Top
// ==================== 
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==================== 
// Lazy Loading
// ==================== 
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// ==================== 
// Scroll Spy
// ==================== 
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ==================== 
// Animations
// ==================== 
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.blog-card, .gallery__item, .destination-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}
