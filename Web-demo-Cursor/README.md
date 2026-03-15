# BiSKY Team — Web Demo

Demo visual del sitio web del equipo universitario de cohetería BiSKY Team. Solo frontend: HTML5, CSS y JavaScript, sin frameworks ni backend.

## Estructura del proyecto

```
Web-demo-Cursor/
├── index.html              # Home
├── css/
│   ├── main.css            # Entrada principal (importa el resto)
│   ├── variables.css       # Tokens de diseño
│   ├── reset.css
│   ├── typography.css
│   ├── layout.css
│   ├── navbar.css
│   ├── hero.css
│   ├── sections.css
│   └── pages.css
├── js/
│   ├── navbar.js           # Nav: ocultar al bajar, mostrar al subir, dropdowns
│   ├── hero.js             # Cursor glow y parallax del cohete
│   ├── scroll-reveal.js     # Elementos que se revelan al hacer scroll
│   ├── data-members.js      # Datos placeholder miembros
│   ├── data-projects.js     # Datos placeholder proyectos
│   └── data-sponsors.js     # Datos placeholder sponsors
├── pages/
│   ├── miembros.html       # Hub Miembros
│   ├── miembros-2025.html
│   ├── miembros-2024.html
│   ├── miembros-2023.html
│   ├── miembro.html        # Ficha individual (?id=)
│   ├── proyectos.html      # Hub Proyectos (con #cohetes, #motores, etc.)
│   ├── proyecto.html       # Ficha individual (?id=)
│   ├── sponsors.html
│   └── sponsor.html        # Ficha ligera (?id=)
└── assets/
    └── images/
        └── rocket-hero.svg # Cohete hero
```

## Cómo ejecutar

Abrir `index.html` en el navegador (doble clic o desde un servidor local). Para evitar problemas de CORS con scripts, es recomendable usar un servidor local:

```bash
# Ejemplo con Python
python -m http.server 8080

# O con Node (npx)
npx serve .
```

Luego visitar `http://localhost:8080` (o el puerto que uses).

## Contenido y datos

- El contenido es **placeholder**: coherente y sustituible. Los datos están en `js/data-members.js`, `js/data-projects.js` y `js/data-sponsors.js`.
- Las fichas de miembro y proyecto usan el parámetro `?id=` en la URL; el script rellena la página desde el objeto correspondiente.

## Navegación

- **Navbar**: se oculta al bajar con scroll y reaparece al subir. Desplegables al pasar el ratón en Miembros y Proyectos.
- **Home**: hero con cohete SVG, fondo con grid y glow que sigue al cursor; secciones de visión general, proyectos destacados y acceso por año.
- **Miembros**: hub con años; cada año tiene su página con miembros por departamento y puesto; cada miembro enlaza a `miembro.html?id=X`.
- **Proyectos**: una sola página con secciones Cohetes, Motores, Launch Rails, Proyectos auxiliares; cada proyecto enlaza a `proyecto.html?id=X`.
- **Sponsors**: categorías Cosmos, Galaxy, Nebula, Star, Satellite, Earth, Software; cada sponsor enlaza a `sponsor.html?id=X`.

## Escalado posterior

- Sustituir datos en los `data-*.js` o conectar a una API.
- Añadir imágenes reales en `assets/images/` y referenciarlas en los datos.
- Ajustar breakpoints y estilos en `css/` para prioridad móvil/tablet cuando se requiera.
