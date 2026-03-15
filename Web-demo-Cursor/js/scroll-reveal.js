/**
 * BiSKY Team — Scroll reveal: elements animate in when entering viewport
 */

(function () {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0
    }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();
