# Auditoría — New Tech (newtech.net.ar)

**Fecha:** 10 de agosto de 2026
**Alcance:** landing única (`index.html`, `css/styles.css`, `css/fonts.css`, `js/main.js`)
**Estado:** diagnóstico. No se modificó nada.

---

## 0. Alcance y método

**Auditoría en dos pasadas:** primero análisis de código, después inspección visual real en Chrome sobre el sitio en producción. Todo lo que sigue está verificado salvo donde se indique lo contrario.

**Verificado directamente:**

- Código fuente completo, línea por línea.
- HTML servido en producción (`https://www.newtech.net.ar/`).
- **Recorrido visual real en Chrome**, tema claro y oscuro, con capturas en cada sección.
- **Interacciones probadas:** navegación por anclas, hover sobre logos, apertura del modal de caso, acordeón del FAQ, validación del formulario, alternador de tema.
- **Layout medido programáticamente** a 1440, 1020, 896, 764, 596, 476 y 356 px.
- Pesos de transferencia reales y estado de bloqueo de render de cada recurso.
- Ratios de contraste calculados con la fórmula WCAG.

**No verificado:**

- **No envié el formulario de contacto** (habría generado un lead falso). El bug de la línea 4.1 lo confirmé reproduciendo la secuencia exacta de `main.js` en la consola y leyendo el estilo computado resultante.
- **LCP, CLS y TBT sin medir** con herramienta dedicada. Uso evidencia observada, no métricas inventadas.
- **No probé en dispositivos físicos.** El análisis mobile se hizo con el sitio cargado en un contenedor de 390 × 844 px y medido por DOM. Es fiable para layout y tamaños táctiles, no para rendimiento real en gama baja.

### Correcciones a la primera pasada

Por honestidad, tres hipótesis de la versión anterior de este informe **resultaron falsas** al medirlas:

| Hipótesis | Resultado |
| --- | --- |
| Desborde de la navbar entre 769 y 1100 px | ❌ **Falsa.** A 896 px quedan 79 px libres. No hay colisión en ningún ancho. |
| Desborde horizontal en mobile | ❌ **Falsa.** `scrollWidth − innerWidth` es negativo en los siete anchos probados. No hay scroll lateral. |
| Degradados del carrusel tapando el 80% en mobile | ❌ **Falsa.** Molestan, pero no al nivel que estimé. |

En cambio, la inspección visual reveló **tres problemas graves que el código no dejaba ver.** Están en §A.

---

## ✅ Estado — Fase 1 implementada (10/08/2026)

Cambios aplicados en `index.html`, `css/styles.css` y `js/main.js`. **Pendiente de desplegar.**

| Arreglo | Archivo | Verificado |
| --- | --- | --- |
| `scroll-padding-top: 96px` — anclas | `styles.css` | ✅ Título a 38 px por debajo de la navbar (antes: tapado) |
| Bug del error del formulario | `main.js` | ✅ Se limpia con clases, sin `display` inline |
| Dominio en canonical, OG, Twitter y JSON-LD | `index.html` | ✅ 0 referencias a `newtechjujuy.com` |
| `og:image` → logo propio (era el de un cliente) | `index.html` | ✅ |
| 6 `href` reales de `wa.me` | `index.html` | ✅ 0 `href="#"` funcionales restantes |
| Tooltip recortado eliminado + texto del hint | `styles.css`, `main.js`, `index.html` | ✅ 0 referencias |
| Título visible en el modal de caso | `index.html`, `styles.css` | ✅ "SSV — Seguridad Vial" visible |
| Contraste del botón primario | `styles.css` | ✅ **4,87:1** (antes 3,13) — pasa AA |
| Naranja como texto en tema claro | `styles.css` | ✅ `--primary-text: #a83800` → 6,07:1 |
| FAB oculto bajo 768 px | `styles.css` | ✅ Libera 15% del viewport, sin duplicar WhatsApp |
| Áreas táctiles a 44 px | `styles.css` | ✅ CTAs de 23 → 44 px; hamburguesa a 44 × 44 |
| Separación de logos en mobile | `styles.css` | ✅ 96 → 24 px |

**Decisiones de diseño tomadas:**

- Se introdujeron dos tokens nuevos en vez de cambiar `--primary`: `--primary-btn` (`#c94400`, fondo del botón) y `--primary-text` (`#ff5a00` en oscuro, `#a83800` en claro). **El naranja de marca `#ff5a00` se conserva** en aurora, bordes, glows, barra de progreso y focus. Solo cambia donde había que cumplir contraste.
- **El tooltip del carrusel se eliminó** en vez de repararse: su contenido está duplicado en el modal, y arreglarlo exigía hackear el `overflow: hidden` que el carrusel infinito necesita. Se cambió el texto de instrucción a "Hacé clic en cualquier logo para ver el caso."
- Backups en `/tmp/index.bak`, `/tmp/styles.bak`, `/tmp/main.bak` (sesión actual).

**Sin tocar:** paleta, tipografías, layout, arquitectura, textos, stack.

---

## ✅ Estado — Fases 2, 3 y 4 (10/08/2026)

### Fase 4 — Optimización

| Cambio | Antes | Ahora |
| --- | --- | --- |
| `fonts.css` | 207 KB base64 bloqueante | **1,9 KB** apuntando a `/fonts` |
| `font-display` | `block` (texto invisible) | **`swap`** |
| Preload de fuentes | ninguno | 3 del primer render |
| Logos | 565 KB PNG | **58 KB WebP** (−90%) |
| Font Awesome | bloqueante | no bloqueante |
| Hero | esperaba al `IntersectionObserver` | visible de entrada |
| Bloque `!important` del `<head>` | anulaba los tokens | eliminado |
| Carrusel | animaba siempre | pausado fuera de pantalla |
| Escalonado del fade | 0,08 s | 0,04 s |

Accesibilidad: `<main>`, skip-link corregido, `aria-controls` + `id` en las 8 preguntas del FAQ, `visibility: hidden` en respuestas colapsadas, trampa de foco en ambos modales con restauración al cerrar, contador de bloqueo de scroll compartido, listener acumulado corregido, `font-family` heredada en controles.

SEO: `robots.txt`, `sitemap.xml`, `id` en la sección de proceso.

### Fase 2 — Mejora profesional (parcial)

- **Grilla de casos** reemplazando al carrusel como sección principal. Los 7 proyectos con nombre visible, trabajo, resultado y enlace. El carrusel baja a banda secundaria.
- **Séptimo caso: RRHH Working** (`rrhhworking.com.ar`).
- **Formulario:** teléfono opcional, errores por campo, `aria-invalid`, foco al primer campo con error, chip de servicio preseleccionado.
- **Stats del hero:** los dos vacíos reemplazados por datos verificables.

### Fase 3 — Diferenciación (parcial)

- **Terminal del hero** que se escribe sola al entrar en pantalla, sin salto de layout y respetando `prefers-reduced-motion`.
- **WhatsApp contextual** según el servicio que el usuario venía mirando.

### Lo que NO se hizo, y por qué

| Ítem | Motivo |
| --- | --- |
| Testimonios | Sección escrita y con estilos, **comentada**. No invento citas de clientes reales. |
| Rangos de precio | No conozco tus precios. |
| Foto de Gabriel | No la tengo. |
| Disponibilidad real | Requiere que definas cupos y fechas. |
| Calculadora de presupuesto | Depende de los rangos de precio. |
| Font Awesome → SVG inline | No pude obtener los paths reales; dibujarlos a mano daría iconos distintos. |
| Capturas de proyectos | Son sitios de clientes; la decisión es tuya. |

Detalle y cómo destrabarlos: **`PENDIENTES.md`**.

---

## A. Hallazgos que solo aparecieron al ver la página

Los tres son bugs reales, en producción, invisibles leyendo el código.

### A.1 🔴 Todos los enlaces del menú dejan el título de la sección tapado por la navbar

**Observado y medido.** Hice clic en "Proyectos" en el menú. Resultado medido en ese instante:

```
scroll-padding-top del <html>:  auto      ← no hay
scroll-margin-top de la sección: 0px      ← no hay
alto de la navbar (fixed):       77.8px
posición del título:             top: 49px
¿tapado por la navbar?:          true
```

El navegador lleva la sección al borde superior de la ventana. Pero la navbar está fija encima y mide 78 px. **El título "Proyectos que confían en New Tech" queda completamente oculto detrás del header.**

Lo que ve el usuario tras hacer clic en "Proyectos": una línea suelta que dice *"En desktop, pasá el mouse sobre un logo"* y una tira de logos grises. **Sin título. Sin contexto.** Parece un error de la página.

Esto **afecta a todos los enlaces internos del sitio** — los 5 del menú de escritorio, los 5 del menú mobile, los 5 del footer, los 5 CTAs de servicio, los CTAs del hero y los de la barra mobile. Confirmado también a 390 px (`tituloTop: 19px` contra `navbarBottom: 78px`).

**Solución — una línea:**

```css
html { scroll-padding-top: 90px; }
```

Es la corrección con mejor relación impacto/esfuerzo de todo el informe.

---

### A.2 🔴 El tooltip del carrusel está recortado al 100% — nunca se ve

La página instruye: *"En desktop, pasá el mouse sobre un logo."* Pasé el mouse. **No aparece nada.**

Medido sobre el elemento:

```
overflow del .carousel-container:  hidden
top del contenedor:                139px
top del tooltip:                   16px      ← 123px por encima del contenedor
alto del tooltip:                  119px
píxeles recortados:                123 de 119  →  100%
```

`.carousel-tooltip` se posiciona con `bottom: calc(100% + 10px)`, es decir, **arriba** del logo. Pero `.carousel-container` tiene `overflow: hidden` (necesario para el carrusel infinito). El tooltip queda íntegramente fuera del área visible y se recorta entero.

**Consecuencia:** una funcionalidad completa —la descripción de cada proyecto al pasar el mouse— **no existe para el usuario**. Y la página le pide explícitamente que la use. El visitante pasa el mouse, no ve nada, y concluye que el sitio está roto.

**Solución:** sacar el tooltip del contenedor con `overflow: hidden` (posicionarlo respecto de `.trusted-by`), o mostrarlo por debajo del logo, donde sí hay espacio. Alternativa más simple, dado §3.1: eliminar el tooltip y el cartel de instrucciones, y reemplazar el carrusel por una grilla de casos.

---

### A.3 🟠 El primer render es una pantalla vacía

**Observado.** Captura tomada apenas cargó la página, antes del segundo de espera:

> Navbar visible con el logo y los enlaces. **Todo el hero en blanco** — sin título, sin subtítulo, sin botones, sin la tarjeta de código. Solo se distinguen las manchas de la aurora.

A los ~2 segundos aparece todo de golpe. Confirmado también a 390 px.

Son dos causas sumadas, ambas medidas:

| Recurso | Estado de bloqueo de render | Tamaño |
| --- | --- | --- |
| `css/fonts.css` | **`blocking`** | **207 KB** |
| Font Awesome (cdnjs) | **`blocking`** | tercero |
| `css/styles.css` | blocking | 37 KB |

Más `font-display: block` en las 10 fuentes, que mantiene el texto **invisible** hasta que la fuente termina de decodificar (en vez de mostrarlo con la tipografía del sistema y cambiarla después).

Y encima, `.fade-in-up` arranca en `opacity: 0` esperando al `IntersectionObserver`. Así que aunque las fuentes llegaran rápido, el contenido igual empieza invisible.

**Nota sobre compresión:** Vercel sirve el CSS con Brotli, lo cual está bien. Pero el base64 de `fonts.css` son `.woff2` —que ya están comprimidos— re-codificados como texto. Brotli casi no puede comprimirlos de nuevo. **Los 207 KB viajan prácticamente enteros.**

**Consecuencia:** en 4G de Jujuy, tu tráfico real ve una pantalla en blanco durante segundos. Es la primera impresión, y es la peor posible.

**Solución:** §4.4 y §4.5. Además, sacar `.fade-in-up` del contenido del hero — lo que está sobre el pliegue no debería depender de un observador de scroll para hacerse visible.

---

### A.4 Otros hallazgos visuales menores

- **El carrusel es casi invisible en tema claro.** `grayscale(100%) brightness(0.5)` a `opacity: 0.55` sobre un fondo `#f6f7fb` deja los logos como manchas apenas perceptibles. En tema oscuro se ven algo mejor, pero siguen muy tenues.
- **Los logos tienen proporciones dispares.** BITE se ve chiquito y ancho; innoa, grande; SSV, pequeño. Al normalizarlos solo por altura, el peso visual queda desparejo. Hace falta normalizar por área óptica.
- **El `.contact-card` tiene una columna izquierda medio vacía.** Tras el botón de WhatsApp y el teléfono quedan ~350 px de espacio muerto junto al formulario. Es el mejor lugar disponible para un testimonio o señales de confianza (§8.2, §8.4).
- **`.highlight` parece un enlace y no lo es.** El texto naranja dentro de los párrafos ("Google y conversiones", "vender 24/7") es visualmente idéntico a los CTAs `.service-cta` de la misma tarjeta, que sí son enlaces. Confunde en la misma card.
- **El icono del alternador de tema muestra el estado, no la acción**, pero el `aria-label` describe la acción ("Activar modo claro"). En oscuro se ve una luna y la etiqueta dice "activar claro". Ambigüedad menor pero real.
- **El error del formulario aparece muy abajo**, después del botón, del texto de privacidad y de la nota de 24 h. Y el foco no se mueve al primer campo con error: cuando lo probé, el campo Nombre estaba fuera de pantalla mientras el mensaje decía "completá los campos requeridos".
- **`<section class="process">` no tiene `id`**, así que al scrollear por "Cómo trabajamos" el menú sigue marcando "Nosotros" como activo.
- **El escalonado del `fade-in` es demasiado lento.** Con `transitionDelay` de hasta 0,56 s acumulados, al scrollear a velocidad normal las tarjetas 3 y 4 de "Proceso" todavía están invisibles cuando ya deberían leerse. Reducir el paso de 0,08 s a ~0,04 s.
- **Sin errores en consola.** Limpio.

---

## 1. Primera impresión (análisis del contenido y la estructura)

### ¿Se entiende qué ofrece la página?

**Sí, y rápido.** El H1 es concreto: "Escalá tu negocio con desarrollo web y herramientas a medida". El subtítulo enumera los cuatro servicios sin rodeos. Esto está bien resuelto y no lo tocaría.

### ¿La propuesta de valor es clara?

**Parcialmente.** Está claro *qué* hacés. No está claro *por qué vos y no otro*. Los tres stats del hero son el punto débil:

| Stat | Problema |
| --- | --- |
| `< 24 h` Respuesta a consultas | Es el único que dice algo verificable y concreto. Sirve. |
| `A medida` — Cada proyecto es único | No es un dato. Es una frase de relleno con formato de dato. |
| `100%` — Enfoque personalizado | Un "100%" que no mide nada. Suena a plantilla. |

Cuando ponés un número grande en un slot de estadística, el usuario espera evidencia. Dos de los tres no la dan, y eso rebaja la credibilidad del tercero, que sí es bueno.

**Recomendación:** reemplazar los dos flojos por datos reales que ya tenés en el portafolio: cantidad de proyectos entregados, años operando, cantidad de clientes con mantenimiento activo. Si no querés dar números, sacá los slots y dejá solo el de las 24 h.

### ¿El usuario sabe qué hacer primero?

**Sí.** "Pedir presupuesto" + WhatsApp en el hero, barra fija de CTA en mobile, FAB de WhatsApp, CTA por servicio, formulario al final. La densidad de CTAs es correcta.

**Pero hay un exceso en mobile:** conviven la barra inferior fija (`.mobile-cta-bar`, con Presupuesto + WhatsApp) **y** el FAB de WhatsApp elevado a `bottom: 5rem`. Son dos elementos flotantes simultáneos y **WhatsApp aparece duplicado en pantalla**. Ocupan verticalmente entre ~4,5 rem y ~9 rem de viewport permanente sobre un contenido que ya es largo.

### ¿Transmite profesionalismo?

El sistema visual es sólido: paleta coherente, tokens de tema bien organizados, tipografías de calidad (Sora / Outfit / JetBrains Mono), glassmorphism consistente. **El problema no es el diseño, es la evidencia.** Ver punto 9.

### ¿Hay algo que parezca amateur o incompleto?

Tres cosas concretas:

1. **El hint de interacción del carrusel:** "En desktop, pasá el mouse sobre un logo. Tocá o hacé clic para ver el detalle." Cuando una interfaz necesita explicar por escrito cómo se usa, la affordance falló. Un usuario no debería leer instrucciones para entender que un logo es clickeable.
2. **El nombre del proyecto está oculto en el modal.** En `index.html` línea 521: `<p id="case-modal-label" class="visually-hidden">`. El JS sí escribe el nombre del cliente ahí, pero el CSS lo esconde visualmente (`.visually-hidden`, línea 1560). Resultado: abrís el detalle de un caso y ves un logo y dos párrafos de texto **sin título**. Solo los lectores de pantalla saben de quién se trata.
3. **La sección se llama "Proyectos" pero es una tira de logos animada.** El usuario que hace clic en "Proyectos" en el menú espera un portafolio. Recibe un carrusel infinito. Expectativa rota.

### ¿Falta información importante?

Sí, y es lo que más frena la conversión. Ver punto 9.

---

## 2. Diseño visual

### Tipografía

**Bien:** tres familias con roles claros — Sora (display), Outfit (texto), JetBrains Mono (código). Escala fluida con `clamp()` en títulos, subtítulos y stats, lo que evita saltos bruscos entre breakpoints. Es una decisión correcta y bien ejecutada.

**Problema — bloque `<style>` inline en el `<head>` (líneas 63-77 de `index.html`):**

```css
html, body, p, span, a, li, input, select, textarea, button, label {
    font-family: 'Outfit', ... !important;
}
```

Se declaran las familias **dos veces**: una vez como variables CSS bien diseñadas (`--font-primary`, `--font-display`, `--font-mono`) y otra vez con `!important` sobre selectores de elemento en el HTML. El segundo bloque anula al primero.

Esto tiene tres consecuencias reales:

- El sistema de tokens queda decorativo — cambiar `--font-primary` ya no cambia nada.
- `pre, code, .card-body { font-family: JetBrains Mono !important }` aplica monoespaciada a **todo** `.card-body`. Si en el futuro metés texto normal en un `.card-body`, sale en monoespaciada y no vas a saber por qué.
- Los `!important` obligan a escalar la especificidad en cualquier corrección futura.

**Es un parche que quedó fijo.** Probablemente se agregó para forzar la carga de fuentes; hoy solo genera deuda.

### Colores

Paleta bien elegida: naranja `#ff5a00` como acción, índigo `#6366f1` como acento, superficies GitHub-dark. Tema claro implementado con tokens, sin duplicar reglas. **Esta parte está bien resuelta.**

**Pero el contraste falla en el elemento más importante de la página.** Ratios calculados:

| Combinación | Ratio | WCAG AA (4.5:1) | Dónde aparece |
| --- | --- | --- | --- |
| Blanco sobre `#ff5a00` | **3,13:1** | ❌ **Falla** | `.btn-primary` — "Pedir presupuesto", "Enviar mensaje", CTA del navbar, barra mobile |
| `#ff5a00` sobre `#f6f7fb` (tema claro) | **2,92:1** | ❌ **Falla** | `.highlight`, `.section-badge`, `.service-cta`, `.hero-eyebrow`, chevrons del FAQ |
| Blanco sobre `#25d366` | **1,98:1** | ❌ Falla (icono, mín. 3:1) | Icono del FAB de WhatsApp |
| `#8b949e` sobre `#0d1117` | 6,15:1 | ✅ Pasa | Texto secundario, tema oscuro |
| `#5b6573` sobre `#f6f7fb` | 5,52:1 | ✅ Pasa | Texto secundario, tema claro |
| `#0d1117` sobre `#ff5a00` | 6,05:1 | ✅ Pasa | *(alternativa propuesta para el botón)* |

El texto secundario está bien en ambos temas — buen trabajo. **El fallo está concentrado en el naranja de marca.** El botón primario, el elemento del que depende toda la conversión, no cumple AA. Y en tema claro el naranja como color de texto falla en todos lados.

Dos caminos:

- **Conservador:** texto oscuro (`#0d1117`) sobre el botón naranja → 6,05:1. Cero cambio de identidad, arreglo inmediato.
- **Correcto:** oscurecer el naranja a ~`#d94b00` para uso como texto/borde, y mantener `#ff5a00` solo como color de fondo/relleno. Dos tokens en vez de uno: `--primary` (fondo) y `--primary-text` (texto sobre fondos claros).

Recomiendo el segundo. Es más trabajo pero resuelve el tema claro de raíz.

### Espaciado y ritmo visual

Consistente: secciones a 100 px, reducidas a 70 px bajo 768 px. Cards con padding uniforme. `.container` a 1200 px.

**Observación (hipótesis, no verificada visualmente):** el `.hero` fuerza `min-height: 100dvh` con `padding-top: 160px`. En laptops de 13" con la barra de Chrome, el `dvh` puede empujar los stats del hero por debajo del pliegue. No lo confirmo sin render.

### Consistencia de componentes

**Buena en general** — `.glass-card` unifica cards de servicio, proceso, FAQ, historia y modales. Los tokens de tema están bien pensados.

**Excepción, y es visible:** el `.contact-card` es el único componente con `border: 1px solid rgba(255,90,0,0.2)` (naranja) y `--contact-gradient` propio. Todo el resto usa `--glass-border` neutro. Esto está bien si es intencional para destacar el bloque de conversión final. Si no lo fue, es una inconsistencia. **No lo cambiaría** — funciona como jerarquía.

---

## 3. UX — problemas concretos

Formato: **Problema → Consecuencia → Solución.**

### 3.1 El carrusel de logos no comunica que es un portafolio

**Problema:** los logos se muestran a `opacity: 0.55` con `filter: grayscale(100%)`, en movimiento continuo, sin nombres visibles, dentro de un contenedor con degradados de desvanecimiento en los bordes. Hay que pasar el mouse o hacer clic para descubrir que hay contenido detrás.

**Consecuencia:** el usuario lee esto como una tira decorativa de "clientes" y sigue scrolleando. **Los seis casos reales del portafolio — que son tu mejor argumento de venta — quedan invisibles.** Es un activo desperdiciado.

**Solución:** convertir "Proyectos" en una grilla real de tarjetas de caso, con nombre del cliente visible, una línea de qué se hizo y una de resultado. Mover el carrusel abajo, si querés conservarlo, como banda de "también trabajamos con".

---

### 3.2 El nombre del cliente no se ve en el modal de caso

**Problema:** `index.html:521` — el `<p>` que recibe `project.name` tiene la clase `.visually-hidden`.

**Consecuencia:** el usuario abre un caso y ve un logo (que puede no reconocer) y dos párrafos sin encabezado. No sabe de quién está leyendo.

**Solución:** quitar `.visually-hidden` y convertirlo en `<h3 class="case-modal-title">`. Es un cambio de una línea de HTML y una regla de CSS. **Corrección más barata del informe respecto de su impacto.**

---

### 3.3 Los CTAs de los servicios preseleccionan el formulario, pero el usuario no lo percibe

**Problema:** `main.js:267-277` — al hacer clic en "Cotizar tienda online", se setea `formService.value` y el ancla salta al formulario. La lógica funciona. Pero el `<select>` está en cuarta posición del formulario, y el usuario aterriza arriba, en el campo Nombre.

**Consecuencia:** el usuario no ve que la página ya entendió qué quiere. Se pierde una microinteracción que genera confianza, y el usuario puede cambiar el select innecesariamente.

**Solución:** al preseleccionar, resaltar el `<select>` brevemente (pulso de borde en `--primary` de ~1,2 s) o mostrar un chip encima del formulario: "Consultando por: Tienda online ✕". La segunda opción es mejor: es persistente y editable.

---

### 3.4 El FAQ no dice cuánto cuesta

**Problema:** la primera pregunta es "¿Cuánto cuesta un proyecto?" y la respuesta es, en resumen, "depende, escribinos".

**Consecuencia:** es la pregunta que trae al usuario al FAQ, y la respuesta lo devuelve al formulario sin información. **Fricción máxima antes de convertir.** El visitante que no puede estimar si estás en su rango se va, y encima te llegan consultas de gente fuera de presupuesto.

**Solución:** dar un piso. "Las landings arrancan desde $X. Los e-commerce, desde $Y. Los sistemas a medida se cotizan por alcance." Un rango filtra leads malos y convierte mejor a los buenos. Si no querés publicar precios en pesos, usá horas o "desde X semanas de trabajo".

---

### 3.5 Los CTAs secundarios de servicio son visualmente débiles

**Problema:** `.service-cta` es texto naranja de `0.9rem` con una flecha. No tiene fondo, borde ni área de toque definida.

**Consecuencia:** en una grilla de cinco cards, cinco enlaces de texto de bajo contraste (2,92:1 en tema claro) compiten mal. En mobile el área táctil está por debajo de los 44 px recomendados.

**Solución:** hacer la card entera clickeable (con `::after` de área completa) y dejar el texto como indicador visual, o convertir el CTA en botón secundario con borde.

---

### 3.6 Sin feedback al fallar el envío (ver 4.1 — es un bug, no solo UX)

---

### 3.7 Doble elemento flotante en mobile

**Problema:** `.mobile-cta-bar` (barra inferior, dos botones) + `.whatsapp-fab` (elevado a `bottom: 5rem`) conviven bajo 768 px. WhatsApp aparece dos veces en pantalla al mismo tiempo.

**Consecuencia:** redundancia visual, pérdida de viewport y el FAB tapa contenido a la derecha durante todo el scroll.

**Solución:** ocultar el FAB bajo 768 px (`display: none`). La barra ya cubre ambas acciones. Una línea de CSS.

---

## 4. Código — problemas con impacto real

Filtré a propósito. Estos son los que valen la pena.

### 4.1 🔴 BUG: el mensaje de error del formulario es invisible

**Este es el hallazgo más grave del informe.**

En `main.js:334`:

```js
formStatus.style.display = 'none';   // estilo INLINE
```

Y en `styles.css:1192`:

```css
.form-status.error { display: block; ... }
```

Un estilo inline gana siempre contra una clase. Traza del fallo:

1. El usuario completa el formulario correctamente y envía.
2. La línea 334 escribe `style="display:none"` en el elemento — inline, permanente.
3. El `fetch` a Formspree falla (sin conexión, cuota agotada, error de la API).
4. El `catch` escribe el mensaje de error y agrega la clase `.error`.
5. **La clase no puede ganarle al inline. El mensaje nunca se muestra.**
6. El spinner se apaga, el botón se rehabilita, los campos siguen llenos. **Cero feedback.**

**Consecuencia:** el usuario cree que envió el formulario y no envió nada. Vos nunca te enterás de la consulta. **Es una pérdida silenciosa de leads en el único formulario del sitio.** El caso "Error de conexión" (línea 357) es especialmente probable en mobile con señal intermitente — exactamente tu público.

**Solución:** reemplazar el inline por una clase de estado, o restaurar `formStatus.style.display = ''` antes de escribir el error. Dos líneas.

---

### 4.2 🔴 Todos los CTAs de WhatsApp dependen de JavaScript

**Problema:** los cinco puntos de contacto por WhatsApp están escritos en el HTML como `href="#"` con `data-wa`. `main.js:6-12` los reescribe al cargar.

**Consecuencia:**

- Si `main.js` falla, se bloquea o tarda, **todos los botones de WhatsApp son enlaces muertos**. Y WhatsApp es tu canal principal en Argentina.
- No se puede hacer clic derecho → copiar enlace, ni abrir en pestaña nueva antes de que corra el JS.
- Los crawlers ven `href="#"`. El botón no existe para Google.
- El `href="#"` hace saltar la página al tope si se hace clic antes de que el JS termine.

**Solución:** poner el `href` real de `wa.me` directamente en el HTML. Si querés mantener los mensajes prellenados personalizados, el JS puede seguir refinándolos — pero el enlace base debe funcionar sin JS. Es HTML estático; no hay razón para generarlo en runtime.

---

### 4.3 🔴 Canonical y Open Graph apuntan al dominio viejo

**Verificado en el HTML servido en producción hoy:**

```html
<link rel="canonical" href="https://newtechjujuy.com/">
<meta property="og:url"   content="https://newtechjujuy.com/">
<meta property="og:image" content="https://newtechjujuy.com/img/logos/logo6.png">
<meta name="twitter:image" content="https://newtechjujuy.com/img/logos/logo6.png">
```

Y el JSON-LD declara `"url": "https://newtechjujuy.com/"`.

**Consecuencia:**

- Le estás diciendo a Google que la versión canónica de `newtech.net.ar` **es otro dominio**. Google puede no indexar el dominio nuevo, o consolidar todas las señales de posicionamiento en el viejo.
- Si `newtechjujuy.com` ya no resuelve, **las previsualizaciones al compartir el link en WhatsApp, LinkedIn o Facebook salen sin imagen.** Compartir tu propio sitio por WhatsApp es probablemente tu canal de difusión principal.

**Solución:** buscar y reemplazar `newtechjujuy.com` → `www.newtech.net.ar` en `index.html`. Verificar después con el depurador de Facebook y el validador de datos estructurados de Google.

**Nota adicional:** el `og:image` es `logo6.png` — el logo de un cliente (Kuntur Producciones), no el tuyo. Al compartir tu sitio, la previsualización muestra la marca de otro. Debería ser una imagen social propia de 1200×630 px.

---

### 4.4 🟠 212 KB de fuentes en base64, bloqueando el render

`css/fonts.css` pesa **212 KB** e incrusta **10 fuentes** en base64:

| Familia | Pesos incrustados |
| --- | --- |
| Sora | 600, 700, 800 |
| Outfit | 300, 400, 500, 600, 700 |
| JetBrains Mono | 400, 500 |

Cuatro problemas encadenados:

1. **Es CSS bloqueante.** El navegador no pinta nada hasta descargar y parsear los 212 KB completos. No hay carga progresiva, no hay prioridad, no hay caché por fuente.
2. **Base64 pesa ~33% más que el binario.** Las `.woff2` originales de la carpeta `/fonts` suman 176 KB. Incrustarlas costó ~36 KB extra de puro overhead de codificación.
3. **`font-display: block` en las 10.** Es la peor opción para el primer render: el texto es **invisible** hasta que la fuente esté lista, no queda en fallback. Combinado con el punto 1, el usuario ve una pantalla en blanco más tiempo del necesario.
4. **Cargás las 10 sin importar si se usan.** Outfit 300 y JetBrains Mono 500 no aparecen en ninguna regla del CSS que revisé.

**Además:** la carpeta `/fonts/*.woff2` (176 KB, 11 archivos) **no la referencia nadie**. Es peso muerto en el repo — no se sirve, pero confunde a cualquiera que abra el proyecto (incluido vos en seis meses).

**Solución:**

- Volver a archivos `.woff2` externos con `<link rel="preload">` solo para las 2-3 fuentes del render inicial (Sora 700/800 y Outfit 400).
- `font-display: swap` en lugar de `block` — el texto aparece con la fuente de sistema y cambia al cargar. Mucho mejor que pantalla en blanco.
- Eliminar los pesos que no se usan.
- Borrar la carpeta duplicada.

*Sin medición: no puedo darte el número de mejora en LCP. Pero la causa es objetiva y está en el código.*

---

### 4.5 🟠 Font Awesome completo desde CDN para ~15 iconos

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

`all.min.css` trae **miles** de iconos. Vos usás alrededor de quince (`fa-code`, `fa-bars`, `fa-xmark`, `fa-moon`, `fa-sun`, `fa-whatsapp`, `fa-linkedin-in`, `fa-globe`, `fa-cart-shopping`, `fa-robot`, `fa-laptop-code`, `fa-cloud`, `fa-bullseye`, `fa-handshake`, `fa-phone`, `fa-clock`, `fa-chevron-down`, `fa-arrow-right`, `fa-spinner`).

Consecuencias: hoja bloqueante desde un tercero (DNS + TLS + descarga antes de pintar), dependencia de disponibilidad de cdnjs, y descarga de archivos de fuente de iconos adicionales.

**Solución:** reemplazar por SVG inline. Quince iconos inline pesan unos pocos KB, no bloquean nada, heredan `currentColor` (el tema claro/oscuro funciona solo) y eliminan una dependencia externa. Es un cambio mecánico y de bajo riesgo.

---

### 4.6 🟠 Logos del portafolio sin optimizar — 578 KB para mostrarlos a 60 px

Medido en disco:

| Archivo | Dimensiones reales | Peso |
| --- | --- | --- |
| `logo6.png` | 1024 × 843 | **225 KB** |
| `logo5.png` | 1024 × 699 | 134 KB |
| `logo4.png` | 1024 × 438 | 92 KB |
| `logo1.png` | 1024 × 107 | 54 KB |
| `logo2.png` | 1024 × 234 | 40 KB |
| `logo3.png` | 487 × 162 | 32 KB |
| **Total** | | **578 KB** |

El CSS los muestra a `height: 60px; max-width: 200px` (`styles.css:815`). En el modal, a `max-height: 72px`. **Estás sirviendo imágenes de 1024 px de ancho para renderizarlas a 200.**

Peor: el carrusel duplica el array para el bucle infinito (`main.js:94-95`), así que hay **12 elementos `<img>`** en el DOM. El `loading="lazy"` ayuda, pero los primeros están sobre el pliegue en mobile.

Y `logo6.png` (225 KB) es además el `og:image` — cada previsualización compartida arrastra ese peso.

**Solución:** exportar a WebP a ~2× el tamaño de display (400 px de ancho máximo), con PNG de respaldo vía `<picture>`. Estimación conservadora: de 578 KB a menos de 60 KB. Es la ganancia de performance más grande por menos esfuerzo del informe.

---

### 4.7 🟡 Fugas menores de listeners y estado

**Listener acumulado** (`main.js:124-126`): dentro de `openCaseModal` se agrega un listener a `caseModalCta` con `{ once: true }`. Si el usuario abre el modal cinco veces sin tocar ese botón, quedan cinco listeners registrados. Todos disparan al primer clic. No rompe nada visible hoy, pero es el tipo de cosa que se convierte en bug raro más adelante. Mover el listener fuera de la función.

**Estado de scroll del body**: tanto el menú mobile como los dos modales escriben `document.body.style.overflow`. Si dos se solapan (abrir un caso desde el menú mobile), el que cierre primero restaura el scroll mientras el otro sigue abierto. Un contador simple lo resuelve.

**Sin trampa de foco en los modales**: el foco inicial se pone bien (`caseModalClose?.focus()`), Escape cierra correctamente, pero con Tab se puede salir del modal hacia la página de atrás, y al cerrar el foco no vuelve al elemento que lo abrió. Es un requisito estándar para `aria-modal="true"`.

---

### 4.8 🟡 Semántica y ARIA

- **No hay `<main>`.** Todas las secciones cuelgan directo de `<body>`. El skip-link apunta a `#inicio`, que es una `<section>`, no el landmark principal. Envolver desde `.hero` hasta `.contact` en `<main id="main">`.
- **El FAQ no vincula pregunta con respuesta.** Los botones tienen `aria-expanded` (bien) pero les falta `aria-controls`, y los `.faq-answer` no tienen `id`. Un lector de pantalla no sabe qué se expandió.
- **Respuestas del FAQ ocultas con `max-height: 0`.** Siguen en el árbol de accesibilidad y se leen aunque estén colapsadas. Agregar `visibility: hidden` en el estado cerrado.
- **`max-height: 500px` al abrir** (`styles.css:1034`) es un número mágico. Hoy alcanza. Una respuesta más larga en mobile se corta sin aviso. Es el riesgo estructural de animar `max-height`; usar `grid-template-rows: 0fr → 1fr` lo resuelve limpio.
- **`.btn` tiene `outline: none`** (línea 252). Lo salva la regla global `:focus-visible` de la línea 125 — que está bien puesta, buen detalle. Pero conviene quitar el `outline: none` igual, porque es frágil ante cualquier refactor.

---

### 4.9 🟡 El bloque de fuentes con `!important` en el `<head>`

Ya descrito en la sección de tipografía. Lo repito acá porque es deuda de código además de decisión de diseño: **anula el sistema de tokens del CSS con `!important` sobre selectores de elemento.** Debería eliminarse y confiar en las variables, que ya están bien definidas.

---

## 5. Responsive — análisis de breakpoints

**Medido en siete anchos:** 1440, 1020, 896, 764, 596, 476 y 356 px.

Breakpoints declarados: **1100 / 992 / 768 / 480**, más `@media (hover: hover)`.

### Resultado de las mediciones

| Ancho | Desborde horizontal | Nav de escritorio | Espacio libre en navbar |
| --- | --- | --- | --- |
| 1020 px | ninguno | visible | 203 px |
| 896 px | ninguno | visible | 79 px |
| 764 px | ninguno | hamburguesa | — |
| 596 px | ninguno | hamburguesa | — |
| 476 px | ninguno | hamburguesa | — |
| 356 px | ninguno | hamburguesa | — |

**Cero desborde horizontal en todos los anchos.** El responsive base está bien hecho — mejor de lo que estimé en la primera pasada, y corrijo mis dos hipótesis erróneas (§0).

**Bien resuelto y confirmado:**

- `100dvh` además de `100vh` — sin salto en iOS.
- `env(safe-area-inset-bottom)` en la barra CTA.
- Tooltips detrás de `@media (hover: hover)` — evita tooltips fantasma en táctil. *(Aunque en escritorio tampoco se ven — §A.2.)*
- Transiciones de layout coherentes en los cuatro breakpoints.

### Problemas reales en mobile (medidos a 390 × 844 px)

**1. 🟠 23 elementos interactivos por debajo de los 44 px de alto recomendados.** Los peores:

| Elemento | Tamaño medido | Falta |
| --- | --- | --- |
| Los 5 CTAs "Cotizar…" | 23 px de alto | **menos de la mitad del mínimo** |
| Enlaces del footer | 26 px | 18 px |
| Botón hamburguesa | **29 × 38 px** | el control principal de navegación en mobile |
| Cerrar menú (✕) | 24 × 40 px | 20 px de ancho |
| Enlaces del menú mobile | 38 px | 6 px |
| Iconos sociales | 40 × 40 px | 4 px |

El de la hamburguesa es el más grave: es el acceso a toda la navegación y mide **29 px de ancho**.

**2. 🟠 Los elementos flotantes bloquean el 15% de la pantalla, y WhatsApp aparece dos veces.** Medido:

```
FAB de WhatsApp:      top 710px, alto 50px
Barra CTA:            top 772px, alto 68px
Alto del viewport:    840px
Bloqueado abajo:      130px  →  15% del viewport
```

Confirmado en captura: el círculo verde de WhatsApp y el botón "WhatsApp" de la barra son visibles **al mismo tiempo, uno encima del otro.** Ocultar el FAB bajo 768 px resuelve las dos cosas de una vez.

**3. 🟡 Márgenes fijos en los logos del carrusel.** `margin: 0 3rem` no se reduce en ningún breakpoint: 96 px de separación entre logos de 60 px de alto en una pantalla de 390 px.

**4. 🟡 El título de sección tapado por la navbar también en mobile** (§A.1): `tituloTop: 19px` contra `navbarBottom: 78px`.

---

## 6. Accesibilidad — resumen

**Lo que está bien** (y es más de lo que se ve normalmente en un sitio de este tipo):

- `:focus-visible` global con outline de 2 px y offset — bien implementado.
- Skip link presente y funcional.
- `aria-expanded` en hamburguesa y FAQ, actualizado por JS.
- `aria-label` en todos los botones de solo icono.
- `role="status"` + `aria-live="polite"` en el estado del formulario.
- Labels reales asociados a todos los inputs con `for`/`id`.
- `autocomplete` correcto en nombre, email y teléfono.
- Bloque `prefers-reduced-motion` que desactiva aurora, carrusel y fades. **Muy bien.**
- Duplicados del carrusel marcados con `aria-hidden="true"` y `alt=""` — detalle fino y correcto.

**Lo que falla, por prioridad:**

1. **Contraste del botón primario: 3,13:1.** Falla AA. Es el CTA principal. (§2)
2. **Naranja como texto en tema claro: 2,92:1.** Falla AA en badges, highlights y CTAs de servicio. (§2)
3. **Sin `<main>`.** (§4.8)
4. **Modales sin trampa de foco ni restauración.** (§4.7)
5. **FAQ sin `aria-controls`, respuestas colapsadas legibles por lector de pantalla.** (§4.8)
6. **Áreas táctiles bajo 44 px** en la barra CTA mobile y en `.service-cta`.
7. **Errores de formulario sin `aria-invalid`.** Se agrega la clase `.invalid` (solo color de borde) pero no el atributo ARIA, ni se mueve el foco al primer campo con error.
8. **El error de campo depende solo del color** del borde. Sin icono ni texto por campo.

---

## 7. Performance — causas identificadas

**Estado de bloqueo de render medido en producción** (`renderBlockingStatus` de la Resource Timing API):

| Recurso | Bloquea render | Transferido |
| --- | --- | --- |
| `css/fonts.css` | **`blocking`** | **207 KB** |
| Font Awesome (cdnjs) | **`blocking`** | tercero |
| `css/styles.css` | `blocking` | 37 KB |
| `js/main.js` | no | 16 KB |
| Vercel Insights | `non-blocking` | 1 KB |

**Evidencia visual del impacto:** la primera captura tras cargar muestra el hero **completamente en blanco** (§A.3).

**Cadena de bloqueo del render inicial:**

1. GTM inline y síncrono en el `<head>`, antes de todo lo demás.
2. Script inline de tema (bloqueante *a propósito* y **correctamente** — evita el flash de tema. Bien resuelto, no lo toques).
3. `fonts.css` — **207 KB bloqueantes, confirmado.**
4. Font Awesome desde cdnjs — **bloqueante, confirmado.** Tercero, DNS + TLS.
5. `styles.css` — 37 KB, razonable.

Los puntos 3 y 4 son los que hay que atacar.

**Compresión:** Vercel sirve el CSS y el JS con Brotli (`content-encoding: br`) — correcto. Pero el base64 de `fonts.css` son `.woff2` ya comprimidos, re-codificados como texto: **Brotli casi no los reduce.** Los 207 KB viajan prácticamente enteros. Las imágenes PNG van sin comprimir (esperable, pero ver §4.6).

**Costo de render continuo:**

- **Tres blobs de aurora** con `filter: blur(90px)` sobre elementos de 45vw/40vw/30vw, animados en bucle infinito. `blur` a ese radio es de las operaciones más caras del compositor. Tienen `will-change: transform` (correcto) pero el blur se recalcula igual. **En mobile de gama media es probablemente la causa principal de scroll con tirones.** Hipótesis, no medida.
- **`backdrop-filter: blur()`** en `.glass-card`, `.navbar`, `.mobile-menu` y `.modal-overlay`. Hay más de veinte `.glass-card` en la página. Cada una fuerza al compositor a leer lo que tiene detrás. Sumado a la aurora animada de fondo, se recalculan constantemente.
- **Carrusel con `animation: scroll 30s linear infinite`** — nunca para, ni fuera del viewport. Pausarlo con `IntersectionObserver` cuando no se ve es una ganancia gratis.

**Peso de assets:**

| Recurso | Peso | Comentario |
| --- | --- | --- |
| `fonts.css` | 212 KB | Bloqueante. Reducible a ~60 KB no bloqueantes. |
| Logos PNG | 578 KB | Reducible a <60 KB en WebP. |
| Font Awesome | ~100 KB+ | Reemplazable por ~5 KB de SVG inline. |
| `styles.css` | 37 KB | Está bien. |
| `main.js` | 16 KB | Está bien. |
| `/fonts/*.woff2` | 176 KB | **Peso muerto — no se referencia.** |

**Lo que está bien:** `loading="lazy"` en los logos, Vercel Analytics con `defer`, `main.js` al final del `<body>`, cache-busting por querystring.

---

## 8. Conversión — qué me impediría contratarte

Me puse en el lugar de un dueño de PyME de Jujuy que llega desde una búsqueda.

### 8.1 No hay prueba de que sepas hacer lo que decís

Es el problema número uno. Tenés **seis casos reales, con clientes reconocibles y resultados concretos** — están en `main.js:14-63`. Es buen material. Y está escondido detrás de un carrusel de logos en escala de grises al 55% de opacidad que hay que descubrir por clic.

**No hay una sola captura de pantalla en todo el sitio.** Vendés desarrollo web y no mostrás una sola pantalla de algo que hayas construido. Un cliente potencial no puede evaluar tu calidad visual, que es exactamente lo que está comprando.

**Esto solo justifica sacar el sitio de "correcto" y llevarlo a "convincente".**

### 8.2 Cero testimonios

Ninguna cita de cliente, ninguna reseña, ningún nombre con cara. En la Argentina, y más aún en un mercado regional donde la reputación circula boca a boca, un testimonio con nombre y apellido pesa más que cualquier lista de servicios.

Tenés clientes con nombre y proyectos entregados. Tres frases cortas de tres de ellos cambian la percepción del sitio.

### 8.3 Ninguna referencia de precio

Ya lo cubrí en §3.4. Es la primera pregunta del FAQ y la respuesta no responde. Filtrás mal en ambas direcciones: perdés al que sí podía pagar (porque asume que es caro) y atendés consultas del que no.

### 8.4 Señales de confianza faltantes

No aparecen en ninguna parte: CUIT o condición fiscal, dirección física o ciudad de operación visible más allá del JSON-LD, forma de facturación, política de privacidad enlazada (el formulario recolecta nombre, email y teléfono — en Argentina aplica la Ley 25.326), años de operación.

Para una empresa que va a contratarte y pagarte por adelantado, esto pesa.

### 8.5 Fricción del formulario

Cuatro campos obligatorios, uno de ellos teléfono. Pedir teléfono como obligatorio en un primer contacto es fricción alta: mucha gente no lo da hasta confiar. **Sugerencia:** dejar obligatorios nombre + email, y teléfono opcional. Si el lead responde por email, ya tenés la conversación abierta.

### 8.6 La marca personal está enterrada

"Fundado por Gabriel Calisaya — desarrollo full stack y consultoría cloud" es un párrafo perdido al final de la sección Nosotros. **Para una consultora chica, la persona es la propuesta de valor.** El cliente quiere saber con quién va a hablar. Una foto real y dos líneas propias convierten más que cualquier texto corporativo.

---

## 9. Oportunidades de diferenciación

Cinco ideas que tienen sentido *para este proyecto* específicamente. Ninguna es decorativa.

### 9.1 Portafolio con capturas reales y comparativa antes/después

**La más valiosa de las cinco.** Grilla de casos con captura del proyecto real. Para los que tienen antes/después (La Casa del Jubilado, Lavandería Esperanza — pasaron de planillas manuales a sistemas), un divisor deslizable de comparación cuenta la historia en dos segundos.

*Por qué acá:* vendés transformación digital a negocios con procesos manuales. Mostrar el "antes" es mostrarle al visitante su propia situación actual.

### 9.2 Calculadora de presupuesto orientativa

Tres o cuatro preguntas (tipo de proyecto → cantidad de secciones/productos → integraciones → urgencia) que devuelven un rango y prellenan el formulario con las respuestas.

*Por qué acá:* ataca directo el problema §8.3 y §3.4. Da el número que el usuario busca sin comprometerte a un precio cerrado, y te llega un lead calificado con el alcance ya descrito. **Además es una demo viva de "hacemos herramientas a medida" — el producto demostrando el producto.**

### 9.3 Terminal del hero que "corre" de verdad

Hoy `proyecto.js` es un bloque de código estático. Convertirlo en algo que se tipea línea por línea al cargar y termina con una salida (`> proyecto lanzado ✓`), o mejor: que refleje el servicio que el usuario está mirando mientras scrollea.

*Por qué acá:* ya tenés el componente construido y la tipografía monoespaciada cargada. Es coherente con la marca (sos desarrollador, el código *es* tu producto) y no es decoración genérica. Con `prefers-reduced-motion` desactivado, muestra el estado final.

### 9.4 Estado real de disponibilidad

El badge dice "Disponible para nuevos proyectos". Hacerlo verdadero y específico: "2 cupos para septiembre" o "Próximo inicio: 25 de agosto", actualizado desde un JSON que edites vos.

*Por qué acá:* escasez honesta y verificable, no un contador falso. Refuerza el diferencial de "equipo chico, atención directa" en vez de contradecirlo. Bajo esfuerzo, alto impacto en urgencia.

### 9.5 Continuidad hacia WhatsApp

Cuando alguien hace clic en un CTA de servicio, el mensaje prellenado de WhatsApp ya lo sabe: *"Hola New Tech, vi la sección de Tiendas online y quiero consultar."* El JS ya tiene toda la infraestructura (`data-wa`), solo falta hacerla contextual al recorrido.

*Por qué acá:* WhatsApp es el canal real de conversión en tu mercado. Que el mensaje llegue con contexto reduce la fricción del primer mensaje, que es donde se pierde la mayoría de los leads.

---

## 10. Prioridades — los 10 más importantes

| # | Prioridad | Problema | Ubicación | Impacto | Solución |
| --- | --- | --- | --- | --- | --- |
| 1 | 🔴 CRÍTICO | Error del formulario invisible: el `display:none` inline gana contra `.error`. **Reproducido en producción.** | `main.js:334` + `styles.css:1192` | **Pérdida de leads sin que nadie se entere.** El usuario cree que envió. | Quitar el inline y usar clases de estado. 2 líneas. |
| 2 | 🔴 CRÍTICO | Todos los enlaces internos dejan el título de la sección tapado por la navbar de 78 px. **Medido.** | Global — falta `scroll-padding-top` | Hacés clic en "Proyectos" y la sección aparece sin título. Parece roto. Afecta a los ~20 enlaces internos. | `html { scroll-padding-top: 90px; }` **1 línea.** |
| 3 | 🔴 CRÍTICO | Canonical, OG y JSON-LD apuntan a `newtechjujuy.com` desde el dominio nuevo. | `index.html:16, 27-38, 49` | Google puede no indexar el dominio nuevo. Previsualizaciones rotas al compartir por WhatsApp. | Buscar y reemplazar por `www.newtech.net.ar`. Revalidar en Search Console. |
| 4 | 🔴 CRÍTICO | Tooltip del carrusel recortado al 100% por `overflow:hidden`. La página instruye usar una función que no existe. **Medido.** | `styles.css:729-805` | Funcionalidad muerta + cartel que le pide al usuario que la use. | Sacarlo del contenedor recortado, o eliminarlo junto con el carrusel (#6). |
| 5 | 🟠 ALTO | Primer render en blanco: 207 KB de fuentes bloqueantes + `font-display: block` + Font Awesome bloqueante. **Observado y medido.** | `css/fonts.css`, `index.html:78` | La primera impresión es una pantalla vacía durante segundos en 4G. | `.woff2` externas + `preload` + `swap`. Font Awesome → SVG inline. Borrar `/fonts` duplicada. |
| 6 | 🟠 ALTO | Portafolio invisible: 6 casos reales tras logos en gris al 55%, sin capturas ni testimonios. | `index.html:193-201` + `main.js:14-63` | **El mayor freno a la contratación.** No hay evidencia de calidad. | Grilla de casos con captura, nombre visible, resultado. |
| 7 | 🟠 ALTO | Contraste del botón primario: 3,13:1. Falla WCAG AA. Y el naranja como texto en tema claro: 2,92:1. | `styles.css:257-260, 226, 850` | El CTA principal cuesta leerlo. El tema claro es el que ve la mayoría por defecto. | Texto oscuro sobre naranja (6,05:1) + token `--primary-text` más oscuro. |
| 8 | 🟠 ALTO | 23 elementos táctiles bajo 44 px. Hamburguesa de **29 × 38 px**; CTAs "Cotizar…" de **23 px**. **Medido.** | Varios | Errores de toque en el control principal de navegación mobile. | Subir áreas táctiles a 44 px con padding. |
| 9 | 🟠 ALTO | 578 KB de logos PNG a 1024 px, mostrados a 60 px de alto. **Medido: `logo6.png` = 220 KB.** | `img/logos/` | Ancho de banda desperdiciado en mobile, donde está tu tráfico. | WebP a 400 px máximo. De 578 KB a <60 KB. |
| 10 | 🟡 MEDIO | El nombre del cliente está oculto en el modal de caso. **Confirmado visualmente.** | `index.html:521` | Abrís un caso y no sabés de quién es. | Quitar `.visually-hidden`, convertir en `<h3>`. **1 línea.** |

---

## 11. Plan por fases

### FASE 1 — Imprescindible

*Son bugs verificados en producción. Nada acá es cosmético. Todo es de bajo riesgo y no toca el diseño.*

1. `html { scroll-padding-top: 90px; }` — arregla los ~20 enlaces internos (#2). **1 línea.**
2. Arreglar el mensaje de error invisible del formulario (#1). **2 líneas.**
3. Corregir canonical, OG, Twitter y JSON-LD al dominio nuevo (#3).
4. `href` reales de `wa.me` en el HTML (§4.2).
5. Arreglar o eliminar el tooltip del carrusel — hoy es una función muerta anunciada en pantalla (#4).
6. Mostrar el nombre del cliente en el modal de caso (#10). **1 línea.**
7. Contraste del botón primario a AA (#7).
8. Ocultar el FAB de WhatsApp bajo 768 px — resuelve la duplicación y libera 15% del viewport (§5).
9. Subir a 44 px la hamburguesa y los CTAs "Cotizar…" (#8).

*Los puntos 1, 2, 6 y 8 suman unas diez líneas de código y resuelven cuatro de los problemas más visibles del sitio.*

### FASE 2 — Mejora profesional

7. **Portafolio real:** grilla de casos con capturas, nombre visible y resultado (#5).
8. **Testimonios:** tres citas con nombre y empresa.
9. **Rango de precios** en el FAQ y en los servicios (§8.3).
10. Foto y presentación de Gabriel en Nosotros (§8.6).
11. Reemplazar los dos stats vacíos del hero por datos reales (§1).
12. Chip visible de "consultando por: X" al preseleccionar servicio (§3.3).
13. Teléfono opcional en el formulario; foco al primer campo con error + `aria-invalid` (§8.5, §6).

### FASE 3 — Diferenciación

14. Calculadora de presupuesto orientativa (§9.2).
15. Terminal del hero animada (§9.3).
16. Antes/después deslizable en los casos que lo permitan (§9.1).
17. Disponibilidad real y específica en el badge (§9.4).
18. Mensajes de WhatsApp contextuales según recorrido (§9.5).

### FASE 4 — Optimización

19. Fuentes: externas + preload + swap; borrar `/fonts` duplicada (#6).
20. Logos a WebP (#7).
21. Font Awesome → SVG inline (#8).
22. Eliminar el bloque `<style>` con `!important` del `<head>` (§4.9).
23. Pausar el carrusel fuera del viewport con `IntersectionObserver`.
24. Reducir el blur de la aurora o pasar a un gradiente estático bajo 768 px.
25. `<main>`, trampa de foco en modales, `aria-controls` en FAQ, `visibility` en respuestas colapsadas (#10).
26. `sitemap.xml` y `robots.txt` (no pude confirmar que existan).
27. Corregir el README: dominio viejo y marcadores `[cite: N]` residuales del texto original.
28. Página 404 propia.

---

## Mi recomendación

### 1. Qué está bien

Más de lo que un informe con este largo sugiere. La arquitectura CSS con tokens de tema es genuinamente buena — el modo claro/oscuro está implementado sin duplicar reglas, y el script anti-parpadeo en el `<head>` es la solución correcta. El JavaScript es limpio, legible y sin dependencias: encadenamiento opcional, `IntersectionObserver`, listeners pasivos en scroll, portafolio como estructura de datos separada de la vista. El HTML es semántico de verdad, con ARIA que en su mayoría es correcto y un bloque `prefers-reduced-motion` que casi nadie se molesta en escribir. Los textos están bien redactados, en voseo natural, sin jerga vacía. El proceso de cuatro pasos y el FAQ de ocho preguntas anticipan bien las objeciones.

**Esto no es una plantilla.** Se nota que está escrito a mano y con criterio.

### 2. Qué la perjudica más

Tres cosas, en este orden.

**Primero: hay funcionalidad rota que un visitante nota enseguida.** Hacés clic en "Proyectos" y aterrizás en una sección sin título, porque la navbar lo tapa. La página te dice "pasá el mouse sobre un logo" y al pasarlo no ocurre nada, porque el tooltip está recortado al 100%. Abrís un caso y no ves de quién es. Y si el formulario falla, no te enterás nunca.

Esto es lo más caro de todo, porque **contradice directamente lo que vendés.** Un estudio de desarrollo web cuyo propio sitio tiene anclas mal calibradas y funciones muertas está dando evidencia en contra de sí mismo. Ningún argumento de la página pesa más que eso.

**Segundo: el primer render es una pantalla en blanco.** 207 KB de fuentes bloqueantes con `font-display: block`, más Font Awesome bloqueante, más el contenido del hero esperando a un observador de scroll. En 4G de Jujuy, tu visitante mira una pantalla vacía durante segundos antes de ver nada.

**Tercero, y el más importante estratégicamente: vendés desarrollo web sin mostrar desarrollo web.** Tenés seis clientes reales con proyectos entregados y resultados concretos, y en la página son seis logos grises al 55% de opacidad moviéndose en bucle, sin nombres. No hay una sola captura. No hay un solo testimonio. Un visitante no tiene forma de evaluar si sabés hacer lo que decís — y ese es el único juicio que importa antes de escribirte.

El sitio se ve profesional. Pero "se ve profesional" y "demuestra que es profesional" son cosas distintas, y solo la segunda convierte.

### 3. Qué cambiaría primero

Toda la Fase 1, en una sola pasada. Y dentro de ella, empezá por las cuatro correcciones de una línea: `scroll-padding-top`, el título del modal, el `display` del error y ocultar el FAB en mobile. **Son unos diez minutos de trabajo y arreglan cuatro de los problemas más visibles del sitio.**

Inmediatamente después, y como proyecto en sí: **el portafolio.** Es el cambio de mayor retorno de todo el documento. Ya tenés el contenido escrito en `main.js` — falta sacarlo del carrusel y ponerle capturas.

### 4. Qué NO cambiaría

- **La paleta ni la identidad visual.** Naranja sobre superficies oscuras funciona, es distintivo y es tuyo. El problema es el contraste de un token, no la dirección de arte.
- **El sistema de temas.** Está mejor implementado que en la mayoría de los sitios que hacen esto. No lo toques.
- **El stack.** HTML, CSS y JS vanilla es la elección correcta para una landing estática. Migrar a un framework sería complejidad sin beneficio. Rechazá esa tentación.
- **Los textos.** Están bien escritos y suenan a persona. Agregá información que falta, pero no los reescribas.
- **El FAQ de ocho preguntas.** Anticipa bien las objeciones reales. Solo hay que mejorar la respuesta sobre precio.
- **El proceso de cuatro pasos.** Claro, corto, útil.
- **El borde naranja del `.contact-card`.** Rompe la consistencia a propósito y funciona como jerarquía.

### 5. Qué la lleva de "correcta" a "profesional"

Dos cosas, y en este orden.

**Primero: que todo lo que la página promete, funcione.** Hoy hay tres funciones anunciadas que no cumplen — el ancla que no encuadra, el tooltip que no aparece, el caso que no dice de quién es. Ninguna es difícil de arreglar, y mientras existan, cualquier inversión en diseño o contenido rinde menos. Un sitio de un desarrollador se juzga primero por si anda.

**Segundo: evidencia.** No es una respuesta de diseño, y por eso mismo es la correcta.

La página hoy es una buena presentación de servicios. Le falta ser una demostración. La diferencia no está en agregar animaciones ni en pulir espaciados — está en que el visitante pueda ver, en menos de treinta segundos, tres pantallas de cosas que construiste, dos personas que dicen que valió la pena, y un rango de precio que le permita saber si esta conversación tiene sentido.

Con eso, sumado a la Fase 1, el sitio deja de competir por diseño (donde cualquier plantilla te empata) y pasa a competir por credibilidad (donde tenés seis casos reales y la mayoría no tiene ninguno).

Ese es el salto.

---

*Auditoría en dos pasadas: análisis de código completo + inspección visual real en Chrome sobre el sitio en producción, con mediciones de layout en siete anchos y verificación empírica de los bugs reportados. Ver sección 0 para el detalle del método y de lo que quedó sin verificar.*
