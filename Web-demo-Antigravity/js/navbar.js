/**
 * BiSKY Team — Navbar Controller
 * Show/hide on scroll, background blur on scroll
 */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScrollY = 0;
  let ticking = false;
  const SCROLL_THRESHOLD = 80;
  const HIDE_THRESHOLD = 5;

  function updateNavbar() {
    const scrollY = window.scrollY;

    // Add scrolled class for background blur
    if (scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide/show on scroll direction
    if (scrollY > lastScrollY && scrollY > 200) {
      // Scrolling down — hide
      if (scrollY - lastScrollY > HIDE_THRESHOLD) {
        navbar.classList.add('hidden');
      }
    } else {
      // Scrolling up — show
      navbar.classList.remove('hidden');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });
})();
