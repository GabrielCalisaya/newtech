import { Link } from "react-router-dom";
import { EVENT_WHATSAPP_URL } from "../contact";

const demos = [
  {
    number: "01",
    title: "Ruleta de premios",
    kind: "JUEGO INSTANTÁNEO",
    text: "Un momento de expectativa que invita a jugar, celebrar y dejar los datos de participación.",
    action: "Probar ruleta",
    href: "/ruleta",
    className: "card-wheel",
  },
  {
    number: "02",
    title: "Trivia interactiva",
    kind: "JUEGO POR ETAPAS",
    text: "Tres preguntas rápidas, respuesta visual inmediata y un cierre con puntuación.",
    action: "Probar trivia",
    href: "/trivia",
    className: "card-quiz",
  },
  {
    number: "03",
    title: "Objeto 3D interactivo",
    kind: "VISTA DE PRODUCTO",
    text: "Una pieza de marca para explorar con el dedo. Un primer paso hacia experiencias inmersivas.",
    action: "Explorar objeto 3D",
    href: "/3d",
    className: "card-three",
  },
  {
    number: "04",
    title: "Raspadita digital",
    kind: "SORPRESA AL INSTANTE",
    text: "Una tarjeta para raspar con el dedo. Expectativa, premio y registro en pocos segundos.",
    action: "Probar raspadita",
    href: "/raspadita",
    className: "card-scratch",
  },
  {
    number: "05",
    title: "Memotest de productos",
    kind: "JUEGO DE MEMORIA",
    text: "Pares con los productos o íconos de la marca. Se juega en un minuto y deja la marca en la cabeza.",
    action: "Probar memotest",
    href: "/memotest",
    className: "card-memory",
  },
  {
    number: "06",
    title: "Votación en vivo",
    kind: "PANTALLA COMPARTIDA",
    text: "El público vota desde el celular y los resultados se mueven en el televisor del estand.",
    action: "Probar votación",
    href: "/votacion",
    className: "card-vote",
  },
];

const brandValue = [
  {
    number: "01",
    title: "Contactos para seguir la conversación",
    text: "Cada participación puede pedir nombre, WhatsApp y correo, así el vínculo no termina cuando se desarma el estand.",
  },
  {
    number: "02",
    title: "Números del evento",
    text: "Cuántas personas jugaron, qué premios salieron y en qué momentos hubo más movimiento.",
  },
  {
    number: "03",
    title: "Tu marca en cada pantalla",
    text: "Colores, logo, premios y preguntas se adaptan a tu producto y al tema del evento.",
  },
  {
    number: "04",
    title: "Listo para el estand",
    text: "Alcanza con un QR impreso. Si hay un televisor o monitor, la experiencia también se puede ver en grande.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero demo-container">
        <div className="home-hero-copy">
          <p className="eyebrow">
            <span className="orange-dot" /> PORTAFOLIO INTERACTIVO / 2026
          </p>
          <h1 className="display-title">
            Experiencias Digitales <em>para Expos y Eventos.</em>
          </h1>
          <p className="hero-intro">
            Un estand puede ser mucho más que un lugar para mirar. Probá seis
            formas de invitar a participar desde el celular.
          </p>
          <div className="hero-meta">
            <span>06 muestras para explorar</span>
            <span>Sin descargar aplicaciones</span>
            <span>Hechas para el celular</span>
          </div>
        </div>
        <div className="hero-signal" aria-hidden="true">
          <span className="signal-orbit orbit-one" />
          <span className="signal-orbit orbit-two" />
          <span className="signal-core">
            NT<span>↗</span>
          </span>
          <span className="signal-label">
            INTERACCIÓN
            <br />
            EN VIVO
          </span>
        </div>
      </section>
      <section className="demo-container pb-24" aria-labelledby="samples-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">EXPLORÁ / 001—006</p>
            <h2 id="samples-title">Elegí una muestra.</h2>
          </div>
          <p>
            Entrá, jugá y mirá cómo podría sentirse una activación digital en tu
            evento.
          </p>
        </div>
        <div className="sample-grid">
          {demos.map((demo) => (
            <Link
              key={demo.number}
              to={demo.href}
              className={`sample-card ${demo.className}`}
              aria-label={demo.action}
            >
              <div className="card-top">
                <span>{demo.number} / 06</span>
                <span aria-hidden="true">↗</span>
              </div>
              <div className="card-art" aria-hidden="true">
                {demo.number === "01" ? (
                  <div className="mini-wheel">
                    <span>10%</span>
                  </div>
                ) : demo.number === "02" ? (
                  <div className="mini-quiz">
                    <span>?</span>
                    <i />
                    <i />
                    <i />
                  </div>
                ) : demo.number === "03" ? (
                  <div className="mini-object">
                    <span>&lt;/&gt;</span>
                  </div>
                ) : demo.number === "04" ? (
                  <div className="mini-scratch">
                    <span>15%</span>
                    <i />
                  </div>
                ) : demo.number === "05" ? (
                  <div className="mini-memory">
                    <i />
                    <span>★</span>
                    <span>★</span>
                    <i />
                  </div>
                ) : (
                  <div className="mini-vote">
                    <i style={{ height: "78%" }} />
                    <i style={{ height: "46%" }} />
                    <i style={{ height: "62%" }} />
                    <i style={{ height: "30%" }} />
                  </div>
                )}
              </div>
              <div className="card-bottom">
                <p className="eyebrow">{demo.kind}</p>
                <h3>{demo.title}</h3>
                <p>{demo.text}</p>
                <span className="card-action">
                  {demo.action} <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section
        className="demo-container value-section"
        aria-labelledby="value-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">MÁS QUE UN JUEGO</p>
            <h2 id="value-title">Lo que se lleva tu marca.</h2>
          </div>
          <p>
            La experiencia atrae gente al estand. Lo que queda después es lo que
            hace que valga la pena.
          </p>
        </div>
        <div className="value-grid">
          {brandValue.map((item) => (
            <article key={item.number} className="value-item">
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <Link to="/panel" className="panel-link">
          <span>
            <span className="eyebrow">PANEL DE MUESTRA</span>
            <strong>Mirá cómo se ven los números de una activación.</strong>
          </span>
          <span aria-hidden="true">→</span>
        </Link>
      </section>
      <section className="home-cta">
        <div className="demo-container cta-inner">
          <div>
            <p className="eyebrow">IDEAS QUE SE PUEDEN PROBAR</p>
            <h2>
              Una experiencia pensada
              <br />
              <em>para tu marca.</em>
            </h2>
          </div>
          <div className="cta-actions">
            <a
              href={EVENT_WHATSAPP_URL}
              className="button-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablemos de tu evento <span aria-hidden="true">↗</span>
            </a>
            <a href="/#contacto" className="cta-secondary">
              Prefiero escribir un correo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
