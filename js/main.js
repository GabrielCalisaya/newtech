/* ============================================================
   PRECIOS — punto único de edición.
   Cada servicio define sus propias preguntas. Los valores están en
   pesos argentinos y alineados al mínimo del mercado argentino 2026:
     Landing a medida ....... $200.000 – $500.000
     Sitio institucional .... $500.000 – $1.500.000
     Tienda WooCommerce ..... $500.000 – $1.200.000
     Desarrollo a medida .... $1.500.000 +
   El bot de WhatsApp no tiene referencia de mercado publicada
   comparable, así que queda en el valor definido por New Tech.

   Cómo se calcula:
     precio = base × (factores de las preguntas de una sola opción)
                   × (1 + suma de los factores de los agregados)
     semanas = semanasBase + suma de las semanas de todo lo elegido
   ============================================================ */
const PRECIOS = {
    moneda: 'ARS',
    margen: 0.2,

    servicios: {
        'Desarrollo Web': {
            label: 'Sitio o landing',
            base: 200000,
            semanasBase: [1, 2],
            preguntas: [
                {
                    id: 'alcance',
                    label: '¿Qué tamaño tiene el sitio?',
                    tipo: 'unica',
                    opciones: [
                        { id: 'landing', label: 'Landing de una página', detalle: 'Una sola sección larga', factor: 1, semanas: 0 },
                        { id: 'chico', label: 'Sitio de 2 a 5 secciones', detalle: 'Inicio, servicios, nosotros, contacto', factor: 1.6, semanas: 1 },
                        { id: 'institucional', label: 'Institucional de 6 o más', detalle: 'Con subpáginas y más contenido', factor: 2.4, semanas: 2 }
                    ]
                },
                {
                    id: 'contenido',
                    label: '¿Tenés los textos y las imágenes?',
                    tipo: 'unica',
                    opciones: [
                        { id: 'listo', label: 'Sí, está todo listo', factor: 1, semanas: 0 },
                        { id: 'parcial', label: 'Algo tengo', detalle: 'Hay que ordenar y completar', factor: 1.15, semanas: 0.5 },
                        { id: 'nada', label: 'No, necesito ayuda', detalle: 'Redacción y búsqueda de imágenes', factor: 1.35, semanas: 1 }
                    ]
                },
                {
                    id: 'extras',
                    label: '¿Necesitás algo de esto? (podés elegir varios)',
                    tipo: 'multiple',
                    opciones: [
                        { id: 'blog', label: 'Blog autoadministrable', factor: 0.25, semanas: 1 },
                        { id: 'turnos', label: 'Reservas o turnos', factor: 0.35, semanas: 1 },
                        { id: 'idiomas', label: 'Segundo idioma', factor: 0.3, semanas: 0.5 },
                        { id: 'panel', label: 'Panel para editar contenido', factor: 0.4, semanas: 1.5 },
                        { id: 'seo', label: 'SEO avanzado y analítica', factor: 0.2, semanas: 0.5 }
                    ]
                }
            ]
        },

        'Tienda Online': {
            label: 'Tienda online',
            base: 500000,
            semanasBase: [3, 4],
            preguntas: [
                {
                    id: 'catalogo',
                    label: '¿Cuántos productos vas a cargar?',
                    tipo: 'unica',
                    opciones: [
                        { id: 'hasta25', label: 'Hasta 25', factor: 1, semanas: 0 },
                        { id: 'hasta100', label: 'Entre 26 y 100', factor: 1.4, semanas: 1 },
                        { id: 'hasta500', label: 'Entre 101 y 500', factor: 1.9, semanas: 2 },
                        { id: 'mas500', label: 'Más de 500', detalle: 'Requiere carga masiva', factor: 2.6, semanas: 3 }
                    ]
                },
                {
                    id: 'plataforma',
                    label: '¿Sobre qué plataforma?',
                    tipo: 'unica',
                    opciones: [
                        { id: 'tiendanube', label: 'Tienda Nube', detalle: 'Rápido, con abono mensual de la plataforma', factor: 1, semanas: 0 },
                        { id: 'woo', label: 'WooCommerce', detalle: 'Sin comisión por venta, más control', factor: 1.5, semanas: 1 },
                        { id: 'medida', label: 'A medida', detalle: 'Todo propio, máxima flexibilidad', factor: 2.4, semanas: 3 }
                    ]
                },
                {
                    id: 'integraciones',
                    label: '¿Qué integraciones necesitás? (podés elegir varias)',
                    tipo: 'multiple',
                    opciones: [
                        { id: 'pagos', label: 'Medios de pago', detalle: 'Mercado Pago, tarjetas', factor: 0.15, semanas: 0.5 },
                        { id: 'envios', label: 'Cálculo de envíos', detalle: 'Correo Argentino, Andreani, OCA', factor: 0.2, semanas: 0.5 },
                        { id: 'facturacion', label: 'Facturación electrónica AFIP', factor: 0.35, semanas: 1 },
                        { id: 'stock', label: 'Sincronizar stock con otro sistema', factor: 0.4, semanas: 1.5 },
                        { id: 'mayorista', label: 'Precios mayoristas o por lista', factor: 0.3, semanas: 1 }
                    ]
                }
            ]
        },

        'Bot de WhatsApp': {
            label: 'Bot de WhatsApp',
            base: 500000,
            semanasBase: [2, 3],
            preguntas: [
                {
                    id: 'complejidad',
                    label: '¿Qué tiene que hacer el bot?',
                    tipo: 'unica',
                    opciones: [
                        { id: 'faq', label: 'Responder preguntas frecuentes', detalle: 'Horarios, precios, ubicación', factor: 1, semanas: 0 },
                        { id: 'flujos', label: 'Guiar con menús y flujos', detalle: 'El cliente elige opciones', factor: 1.5, semanas: 1 },
                        { id: 'datos', label: 'Consultar datos reales', detalle: 'Stock, turnos, estado de pedido', factor: 2.2, semanas: 2 }
                    ]
                },
                {
                    id: 'volumen',
                    label: '¿Cuántas consultas recibís por día?',
                    tipo: 'unica',
                    opciones: [
                        { id: 'bajo', label: 'Menos de 30', factor: 1, semanas: 0 },
                        { id: 'medio', label: 'Entre 30 y 150', factor: 1.2, semanas: 0.5 },
                        { id: 'alto', label: 'Más de 150', detalle: 'Requiere infraestructura dedicada', factor: 1.5, semanas: 1 }
                    ]
                },
                {
                    id: 'extras',
                    label: '¿Algo más? (podés elegir varios)',
                    tipo: 'multiple',
                    opciones: [
                        { id: 'humano', label: 'Derivar a una persona', factor: 0.2, semanas: 0.5 },
                        { id: 'catalogo', label: 'Mostrar catálogo de productos', factor: 0.3, semanas: 1 },
                        { id: 'turnos', label: 'Agendar turnos', factor: 0.4, semanas: 1 },
                        { id: 'pagos', label: 'Enviar links de pago', factor: 0.25, semanas: 0.5 },
                        { id: 'crm', label: 'Registrar contactos en una planilla o CRM', factor: 0.25, semanas: 0.5 }
                    ]
                }
            ]
        },

        'Sistema de Gestión': {
            label: 'Sistema a medida',
            base: 1500000,
            semanasBase: [5, 7],
            preguntas: [
                {
                    id: 'modulos',
                    label: '¿Cuántas áreas tiene que cubrir?',
                    tipo: 'unica',
                    opciones: [
                        { id: 'uno', label: 'Una sola', detalle: 'Por ejemplo, solo stock', factor: 1, semanas: 0 },
                        { id: 'pocos', label: 'Dos o tres', detalle: 'Stock y clientes, por ejemplo', factor: 1.5, semanas: 2 },
                        { id: 'muchos', label: 'Cuatro o más', detalle: 'Gestión integral', factor: 2.3, semanas: 4 }
                    ]
                },
                {
                    id: 'usuarios',
                    label: '¿Quiénes lo van a usar?',
                    tipo: 'unica',
                    opciones: [
                        { id: 'solo', label: 'Solo yo', factor: 1, semanas: 0 },
                        { id: 'equipo', label: 'Un equipo con roles', detalle: 'Admin y operadores', factor: 1.3, semanas: 1 },
                        { id: 'permisos', label: 'Varios roles con permisos finos', detalle: 'Cada uno ve lo suyo', factor: 1.6, semanas: 2 }
                    ]
                },
                {
                    id: 'extras',
                    label: '¿Qué más necesita? (podés elegir varios)',
                    tipo: 'multiple',
                    opciones: [
                        { id: 'reportes', label: 'Reportes y tablero', factor: 0.25, semanas: 1 },
                        { id: 'facturacion', label: 'Facturación electrónica AFIP', factor: 0.35, semanas: 1.5 },
                        { id: 'migracion', label: 'Migrar datos de planillas existentes', factor: 0.2, semanas: 1 },
                        { id: 'sucursales', label: 'Varias sucursales o depósitos', factor: 0.3, semanas: 1.5 },
                        { id: 'movil', label: 'Uso desde el celular', factor: 0.3, semanas: 1.5 },
                        { id: 'api', label: 'Conexión con otros sistemas', factor: 0.35, semanas: 1.5 }
                    ]
                }
            ]
        },

        'Consultoría Cloud': {
            label: 'Consultoría cloud',
            base: null,
            semanasBase: [1, 3],
            preguntas: [
                {
                    id: 'objetivo',
                    label: '¿Qué necesitás resolver?',
                    tipo: 'unica',
                    opciones: [
                        { id: 'diagnostico', label: 'Un diagnóstico puntual', detalle: 'Revisar qué tenés y qué conviene' },
                        { id: 'migracion', label: 'Migrar a la nube', detalle: 'Desde servidor propio u otro proveedor' },
                        { id: 'costos', label: 'Bajar la factura mensual', detalle: 'Optimización de costos' },
                        { id: 'arquitectura', label: 'Diseñar la infraestructura', detalle: 'Para un proyecto nuevo' }
                    ]
                }
            ]
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const WA_NUMBER = '5493885187080';

    const waUrl = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

    document.querySelectorAll('[data-wa]').forEach((el) => {
        el.href = waUrl(el.dataset.wa || 'Hola New Tech');
        if (!el.getAttribute('target')) {
            el.target = '_blank';
            el.rel = 'noopener';
        }
    });

    const PORTFOLIO = [
        {
            id: 'ssv',
            name: 'SSV — Seguridad Vial',
            logo: 'img/logos/logo1.webp',
            work: 'Quiz interactivo de Seguridad Vial desarrollado para ExpoJuy 2024, presentado en tótems para el público.',
            result: 'Muy buen recibimiento de quienes lo probaron en la expo.',
            url: 'https://gabrielcalisaya.github.io/Test-de-Seguridad-Vial/'
        },
        {
            id: 'bite',
            name: 'BITE Accesorios',
            logo: 'img/logos/logo2.webp',
            work: 'Tienda en Tienda Nube: carga de productos e imágenes, código a medida y automatización de envíos por correo. Documentación y material de uso entregados al cliente.',
            result: 'E-commerce operativo con procesos de venta y envío optimizados.',
            url: 'https://biteaccesoriosoficial.mitiendanube.com/'
        },
        {
            id: 'innoa',
            name: 'INNOA',
            logo: 'img/logos/logo3.webp',
            work: 'Desarrollo a demanda como partner técnico: chatbots, páginas web, integraciones y consultoría en tecnología cuando surgen proyectos (la web institucional es de INNOA; con ellos ejecutamos el desarrollo).',
            result: 'Proyectos entregados en conjunto: desde bots hasta sitios y soporte en distintas tecnologías.',
            url: 'https://innoajujuy.com/'
        },
        {
            id: 'casa-jubilado',
            name: 'La Casa del Jubilado',
            logo: 'img/logos/logo4.webp',
            work: 'Sistema de recibos con Google Apps Script, automatización de altas (formularios que agendan jubilados), mejoras en flujos de recibos y sitio web con mantenimiento mensual.',
            result: 'Operativa digital más ordenada y menos trabajo manual para la institución.',
            url: 'https://lacasadeljubiladojujuy.com/'
        },
        {
            id: 'lavanderia',
            name: 'Lavandería Esperanza',
            logo: 'img/logos/logo5.webp',
            work: 'Formulario de registro de ingreso de ropa y recibos internos automatizados con Google Apps Script (sin sitio web público).',
            result: 'Control diario de prendas y comprobantes sin planillas manuales.',
            url: ''
        },
        {
            id: 'rrhh-working',
            name: 'RRHH Working',
            logo: 'img/logos/logo7.webp',
            work: 'Plataforma web completa para la consultora: portal público de búsquedas laborales, postulación en línea con carga de CV y panel de gestión con roles diferenciados para el equipo. Incluye protección antispam, avisos automáticos por correo y SEO técnico.',
            result: 'Las postulaciones dejaron de manejarse por correo y planillas: hoy entran ordenadas al panel, con seguimiento de estado y CVs descargables.',
            url: 'https://www.rrhhworking.com.ar/'
        },
        {
            id: 'anuario',
            name: 'Kuntur Producciones / Anuario Jujuy',
            logo: 'img/logos/logo6.webp',
            work: 'Apps Unity con realidad aumentada para anuarios escolares; proyectos web con integraciones (incl. experiencia RA del álbum del Mundial, muy reconocida en Jujuy).',
            result: 'Experiencias inmersivas para instituciones y campañas de alto impacto local.',
            url: 'https://realidadaumentadaarg.com/'
        }
    ];

    const portfolioById = Object.fromEntries(PORTFOLIO.map((p) => [p.id, p]));

    const buildCarousel = () => {
        const track = document.getElementById('carousel-track');
        if (!track) return;

        const createLogoBtn = (project, hidden) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'carousel-logo';
            btn.dataset.project = project.id;
            if (hidden) btn.setAttribute('aria-hidden', 'true');
            btn.setAttribute('aria-label', `Ver proyecto ${project.name}`);

            const img = document.createElement('img');
            img.src = project.logo;
            img.alt = hidden ? '' : project.name;
            img.loading = 'lazy';
            btn.appendChild(img);

            return btn;
        };

        track.innerHTML = '';
        PORTFOLIO.forEach((p) => track.appendChild(createLogoBtn(p, false)));
        PORTFOLIO.forEach((p) => track.appendChild(createLogoBtn(p, true)));
    };

    buildCarousel();

    // --- Grilla de casos ---
    // El portafolio deja de estar escondido detrás de logos en escala de
    // grises: cada caso se muestra con nombre, trabajo y resultado.
    const buildCases = () => {
        const grid = document.getElementById('cases-grid');
        if (!grid) return;

        grid.innerHTML = '';
        PORTFOLIO.forEach((p) => {
            const card = document.createElement('article');
            card.className = 'case-card glass-card fade-in-up';

            const head = document.createElement('div');
            head.className = 'case-card-head';

            const logo = document.createElement('img');
            logo.src = p.logo;
            logo.alt = '';
            logo.loading = 'lazy';
            logo.className = 'case-card-logo';
            head.appendChild(logo);

            const title = document.createElement('h3');
            title.className = 'case-card-title';
            title.textContent = p.name;
            head.appendChild(title);

            const work = document.createElement('p');
            work.className = 'case-card-work';
            work.textContent = p.work;

            const result = document.createElement('p');
            result.className = 'case-card-result';
            result.textContent = p.result;

            const actions = document.createElement('div');
            actions.className = 'case-card-actions';

            if (p.url) {
                const link = document.createElement('a');
                link.className = 'case-card-link';
                link.href = p.url;
                link.target = '_blank';
                link.rel = 'noopener';
                link.innerHTML = 'Ver proyecto <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>';
                link.setAttribute('aria-label', `Ver el proyecto de ${p.name} (se abre en una pestaña nueva)`);
                actions.appendChild(link);
            } else {
                const note = document.createElement('span');
                note.className = 'case-card-note';
                note.textContent = 'Herramienta interna, sin sitio público';
                actions.appendChild(note);
            }

            card.append(head, work, result, actions);
            grid.appendChild(card);
        });
    };

    buildCases();

    const caseModal = document.getElementById('case-modal');
    const caseModalClose = document.getElementById('case-modal-close');
    const caseModalLabel = document.getElementById('case-modal-label');
    const caseModalLogo = document.getElementById('case-modal-logo');
    const caseModalWork = document.getElementById('case-modal-work');
    const caseModalResult = document.getElementById('case-modal-result');
    const caseModalLink = document.getElementById('case-modal-link');
    const caseModalCta = document.getElementById('case-modal-cta');

    // --- Gestión de foco y scroll compartida por menú y modales ---
    let lastFocused = null;
    let scrollLocks = 0;

    const lockScroll = () => {
        scrollLocks += 1;
        document.body.style.overflow = 'hidden';
    };

    const unlockScroll = () => {
        scrollLocks = Math.max(0, scrollLocks - 1);
        if (scrollLocks === 0) document.body.style.overflow = '';
    };

    const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

    // Mantiene el foco dentro del contenedor mientras esté abierto.
    const trapFocus = (container) => (e) => {
        if (e.key !== 'Tab') return;
        const items = [...container.querySelectorAll(FOCUSABLE)]
            .filter((el) => el.offsetParent !== null || el === document.activeElement);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    };

    const caseTrap = () => trapFocus(caseModal);
    let caseTrapHandler = null;

    const openCaseModal = (project) => {
        if (!caseModal || !project) return;
        lastFocused = document.activeElement;
        caseModalLogo.src = project.logo;
        caseModalLogo.alt = `Proyecto ${project.name}`;
        if (caseModalLabel) caseModalLabel.textContent = project.name;
        caseModalWork.textContent = project.work;
        caseModalResult.textContent = project.result;

        if (project.url) {
            caseModalLink.href = project.url;
            caseModalLink.style.display = 'inline-flex';
        } else {
            caseModalLink.style.display = 'none';
        }

        caseModal.removeAttribute('hidden');
        caseModal.classList.add('active');
        lockScroll();
        caseTrapHandler = caseTrap();
        document.addEventListener('keydown', caseTrapHandler);
        caseModalClose?.focus();
    };

    const closeCaseModal = () => {
        if (!caseModal || !caseModal.classList.contains('active')) return;
        caseModal.classList.remove('active');
        caseModal.setAttribute('hidden', '');
        unlockScroll();
        if (caseTrapHandler) {
            document.removeEventListener('keydown', caseTrapHandler);
            caseTrapHandler = null;
        }
        lastFocused?.focus();
    };

    // Listener registrado una sola vez. Antes se agregaba dentro de
    // openCaseModal, acumulando uno por cada apertura.
    if (caseModalCta) caseModalCta.addEventListener('click', () => closeCaseModal());

    if (caseModalClose) caseModalClose.addEventListener('click', closeCaseModal);
    if (caseModal) {
        caseModal.addEventListener('click', (e) => {
            if (e.target === caseModal) closeCaseModal();
        });
    }

    document.getElementById('carousel-track')?.addEventListener('click', (e) => {
        const btn = e.target.closest('.carousel-logo');
        if (!btn || !btn.dataset.project) return;
        const project = portfolioById[btn.dataset.project];
        if (project) openCaseModal(project);
    });

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // El contador de proyectos sale del array, no de un número escrito a mano.
    const statProjects = document.getElementById('stat-projects');
    if (statProjects) statProjects.textContent = String(PORTFOLIO.length);

    // --- Terminal del hero: tipeo progresivo ---
    // El bloque de código ya está en el HTML (así se ve aunque falle el JS
    // y no genera salto de layout). Acá solo se revela carácter por carácter.
    const heroCode = document.querySelector('.hero-glass-card .card-body pre code');
    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (heroCode && !sinMovimiento) {
        const nodos = [];
        const recolectar = (el) => {
            el.childNodes.forEach((n) => {
                if (n.nodeType === Node.TEXT_NODE) nodos.push(n);
                else recolectar(n);
            });
        };
        recolectar(heroCode);

        const textos = nodos.map((n) => n.nodeValue);
        const total = textos.reduce((s, t) => s + t.length, 0);
        nodos.forEach((n) => { n.nodeValue = ''; });

        const caret = document.createElement('span');
        caret.className = 'type-caret';
        caret.setAttribute('aria-hidden', 'true');
        heroCode.appendChild(caret);

        let i = 0;
        let nodo = 0;
        let pos = 0;

        const escribir = () => {
            // 3 caracteres por cuadro: rápido de leer, sin sensación de espera
            for (let k = 0; k < 3 && i < total; k += 1) {
                while (nodo < textos.length && pos >= textos[nodo].length) {
                    nodo += 1;
                    pos = 0;
                }
                if (nodo >= textos.length) break;
                nodos[nodo].nodeValue += textos[nodo][pos];
                pos += 1;
                i += 1;
            }
            if (i < total) requestAnimationFrame(escribir);
            else setTimeout(() => caret.remove(), 1200);
        };

        // Arranca cuando la tarjeta entra en pantalla
        const heroCard = document.querySelector('.hero-glass-card');
        const obs = new IntersectionObserver((entries, o) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    o.disconnect();
                    setTimeout(() => requestAnimationFrame(escribir), 350);
                }
            });
        }, { threshold: 0.3 });
        if (heroCard) obs.observe(heroCard);
    }

    const themeBtns = [document.getElementById('theme-toggle'), document.getElementById('theme-toggle-mobile')].filter(Boolean);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    const themeColors = { dark: '#0d1117', light: '#f6f7fb' };

    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        if (metaTheme) metaTheme.setAttribute('content', themeColors[theme] || themeColors.dark);
        themeBtns.forEach((b) => b.setAttribute('aria-label', theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'));
        try { localStorage.setItem('theme', theme); } catch (err) { /* ignore */ }
    };

    const toggleTheme = () => {
        const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        applyTheme(current === 'light' ? 'dark' : 'light');
    };

    applyTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
    themeBtns.forEach((b) => b.addEventListener('click', toggleTheme));

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-btn');

    const setMenu = (open) => {
        const wasOpen = mobileMenu.classList.contains('active');
        if (open === wasOpen) return;
        mobileMenu.classList.toggle('active', open);
        if (open) lockScroll(); else unlockScroll();
        if (hamburger) hamburger.setAttribute('aria-expanded', String(open));
        if (!open) hamburger?.focus();
    };

    if (hamburger) hamburger.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('active')));
    if (closeMenu) closeMenu.addEventListener('click', () => setMenu(false));
    mobileLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));

    const navbar = document.getElementById('navbar');
    const progress = document.getElementById('scroll-progress');

    const onScroll = () => {
        const y = window.scrollY;
        if (navbar) navbar.classList.toggle('scrolled', y > 50);
        if (progress) {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.width = h > 0 ? `${(y / h) * 100}%` : '0%';
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a:not(.btn)');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navAnchors.forEach((a) => {
                    a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((section) => sectionObserver.observe(section));

    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach((question) => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const willOpen = !faqItem.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach((item) => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const q = item.querySelector('.faq-question');
                    if (q) q.setAttribute('aria-expanded', 'false');
                }
            });

            faqItem.classList.toggle('active', willOpen);
            question.setAttribute('aria-expanded', String(willOpen));
        });
    });

    const fadeElements = document.querySelectorAll('.fade-in-up');
    const fadeObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    fadeElements.forEach((el) => fadeObserver.observe(el));

    // Escalonado reducido de 0.08s a 0.04s: con el anterior, al scrollear a
    // velocidad normal las últimas tarjetas seguían invisibles.
    document.querySelectorAll('.services-grid, .faq-grid, .process-steps').forEach((grid) => {
        Array.from(grid.children).forEach((child, i) => {
            child.style.transitionDelay = `${(i % 8) * 0.04}s`;
        });
    });

    // El carrusel animaba en bucle incluso fuera de la pantalla.
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const track = carouselContainer.querySelector('.carousel-track');
        new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (track) track.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
            });
        }, { threshold: 0 }).observe(carouselContainer);
    }

    document.querySelectorAll('.service-card').forEach((card) => {
        card.addEventListener('pointermove', (e) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - r.left}px`);
            card.style.setProperty('--my', `${e.clientY - r.top}px`);
        });
    });

    const formService = document.getElementById('form-service');
    const serviceChip = document.getElementById('service-chip');
    const serviceChipName = document.getElementById('service-chip-name');
    const serviceChipClear = document.getElementById('service-chip-clear');

    // Antes, al hacer clic en "Cotizar X" el select cambiaba en silencio y
    // el usuario aterrizaba arriba del formulario sin notarlo.
    const setService = (service) => {
        if (!formService || !service) return;
        const option = Array.from(formService.options).find((o) => o.value === service);
        if (!option) return;
        formService.value = service;
        if (serviceChip && serviceChipName) {
            serviceChipName.textContent = option.textContent;
            serviceChip.classList.add('visible');
        }
    };

    if (serviceChipClear) {
        serviceChipClear.addEventListener('click', () => {
            serviceChip.classList.remove('visible');
            if (formService) formService.selectedIndex = 0;
        });
    }

    document.querySelectorAll('.service-card[data-service]').forEach((card) => {
        const cta = card.querySelector('.service-cta');
        if (!cta) return;
        cta.addEventListener('click', () => setService(card.dataset.service));
    });

    // El mensaje de WhatsApp toma el servicio que el usuario venía mirando.
    const waContextual = document.querySelectorAll('.btn-wa[data-wa]');
    document.querySelectorAll('.service-card[data-service]').forEach((card) => {
        card.addEventListener('mouseenter', () => {
            const nombre = card.querySelector('h3')?.textContent?.trim();
            if (!nombre) return;
            waContextual.forEach((el) => {
                el.href = waUrl(`Hola New Tech, vi la sección de ${nombre} y quiero consultar.`);
            });
        });
    });

    // ============================================================
    // Calculadora de presupuesto orientativo
    // Cada servicio muestra sus propias preguntas (ver PRECIOS arriba).
    // ============================================================
    const calcForm = document.getElementById('calc-form');
    if (calcForm) {
        const elTipo = document.getElementById('calc-tipo');
        const elPreguntas = document.getElementById('calc-preguntas');
        const elRange = document.getElementById('calc-range');
        const elTime = document.getElementById('calc-time');
        const elResumen = document.getElementById('calc-resumen');
        const elCta = document.getElementById('calc-cta');

        let servicioActual = null;
        const respuestas = {};

        const fmt = (n) => '$' + (Math.round(n / 10000) * 10000).toLocaleString('es-AR');

        const crearOpcion = (grupo, opcion, multiple) => {
            const id = `calc-${grupo}-${opcion.id}`;
            const wrap = document.createElement('label');
            wrap.className = 'calc-option';
            wrap.setAttribute('for', id);

            const input = document.createElement('input');
            input.type = multiple ? 'checkbox' : 'radio';
            input.name = `calc-${grupo}`;
            input.id = id;
            input.value = opcion.id;
            input.dataset.grupo = grupo;

            const texto = document.createElement('span');
            texto.className = 'calc-option-text';
            const strong = document.createElement('strong');
            strong.textContent = opcion.label;
            texto.appendChild(strong);
            if (opcion.detalle) {
                const small = document.createElement('span');
                small.textContent = opcion.detalle;
                texto.appendChild(small);
            }

            wrap.append(input, texto);
            return wrap;
        };

        // Selector de servicio
        Object.entries(PRECIOS.servicios).forEach(([valor, cfg]) => {
            elTipo.appendChild(crearOpcion('servicio', { id: valor, label: cfg.label }, false));
        });

        const renderPreguntas = () => {
            elPreguntas.innerHTML = '';
            Object.keys(respuestas).forEach((k) => delete respuestas[k]);
            if (!servicioActual) return;

            PRECIOS.servicios[servicioActual].preguntas.forEach((preg) => {
                const multiple = preg.tipo === 'multiple';
                const fs = document.createElement('fieldset');
                fs.className = 'calc-group';

                const legend = document.createElement('legend');
                legend.textContent = preg.label;
                fs.appendChild(legend);

                const cont = document.createElement('div');
                cont.className = 'calc-options';
                preg.opciones.forEach((o) => cont.appendChild(crearOpcion(preg.id, o, multiple)));
                fs.appendChild(cont);

                elPreguntas.appendChild(fs);
                if (multiple) respuestas[preg.id] = [];
            });
        };

        const buscarOpcion = (pregId, opId) => {
            const preg = PRECIOS.servicios[servicioActual].preguntas.find((x) => x.id === pregId);
            return preg ? preg.opciones.find((o) => o.id === opId) : null;
        };

        // Devuelve el detalle elegido, en texto, para el resumen y el correo
        const detalleElegido = () => {
            if (!servicioActual) return [];
            return PRECIOS.servicios[servicioActual].preguntas.map((preg) => {
                const r = respuestas[preg.id];
                if (preg.tipo === 'multiple') {
                    const labels = (r || []).map((id) => buscarOpcion(preg.id, id)?.label).filter(Boolean);
                    return { pregunta: preg.label, valor: labels.length ? labels.join(', ') : 'Ninguno' };
                }
                const op = r ? buscarOpcion(preg.id, r) : null;
                return op ? { pregunta: preg.label, valor: op.label } : null;
            }).filter(Boolean);
        };

        const pintarResumen = () => {
            elResumen.innerHTML = '';
            detalleElegido().forEach((d) => {
                const li = document.createElement('li');
                const k = document.createElement('span');
                k.textContent = d.pregunta.replace(/ \(podés elegir var[ií]a?o?s?\)/i, '');
                const v = document.createElement('strong');
                v.textContent = d.valor;
                li.append(k, v);
                elResumen.appendChild(li);
            });
        };

        const calcular = () => {
            if (!servicioActual) {
                elRange.textContent = 'Elegí un servicio para empezar';
                elTime.textContent = '';
                elResumen.innerHTML = '';
                return;
            }

            const cfg = PRECIOS.servicios[servicioActual];
            pintarResumen();

            // La consultoría cloud no se presupuesta por alcance cerrado
            if (cfg.base === null) {
                elRange.textContent = 'Se cotiza por hora o por proyecto';
                elTime.textContent = 'Depende del relevamiento. Escribinos y lo definimos en una charla de 20 minutos.';
                return;
            }

            const faltan = cfg.preguntas.filter((p) => p.tipo === 'unica' && !respuestas[p.id]);
            if (faltan.length) {
                elRange.textContent = faltan.length === 1
                    ? 'Falta una respuesta'
                    : `Faltan ${faltan.length} respuestas`;
                elTime.textContent = '';
                return;
            }

            let factor = 1;
            let bonus = 0;
            let semanas = 0;

            cfg.preguntas.forEach((preg) => {
                if (preg.tipo === 'multiple') {
                    (respuestas[preg.id] || []).forEach((opId) => {
                        const o = buscarOpcion(preg.id, opId);
                        if (!o) return;
                        bonus += o.factor || 0;
                        semanas += o.semanas || 0;
                    });
                } else {
                    const o = buscarOpcion(preg.id, respuestas[preg.id]);
                    if (!o) return;
                    factor *= o.factor || 1;
                    semanas += o.semanas || 0;
                }
            });

            const centro = cfg.base * factor * (1 + bonus);
            // El piso nunca baja del "desde" publicado
            const min = Math.max(cfg.base, centro * (1 - PRECIOS.margen));
            const max = centro * (1 + PRECIOS.margen);

            const semMin = Math.round(cfg.semanasBase[0] + semanas);
            const semMax = Math.round(cfg.semanasBase[1] + semanas);

            elRange.textContent = `${fmt(min)} a ${fmt(max)}`;
            elTime.textContent = semMin === semMax
                ? `Plazo estimado: unas ${semMin} semanas.`
                : `Plazo estimado: ${semMin} a ${semMax} semanas.`;
        };

        calcForm.addEventListener('change', (e) => {
            const input = e.target;
            if (input.name === 'calc-servicio') {
                servicioActual = input.value;
                renderPreguntas();
                calcular();
                return;
            }
            const grupo = input.dataset.grupo;
            if (!grupo) return;
            if (input.type === 'checkbox') {
                const lista = respuestas[grupo] || [];
                respuestas[grupo] = input.checked
                    ? [...lista, input.value]
                    : lista.filter((v) => v !== input.value);
            } else {
                respuestas[grupo] = input.value;
            }
            calcular();
        });

        // Lleva al formulario con el servicio elegido y el detalle completo
        // escrito en el mensaje, para que no tenga que repetirlo.
        elCta.addEventListener('click', () => {
            if (!servicioActual) return;
            setService(servicioActual);

            const mensaje = document.getElementById('form-message');
            if (!mensaje) return;

            const cfg = PRECIOS.servicios[servicioActual];
            const lineas = [`Consulta desde la calculadora — ${cfg.label}`, ''];
            detalleElegido().forEach((d) => {
                lineas.push(`• ${d.pregunta.replace(/ \(podés elegir var[ií]a?o?s?\)/i, '')}: ${d.valor}`);
            });
            if (elRange.textContent && cfg.base !== null) {
                lineas.push('', `Estimación que me mostró el sitio: ${elRange.textContent}`);
            }
            mensaje.value = lineas.join('\n');
        });
    }

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const successModal = document.getElementById('success-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    let successTrapHandler = null;

    const openSuccessModal = () => {
        lastFocused = document.activeElement;
        successModal.classList.add('active');
        lockScroll();
        successTrapHandler = trapFocus(successModal);
        document.addEventListener('keydown', successTrapHandler);
        if (modalCloseBtn) modalCloseBtn.focus();
    };

    const closeSuccessModal = () => {
        if (!successModal.classList.contains('active')) return;
        successModal.classList.remove('active');
        unlockScroll();
        if (successTrapHandler) {
            document.removeEventListener('keydown', successTrapHandler);
            successTrapHandler = null;
        }
        lastFocused?.focus();
    };

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeSuccessModal);
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) closeSuccessModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        if (caseModal?.classList.contains('active')) closeCaseModal();
        else if (successModal?.classList.contains('active')) closeSuccessModal();
        else if (mobileMenu?.classList.contains('active')) setMenu(false);
    });

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const requiredFields = contactForm.querySelectorAll('[required]');
            let valid = true;
            let firstInvalid = null;
            requiredFields.forEach((field) => {
                const ok = field.checkValidity() && field.value.trim() !== '';
                field.classList.toggle('invalid', !ok);
                field.setAttribute('aria-invalid', String(!ok));
                field.closest('.form-group')?.classList.toggle('has-error', !ok);
                if (!ok) {
                    valid = false;
                    if (!firstInvalid) firstInvalid = field;
                }
            });
            if (!valid) {
                formStatus.textContent = 'Revisá los campos marcados en rojo.';
                formStatus.className = 'form-status error';
                // Llevar al usuario al primer campo con error: antes el aviso
                // aparecía al pie y el campo podía estar fuera de pantalla.
                firstInvalid?.focus();
                firstInvalid?.scrollIntoView({ block: 'center', behavior: 'smooth' });
                return;
            }

            const btnText = contactForm.querySelector('.btn-text');
            const btnSpinner = contactForm.querySelector('.btn-spinner');
            const submitBtn = contactForm.querySelector('.btn-submit');

            btnText.style.display = 'none';
            btnSpinner.style.display = 'inline-block';
            submitBtn.disabled = true;
            // Se limpia solo con clases. Poner display inline acá hacía que
            // .form-status.error nunca pudiera mostrarse (el inline gana).
            formStatus.className = 'form-status';
            formStatus.textContent = '';

            const formData = new FormData(contactForm);
            const endpoint = 'https://formspree.io/f/mvzydwvv';

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    body: formData,
                    headers: { Accept: 'application/json' }
                });

                if (response.ok) {
                    contactForm.reset();
                    openSuccessModal();
                } else {
                    const data = await response.json().catch(() => null);
                    formStatus.textContent = (data && data.errors)
                        ? data.errors.map((err) => err.message).join(', ')
                        : 'Hubo un inconveniente. Por favor intentá de nuevo.';
                    formStatus.classList.add('error');
                }
            } catch {
                formStatus.textContent = 'Error de conexión. Podés escribirnos directamente por WhatsApp.';
                formStatus.classList.add('error');
            } finally {
                btnText.style.display = 'inline-block';
                btnSpinner.style.display = 'none';
                submitBtn.disabled = false;
            }
        });

        contactForm.querySelectorAll('[required]').forEach((field) => {
            field.addEventListener('input', () => field.classList.remove('invalid'));
        });
    }

    // Hash: preselect service from URL
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('servicio');
    if (formService && serviceParam) {
        const match = Array.from(formService.options).find((o) => o.value === serviceParam);
        if (match) formService.value = serviceParam;
    }
});
