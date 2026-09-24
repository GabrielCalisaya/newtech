import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DemoDialog from "../components/DemoDialog";
import DemoForm from "../components/DemoForm";

const prizes = [
  { name: "10% OFF", label: ["10%", "OFF"], fill: "#fa5b20", text: "#101217" },
  { name: "Merchandising", label: ["MERCH"], fill: "#f2ede3", text: "#101217" },
  {
    name: "Premio Sorpresa",
    label: ["PREMIO", "SORPRESA"],
    fill: "#899abf",
    text: "#101217",
  },
  {
    name: "Premio Mayor",
    label: ["PREMIO", "MAYOR"],
    fill: "#d0d7ce",
    text: "#101217",
  },
  {
    name: "Sigue Participando",
    label: ["SEGUÍ", "JUGANDO"],
    fill: "#313948",
    text: "#ffffff",
  },
];

function polar(angle: number, radius: number) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: 200 + Math.cos(radians) * radius,
    y: 200 + Math.sin(radians) * radius,
  };
}

function WheelGraphic({
  rotation,
  spinning,
}: {
  rotation: number;
  spinning: boolean;
}) {
  return (
    <div className="wheel-outer">
      <div className="wheel-pointer" aria-hidden="true" />
      <svg
        className={`wheel-svg ${spinning ? "is-spinning" : ""}`}
        style={{ transform: `rotate(${rotation}deg)` }}
        viewBox="0 0 400 400"
        role="img"
        aria-label="Ruleta con cinco premios ficticios"
      >
        <circle cx="200" cy="200" r="198" fill="#151a21" />
        {prizes.map((prize, index) => {
          const start = polar(-90 + index * 72, 184);
          const end = polar(-90 + (index + 1) * 72, 184);
          const center = polar(-54 + index * 72, 111);
          return (
            <g key={prize.name}>
              <path
                d={`M 200 200 L ${start.x} ${start.y} A 184 184 0 0 1 ${end.x} ${end.y} Z`}
                fill={prize.fill}
                stroke="#11151b"
                strokeWidth="3"
              />
              <text
                x={center.x}
                y={center.y - (prize.label.length - 1) * 8}
                textAnchor="middle"
                fill={prize.text}
                fontSize={prize.label.length > 1 ? 16 : 17}
                fontWeight="800"
                fontFamily="Outfit, sans-serif"
                letterSpacing="0.3"
              >
                {prize.label.map((line, lineIndex) => (
                  <tspan key={line} x={center.x} dy={lineIndex === 0 ? 0 : 19}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
        <circle
          cx="200"
          cy="200"
          r="33"
          fill="#11151b"
          stroke="#f7f2e7"
          strokeWidth="6"
        />
        <text
          x="200"
          y="208"
          textAnchor="middle"
          fill="#fa5b20"
          fontSize="26"
          fontWeight="800"
          fontFamily="Sora, sans-serif"
        >
          NT
        </text>
      </svg>
    </div>
  );
}

export default function WheelPage() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<string | null>(null);
  const timeout = useRef<number | null>(null);
  useEffect(
    () => () => {
      if (timeout.current !== null) window.clearTimeout(timeout.current);
    },
    [],
  );
  function spin() {
    if (spinning) return;
    const index = Math.floor(Math.random() * prizes.length);
    const target = 360 - (index * 72 + 36);
    setWonPrize(null);
    setSpinning(true);
    setRotation(
      (current) => current + 1800 + ((target - (current % 360) + 360) % 360),
    );
    timeout.current = window.setTimeout(() => {
      setSpinning(false);
      setWonPrize(prizes[index].name);
    }, 3600);
  }
  return (
    <div className="demo-container experience-page">
      <div className="page-head">
        <Link className="back-link" to="/">
          ← Todas las experiencias
        </Link>
        <span className="page-index">MUESTRA 01 / 03</span>
      </div>
      <div className="experience-intro">
        <p className="eyebrow">ACTIVACIÓN / PREMIOS</p>
        <h1 className="display-title">
          La suerte también
          <br />
          <em>atrae miradas.</em>
        </h1>
        <p>
          Una ruleta digital para transformar una visita breve en un momento que
          se recuerda. Probá una vuelta.
        </p>
      </div>
      <div className="wheel-layout">
        <div className="wheel-stage">
          <div className="stage-grid" aria-hidden="true" />
          <WheelGraphic rotation={rotation} spinning={spinning} />
          <p className="stage-caption">UN GIRO · UN MOMENTO · UNA HISTORIA</p>
        </div>
        <aside className="experience-panel">
          <div className="panel-top">
            <span>01</span>
            <span>DEMO INTERACTIVA ↗</span>
          </div>
          <div>
            <p className="eyebrow">CÓMO FUNCIONA</p>
            <h2>
              Girás.
              <br />
              Descubrís.
              <br />
              <em>Participás.</em>
            </h2>
            <p>
              En un estand real, los premios, cantidades y reglas se definen con
              la marca y el evento.
            </p>
            <button
              type="button"
              className="button-primary w-full justify-center"
              onClick={spin}
              disabled={spinning}
            >
              {spinning ? "La ruleta está girando…" : "¡Girar ruleta!"}{" "}
              <span aria-hidden="true">↗</span>
            </button>
            <p className="panel-footnote">
              Premios ficticios. Podés volver a girar cuando quieras.
            </p>
          </div>
        </aside>
      </div>
      {wonPrize && (
        <DemoDialog
          title={
            wonPrize === "Sigue Participando"
              ? "¡Seguí participando!"
              : `¡Felicidades! Ganaste ${wonPrize}.`
          }
          onClose={() => setWonPrize(null)}
        >
          {wonPrize === "Sigue Participando" ? (
            <>
              <p className="dialog-lead">
                Esta vuelta no tuvo premio. La ruleta de muestra te deja probar
                otra vez.
              </p>
              <button
                className="button-primary w-full justify-center"
                type="button"
                onClick={() => setWonPrize(null)}
              >
                Volver a girar <span aria-hidden="true">↗</span>
              </button>
            </>
          ) : (
            <>
              <p className="dialog-lead">
                Así se vería el registro para reclamarlo. Completá datos de
                prueba para continuar.
              </p>
              <DemoForm submitLabel="Reclamar premio" />
            </>
          )}
        </DemoDialog>
      )}
    </div>
  );
}
