import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DemoForm from "../components/DemoForm";
import EventCta from "../components/EventCta";

const symbols = [
  { id: "qr", label: "QR", name: "Código QR" },
  { id: "off", label: "10%", name: "Descuento" },
  { id: "gift", label: "🎁", name: "Regalo" },
  { id: "three", label: "3D", name: "Objeto 3D" },
  { id: "brand", label: "NT", name: "Logo de marca" },
  { id: "star", label: "★", name: "Estrella" },
];

type Card = { key: number; pair: string; label: string; name: string };

function shuffledDeck(): Card[] {
  const deck = symbols.flatMap((symbol, index) => [
    { key: index * 2, pair: symbol.id, label: symbol.label, name: symbol.name },
    {
      key: index * 2 + 1,
      pair: symbol.id,
      label: symbol.label,
      name: symbol.name,
    },
  ]);
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export default function MemoryPage() {
  const [deck, setDeck] = useState(shuffledDeck);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const timeout = useRef<number | null>(null);
  const finished = matched.length === symbols.length;

  useEffect(
    () => () => {
      if (timeout.current !== null) window.clearTimeout(timeout.current);
    },
    [],
  );

  function flip(index: number) {
    if (flipped.length === 2 || flipped.includes(index)) return;
    if (matched.includes(deck[index].pair)) return;
    const next = [...flipped, index];
    setFlipped(next);
    if (next.length < 2) return;
    setMoves((value) => value + 1);
    const [first, second] = next;
    if (deck[first].pair === deck[second].pair) {
      setMatched((value) => [...value, deck[first].pair]);
      setFlipped([]);
    } else {
      timeout.current = window.setTimeout(() => setFlipped([]), 850);
    }
  }

  function restart() {
    if (timeout.current !== null) window.clearTimeout(timeout.current);
    setDeck(shuffledDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  }

  return (
    <div className="demo-container experience-page">
      <div className="page-head">
        <Link className="back-link" to="/">
          ← Todas las experiencias
        </Link>
        <span className="page-index">MUESTRA 05 / 06</span>
      </div>
      <div className="experience-intro">
        <p className="eyebrow">ACTIVACIÓN / PRODUCTO</p>
        <h1 className="display-title">
          Encontrá los pares.
          <br />
          <em>Recordá la marca.</em>
        </h1>
        <p>
          Un memotest con los productos o íconos de tu marca. Mientras juegan,
          los visitantes aprenden lo que ofrecés sin darse cuenta.
        </p>
      </div>
      <div className="wheel-layout">
        <div className="wheel-stage memory-stage">
          <div className="stage-grid" aria-hidden="true" />
          <div className="memory-status" aria-live="polite">
            <span>
              PARES {String(matched.length).padStart(2, "0")} / 06
            </span>
            <span>MOVIMIENTOS {String(moves).padStart(2, "0")}</span>
          </div>
          <div className="memory-grid">
            {deck.map((card, index) => {
              const isMatched = matched.includes(card.pair);
              const isOpen = isMatched || flipped.includes(index);
              return (
                <button
                  key={card.key}
                  type="button"
                  className={`memory-card ${isOpen ? "is-open" : ""} ${isMatched ? "is-matched" : ""}`}
                  data-pair={card.pair}
                  aria-label={isOpen ? card.name : `Carta ${index + 1}, oculta`}
                  aria-pressed={isOpen}
                  onClick={() => flip(index)}
                  disabled={isMatched}
                >
                  <span className="memory-inner" aria-hidden="true">
                    <span className="memory-face memory-back">NT</span>
                    <span className="memory-face memory-front">
                      {card.label}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <p className="stage-caption">MIRAR · RECORDAR · ENCONTRAR</p>
        </div>
        <aside className="experience-panel">
          <div className="panel-top">
            <span>05</span>
            <span>DEMO INTERACTIVA ↗</span>
          </div>
          {finished ? (
            <div role="status">
              <p className="eyebrow">¡COMPLETASTE EL TABLERO!</p>
              <h2>
                {moves} movimientos.
                <br />
                <em>{moves <= 8 ? "Memoria de campeón." : "¡Bien jugado!"}</em>
              </h2>
              <p>
                En un evento, completar el tablero podría sumarte a un sorteo.
                Probá cómo sería el registro.
              </p>
              <DemoForm
                nameLabel="Nombre"
                submitLabel="Participar en el sorteo"
                compact
              />
              <button
                className="text-action mt-6"
                type="button"
                onClick={restart}
              >
                Jugar otra vez ↗
              </button>
            </div>
          ) : (
            <div>
              <p className="eyebrow">CÓMO FUNCIONA</p>
              <h2>
                Tocás.
                <br />
                Recordás.
                <br />
                <em>Encontrás.</em>
              </h2>
              <p>
                Las cartas pueden mostrar productos, sabores, servicios o
                personajes de la marca. También se puede sumar un tiempo límite.
              </p>
              <button
                type="button"
                className="button-primary w-full justify-center"
                onClick={restart}
              >
                Mezclar de nuevo <span aria-hidden="true">↗</span>
              </button>
              <p className="panel-footnote">
                Encontrá los seis pares para ver el cierre.
              </p>
            </div>
          )}
        </aside>
      </div>
      <EventCta title="Un memotest con los productos y la imagen de tu marca." />
    </div>
  );
}
