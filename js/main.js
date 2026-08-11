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
