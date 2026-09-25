import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');
const readBytes = (path) => readFile(new URL(path, import.meta.url));

test('publica versiones rastreables en español e inglés', async () => {
    const [es, en] = await Promise.all([read('../index.html'), read('../en/index.html')]);

    assert.match(es, /<html lang="es">/);
    assert.match(en, /<html lang="en">/);
    assert.match(es, /hreflang="en" href="https:\/\/www\.newtech\.net\.ar\/en\/"/);
    assert.match(en, /hreflang="es" href="https:\/\/www\.newtech\.net\.ar\/"/);
    assert.match(en, /rel="canonical" href="https:\/\/www\.newtech\.net\.ar\/en\/"/);
});

test('la portada española sigue una sola narrativa comercial', async () => {
    const html = await read('../index.html');

    for (const id of ['fricciones', 'casos', 'metodo', 'capacidades', 'equipo', 'contacto']) {
        assert.match(html, new RegExp(`id="${id}"`));
    }
    assert.equal((html.match(/class="case-study/g) || []).length, 3);
    assert.equal((html.match(/class="button button-primary"/g) || []).length, 1);
    assert.match(html, /Gabriel Calisaya/);
    assert.match(html, /mapa de fricciones/i);
});

test('elimina componentes que distraen de la contratación', async () => {
    const [es, en] = await Promise.all([read('../index.html'), read('../en/index.html')]);
    const combined = `${es}\n${en}`;

    assert.doesNotMatch(combined, /calculadora|calculator/i);
    assert.doesNotMatch(combined, /theme-toggle|carousel|faq-grid|service-price/i);
    assert.doesNotMatch(combined, /Desde\s*\$|Starting at\s*\$/i);
});

test('usa un sistema visual nuevo y compartido', async () => {
    const [es, en, css] = await Promise.all([
        read('../index.html'),
        read('../en/index.html'),
        read('../css/site-v2.css')
    ]);

    assert.match(es, /css\/site-v2\.css/);
    assert.match(en, /\.\.\/css\/site-v2\.css/);
    assert.match(css, /--signal:\s*#ff4d00/);
    assert.match(css, /\.friction-map/);
    assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
    assert.match(css, /@media\s*\(max-width:\s*760px\)/);
});

test('mantiene contacto accesible y localizado sin enviar durante la prueba', async () => {
    const [es, en, script] = await Promise.all([
        read('../index.html'),
        read('../en/index.html'),
        read('../js/site-v2.js')
    ]);

    assert.match(es, /id="contact-form"/);
    assert.match(en, /id="contact-form"/);
    assert.match(es, /data-success="Recibí tu consulta/);
    assert.match(en, /data-success="Your message is in/);
    assert.match(script, /formspree\.io\/f\/mvzydwvv/);
    assert.match(script, /aria-expanded/);
    assert.match(script, /prefers-reduced-motion/);
});

test('usa el logo oficial en las dos cabeceras', async () => {
    const [es, en, logo] = await Promise.all([
        read('../index.html'),
        read('../en/index.html'),
        readBytes('../img/newtech-logo.png')
    ]);

    assert.ok(logo.byteLength > 1000);
    assert.match(es, /img\/newtech-logo\.png/);
    assert.match(en, /\.\.\/img\/newtech-logo\.png/);
});

test('el footer bilingüe cierra con marca y rutas comerciales reales', async () => {
    const [es, en] = await Promise.all([read('../index.html'), read('../en/index.html')]);

    for (const html of [es, en]) {
        assert.match(html, /class="footer-logo"/);
        assert.match(html, /linkedin\.com\/in\/gabriel-calisaya/);
        assert.match(html, /wa\.me\/5493885187080/);
        assert.match(html, /mailto:contacto@newtech\.net\.ar/);
        assert.match(html, /class="footer-nav"/);
    }
});

test('define una escala tipográfica específica para móviles angostos', async () => {
    const css = await read('../css/site-v2.css');

    assert.match(css, /@media\s*\(max-width:\s*560px\)/);
    assert.match(css, /overflow-wrap:\s*anywhere/);
    assert.match(css, /--mobile-title:/);
    assert.match(css, /\.friction-map\s*\{[^}]*height:\s*620px/s);
});

test('incluye los dos idiomas en el sitemap', async () => {
    const sitemap = await read('../sitemap.xml');

    assert.match(sitemap, /<loc>https:\/\/www\.newtech\.net\.ar\/<\/loc>/);
    assert.match(sitemap, /<loc>https:\/\/www\.newtech\.net\.ar\/en\/<\/loc>/);
    assert.match(sitemap, /<lastmod>2026-09-24<\/lastmod>/);
});

test('la analítica opcional no incluye el proveedor anterior', async () => {
    const [es, en, legalEs, legalEn, script] = await Promise.all([
        read('../index.html'),
        read('../en/index.html'),
        read('../privacidad.html'),
        read('../en/privacy.html'),
        read('../js/site-v2.js')
    ]);

    for (const source of [es, en, legalEs, legalEn, script]) {
        assert.doesNotMatch(source, /Vercel|\/_vercel\/insights\/script\.js|window\.va=/);
    }
    assert.match(legalEs, /<strong>Netlify<\/strong>/);
    assert.match(legalEn, /<strong>Netlify<\/strong>/);
});

test('presenta un perfil técnico bilingüe sin desplazar el criterio de negocio', async () => {
    const [es, en] = await Promise.all([read('../index.html'), read('../en/index.html')]);

    assert.match(es, /<details class="technical-profile"/);
    assert.match(en, /<details class="technical-profile"/);
    assert.match(es, /Ver perfil técnico/);
    assert.match(en, /View technical profile/);

    for (const technology of ['Angular', 'React', 'Next.js', 'TypeScript', '.NET 8', 'Node.js', 'Google Apps Script', 'Unity', 'MindAR', 'Cloudflare']) {
        assert.match(es, new RegExp(technology.replace('.', '\\.')));
    }

    assert.match(es, /Documentación técnica \/ ES \+ EN/);
    assert.match(en, /Technical documentation \/ ES \+ EN/);
    assert.doesNotMatch(`${es}\n${en}`, /Cursor|Claude|ChatGPT/);
});

test('publica políticas de privacidad completas y enlazadas en ambos idiomas', async () => {
    const [es, en, homeEn, sitemap] = await Promise.all([
        read('../privacidad.html'),
        read('../en/privacy.html'),
        read('../en/index.html'),
        read('../sitemap.xml')
    ]);

    assert.match(es, /<html lang="es">/);
    assert.match(en, /<html lang="en">/);
    assert.match(es, /hreflang="en" href="https:\/\/www\.newtech\.net\.ar\/en\/privacy\.html"/);
    assert.match(en, /hreflang="es" href="https:\/\/www\.newtech\.net\.ar\/privacidad\.html"/);
    assert.match(homeEn, /href="privacy\.html">Privacy/);

    for (const section of ['responsable', 'datos', 'finalidades', 'proveedores', 'transferencias', 'conservacion', 'derechos', 'seguridad', 'cookies', 'menores', 'cambios']) {
        assert.match(es, new RegExp(`id="${section}"`));
    }
    for (const section of ['controller', 'data', 'purposes', 'providers', 'transfers', 'retention', 'rights', 'security', 'cookies', 'children', 'changes']) {
        assert.match(en, new RegExp(`id="${section}"`));
    }

    assert.match(sitemap, /<loc>https:\/\/www\.newtech\.net\.ar\/en\/privacy\.html<\/loc>/);
});

test('no activa Google Analytics antes del consentimiento explícito', async () => {
    const [es, en, script] = await Promise.all([
        read('../index.html'),
        read('../en/index.html'),
        read('../js/site-v2.js')
    ]);

    assert.doesNotMatch(es, /googletagmanager\.com\/gtm\.js|googletagmanager\.com\/ns\.html/);
    assert.doesNotMatch(en, /googletagmanager\.com\/gtm\.js|googletagmanager\.com\/ns\.html/);
    assert.match(script, /newtech-analytics-consent/);
    assert.match(script, /consent === 'accepted'/);
    assert.match(script, /GTM-NFLJ33HR/);
    assert.match(es, /id="privacy-panel"/);
    assert.match(en, /id="privacy-panel"/);
    assert.match(es, /data-consent="reject"/);
    assert.match(es, /data-consent="accept"/);
});

test('los formularios funcionan sin JavaScript e informan el tratamiento', async () => {
    const [es, en] = await Promise.all([read('../index.html'), read('../en/index.html')]);

    for (const html of [es, en]) {
        assert.match(html, /<form[^>]+action="https:\/\/formspree\.io\/f\/mvzydwvv"[^>]+method="POST"/);
        assert.match(html, /name="language"/);
        assert.match(html, /name="subject"/);
        assert.match(html, /name="_gotcha"/);
        assert.match(html, /name="privacy-consent"[^>]+required/);
    }

    assert.match(es, /Acepto el tratamiento de mis datos/);
    assert.match(en, /I agree to the processing of my data/);
});

test('la interfaz inglesa no conserva controles escritos en español', async () => {
    const [home, privacy] = await Promise.all([
        read('../en/index.html'),
        read('../en/privacy.html')
    ]);
    const combined = `${home}\n${privacy}`;

    assert.doesNotMatch(combined, /Ver en español|Versión en español|Leer en español|Leer esta política en español/i);
    assert.match(home, /aria-label="Switch to Spanish"/);
    assert.match(home, />Spanish version<\/a>/);
    assert.match(privacy, /aria-label="Read this policy in Spanish"/);
});

test('el menú móvil se cierra al pasar a escritorio y bloquea el fondo cuando está abierto', async () => {
    const [script, css] = await Promise.all([
        read('../js/site-v2.js'),
        read('../css/site-v2.css')
    ]);

    assert.match(script, /document\.body\.classList\.toggle\('menu-open', open\)/);
    assert.match(script, /matchMedia\('\(max-width: 760px\)'\)/);
    assert.match(script, /if \(!event\.matches\) setMenu\(false\)/);
    assert.match(css, /body\.menu-open\s*\{[^}]*overflow:\s*hidden/s);
    assert.match(css, /\.mobile-nav\s*\{[^}]*max-height:\s*calc\(100dvh - var\(--header-height\)\)[^}]*overflow-y:\s*auto[^}]*overscroll-behavior:\s*contain/s);
    assert.match(css, /@media\s*\(min-width:\s*761px\)\s*\{[^}]*\.mobile-nav:not\(\[hidden\]\)\s*\{[^}]*display:\s*none/s);
});

test('las cuatro páginas usan la versión actual de CSS y JavaScript', async () => {
    const pages = await Promise.all([
        read('../index.html'),
        read('../en/index.html'),
        read('../privacidad.html'),
        read('../en/privacy.html')
    ]);

    for (const html of pages) {
        assert.match(html, /site-v2\.css\?v=4/);
        assert.match(html, /site-v2\.js\?v=4/);
    }
});
