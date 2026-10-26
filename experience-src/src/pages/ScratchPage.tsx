import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { Link } from "react-router-dom";
import DemoDialog from "../components/DemoDialog";
import DemoForm from "../components/DemoForm";
import EventCta from "../components/EventCta";

const prizes = [
  { name: "15% OFF", detail: "en tu próxima compra" },
  { name: "Merchandising", detail: "retiralo en el estand" },
  { name: "2x1", detail: "en productos seleccionados" },
  { name: "Seguí participando", detail: "probá otra vez" },
];

const NO_PRIZE = "Seguí participando";
const REVEAL_RATIO = 0.5;
const BRUSH = 28;

function pickPrize() {
  return prizes[Math.floor(Math.random() * prizes.length)];
}

function paintCover(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));
  const ratio = window.devicePixelRatio || 1;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  let ctx: CanvasRenderingContext2D | null = null;
  try {
    ctx = canvas.getContext("2d");
  } catch {
    ctx = null;
  }
  if (!ctx) return null;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#c9ccd1");
  gradient.addColorStop(0.45, "#eef0f2");
  gradient.addColorStop(0.55, "#b9bdc4");
  gradient.addColorStop(1, "#dfe2e6");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#ffffff55";
  ctx.lineWidth = 1;
  for (let x = -height; x < width; x += 14) {
    ctx.beginPath();
    ctx.moveTo(x, height);
    ctx.lineTo(x + height, 0);
    ctx.stroke();
  }
  ctx.fillStyle = "#4a515c";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "800 26px Sora, sans-serif";
  ctx.fillText("RASPÁ AQUÍ", width / 2, height / 2 - 12);
  ctx.font = "400 12px JetBrainsMono, monospace";
  ctx.fillText("CON EL DEDO O EL MOUSE", width / 2, height / 2 + 20);
  return ctx;
}

function clearedRatio(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const { width, height } = canvas;
  if (!width || !height) return 0;
  const data = ctx.getImageData(0, 0, width, height).data;
  let cleared = 0;
  let total = 0;
  for (let i = 3; i < data.length; i += 4 * 24) {
    total += 1;
    if (data[i] < 64) cleared += 1;
  }
  return total ? cleared / total : 0;
}

export default function ScratchPage() {
  const [prize, setPrize] = useState(pickPrize);
  const [revealed, setRevealed] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [round, setRound] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const strokes = useRef(0);
  const timeout = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctxRef.current = paintCover(canvas);
  }, [round]);

  useEffect(
    () => () => {
      if (timeout.current !== null) window.clearTimeout(timeout.current);
    },
    [],
  );

  const reveal = useCallback(() => {
    if (revealed) return;
    setRevealed(true);
    drawing.current = false;
    timeout.current = window.setTimeout(() => setDialogOpen(true), 700);
  }, [revealed]);

  function pointFrom(event: PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function scratchTo(point: { x: number; y: number }) {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = BRUSH * 2;
    ctx.beginPath();
    const from = lastPoint.current ?? point;
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastPoint.current = point;
    strokes.current += 1;
    if (strokes.current % 8 === 0 && canvasRef.current) {
      if (clearedRatio(canvasRef.current, ctx) >= REVEAL_RATIO) reveal();
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLCanvasElement>) {
    if (revealed) return;
    drawing.current = true;
    lastPoint.current = null;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    scratchTo(pointFrom(event));
  }

  function handlePointerMove(event: PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current || revealed) return;
    scratchTo(pointFrom(event));
  }

  function handlePointerUp() {
    drawing.current = false;
    lastPoint.current = null;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!revealed && canvas && ctx && clearedRatio(canvas, ctx) >= REVEAL_RATIO)
      reveal();
  }

  function playAgain() {
    if (timeout.current !== null) window.clearTimeout(timeout.current);
    setDialogOpen(false);
    setRevealed(false);
    setPrize(pickPrize());
    strokes.current = 0;
    setRound((value) => value + 1);
  }

  const noPrize = prize.name === NO_PRIZE;

  return (
    <div className="demo-container experience-page">
      <div className="page-head">
        <Link className="back-link" to="/">
          ← Todas las experiencias
        </Link>
        <span className="page-index">MUESTRA 04 / 04</span>
      </div>
      <div className="experience-intro">
        <p className="eyebrow">ACTIVACIÓN / SORPRESA</p>
        <h1 className="display-title">
          Raspá con el dedo.
          <br />
          <em>Descubrí tu premio.</em>
        </h1>
        <p>
          Una raspadita digital que convierte la espera en expectativa. Cada
          persona descubre su premio desde el celular, sin cartones ni
          monedas.
        </p>
      </div>
      <div className="wheel-layout">
        <div className="wheel-stage scratch-stage">
          <div className="stage-grid" aria-hidden="true" />
          <div className="scratch-ticket">
            <div className="ticket-head">
              <span>NEW TECH</span>
              <span>TICKET Nº {String(round + 1).padStart(3, "0")}</span>
            </div>
            <div className="scratch-area">
              <div
                className={`scratch-prize ${noPrize ? "is-empty" : ""}`}
                aria-live="polite"
              >
                {!revealed && <span className="sr-only">Premio oculto</span>}
                <strong aria-hidden={!revealed}>{prize.name}</strong>
                <span aria-hidden={!revealed}>{prize.detail}</span>
              </div>
              <canvas
                key={round}
                ref={canvasRef}
                className={`scratch-cover ${revealed ? "is-revealed" : ""}`}
                aria-hidden="true"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onPointerLeave={() => {
                  drawing.current = false;
                  lastPoint.current = null;
                }}
              />
            </div>
            <p className="ticket-foot">PREMIOS FICTICIOS · DEMO</p>
          </div>
          <p className="stage-caption">UN GESTO · UNA SORPRESA · UN CONTACTO</p>
        </div>
        <aside className="experience-panel">
          <div className="panel-top">
            <span>04</span>
            <span>DEMO INTERACTIVA ↗</span>
          </div>
          <div>
            <p className="eyebrow">CÓMO FUNCIONA</p>
            <h2>
              Raspás.
              <br />
              Descubrís.
              <br />
              <em>Reclamás.</em>
            </h2>
            <p>
              En un evento real, la marca define los premios, cuántos hay de
              cada uno y qué datos se piden para reclamarlos.
            </p>
            {revealed ? (
              <button
                type="button"
                className="button-primary w-full justify-center"
                onClick={playAgain}
              >
                Nueva raspadita <span aria-hidden="true">↗</span>
              </button>
            ) : (
              <button
                type="button"
                className="button-primary w-full justify-center"
                onClick={reveal}
              >
                Revelar premio <span aria-hidden="true">↗</span>
              </button>
            )}
            <p className="panel-footnote">
              Raspá la tarjeta o tocá el botón para ver el resultado.
            </p>
          </div>
        </aside>
      </div>
      <EventCta title="Una raspadita con los premios y la imagen de tu marca." />
      {dialogOpen && (
        <DemoDialog
          title={
            noPrize ? "¡Seguí participando!" : `¡Felicidades! Ganaste ${prize.name}.`
          }
          onClose={() => setDialogOpen(false)}
        >
          {noPrize ? (
            <>
              <p className="dialog-lead">
                Esta tarjeta no tenía premio. En la muestra podés raspar otra.
              </p>
              <button
                className="button-primary w-full justify-center"
                type="button"
                onClick={playAgain}
              >
                Raspar otra tarjeta <span aria-hidden="true">↗</span>
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
