
# New Tech — Sitio Web Corporativo 🚀

¡Bienvenido al repositorio oficial de **New Tech**! Esta es la landing page principal de nuestra startup enfocada en el desarrollo web de alta calidad, herramientas digitales a medida y consultoría cloud[cite: 2].

El sitio está diseñado desde cero con un enfoque de alto rendimiento, optimización SEO, componentes interactivos en JavaScript Vanilla y soporte nativo para temas oscuro y claro[cite: 2, 3].

🌐 **Sitio en vivo:** [newtechjujuy.com](https://newtechjujuy.com/)  
🚀 **Despliegue continuo:** Netlify

---

## ✨ Características del Proyecto

- **Efectos Visuales Avanzados:** Fondo animado estilo "Aurora background"[cite: 2] e interactividad "Glassmorphism" con un efecto dinámico de iluminación (*glow*) al mover el puntero sobre las tarjetas de servicios[cite: 3].
- **Modo Oscuro/Claro Nativo:** Implementación ultra rápida mediante un script bloqueante en el `<head>`[cite: 2] que lee el `localStorage`[cite: 2, 3] o las preferencias del sistema (`prefers-color-scheme`)[cite: 2], previniendo el parpadeo blanco (FOUC)[cite: 2].
- **Arquitectura de Portafolio Dinámica:** El carrusel de logos[cite: 2] y los detalles de los proyectos se generan dinámicamente mediante un array de objetos en JavaScript[cite: 3], facilitando la escalabilidad del portafolio[cite: 3].
- **Optimización SEO y Accesibilidad:** Uso de etiquetas Open Graph[cite: 2], Twitter Cards[cite: 2], marcado estructurado JSON-LD (`ProfessionalService`) para Google[cite: 2] y compatibilidad con lectores de pantalla (`aria-attributes`, `skip-links`)[cite: 2, 3].
- **Formulario Inteligente:** Validación en tiempo real en el frontend[cite: 3] conectada directamente a un endpoint externo para recepción de leads[cite: 3].

---

## 🛠️ Tecnologías y Recursos Utilizados

- **HTML5:** Marcado semántico, limpio y accesible[cite: 2].
- **CSS3 Puro:** Sistema de variables de entorno para temas[cite: 2], Layouts con Flexbox y CSS Grid[cite: 2].
- **JavaScript Vanilla:** Lógica de negocio, observadores de intersección (`IntersectionObserver`)[cite: 3] y control del DOM[cite: 3].
- **FontAwesome v6.4.0:** Biblioteca de iconos vectoriales[cite: 2].
- **Formspree:** Backend as a Service (BaaS) para la gestión y recepción de correos desde el formulario de contacto[cite: 3].

---

## 📁 Estructura del Repositorio

```text
├── css/
│   ├── fonts.css       # Configuración y carga de tipografías (Sora, Outfit, JetBrains Mono)
│   └── styles.css      # Estilos generales, animaciones fade-in-up y componentes glass
├── js/
│   └── main.js         # Lógica central: Temas, Menú Mobile, Modales, Carrusel y Formulario
├── img/
│   ├── logos/          # Isologos de clientes del portafolio
│   └── logo.png        # Favicon e imagotipo base
├── index.html          # Documento principal estructurado de la landing
└── README.md           # Documentación técnica del proyecto
