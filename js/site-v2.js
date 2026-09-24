(() => {
    const isEnglish = document.documentElement.lang === 'en';
    const formEndpoint = 'https://formspree.io/f/mvzydwvv';
    const consentKey = 'newtech-analytics-consent';

    const privacyPanel = document.getElementById('privacy-panel');
    const privacyStatus = document.getElementById('privacy-status');

    const readConsent = () => {
        try {
            return localStorage.getItem(consentKey);
        } catch {
            return null;
        }
    };

    const storeConsent = (value) => {
        try {
            localStorage.setItem(consentKey, value);
        } catch {
            // The preference applies to this visit even when storage is blocked.
        }
    };

    const gtag = (...args) => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(args);
    };

    const loadGoogleAnalytics = () => {
        if (window.__newtechGtmLoaded) return;
        window.__newtechGtmLoaded = true;

        gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted'
        });

        window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
        const tag = document.createElement('script');
        tag.async = true;
        tag.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-NFLJ33HR';
        document.head.appendChild(tag);
    };

    const removeAnalyticsCookies = () => {
        const domains = ['', location.hostname, `.${location.hostname.replace(/^www\./, '')}`];
        document.cookie.split(';').forEach((item) => {
            const name = item.split('=')[0].trim();
            if (!name.startsWith('_ga')) return;
            domains.forEach((domain) => {
                const domainPart = domain ? `; domain=${domain}` : '';
                document.cookie = `${name}=; Max-Age=0; path=/${domainPart}; SameSite=Lax`;
            });
        });
    };

    const showPrivacyPanel = (moveFocus = false) => {
        if (!privacyPanel) return;
        privacyPanel.hidden = false;
        requestAnimationFrame(() => privacyPanel.classList.add('is-visible'));
        if (moveFocus) privacyPanel.querySelector('[data-consent="reject"]')?.focus();
    };

    const hidePrivacyPanel = () => {
        if (!privacyPanel) return;
        privacyPanel.classList.remove('is-visible');
        window.setTimeout(() => {
            privacyPanel.hidden = true;
        }, 220);
    };

    const applyConsent = (consent) => {
        storeConsent(consent);
        if (consent === 'accepted') {
            loadGoogleAnalytics();
        } else {
            if (window.dataLayer) {
                gtag('consent', 'update', {
                    analytics_storage: 'denied',
                    ad_storage: 'denied',
                    ad_user_data: 'denied',
                    ad_personalization: 'denied'
                });
            }
            removeAnalyticsCookies();
        }

        if (privacyStatus) {
            privacyStatus.textContent = consent === 'accepted'
                ? (isEnglish ? 'Analytics enabled.' : 'Analítica habilitada.')
                : (isEnglish ? 'Optional analytics rejected.' : 'Analítica opcional rechazada.');
        }
        hidePrivacyPanel();
    };

    const consent = readConsent();
    if (consent === 'accepted') loadGoogleAnalytics();
    if (consent !== 'accepted' && consent !== 'rejected') showPrivacyPanel();

    document.querySelectorAll('[data-consent]').forEach((button) => {
        button.addEventListener('click', () => {
            applyConsent(button.dataset.consent === 'accept' ? 'accepted' : 'rejected');
        });
    });

    document.querySelectorAll('[data-open-privacy]').forEach((button) => {
        button.addEventListener('click', () => showPrivacyPanel(true));
    });

    const header = document.getElementById('site-header');
    const menuButton = document.querySelector('.menu-button');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileBreakpoint = window.matchMedia('(max-width: 760px)');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const setMenu = (open) => {
        if (!menuButton || !mobileNav) return;
        menuButton.setAttribute('aria-expanded', String(open));
        mobileNav.hidden = !open;
        document.body.classList.toggle('menu-open', open);
    };

    menuButton?.addEventListener('click', () => {
        setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    mobileNav?.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setMenu(false);
    });

    mobileBreakpoint.addEventListener('change', (event) => {
        if (!event.matches) setMenu(false);
    });

    const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());

    if (!prefersReducedMotion.matches) {
        document.querySelectorAll('.map-node').forEach((node, index) => {
            node.animate(
                [
                    { translate: '0 0' },
                    { translate: index % 2 ? '0 -4px' : '0 4px' },
                    { translate: '0 0' }
                ],
                { duration: 3600 + (index * 320), iterations: Infinity, easing: 'ease-in-out' }
            );
        });
    }

    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    if (!form) return;
    form.noValidate = true;

    form.querySelectorAll('[required]').forEach((field) => {
        const clearError = () => {
            field.removeAttribute('aria-invalid');
            status?.classList.remove('is-error');
        };
        field.addEventListener('input', clearError);
        field.addEventListener('change', clearError);
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!status) return;

        const required = [...form.querySelectorAll('[required]')];
        const invalid = required.filter((field) => !field.checkValidity());
        required.forEach((field) => field.setAttribute('aria-invalid', String(invalid.includes(field))));

        if (invalid.length) {
            status.textContent = isEnglish
                ? 'Please complete the highlighted fields and accept the privacy notice.'
                : 'Completá los campos marcados y aceptá el aviso de privacidad.';
            status.className = 'form-status is-error';
            invalid[0].focus();
            return;
        }

        const submit = form.querySelector('button[type="submit"]');
        const originalLabel = submit.innerHTML;
        submit.disabled = true;
        submit.setAttribute('aria-busy', 'true');
        submit.textContent = isEnglish ? 'Sending…' : 'Enviando…';
        status.textContent = '';
        status.className = 'form-status';

        try {
            const response = await fetch(form.action || formEndpoint, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            });

            if (!response.ok) {
                const error = new Error('Request failed');
                error.status = response.status;
                throw error;
            }

            form.reset();
            status.textContent = form.dataset.success;
            status.className = 'form-status is-success';
            if (window.dataLayer) window.dataLayer.push({ event: 'contact_form_success' });
        } catch (error) {
            status.textContent = error.status === 429
                ? (isEnglish ? 'Too many attempts. Please wait a moment and try again.' : 'Hubo demasiados intentos. Esperá un momento y volvé a probar.')
                : form.dataset.error;
            status.className = 'form-status is-error';
        } finally {
            submit.disabled = false;
            submit.removeAttribute('aria-busy');
            submit.innerHTML = originalLabel;
        }
    });
})();
