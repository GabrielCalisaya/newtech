# New Tech — Sitio corporativo

Sitio web corporativo bilingüe de **New Tech**, orientado a presentar servicios de desarrollo web, soluciones digitales y proyectos para clientes.

🌐 [newtech.net.ar](https://newtech.net.ar)

## Tecnologías

- HTML5 semántico
- CSS3 con variables, Flexbox y Grid
- JavaScript Vanilla
- Font Awesome
- Formspree para el formulario de contacto

## Características

- Versión en español e inglés.
- Tema claro/oscuro según preferencia del usuario.
- Portafolio generado desde datos del cliente web.
- Metadatos SEO, Open Graph y datos estructurados.
- Navegación accesible y diseño responsive.

## Estructura

```text
├── index.html          # Página principal en español
├── en/index.html       # Versión en inglés
├── css/site-v2.css     # Estilos de la interfaz actual
├── js/site-v2.js       # Interacciones y comportamiento del sitio
├── img/                # Imágenes y recursos visuales
├── privacidad.html     # Política de privacidad
├── robots.txt
└── sitemap.xml
```

## Desarrollo local

Es un sitio estático. Abrí `index.html` en un navegador o utilizá un servidor estático local para comprobar ambas versiones.

## Muestras interactivas para eventos

La sección `/experiencias/` es una aplicación React, Vite, TypeScript y Tailwind aislada de la web corporativa. Incluye ruleta, trivia y un objeto 3D de New Tech. El objeto se genera desde `img/newtech-logo.png` con `python scripts/build-logo-model.py`; el archivo GLB resultante ya está incluido en el proyecto.

```powershell
npm ci
npm test
npm run typecheck
npm run build
npm run preview
```

La vista previa local queda en `http://127.0.0.1:4173/experiencias/`. El build copia la web corporativa y la demo a `dist/`, junto con las reglas de rutas directas de Netlify (`_redirects`). `netlify.toml` configura la compilación y el directorio de publicación. Los formularios son solo una simulación: validan en el navegador y muestran una confirmación, sin enviar ni guardar datos.
