/**
 * BiSKY Team — Home Page Logic
 * Populates dynamic sections on the homepage
 */
document.addEventListener('DOMContentLoaded', () => {

  /* —— Projects Preview Grid —— */
  const projectsGrid = document.getElementById('home-projects-grid');
  if (projectsGrid) {
    // Show a selection of projects (exclude Sugaar since it's featured)
    const previewProjects = [
      BISKY.projects.rockets.find(r => r.id === 'artizarra-2'),
      BISKY.projects.motors.find(m => m.id === 'sua-mk3'),
      BISKY.projects.launchRails[0]
    ].filter(Boolean);

    previewProjects.forEach((project, i) => {
      const statusClass = BISKY.getStatusClass(project.status);
      const card = document.createElement('a');
      card.href = `pages/project-detail.html?id=${project.id}`;
      card.className = 'project-card reveal reveal-delay-' + (i + 1);
      card.innerHTML = `
        <div class="project-card__image">
          <div class="project-card__image-placeholder">${project.name}</div>
        </div>
        <div class="project-card__body">
          <div class="project-card__meta">
            <span class="project-card__category">${BISKY.getCategoryLabel(project.category)}</span>
            <span class="project-card__year">${project.year}</span>
          </div>
          <h3 class="project-card__title">${project.name}</h3>
          <p class="project-card__tagline">${project.tagline}</p>
          <div class="project-card__footer">
            <span class="status-badge ${statusClass}">${project.status}</span>
            <span class="project-card__arrow">→</span>
          </div>
        </div>
      `;
      projectsGrid.appendChild(card);
    });
  }

  /* —— Departments Grid —— */
  const deptsGrid = document.getElementById('departments-grid');
  if (deptsGrid) {
    const deptDescriptions = {
      propulsion: 'Diseño, fabricación y ensayo de motores de propelente sólido. Desde la formulación del propelente hasta la caracterización en banco de pruebas.',
      structures: 'Diseño estructural, análisis FEA y fabricación de fuselajes, acoples y componentes en materiales compuestos.',
      avionics: 'Computadoras de vuelo, telemetría, sensores inerciales y sistemas electrónicos de a bordo.',
      recovery: 'Sistemas de recuperación con paracaídas, eyección pirotécnica y algoritmos de despliegue seguro.',
      aerodynamics: 'Análisis CFD, diseño de perfiles aerodinámicos, simulaciones de estabilidad y trayectoria.',
      operations: 'Gestión de proyectos, logística de lanzamiento, seguridad de campo y coordinación general del equipo.'
    };

    BISKY.departments.forEach((dept, i) => {
      const card = document.createElement('div');
      card.className = 'dept-card reveal reveal-delay-' + (i + 1);
      card.innerHTML = `
        <div class="dept-card__icon">${dept.icon}</div>
        <h3 class="dept-card__name">${dept.name}</h3>
        <p class="dept-card__desc">${deptDescriptions[dept.id] || ''}</p>
      `;
      deptsGrid.appendChild(card);
    });
  }

  /* —— Team Preview Grid (2025 members, first 8) —— */
  const teamGrid = document.getElementById('team-grid');
  if (teamGrid) {
    const members2025 = BISKY.getMembersByYear(2025).slice(0, 8);
    members2025.forEach((member, i) => {
      const initials = member.name.split(' ').map(w => w[0]).join('').slice(0, 2);
      const latestRecord = member.history[member.history.length - 1];
      const card = document.createElement('a');
      card.href = `pages/member-profile.html?id=${member.id}`;
      card.className = 'member-card reveal reveal-delay-' + Math.min(i + 1, 5);
      card.innerHTML = `
        <div class="member-card__avatar">${initials}</div>
        <div class="member-card__name">${member.name}</div>
        <div class="member-card__role">${BISKY.getPositionName(latestRecord.pos)}</div>
      `;
      teamGrid.appendChild(card);
    });
  }

  /* —— Sponsors Preview —— */
  const sponsorsLogos = document.getElementById('sponsors-logos');
  if (sponsorsLogos) {
    // Show top-tier sponsors
    const topSponsors = BISKY.sponsors.list
      .filter(s => ['cosmos', 'galaxy', 'nebula', 'star'].includes(s.tier))
      .slice(0, 8);

    topSponsors.forEach(sponsor => {
      const el = document.createElement('div');
      el.className = 'home-sponsors__logo';
      el.textContent = sponsor.name;
      sponsorsLogos.appendChild(el);
    });
  }

});
