/**
 * BiSKY Team — Central Data Store
 * All placeholder data for the demo. Replace with real data when ready.
 */

const BISKY = {
  team: {
    name: 'BiSKY Team',
    tagline: 'Reaching beyond the sky',
    university: 'Universidad del País Vasco / Euskal Herriko Unibertsitatea',
    universityShort: 'UPV/EHU',
    founded: 2022,
    location: 'Bilbao, País Vasco',
    description: 'Equipo universitario de cohetería experimental de la UPV/EHU. Diseñamos, construimos y lanzamos cohetes de sondeo, desarrollando tecnología aeroespacial desde la universidad.',
    email: 'contact@biskyteam.com',
    social: {
      instagram: '#',
      linkedin: '#',
      youtube: '#',
      github: '#'
    }
  },

  departments: [
    { id: 'propulsion', name: 'Propulsión', icon: '⊘' },
    { id: 'structures', name: 'Estructuras', icon: '⊞' },
    { id: 'avionics', name: 'Aviónica', icon: '⊡' },
    { id: 'recovery', name: 'Recuperación', icon: '⊙' },
    { id: 'aerodynamics', name: 'Aerodinámica', icon: '⊗' },
    { id: 'operations', name: 'Operaciones', icon: '⊕' }
  ],

  positions: [
    { id: 'team-leader', name: 'Team Leader', order: 1 },
    { id: 'financial-manager', name: 'Financial Manager', order: 2 },
    { id: 'project-manager', name: 'Project Manager', order: 3 },
    { id: 'chief', name: 'Chief', order: 4 },
    { id: 'technical', name: 'Technical', order: 5 },
    { id: 'member', name: 'Member', order: 6 },
    { id: 'faculty', name: 'Faculty Advisor', order: 7 }
  ],

  years: [2025, 2024, 2023],

  members: [
    // — 2025 —
    { id: 1, name: 'Ander Etxeberria', position: 'team-leader', department: 'operations', years: [2023, 2024, 2025], image: null, linkedin: '#', bio: 'Líder del equipo desde 2025. Ingeniero mecánico con experiencia en gestión de proyectos aeroespaciales universitarios.', history: [{ year: 2023, dept: 'structures', pos: 'member' }, { year: 2024, dept: 'structures', pos: 'chief' }, { year: 2025, dept: 'operations', pos: 'team-leader' }] },
    { id: 2, name: 'Maialen Aguirre', position: 'financial-manager', department: 'operations', years: [2024, 2025], image: null, linkedin: '#', bio: 'Responsable financiera del equipo. Estudiante de ADE e Ingeniería Industrial.', history: [{ year: 2024, dept: 'operations', pos: 'member' }, { year: 2025, dept: 'operations', pos: 'financial-manager' }] },
    { id: 3, name: 'Unai Zabala', position: 'project-manager', department: 'propulsion', years: [2023, 2024, 2025], image: null, linkedin: '#', bio: 'Project Manager de propulsión. Especializado en motores de propelente sólido.', history: [{ year: 2023, dept: 'propulsion', pos: 'member' }, { year: 2024, dept: 'propulsion', pos: 'technical' }, { year: 2025, dept: 'propulsion', pos: 'project-manager' }] },
    { id: 4, name: 'Leire Mendizabal', position: 'project-manager', department: 'structures', years: [2024, 2025], image: null, linkedin: '#', bio: 'Project Manager de estructuras. Ingeniería de materiales compuestos aplicados a aeroespacial.', history: [{ year: 2024, dept: 'structures', pos: 'technical' }, { year: 2025, dept: 'structures', pos: 'project-manager' }] },
    { id: 5, name: 'Mikel Arana', position: 'chief', department: 'avionics', years: [2023, 2024, 2025], image: null, linkedin: '#', bio: 'Chief de aviónica. Diseño de sistemas electrónicos de vuelo y telemetría.', history: [{ year: 2023, dept: 'avionics', pos: 'member' }, { year: 2024, dept: 'avionics', pos: 'technical' }, { year: 2025, dept: 'avionics', pos: 'chief' }] },
    { id: 6, name: 'Nerea Goikoetxea', position: 'chief', department: 'recovery', years: [2024, 2025], image: null, linkedin: '#', bio: 'Chief de recuperación. Sistemas de despliegue de paracaídas y recuperación segura.', history: [{ year: 2024, dept: 'recovery', pos: 'technical' }, { year: 2025, dept: 'recovery', pos: 'chief' }] },
    { id: 7, name: 'Jon Urrutia', position: 'chief', department: 'aerodynamics', years: [2024, 2025], image: null, linkedin: '#', bio: 'Chief de aerodinámica. CFD y optimización de perfiles aerodinámicos.', history: [{ year: 2024, dept: 'aerodynamics', pos: 'member' }, { year: 2025, dept: 'aerodynamics', pos: 'chief' }] },
    { id: 8, name: 'Izaro Bilbao', position: 'chief', department: 'propulsion', years: [2024, 2025], image: null, linkedin: '#', bio: 'Chief de propulsión. Diseño y manufactura de granos de propelente.', history: [{ year: 2024, dept: 'propulsion', pos: 'member' }, { year: 2025, dept: 'propulsion', pos: 'chief' }] },
    { id: 9, name: 'Aitor Larrea', position: 'technical', department: 'propulsion', years: [2025], image: null, linkedin: '#', bio: 'Técnico de propulsión. Bancos de ensayo y caracterización de motores.', history: [{ year: 2025, dept: 'propulsion', pos: 'technical' }] },
    { id: 10, name: 'Garazi Iturbe', position: 'technical', department: 'structures', years: [2025], image: null, linkedin: '#', bio: 'Técnica de estructuras. Análisis FEA y fabricación con fibra de carbono.', history: [{ year: 2025, dept: 'structures', pos: 'technical' }] },
    { id: 11, name: 'Julen Arrieta', position: 'technical', department: 'avionics', years: [2025], image: null, linkedin: '#', bio: 'Técnico de aviónica. Firmware de controladores de vuelo.', history: [{ year: 2025, dept: 'avionics', pos: 'technical' }] },
    { id: 12, name: 'Amaia Zelaia', position: 'member', department: 'recovery', years: [2025], image: null, linkedin: '#', bio: 'Miembro del departamento de recuperación. Diseño de sistemas eyectores.', history: [{ year: 2025, dept: 'recovery', pos: 'member' }] },
    { id: 13, name: 'Ibai Gaztañaga', position: 'member', department: 'aerodynamics', years: [2025], image: null, linkedin: '#', bio: 'Miembro de aerodinámica. Simulaciones CFD con OpenFOAM.', history: [{ year: 2025, dept: 'aerodynamics', pos: 'member' }] },
    { id: 14, name: 'Oihane Ruiz', position: 'member', department: 'propulsion', years: [2025], image: null, linkedin: '#', bio: 'Miembro de propulsión. Investigación en composiciones de propelente.', history: [{ year: 2025, dept: 'propulsion', pos: 'member' }] },
    { id: 15, name: 'Dr. Elena Martínez', position: 'faculty', department: 'operations', years: [2023, 2024, 2025], image: null, linkedin: '#', bio: 'Faculty Advisor. Profesora del departamento de Ingeniería Mecánica de la UPV/EHU.', history: [{ year: 2023, dept: 'operations', pos: 'faculty' }, { year: 2024, dept: 'operations', pos: 'faculty' }, { year: 2025, dept: 'operations', pos: 'faculty' }] },

    // — 2024 —
    { id: 16, name: 'Eneko Solabarrieta', position: 'team-leader', department: 'operations', years: [2023, 2024], image: null, linkedin: '#', bio: 'Team Leader en 2024. Graduado en Ingeniería Aeroespacial.', history: [{ year: 2023, dept: 'propulsion', pos: 'technical' }, { year: 2024, dept: 'operations', pos: 'team-leader' }] },
    { id: 17, name: 'June Alonso', position: 'member', department: 'avionics', years: [2024], image: null, linkedin: '#', bio: 'Miembro de aviónica. Diseño de PCBs de telemetría.', history: [{ year: 2024, dept: 'avionics', pos: 'member' }] },
    { id: 18, name: 'Gorka Peña', position: 'member', department: 'structures', years: [2024], image: null, linkedin: '#', bio: 'Miembro de estructuras. Fabricación de fuselajes en fibra de vidrio.', history: [{ year: 2024, dept: 'structures', pos: 'member' }] },
    { id: 19, name: 'Irati López', position: 'member', department: 'recovery', years: [2024], image: null, linkedin: '#', bio: 'Miembro de recuperación. Paracaídas y sistemas de frenado.', history: [{ year: 2024, dept: 'recovery', pos: 'member' }] },

    // — 2023 —
    { id: 20, name: 'Xabier Uriarte', position: 'team-leader', department: 'operations', years: [2023], image: null, linkedin: '#', bio: 'Fundador y primer Team Leader de BiSKY Team.', history: [{ year: 2023, dept: 'operations', pos: 'team-leader' }] },
    { id: 21, name: 'Miren Olaizola', position: 'chief', department: 'propulsion', years: [2023], image: null, linkedin: '#', bio: 'Chief de propulsión fundadora. Diseño del primer motor Sua.', history: [{ year: 2023, dept: 'propulsion', pos: 'chief' }] },
    { id: 22, name: 'Iñigo Aranburu', position: 'member', department: 'structures', years: [2023], image: null, linkedin: '#', bio: 'Miembro fundador de estructuras. Diseño estructural del Artizarra I.', history: [{ year: 2023, dept: 'structures', pos: 'member' }] },
    { id: 23, name: 'Laia Bengoetxea', position: 'member', department: 'avionics', years: [2023], image: null, linkedin: '#', bio: 'Miembro fundador de aviónica. Primera computadora de vuelo del equipo.', history: [{ year: 2023, dept: 'avionics', pos: 'member' }] }
  ],

  projects: {
    rockets: [
      {
        id: 'artizarra-1', name: 'Artizarra I', year: 2023, category: 'rockets',
        status: 'Completado', tagline: 'Primer cohete de sondeo del equipo',
        description: 'Artizarra I fue el primer cohete de sondeo diseñado y construido por BiSKY Team. Un hito fundacional que demostró la capacidad del equipo para ejecutar un proyecto aeroespacial universitario completo, desde el diseño hasta el lanzamiento.',
        specs: { height: '1.8 m', diameter: '98 mm', mass: '6.2 kg', motor: 'Sua MK-I', apogee: '1,200 m', impulse: 'L-class' },
        image: null
      },
      {
        id: 'artizarra-2', name: 'Artizarra II', year: 2024, category: 'rockets',
        status: 'Completado', tagline: 'Iteración mejorada con aviónica integrada',
        description: 'Evolución directa del Artizarra I. Incorpora un sistema de aviónica completo con telemetría en tiempo real, estructura optimizada en fibra de carbono y un sistema de recuperación de doble evento.',
        specs: { height: '2.1 m', diameter: '98 mm', mass: '7.8 kg', motor: 'Sua MK-II', apogee: '2,400 m', impulse: 'M-class' },
        image: null
      },
      {
        id: 'sugaar', name: 'Sugaar', year: 2025, category: 'rockets',
        status: 'En desarrollo', tagline: 'Cohete de alta potencia para competición',
        description: 'Sugaar representa el salto técnico más ambicioso de BiSKY Team. Diseñado para competiciones internacionales de cohetería, incorpora un motor de propelente sólido a medida, estructura en fibra de carbono, aviónica avanzada con doble redundancia y un sistema de payload modular.',
        specs: { height: '2.8 m', diameter: '127 mm', mass: '14.5 kg', motor: 'Sua MK-III', apogee: '4,500 m (est.)', impulse: 'N-class' },
        image: null
      }
    ],
    motors: [
      {
        id: 'sua-mk1', name: 'Sua MK-I', year: 2023, category: 'motors',
        status: 'Completado', tagline: 'Primer motor de propelente sólido',
        description: 'Motor de propelente sólido L-class diseñado integramente por el departamento de propulsión. Utiliza una formulación KNSB optimizada para el perfil de empuje requerido por el Artizarra I.',
        specs: { classification: 'L-class', propellant: 'KNSB', totalImpulse: '2,560 Ns', burnTime: '3.2 s', avgThrust: '800 N' },
        image: null
      },
      {
        id: 'sua-mk2', name: 'Sua MK-II', year: 2024, category: 'motors',
        status: 'Completado', tagline: 'Motor M-class con carcasa mejorada',
        description: 'Segunda iteración del motor Sua. Incorpora una carcasa de aluminio 6061 mecanizada con tolerancias de ±0.05 mm, junta tórica de sellado mejorada y tobera con perfil de Laval optimizado por CFD.',
        specs: { classification: 'M-class', propellant: 'KNSB', totalImpulse: '5,120 Ns', burnTime: '4.1 s', avgThrust: '1,250 N' },
        image: null
      },
      {
        id: 'sua-mk3', name: 'Sua MK-III', year: 2025, category: 'motors',
        status: 'En desarrollo', tagline: 'Motor N-class de alto rendimiento',
        description: 'El motor más potente desarrollado por BiSKY. Diseñado específicamente para el cohete Sugaar, con propelente APCP y simulaciones extensivas de rendimiento térmico-estructural.',
        specs: { classification: 'N-class', propellant: 'APCP', totalImpulse: '10,240 Ns (est.)', burnTime: '5.8 s (est.)', avgThrust: '1,766 N (est.)' },
        image: null
      }
    ],
    launchRails: [
      {
        id: 'abiarazi-1', name: 'Abiarazi I', year: 2023, category: 'launch-rails',
        status: 'Completado', tagline: 'Rampa de lanzamiento modular',
        description: 'Primera rampa de lanzamiento diseñada por el equipo. Estructura de aluminio modular con rail de guiado de 3 metros, sistema de regulación angular de 0° a 15° y placa base con anclajes de estabilización.',
        specs: { length: '3 m', maxAngle: '15°', material: 'Aluminio 6061', maxRocketMass: '15 kg', guidingSystem: 'V-rail 1515' },
        image: null
      }
    ],
    auxiliary: [
      {
        id: 'ground-station', name: 'Ground Station v1', year: 2024, category: 'auxiliary',
        status: 'Completado', tagline: 'Sistema de telemetría en tierra',
        description: 'Estación de tierra para recepción y visualización de telemetría en tiempo real. Incluye receptor RF a 433 MHz, procesamiento de datos e interfaz gráfica con representación 3D de la trayectoria.',
        specs: { frequency: '433 MHz', range: '5 km', dataRate: '19.2 kbps', interface: 'Custom GUI', protocol: 'LoRa' },
        image: null
      },
      {
        id: 'payload-bay', name: 'Payload Bay System', year: 2025, category: 'auxiliary',
        status: 'En desarrollo', tagline: 'Sistema modular de cargas útiles',
        description: 'Bahía de carga útil universal diseñada para el cohete Sugaar. Permite integrar diferentes payloads experimentales con un sistema de interfaces estandarizado.',
        specs: { diameter: '110 mm', length: '200 mm', maxPayload: '500 g', interface: 'Estándar CubeSat-adaptado' },
        image: null
      }
    ]
  },

  sponsors: {
    tiers: [
      { id: 'cosmos', name: 'Cosmos', order: 1 },
      { id: 'galaxy', name: 'Galaxy', order: 2 },
      { id: 'nebula', name: 'Nebula', order: 3 },
      { id: 'star', name: 'Star', order: 4 },
      { id: 'satellite', name: 'Satellite', order: 5 },
      { id: 'earth', name: 'Earth', order: 6 },
      { id: 'software', name: 'Software', order: 7 }
    ],
    list: [
      { id: 1, name: 'UPV/EHU', tier: 'cosmos', website: '#', description: 'Universidad del País Vasco. Principal sponsor institucional del equipo.' },
      { id: 2, name: 'Gobierno Vasco', tier: 'cosmos', website: '#', description: 'Apoyo institucional del Gobierno Vasco al programa de cohetería universitaria.' },
      { id: 3, name: 'ITP Aero', tier: 'galaxy', website: '#', description: 'Empresa líder en fabricación de motores aeronáuticos y componentes de turbinas.' },
      { id: 4, name: 'Sener Aeroespacial', tier: 'galaxy', website: '#', description: 'Grupo de ingeniería y tecnología con división aeroespacial.' },
      { id: 5, name: 'Fagor Ederlan', tier: 'nebula', website: '#', description: 'Fabricante de componentes de alta precisión y fundición avanzada.' },
      { id: 6, name: 'Idom', tier: 'nebula', website: '#', description: 'Consultoría profesional de ingeniería, arquitectura y consultoría.' },
      { id: 7, name: 'Tecnalia', tier: 'star', website: '#', description: 'Centro de investigación y desarrollo tecnológico.' },
      { id: 8, name: 'CIC energiGUNE', tier: 'star', website: '#', description: 'Centro de investigación en almacenamiento de energía.' },
      { id: 9, name: 'Erreka', tier: 'satellite', website: '#', description: 'Empresa de automatización y soluciones industriales.' },
      { id: 10, name: 'Ulma', tier: 'satellite', website: '#', description: 'Grupo industrial cooperativo con soluciones para construcción e industria.' },
      { id: 11, name: 'Mondragón Unibertsitatea', tier: 'earth', website: '#', description: 'Colaboración académica inter-universitaria.' },
      { id: 12, name: 'Kutxabank', tier: 'earth', website: '#', description: 'Entidad financiera con programa de apoyo a la innovación universitaria.' },
      { id: 13, name: 'ANSYS', tier: 'software', website: '#', description: 'Suite de simulación FEA, CFD y multifísica.' },
      { id: 14, name: 'SolidWorks', tier: 'software', website: '#', description: 'Software de diseño CAD 3D parametrizado.' },
      { id: 15, name: 'Altium', tier: 'software', website: '#', description: 'Herramienta profesional de diseño de PCBs.' },
      { id: 16, name: 'MATLAB', tier: 'software', website: '#', description: 'Entorno de cálculo numérico y simulación.' }
    ]
  },

  getAllProjects() {
    return [
      ...this.projects.rockets,
      ...this.projects.motors,
      ...this.projects.launchRails,
      ...this.projects.auxiliary
    ];
  },

  getProjectById(id) {
    return this.getAllProjects().find(p => p.id === id);
  },

  getMemberById(id) {
    return this.members.find(m => m.id === parseInt(id));
  },

  getMembersByYear(year) {
    return this.members.filter(m => m.years.includes(parseInt(year)));
  },

  getMembersByDeptAndYear(dept, year) {
    year = parseInt(year);
    return this.members.filter(m => {
      const record = m.history.find(h => h.year === year);
      return record && record.dept === dept;
    });
  },

  getMemberYearRecord(memberId, year) {
    const member = this.getMemberById(memberId);
    if (!member) return null;
    return member.history.find(h => h.year === parseInt(year));
  },

  getSponsorsByTier(tierId) {
    return this.sponsors.list.filter(s => s.tier === tierId);
  },

  getPositionName(posId) {
    const pos = this.positions.find(p => p.id === posId);
    return pos ? pos.name : posId;
  },

  getDepartmentName(deptId) {
    const dept = this.departments.find(d => d.id === deptId);
    return dept ? dept.name : deptId;
  },

  getCategoryLabel(cat) {
    const labels = {
      'rockets': 'Cohetes',
      'motors': 'Motores',
      'launch-rails': 'Launch Rails',
      'auxiliary': 'Proyectos Auxiliares'
    };
    return labels[cat] || cat;
  },

  getStatusClass(status) {
    if (status === 'Completado') return 'status--completed';
    if (status === 'En desarrollo') return 'status--active';
    return 'status--planned';
  }
};
