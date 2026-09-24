import { Link } from "react-router-dom";

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
            Un estand puede ser mucho más que un lugar para mirar. Probá tres
            formas de invitar a participar desde el celular.
          </p>
          <div className="hero-meta">
            <span>03 muestras para explorar</span>
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
            <p className="eyebrow">EXPLORÁ / 001—003</p>
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
                <span>{demo.number} / 03</span>
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
                ) : (
                  <div className="mini-object">
                    <span>&lt;/&gt;</span>
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
          <a href="/#contacto" className="button-primary">
            Hablemos de tu evento <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}
