/**
 * BiSKY Team — Navbar: scroll hide/show and dropdown behavior
 */

(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScrollY = window.scrollY;
  const threshold = 80;

  function onScroll() {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 100) {
      nav.classList.add('nav--solid');
    } else {
      nav.classList.remove('nav--solid');
    }
    if (currentScrollY > lastScrollY && currentScrollY > threshold) {
      nav.classList.add('nav--hidden');
    } else {
      nav.classList.remove('nav--hidden');
    }
    lastScrollY = currentScrollY;
  }

  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

})();
