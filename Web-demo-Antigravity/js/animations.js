/**
 * BiSKY Team — Scroll & Cursor Animations
 * Intersection Observer for reveal-on-scroll, cursor-tracking effects
 */
(function () {

  /* —— Scroll Reveal —— */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  function observeReveals() {
    document.querySelectorAll('.reveal:not(.revealed)').forEach(el => {
      revealObserver.observe(el);
    });
  }

  // Expose globally so page scripts can call after dynamic content
  window.biskyObserveReveals = observeReveals;

  // MutationObserver to catch dynamically added .reveal elements
  const mutationObserver = new MutationObserver((mutations) => {
    let hasNewReveals = false;
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          if (node.classList && node.classList.contains('reveal')) hasNewReveals = true;
          if (node.querySelectorAll) {
            const reveals = node.querySelectorAll('.reveal');
            if (reveals.length > 0) hasNewReveals = true;
          }
        }
      });
    });
    if (hasNewReveals) {
      // Small delay to let layout settle
      requestAnimationFrame(observeReveals);
    }
  });

  /* —— Counter Animation —— */
  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          let current = 0;
          const step = Math.max(1, Math.floor(target / 40));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            el.textContent = current;
          }, 30);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

  /* —— Cursor Glow (global subtle effect) —— */
  let mouseX = 0, mouseY = 0;
  let cursorGlow = null;

  function createCursorGlow() {
    cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
      position: fixed;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(110,180,255,0.03) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s;
    `;
    document.body.appendChild(cursorGlow);
  }

  function updateCursorGlow() {
    if (cursorGlow) {
      cursorGlow.style.left = mouseX + 'px';
      cursorGlow.style.top = mouseY + 'px';
    }
    requestAnimationFrame(updateCursorGlow);
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  /* —— Parallax on scroll for hero elements —— */
  function initParallax() {
    const heroContent = document.querySelector('.hero__content');
    if (!heroContent) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      if (scrollY > vh) return;

      const factor = scrollY / vh;
      heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
      heroContent.style.opacity = 1 - factor * 1.5;
    }, { passive: true });
  }

  /* —— Init —— */
  document.addEventListener('DOMContentLoaded', () => {
    observeReveals();
    animateCounters();
    createCursorGlow();
    updateCursorGlow();
    initParallax();

    // Start mutation observer on body to catch dynamically added content
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  });

})();
