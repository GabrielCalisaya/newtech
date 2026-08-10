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
            logo: 'img/logos/logo1.png',
            work: 'Quiz interactivo de Seguridad Vial desarrollado para ExpoJuy 2024, presentado en tótems para el público.',
            result: 'Muy buen recibimiento de quienes lo probaron en la expo.',
            url: 'https://gabrielcalisaya.github.io/Test-de-Seguridad-Vial/'
        },
        {
            id: 'bite',
            name: 'BITE Accesorios',
            logo: 'img/logos/logo2.png',
            work: 'Tienda en Tienda Nube: carga de productos e imágenes, código a medida y automatización de envíos por correo. Documentación y material de uso entregados al cliente.',
            result: 'E-commerce operativo con procesos de venta y envío optimizados.',
            url: 'https://biteaccesoriosoficial.mitiendanube.com/'
        },
        {
            id: 'innoa',
            name: 'INNOA',
            logo: 'img/logos/logo3.png',
            work: 'Desarrollo a demanda como partner técnico: chatbots, páginas web, integraciones y consultoría en tecnología cuando surgen proyectos (la web institucional es de INNOA; con ellos ejecutamos el desarrollo).',
            result: 'Proyectos entregados en conjunto: desde bots hasta sitios y soporte en distintas tecnologías.',
            url: 'https://innoajujuy.com/'
        },
        {
            id: 'casa-jubilado',
            name: 'La Casa del Jubilado',
            logo: 'img/logos/logo4.png',
            work: 'Sistema de recibos con Google Apps Script, automatización de altas (formularios que agendan jubilados), mejoras en flujos de recibos y sitio web con mantenimiento mensual.',
            result: 'Operativa digital más ordenada y menos trabajo manual para la institución.',
            url: 'https://lacasadeljubiladojujuy.com/'
        },
        {
            id: 'lavanderia',
            name: 'Lavandería Esperanza',
            logo: 'img/logos/logo5.png',
            work: 'Formulario de registro de ingreso de ropa y recibos internos automatizados con Google Apps Script (sin sitio web público).',
            result: 'Control diario de prendas y comprobantes sin planillas manuales.',
            url: ''
        },
        {
            id: 'anuario',
            name: 'Kuntur Producciones / Anuario Jujuy',
            logo: 'img/logos/logo6.png',
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

    const caseModal = document.getElementById('case-modal');
    const caseModalClose = document.getElementById('case-modal-close');
    const caseModalLabel = document.getElementById('case-modal-label');
    const caseModalLogo = document.getElementById('case-modal-logo');
    const caseModalWork = document.getElementById('case-modal-work');
    const caseModalResult = document.getElementById('case-modal-result');
    const caseModalLink = document.getElementById('case-modal-link');
    const caseModalCta = document.getElementById('case-modal-cta');

    const openCaseModal = (project) => {
        if (!caseModal || !project) return;
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

        if (caseModalCta) {
            caseModalCta.addEventListener('click', () => closeCaseModal(), { once: true });
        }

        caseModal.removeAttribute('hidden');
        caseModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        caseModalClose?.focus();
    };

    const closeCaseModal = () => {
        if (!caseModal) return;
        caseModal.classList.remove('active');
        caseModal.setAttribute('hidden', '');
        document.body.style.overflow = '';
    };

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
        mobileMenu.classList.toggle('active', open);
        document.body.style.overflow = open ? 'hidden' : '';
        if (hamburger) hamburger.setAttribute('aria-expanded', String(open));
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

    document.querySelectorAll('.services-grid, .faq-grid, .process-steps').forEach((grid) => {
        Array.from(grid.children).forEach((child, i) => {
            child.style.transitionDelay = `${(i % 8) * 0.08}s`;
        });
    });

    document.querySelectorAll('.service-card').forEach((card) => {
        card.addEventListener('pointermove', (e) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - r.left}px`);
            card.style.setProperty('--my', `${e.clientY - r.top}px`);
        });
    });

    const formService = document.getElementById('form-service');

    document.querySelectorAll('.service-card[data-service]').forEach((card) => {
        const cta = card.querySelector('.service-cta');
        if (!cta) return;
        cta.addEventListener('click', () => {
            const service = card.dataset.service;
            if (formService && service) {
                const option = Array.from(formService.options).find((o) => o.value === service);
                if (option) formService.value = service;
            }
        });
    });

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const successModal = document.getElementById('success-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    const openSuccessModal = () => {
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (modalCloseBtn) modalCloseBtn.focus();
    };

    const closeSuccessModal = () => {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
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
            requiredFields.forEach((field) => {
                const ok = field.checkValidity() && field.value.trim() !== '';
                field.classList.toggle('invalid', !ok);
                if (!ok) valid = false;
            });
            if (!valid) {
                formStatus.textContent = 'Por favor completá los campos requeridos correctamente.';
                formStatus.className = 'form-status error';
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
