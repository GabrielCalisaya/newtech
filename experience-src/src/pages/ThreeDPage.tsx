import { useState } from "react";
import { Link } from "react-router-dom";
import "@google/model-viewer";
import DemoDialog from "../components/DemoDialog";
import DemoForm from "../components/DemoForm";

export default function ThreeDPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="demo-container experience-page">
      <div className="page-head">
        <Link className="back-link" to="/">
          ← Todas las experiencias
        </Link>
        <span className="page-index">MUESTRA 03 / 03</span>
      </div>
      <div className="experience-intro">
        <p className="eyebrow">ACTIVACIÓN / OBJETO DIGITAL</p>
        <h1 className="display-title">
          Una marca que
          <br />
          <em>podés explorar.</em>
        </h1>
        <p>
          Arrastrá con el dedo para girar la pieza. Esta muestra enseña una
          vista 3D interactiva; la cámara y la realidad aumentada pueden ser una
          etapa futura.
        </p>
      </div>
      <div className="model-layout">
        <div className="model-stage">
          <div className="model-stage-grid" aria-hidden="true" />
          <span className="model-corner corner-top">VISTA 3D / NEW TECH</span>
          <model-viewer
            src="/experiencias/newtech-object.glb"
            poster="/img/newtech-logo.png"
            alt="Pieza tridimensional con el logo New Tech"
            camera-controls
            camera-orbit="0deg 75deg auto"
            shadow-intensity="0.8"
            exposure="1.2"
            interaction-prompt="none"
            touch-action="pan-y"
            loading="eager"
          />
          <span className="model-corner corner-bottom">
            ↔ ARRASTRÁ PARA GIRAR
          </span>
        </div>
        <aside className="model-info">
          <div className="panel-top">
            <span>03</span>
            <span>OBJETO INTERACTIVO ↗</span>
          </div>
          <div>
            <p className="eyebrow">SIN INSTALAR NADA</p>
            <h2>
              La curiosidad
              <br />
              empieza con
              <br />
              <em>un gesto.</em>
            </h2>
            <p>
              Productos, personajes o piezas de marca pueden presentarse en 3D
              desde una página web. Cada evento puede tener su propia historia
              visual.
            </p>
            <div className="feature-lines">
              <span>01 / Tocá y girá</span>
              <span>02 / Explorá los detalles</span>
              <span>03 / Imaginá tu marca</span>
            </div>
            <button
              className="button-primary w-full justify-center"
              type="button"
              onClick={() => setOpen(true)}
            >
              Acceder a la experiencia <span aria-hidden="true">↗</span>
            </button>
            <p className="panel-footnote">
              Esta demo no usa la cámara ni activa RA.
            </p>
          </div>
        </aside>
      </div>
      {open && (
        <DemoDialog title="Acceso de muestra" onClose={() => setOpen(false)}>
          <p className="dialog-lead">
            Probá cómo sería el acceso a una experiencia exclusiva para
            visitantes.
          </p>
          <DemoForm submitLabel="Acceder a la muestra" />
        </DemoDialog>
      )}
    </div>
  );
}
