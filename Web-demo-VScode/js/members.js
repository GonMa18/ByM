(function () {
  const data = window.BISKY_DATA;
  const ui = window.BISKY_UI;
  if (!data || !ui) return;

  const { members, years, departmentOrder, positionOrder } = data;

  function orderBy(list, value, fallback = 999) {
    const index = list.indexOf(value);
    return index === -1 ? fallback : index;
  }

  function getAssignmentForYear(member, year) {
    return member.participation.find((entry) => Number(entry.year) === Number(year));
  }

  function membersForYear(year) {
    return members
      .map((member) => {
        const assignment = getAssignmentForYear(member, year);
        return assignment ? { member, assignment } : null;
      })
      .filter(Boolean)
      .sort((a, b) => {
        const depA = orderBy(departmentOrder, a.assignment.department);
        const depB = orderBy(departmentOrder, b.assignment.department);
        if (depA !== depB) return depA - depB;
        const posA = orderBy(positionOrder, a.assignment.position);
        const posB = orderBy(positionOrder, b.assignment.position);
        if (posA !== posB) return posA - posB;
        return a.member.name.localeCompare(b.member.name);
      });
  }

  function renderMemberCard(member, assignment, compact = false) {
    return `
      <article class="member-card lift">
        <a href="${ui.withRoot(`pages/member-detail.html?id=${member.id}`)}" aria-label="Abrir perfil de ${ui.escapeHtml(member.name)}">
          <div class="member-card__image">
            <img src="${ui.withRoot(member.image)}" alt="Retrato de ${ui.escapeHtml(member.name)}" loading="lazy" />
          </div>
        </a>
        <div class="member-card__meta">
          <h3>${ui.escapeHtml(member.name)}</h3>
          <p class="member-card__role">${ui.escapeHtml(assignment.title || member.headlineRole)}</p>
          ${compact ? "" : `<p>${ui.escapeHtml(member.tagline)}</p>`}
        </div>
        <div class="meta-list">
          <span class="chip">${ui.escapeHtml(assignment.department)}</span>
          <span class="chip">${ui.escapeHtml(assignment.position)}</span>
        </div>
      </article>
    `;
  }

  function renderYearCards() {
    const mount = document.querySelector("[data-members-years]");
    if (!mount) return;
    const cards = years
      .map((year) => {
        const count = membersForYear(year).length;
        return `
          <article class="year-card lift">
            <div class="year-card__meta">
              <h3>Ano ${year}</h3>
              <span class="badge">${count} miembros</span>
            </div>
            <p>Snapshot anual del equipo con jerarquia por departamentos y puestos.</p>
            <a class="text-link" href="${ui.withRoot(`pages/members-${year}.html`)}">Ver roster ${year} →</a>
          </article>
        `;
      })
      .join("");

    mount.innerHTML = cards;
    ui.refreshReveal(mount);
  }

  function renderMembersPreview() {
    const mount = document.querySelector("[data-members-preview]");
    if (!mount) return;
    const currentYear = years[0];
    const preview = membersForYear(currentYear).slice(0, 8);
    mount.innerHTML = `
      <div class="section-heading">
        <span class="kicker">Equipo Activo</span>
        <h2>Nucleo ${currentYear}</h2>
      </div>
      <div class="member-grid">
        ${preview.map((item) => renderMemberCard(item.member, item.assignment, true)).join("")}
      </div>
    `;
    ui.refreshReveal(mount);
  }

  function groupByDepartment(items) {
    const grouped = new Map();
    items.forEach((item) => {
      const dept = item.assignment.department;
      if (!grouped.has(dept)) grouped.set(dept, []);
      grouped.get(dept).push(item);
    });

    return Array.from(grouped.entries()).sort((a, b) => {
      const depA = orderBy(departmentOrder, a[0]);
      const depB = orderBy(departmentOrder, b[0]);
      return depA - depB;
    });
  }

  function groupByPosition(items) {
    const grouped = new Map();
    items.forEach((item) => {
      const role = item.assignment.position;
      if (!grouped.has(role)) grouped.set(role, []);
      grouped.get(role).push(item);
    });

    return Array.from(grouped.entries()).sort((a, b) => {
      const posA = orderBy(positionOrder, a[0]);
      const posB = orderBy(positionOrder, b[0]);
      return posA - posB;
    });
  }

  function renderYearRoster() {
    const mount = document.querySelector("[data-members-roster]");
    if (!mount) return;

    const year = Number(mount.dataset.membersRoster);
    const roster = membersForYear(year);

    if (!roster.length) {
      mount.innerHTML = '<div class="empty-state">No hay miembros para este ano en el dataset demo.</div>';
      return;
    }

    const html = groupByDepartment(roster)
      .map(([department, items]) => {
        const roleBlocks = groupByPosition(items)
          .map(
            ([position, roleMembers]) => `
              <div class="role-block">
                <span class="kicker">${ui.escapeHtml(position)}</span>
                <div class="member-grid">
                  ${roleMembers.map((entry) => renderMemberCard(entry.member, entry.assignment, true)).join("")}
                </div>
              </div>
            `
          )
          .join("");

        return `
          <section class="department-box reveal">
            <div class="section-heading">
              <span class="kicker">Departamento</span>
              <h3>${ui.escapeHtml(department)}</h3>
            </div>
            ${roleBlocks}
          </section>
        `;
      })
      .join("");

    mount.innerHTML = `<div class="roster-group">${html}</div>`;
    ui.refreshReveal(mount);
  }

  function renderMemberDetail() {
    const mount = document.querySelector("[data-member-detail]");
    if (!mount) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const member = members.find((item) => item.id === id) || members[0];

    const currentParticipation = member.participation[0];
    const yearsActive = member.participation.map((item) => item.year).sort((a, b) => b - a);

    mount.innerHTML = `
      <section class="page-header reveal">
        <div class="container page-intro">
          <span class="kicker">Perfil de Miembro</span>
          <h1>${ui.escapeHtml(member.name)}</h1>
          <p class="lead">${ui.escapeHtml(member.summary)}</p>
          <div class="btn-row">
            <a class="btn btn--primary" href="${member.linkedin}">LinkedIn</a>
            <a class="btn" href="${ui.withRoot("pages/members.html")}">Volver a Miembros</a>
          </div>
        </div>
      </section>

      <section class="reveal">
        <div class="container detail-layout">
          <div class="detail-media">
            <img src="${ui.withRoot(member.image)}" alt="Retrato de ${ui.escapeHtml(member.name)}" />
          </div>
          <div class="detail-content">
            <article class="detail-info">
              <h3>Resumen Tecnico</h3>
              <dl class="info-list">
                <div class="info-row"><dt>Rol principal</dt><dd>${ui.escapeHtml(member.headlineRole)}</dd></div>
                <div class="info-row"><dt>Departamento actual</dt><dd>${ui.escapeHtml(currentParticipation.department)}</dd></div>
                <div class="info-row"><dt>Puesto actual</dt><dd>${ui.escapeHtml(currentParticipation.position)}</dd></div>
                <div class="info-row"><dt>Anos activos</dt><dd>${yearsActive.join(", ")}</dd></div>
              </dl>
            </article>
            <article class="detail-info">
              <h3>Hitos</h3>
              <div class="timeline">
                ${member.highlights.map((highlight) => `<div class="timeline-item"><p>${ui.escapeHtml(highlight)}</p></div>`).join("")}
              </div>
            </article>
            <article class="detail-info">
              <h3>Historico de Departamentos</h3>
              <div class="timeline">
                ${member.participation
                  .slice()
                  .sort((a, b) => b.year - a.year)
                  .map(
                    (entry) => `
                      <div class="timeline-item">
                        <p><strong>${entry.year}</strong> - ${ui.escapeHtml(entry.department)} - ${ui.escapeHtml(entry.title)}</p>
                      </div>
                    `
                  )
                  .join("")}
              </div>
            </article>
          </div>
        </div>
      </section>
    `;

    document.title = `${member.name} - BiSKY Team`;
    ui.refreshReveal(mount);
  }

  renderYearCards();
  renderMembersPreview();
  renderYearRoster();
  renderMemberDetail();
})();

