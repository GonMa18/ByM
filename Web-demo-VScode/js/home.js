(function () {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rocket = document.getElementById("rocketModel");
  const visual = document.getElementById("heroVisual");

  if (rocket && visual && !reducedMotion) {
    let targetX = -8;
    let targetY = -8;
    let currentX = -8;
    let currentY = -8;
    let depth = 0;

    const setTargetFromEvent = (event) => {
      const bounds = visual.getBoundingClientRect();
      const px = (event.clientX - bounds.left) / bounds.width;
      const py = (event.clientY - bounds.top) / bounds.height;
      targetX = (0.5 - py) * 15;
      targetY = (px - 0.5) * 20;
    };

    visual.addEventListener("mousemove", setTargetFromEvent, { passive: true });
    visual.addEventListener("mouseleave", () => {
      targetX = -8;
      targetY = -8;
    });

    const animateRocket = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      rocket.style.transform = `translate3d(0, ${depth}px, 0) rotateX(${currentX}deg) rotateY(${currentY}deg)`;
      requestAnimationFrame(animateRocket);
    };

    const onScroll = () => {
      const rect = visual.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = Math.max(-1, Math.min(1, (viewport * 0.5 - rect.top) / viewport));
      depth = progress * 18;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    requestAnimationFrame(animateRocket);
  }

  const counters = document.querySelectorAll("[data-count-to]");
  if (counters.length) {
    const formatNumber = (value) => {
      if (value >= 1000) return value.toLocaleString("en-US");
      return String(value);
    };

    const animateCount = (el) => {
      const target = Number(el.dataset.countTo || "0");
      const duration = Number(el.dataset.countDuration || "1200");
      const start = performance.now();

      function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        el.textContent = formatNumber(value);
        if (progress < 1) requestAnimationFrame(frame);
      }

      requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }
})();
