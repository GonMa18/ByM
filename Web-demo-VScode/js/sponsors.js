(function () {
  const data = window.BISKY_DATA;
  const ui = window.BISKY_UI;
  if (!data || !ui) return;

  const sponsors = data.sponsors;
  const tierOrder = ["Cosmos", "Galaxy", "Nebula", "Star", "Satellite", "Earth", "Software"];

  function tierGroups() {
    const map = new Map();
    tierOrder.forEach((tier) => map.set(tier, []));
    sponsors.forEach((sponsor) => {
      if (!map.has(sponsor.tier)) {
        map.set(sponsor.tier, []);
      }
      map.get(sponsor.tier).push(sponsor);
    });
    return Array.from(map.entries());
  }

  function sponsorCard(sponsor) {
    return `
      <article class="sponsor-card lift reveal">
        <a class="sponsor-card__logo" href="${ui.withRoot(`pages/sponsor-detail.html?id=${sponsor.id}`)}" aria-label="Abrir sponsor ${ui.escapeHtml(sponsor.name)}">
          <img src="${ui.withRoot(sponsor.logo)}" alt="Logo placeholder ${ui.escapeHtml(sponsor.name)}" loading="lazy" />
        </a>
        <div>
          <h3>${ui.escapeHtml(sponsor.name)}</h3>
          <p>${ui.escapeHtml(sponsor.summary)}</p>
        </div>
        <div class="meta-list">
          <span class="chip">${ui.escapeHtml(sponsor.tier)}</span>
          <span class="chip">${ui.escapeHtml(sponsor.sector)}</span>
        </div>
        <a class="text-link" href="${ui.withRoot(`pages/sponsor-detail.html?id=${sponsor.id}`)}">Ver colaboracion →</a>
      </article>
    `;
  }

  function renderSponsorsPage() {
    const mount = document.querySelector("[data-sponsors-list]");
    if (!mount) return;

    const sections = tierGroups()
      .map(([tier, list]) => {
        if (!list.length) return "";
        return `
          <section class="category-block" id="tier-${tier.toLowerCase()}">
            <div class="filter-header">
              <div>
                <span class="kicker">Categoria</span>
                <h2>${ui.escapeHtml(tier)}</h2>
              </div>
              <span class="badge">${list.length} partners</span>
            </div>
            <div class="family-grid">
              ${list.map((sponsor) => sponsorCard(sponsor)).join("")}
            </div>
          </section>
        `;
      })
      .join("");

    mount.innerHTML = sections;
    ui.refreshReveal(mount);
  }

  function renderHomePreview() {
    const mount = document.querySelector("[data-sponsors-preview]");
    if (!mount) return;

    const featured = tierOrder
      .map((tier) => sponsors.find((item) => item.tier === tier))
      .filter(Boolean)
      .slice(0, 6);

    mount.innerHTML = `
      <div class="section-heading">
        <span class="kicker">Partners</span>
        <h2>Red de sponsors</h2>
        <p class="lead">Estructura de colaboracion por categorias para sostener infraestructura, software y ensayos.</p>
      </div>
      <div class="family-grid">
        ${featured.map((sponsor) => sponsorCard(sponsor)).join("")}
      </div>
    `;
    ui.refreshReveal(mount);
  }

  function renderSponsorDetail() {
    const mount = document.querySelector("[data-sponsor-detail]");
    if (!mount) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const sponsor = sponsors.find((item) => item.id === id) || sponsors[0];

    const related = sponsors.filter((item) => item.tier === sponsor.tier && item.id !== sponsor.id).slice(0, 3);

    mount.innerHTML = `
      <section class="page-header reveal">
        <div class="container page-intro">
          <span class="kicker">Sponsor Profile</span>
          <h1>${ui.escapeHtml(sponsor.name)}</h1>
          <p class="lead">${ui.escapeHtml(sponsor.detail)}</p>
          <div class="meta-list">
            <span class="chip">${ui.escapeHtml(sponsor.tier)}</span>
            <span class="chip">${ui.escapeHtml(sponsor.sector)}</span>
          </div>
          <div class="btn-row">
            <a class="btn btn--primary" href="${sponsor.website}">Visitar entidad</a>
            <a class="btn" href="${ui.withRoot("pages/sponsors.html")}">Volver a Sponsors</a>
          </div>
        </div>
      </section>

      <section class="reveal">
        <div class="container split-content">
          <figure class="spotlight-visual">
            <img src="${ui.withRoot(sponsor.logo)}" alt="Visual sponsor ${ui.escapeHtml(sponsor.name)}" />
          </figure>
          <article class="detail-info">
            <h3>Colaboracion</h3>
            <dl class="info-list">
              <div class="info-row"><dt>Categoria</dt><dd>${ui.escapeHtml(sponsor.tier)}</dd></div>
              <div class="info-row"><dt>Sector</dt><dd>${ui.escapeHtml(sponsor.sector)}</dd></div>
              <div class="info-row"><dt>Contribucion</dt><dd>${ui.escapeHtml(sponsor.summary)}</dd></div>
              <div class="info-row"><dt>Alcance</dt><dd>${ui.escapeHtml(sponsor.detail)}</dd></div>
            </dl>
          </article>
        </div>
      </section>

      <section class="reveal">
        <div class="container">
          <div class="section-heading">
            <span class="kicker">Relacionados</span>
            <h2>Otros sponsors ${ui.escapeHtml(sponsor.tier)}</h2>
          </div>
          ${
            related.length
              ? `<div class="family-grid">${related.map((item) => sponsorCard(item)).join("")}</div>`
              : '<div class="empty-state">No hay otros sponsors en esta categoria dentro de la demo.</div>'
          }
        </div>
      </section>
    `;

    document.title = `${sponsor.name} - BiSKY Team`;
    ui.refreshReveal(mount);
  }

  renderHomePreview();
  renderSponsorsPage();
  renderSponsorDetail();
})();

