# Ver Modelos 3D en Google Chrome

Este proyecto usa HTML para visualizar modelos 3D (`.gltf` / `.glb`) en navegador.

## 1) Arrancar servidor local

Abre PowerShell en la carpeta raíz del proyecto (`ByM`) y ejecuta:

```powershell
cd "C:\Users\demag\OneDrive - UPV EHU\Informatica\VS Code\BISKY\ByM"
python -m http.server 8000
```

## 2) Abrir en Google Chrome

Abre Chrome y entra a:

- `http://localhost:8000/ROCKETS/charlie.html`
- `http://localhost:8000/ROCKETS/charlie_grid.html`
- `http://localhost:8000/ROCKETS/alpha.html`
- `http://localhost:8000/ROCKETS/alpha_grid.html`
- `http://localhost:8000/ROCKETS/atlas.html`
- `http://localhost:8000/ROCKETS/atlas_grid.html`
- `http://localhost:8000/ROCKETS/bravo.html`
- `http://localhost:8000/ROCKETS/bravo_grid.html`
- `http://localhost:8000/ROCKETS/atlas_blend_view.html` (usa `atlas.glb` convertido desde `.blend`)

## 3) Controles

- Arrastrar: rotar cámara
- Rueda del ratón: zoom
- Botón derecho (si aplica): mover vista

## 4) Si no se ve el modelo

- Haz recarga fuerte: `Ctrl + F5`
- Comprueba que el servidor sigue activo en PowerShell
- No abras los HTML con `file://`; usa siempre `http://localhost:8000/...`
- Verifica que existan los archivos del modelo (`.gltf/.glb`, `.bin`, texturas `.png`)

