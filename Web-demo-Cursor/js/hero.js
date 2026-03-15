/**
 * BiSKY Team — Hero: cursor-follow glow and rocket parallax
 */

(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const cursorGlow = hero.querySelector('.hero__cursor-glow');
  const rocketWrap = hero.querySelector('.hero__rocket-wrap');
  const rocket = hero.querySelector('.hero__rocket');

  let mouseX = 0.5;
  let mouseY = 0.5;
  let currentX = 0.5;
  let currentY = 0.5;

  hero.addEventListener('mousemove', function (e) {
    const rect = hero.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width;
    mouseY = (e.clientY - rect.top) / rect.height;
  });

  function animate() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    if (cursorGlow) {
      cursorGlow.style.left = currentX * 100 + '%';
      cursorGlow.style.top = currentY * 100 + '%';
    }

    if (rocketWrap && rocket) {
      const dx = (currentX - 0.5) * 12;
      const dy = (currentY - 0.5) * 12;
      rocket.style.transform = 'rotateX(' + dy + 'deg) rotateY(' + dx + 'deg)';
    }

    requestAnimationFrame(animate);
  }
  animate();

  // Subtle scroll parallax on rocket
  let scrollY = 0;
  window.addEventListener('scroll', function () {
    scrollY = window.scrollY;
  }, { passive: true });

  function updateParallax() {
    if (rocketWrap && rocket && scrollY < window.innerHeight) {
      const t = scrollY / window.innerHeight;
      const move = t * 30;
      rocketWrap.style.transform = 'translate(-50%, calc(-50% + ' + move + 'px))';
    }
    requestAnimationFrame(updateParallax);
  }
  updateParallax();
})();
