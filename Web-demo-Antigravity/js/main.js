/**
 * BiSKY Team — Main Controller
 * Preloader, smooth scroll, general utilities
 */
(function () {

  /* —— Preloader —— */
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 800);
      }, 400);
    });
  }

  /* —— Smooth anchor scroll —— */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href').slice(1);
        if (!targetId) return;
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* —— External link target —— */
  function initExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }

  /* —— Keyboard navigation for sponsor overlay —— */
  function initKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const overlay = document.getElementById('sponsor-overlay');
        if (overlay && overlay.classList.contains('active')) {
          overlay.classList.remove('active');
        }
      }
    });
  }

  /* —— Init —— */
  initPreloader();
  document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initExternalLinks();
    initKeyboard();
  });

})();
