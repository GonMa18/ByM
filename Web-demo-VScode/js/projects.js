(function () {
  const data = window.BISKY_DATA;
  const ui = window.BISKY_UI;
  if (!data || !ui) return;

  const families = data.projectFamilies;
  const projects = data.projects;

  const familyPages = {
    all: { label: "Portfolio", href: "pages/projects.html" },
    cohetes: { label: "Cohetes", href: "pages/projects-rockets.html" },
    motores: { label: "Motores", href: "pages/projects-motors.html" },
    "launch-rails": { label: "Launch Rails", href: "pages/projects-launch-rails.html" },
    auxiliary: { label: "Auxiliares", href: "pages/projects-auxiliary.html" },
  };

  function projectCard(project) {
    const family = families[project.family];
    return `
      <article class="project-card lift reveal">
        <a class="project-card__media" href="${ui.withRoot(`pages/project-detail.html?id=${project.id}`)}" aria-label="Abrir proyecto ${ui.escapeHtml(project.name)}">
          <img src="${ui.withRoot(project.image)}" alt="Visual de ${ui.escapeHtml(project.name)}" loading="lazy" />
        </a>
        <div class="project-card__body">
          <div class="meta-list">
            <span class="chip">${ui.escapeHtml(family.label)}</span>
            <span class="chip">${project.year}</span>
            <span class="chip">${ui.escapeHtml(project.status)}</span>
          </div>
          <h3>${ui.escapeHtml(project.name)}</h3>
          <p>${ui.escapeHtml(project.summary)}</p>
          <a class="text-link" href="${ui.withRoot(`pages/project-detail.html?id=${project.id}`)}">Abrir ficha tecnica →</a>
        </div>
      </article>
    `;
  }

  function sectionNav(activeKey) {
    return `
      <nav class="section-nav" aria-label="Categorias de proyecto">
        ${Object.entries(familyPages)
          .map(([key, item]) => {
            const activeClass = key === activeKey ? "is-active" : "";
            return `<a class="${activeClass}" href="${ui.withRoot(item.href)}">${item.label}</a>`;
          })
          .join("")}
      </nav>
    `;
  }

  function renderOverview() {
    const mount = document.querySelector("[data-project-overview]");
    if (!mount) return;

    const familyBlocks = Object.values(families)
      .map((family) => {
        const list = projects.filter((project) => project.family === family.key);
        return `
          <section class="category-block" id="family-${family.key}">
            <div class="filter-header">
              <div>
                <span class="kicker">Familia Tecnica</span>
                <h2>${ui.escapeHtml(family.label)}</h2>
              </div>
              <a class="text-link" href="${ui.withRoot(familyPages[family.key].href)}">Ver familia completa →</a>
            </div>
            <p class="lead">${ui.escapeHtml(family.description)}</p>
            <div class="family-grid">
              ${list.map((project) => projectCard(project)).join("")}
            </div>
          </section>
        `;
      })
      .join("");

    mount.innerHTML = `${sectionNav("all")}${familyBlocks}`;
    ui.refreshReveal(mount);
  }

  function renderHomePreview() {
    const mount = document.querySelector("[data-project-preview]");
    if (!mount) return;

    const featured = Object.keys(families)
      .map((key) => projects.find((project) => project.family === key))
      .filter(Boolean)
      .slice(0, 4);

    mount.innerHTML = `
      <div class="section-heading">
        <span class="kicker">Portfolio Tecnico</span>
        <h2>Familias de desarrollo</h2>
        <p class="lead">Cohetes, motores, rails y desarrollos auxiliares integrados en un unico sistema de ingenieria.</p>
      </div>
      <div class="family-grid">
        ${featured.map((project) => projectCard(project)).join("")}
      </div>
    `;
    ui.refreshReveal(mount);
  }

  function renderFamilyPage() {
    const mount = document.querySelector("[data-project-family]");
    if (!mount) return;

    const familyKey = mount.dataset.projectFamily;
    const family = families[familyKey];
    const list = projects.filter((project) => project.family === familyKey);

    mount.innerHTML = `
      ${sectionNav(familyKey)}
      <section class="category-block">
        <div class="split-content">
          <article class="card panel-dark spotlight-content reveal">
            <span class="kicker">Categoria</span>
            <h2>${ui.escapeHtml(family.label)}</h2>
            <p>${ui.escapeHtml(family.description)}</p>
            <div class="meta-list">
              <span class="chip">${list.length} proyectos</span>
              <span class="chip">Portfolio tecnico</span>
            </div>
          </article>
          <figure class="spotlight-visual reveal">
            <img src="${ui.withRoot(family.image)}" alt="Visual de ${ui.escapeHtml(family.label)}" />
          </figure>
        </div>
      </section>
      <section class="category-block">
        <div class="family-grid">
          ${list.map((project) => projectCard(project)).join("")}
        </div>
      </section>
    `;
    ui.refreshReveal(mount);
  }

  function renderProjectDetail() {
    const mount = document.querySelector("[data-project-detail]");
    if (!mount) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const project = projects.find((item) => item.id === id) || projects[0];
    const family = families[project.family];

    const relatedProjects = project.related
      .map((relatedId) => projects.find((item) => item.id === relatedId))
      .filter(Boolean)
      .slice(0, 4);

    mount.innerHTML = `
      <section class="page-header reveal">
        <div class="container page-intro">
          <span class="kicker">Ficha de Proyecto</span>
          <h1>${ui.escapeHtml(project.name)}</h1>
          <p class="lead">${ui.escapeHtml(project.description)}</p>
          <div class="meta-list">
            <span class="chip">${ui.escapeHtml(family.label)}</span>
            <span class="chip">${project.year}</span>
            <span class="chip">${ui.escapeHtml(project.status)}</span>
          </div>
        </div>
      </section>

      <section class="reveal">
        <div class="container split-content">
          <figure class="spotlight-visual">
            <img src="${ui.withRoot(project.image)}" alt="Visual principal ${ui.escapeHtml(project.name)}" />
          </figure>
          <article class="card spotlight-content">
            <span class="kicker">Bloque Destacado</span>
            <h2>${ui.escapeHtml(project.highlight)}</h2>
            <p>${ui.escapeHtml(project.summary)}</p>
            <a class="btn btn--primary" href="${ui.withRoot("pages/projects.html")}">Volver a portfolio</a>
          </article>
        </div>
      </section>

      <section class="reveal">
        <div class="container split-content">
          <article class="detail-info">
            <h3>Datos Tecnicos</h3>
            <dl class="info-list">
              ${project.specs
                .map(
                  (spec) => `
                    <div class="info-row">
                      <dt>${ui.escapeHtml(spec.label)}</dt>
                      <dd>${ui.escapeHtml(spec.value)}</dd>
                    </div>
                  `
                )
                .join("")}
            </dl>
          </article>
          <article class="detail-info">
            <h3>Proyectos Relacionados</h3>
            ${
              relatedProjects.length
                ? `<div class="timeline">${relatedProjects
                    .map(
                      (item) =>
                        `<div class="timeline-item"><a class="text-link" href="${ui.withRoot(
                          `pages/project-detail.html?id=${item.id}`
                        )}">${ui.escapeHtml(item.name)}</a></div>`
                    )
                    .join("")}</div>`
                : '<div class="empty-state">No hay relaciones tecnicas definidas para esta ficha demo.</div>'
            }
          </article>
        </div>
      </section>

      <section class="reveal">
        <div class="container">
          <div class="section-heading">
            <span class="kicker">Galeria</span>
            <h2>Recursos Visuales</h2>
          </div>
          <div class="masonry">
            ${project.gallery
              .map(
                (image, index) => `
                  <figure class="masonry-item">
                    <img src="${ui.withRoot(image)}" alt="Recurso ${index + 1} de ${ui.escapeHtml(project.name)}" />
                  </figure>
                `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;

    document.title = `${project.name} - BiSKY Team`;
    ui.refreshReveal(mount);
  }

  renderHomePreview();
  renderOverview();
  renderFamilyPage();
  renderProjectDetail();
})();

