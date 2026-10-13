# Sorteo de landing page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Publicar una página responsive con las bases del sorteo de una página web personalizada y preparar el texto de Instagram alineado con esas condiciones.

**Architecture:** Reutilizar la plantilla legal estática ya existente para mantener navegación, estilos, consentimiento analítico y pie de página. Incorporar la nueva ruta limpia `/bases-sorteo/` al ensamblado de producción y cubrir su contenido contractual con una prueba dedicada, sin modificar las pruebas actualmente alteradas por el usuario.

**Tech Stack:** HTML estático, CSS compartido, JavaScript compartido, Node.js test runner, Vite.

---

### Task 1: Contrato verificable de las bases

**Files:**

- Create: `tests/sorteo-bases.test.mjs`

1. Escribir una prueba que exija la ruta, fechas, territorio, mayoría de edad, gratuidad, participación mediante comentario, selección aleatoria, premio, exclusiones, suplentes, plazo de respuesta, tratamiento de datos y desvinculación de Instagram.
2. Ejecutar la prueba y comprobar que falla porque la página todavía no existe.

### Task 2: Página pública de bases

**Files:**

- Create: `bases-sorteo/index.html`

1. Adaptar la estructura semántica y responsive de `privacidad.html`.
2. Incorporar las condiciones completas del sorteo en lenguaje claro.
3. Identificar al organizador con los datos reales provistos por el usuario.
4. Enlazar la política de privacidad y conservar los controles de analítica existentes.

### Task 3: Integración con el sitio

**Files:**

- Modify: `scripts/build-site.mjs`
- Modify: `index.html`

1. Copiar `bases-sorteo/` al directorio de producción.
2. Agregar un acceso discreto desde el pie de página en español.
3. Mantener la página fuera del sitemap mediante `noindex, follow`, porque las bases corresponden a una promoción temporal.

### Task 4: Verificación

**Files:**

- Test: `tests/sorteo-bases.test.mjs`

1. Ejecutar la prueba nueva.
2. Ejecutar la suite completa sin modificar las pruebas preexistentes del usuario.
3. Ejecutar el ensamblado de producción.
4. Servir `dist/` localmente y revisar en navegador la ruta en escritorio y móvil.
5. Confirmar que no queden marcadores, datos inventados ni enlaces rotos.

### Decisión final aprobada

- CUIT del organizador: `20-40927991-1`.
- Domicilio comercial: `Buenos Aires 1330, San Salvador de Jujuy, Jujuy, República Argentina`.
- El etiquetado de otro emprendimiento se comunicará como sugerencia opcional y no modificará las probabilidades del sorteo.
