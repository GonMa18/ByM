(function () {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.body.dataset.root || "./";
  const pageId = document.body.dataset.page || "home";

  function withRoot(path) {
    if (!path) {
      return "#";
    }
    if (/^(https?:|mailto:|tel:|#)/i.test(path)) {
      return path;
    }
    if (path.startsWith("../")) {
      return root === "./" ? path.replace(/^\.\.\//, "") : path;
    }
    if (path.startsWith("./")) {
      return `${root}${path.slice(2)}`;
    }
    return `${root}${path}`;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function navSectionFromPage(page) {
    if (page.startsWith("members")) return "members";
    if (page.startsWith("projects")) return "projects";
    if (page.startsWith("sponsors")) return "sponsors";
    return "home";
  }

  function renderHeader() {
    const mount = document.querySelector("[data-site-header]");
    if (!mount) return;

    const activeSection = navSectionFromPage(pageId);
    const menu = [
      {
        key: "home",
        label: "Home",
        href: withRoot("index.html"),
      },
      {
        key: "members",
        label: "Miembros",
        href: withRoot("pages/members.html"),
        children: [
          { label: "Vista General", href: withRoot("pages/members.html") },
          { label: "Ano 2025", href: withRoot("pages/members-2025.html") },
          { label: "Ano 2024", href: withRoot("pages/members-2024.html") },
          { label: "Ano 2023", href: withRoot("pages/members-2023.html") },
        ],
      },
      {
        key: "projects",
        label: "Proyectos",
        href: withRoot("pages/projects.html"),
        children: [
          { label: "Portfolio General", href: withRoot("pages/projects.html") },
          { label: "Cohetes", href: withRoot("pages/projects-rockets.html") },
          { label: "Motores", href: withRoot("pages/projects-motors.html") },
          { label: "Launch Rails", href: withRoot("pages/projects-launch-rails.html") },
          { label: "Auxiliares", href: withRoot("pages/projects-auxiliary.html") },
        ],
      },
      {
        key: "sponsors",
        label: "Sponsors",
        href: withRoot("pages/sponsors.html"),
      },
    ];

    const navMarkup = menu
      .map((item) => {
        const isActive = activeSection === item.key;
        const classes = ["nav-item", isActive ? "is-active" : "", item.children ? "nav-item--has-menu" : ""]
          .filter(Boolean)
          .join(" ");

        const children = item.children
          ? `<div class="dropdown">${item.children
              .map((child) => `<a href="${child.href}">${child.label}</a>`)
              .join("")}</div>`
          : "";

        return `
          <div class="${classes}">
            <a class="nav-link" href="${item.href}">
              <span>${item.label}</span>
              ${item.children ? '<span class="nav-caret">▾</span>' : ""}
            </a>
            ${children}
          </div>
        `;
      })
      .join("");

    mount.innerHTML = `
      <div class="site-header" data-scroll-header>
        <div class="site-header__inner">
          <a class="brand" href="${withRoot("index.html")}">
            <img class="brand__icon" src="${withRoot("assets/icons/favicon.svg")}" alt="BiSKY icon" />
            <span class="brand__name">BiSKY Team</span>
          </a>
          <nav class="site-nav" aria-label="Principal">
            ${navMarkup}
          </nav>
        </div>
      </div>
    `;
  }

  function renderFooter() {
    const mount = document.querySelector("[data-site-footer]");
    if (!mount) return;
    const teamInfo = window.BISKY_DATA?.teamInfo;
    mount.innerHTML = `
      <footer class="site-footer">
        <div class="site-footer__inner">
          <div class="footer-top">
            <div class="footer-brand">
              <a class="brand" href="${withRoot("index.html")}" aria-label="Volver a inicio">
                <img class="brand__icon" src="${withRoot("assets/icons/favicon.svg")}" alt="BiSKY icon" />
                <span class="brand__name">BiSKY Team</span>
              </a>
              <p>${escapeHtml(teamInfo?.focus || "Portfolio universitario de coheteria y desarrollo aeroespacial")}</p>
            </div>
            <div class="footer-links">
              <a href="${withRoot("pages/members.html")}">Miembros</a>
              <a href="${withRoot("pages/projects.html")}">Proyectos</a>
              <a href="${withRoot("pages/sponsors.html")}">Sponsors</a>
            </div>
          </div>
          <div class="footer-bottom">
            <span>${escapeHtml(teamInfo?.campus || "Universidad")}</span>
            <span>Demo Frontend 2026 - HTML, CSS, JavaScript</span>
          </div>
        </div>
      </footer>
    `;
  }

  function initHeaderScrollBehavior() {
    const header = document.querySelector("[data-scroll-header]");
    if (!header) return;

    let lastY = window.scrollY;
    let locked = false;

    const onScroll = () => {
      if (locked) return;
      locked = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const goingDown = currentY > lastY + 6;
        const goingUp = currentY < lastY - 6;

        if (goingDown && currentY > 110) {
          header.classList.add("site-header--hidden");
        } else if (goingUp || currentY <= 40) {
          header.classList.remove("site-header--hidden");
        }

        lastY = currentY;
        locked = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const revealObserver =
    reducedMotion || typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.14,
            rootMargin: "0px 0px -12% 0px",
          }
        );

  function refreshReveal(scope = document) {
    const items = scope.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!revealObserver) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    items.forEach((item) => {
      if (item.classList.contains("is-visible") || item.dataset.revealBound === "true") return;
      item.dataset.revealBound = "true";
      revealObserver.observe(item);
    });
  }

  function initParallax() {
    if (reducedMotion) return;
    const elements = Array.from(document.querySelectorAll("[data-parallax]"));
    if (!elements.length) return;

    let busy = false;
    const update = () => {
      const y = window.scrollY;
      elements.forEach((element) => {
        const speed = Number(element.dataset.parallax || "0.08");
        const offset = y * speed;
        element.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
      busy = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!busy) {
          busy = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
  }

  function initCursorOrb() {
    if (reducedMotion) return;
    const orb = document.querySelector("[data-cursor-orb]");
    if (!orb) return;

    const pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
    const current = { ...pointer };

    window.addEventListener(
      "mousemove",
      (event) => {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
      },
      { passive: true }
    );

    function frame() {
      current.x += (pointer.x - current.x) * 0.12;
      current.y += (pointer.y - current.y) * 0.12;
      orb.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  function initAmbientCanvas() {
    const canvas = document.getElementById("ambient-canvas");
    if (!canvas || reducedMotion) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    const pointer = { x: 0, y: 0, active: false };
    const points = [];
    const count = 68;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createPoints() {
      points.length = 0;
      for (let i = 0; i < count; i += 1) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.33,
          vy: (Math.random() - 0.5) * 0.33,
          radius: Math.random() * 1.5 + 0.6,
        });
      }
    }

    function draw() {
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < points.length; i += 1) {
        const p = points[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20 || p.x > width + 20) p.vx *= -1;
        if (p.y < -20 || p.y > height + 20) p.vy *= -1;

        for (let j = i + 1; j < points.length; j += 1) {
          const q = points[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.17;
            context.strokeStyle = `rgba(20, 27, 38, ${alpha})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(p.x, p.y);
            context.lineTo(q.x, q.y);
            context.stroke();
          }
        }

        if (pointer.active) {
          const dpx = pointer.x - p.x;
          const dpy = pointer.y - p.y;
          const distPointer = Math.hypot(dpx, dpy);
          if (distPointer < 180 && distPointer > 0.1) {
            p.x -= (dpx / distPointer) * 0.21;
            p.y -= (dpy / distPointer) * 0.21;
          }
        }

        context.fillStyle = "rgba(17, 24, 35, 0.34)";
        context.beginPath();
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        context.fill();
      }

      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", () => {
      resize();
      createPoints();
    });

    window.addEventListener(
      "mousemove",
      (event) => {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        pointer.active = true;
      },
      { passive: true }
    );

    window.addEventListener("mouseout", () => {
      pointer.active = false;
    });

    resize();
    createPoints();
    requestAnimationFrame(draw);
  }

  window.BISKY_UI = {
    withRoot,
    escapeHtml,
    refreshReveal,
  };

  renderHeader();
  renderFooter();
  initHeaderScrollBehavior();
  refreshReveal(document);
  initParallax();
  initCursorOrb();
  initAmbientCanvas();
})();

