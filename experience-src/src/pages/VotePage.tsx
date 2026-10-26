import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCta from "../components/EventCta";

const options = [
  { id: "ruleta", label: "Ruleta de premios" },
  { id: "trivia", label: "Trivia" },
  { id: "raspadita", label: "Raspadita" },
  { id: "3d", label: "Objeto 3D" },
];

const initialVotes: Record<string, number> = {
  ruleta: 42,
  trivia: 27,
  raspadita: 35,
  "3d": 18,
};

const weights = [0.34, 0.2, 0.3, 0.16];
const TICK_MS = 1400;

function pickWeighted() {
  let roll = Math.random();
  for (let i = 0; i < weights.length; i += 1) {
    roll -= weights[i];
    if (roll <= 0) return options[i].id;
  }
  return options[options.length - 1].id;
}

export default function VotePage() {
  const [votes, setVotes] = useState(initialVotes);
  const [myVote, setMyVote] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const id = pickWeighted();
      setVotes((current) => ({ ...current, [id]: current[id] + 1 }));
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, []);

  function vote(id: string) {
    if (myVote) return;
    setMyVote(id);
    setVotes((current) => ({ ...current, [id]: current[id] + 1 }));
  }

  const total = Object.values(votes).reduce((sum, value) => sum + value, 0);
  const leader = options.reduce((best, option) =>
    votes[option.id] > votes[best.id] ? option : best,
  );

  return (
    <div className="demo-container experience-page">
      <div className="page-head">
        <Link className="back-link" to="/">
          ← Todas las experiencias
        </Link>
        <span className="page-index">MUESTRA 06 / 06</span>
      </div>
      <div className="experience-intro">
        <p className="eyebrow">ACTIVACIÓN / EN VIVO</p>
        <h1 className="display-title">
          Votan desde el celular.
          <br />
          <em>Se ve en la pantalla.</em>
        </h1>
        <p>
          Una votación en vivo que conecta al público con el televisor del
          estand. Cada voto mueve las barras al instante y atrae a quien pasa
          cerca.
        </p>
      </div>
      <div className="wheel-layout">
        <div className="vote-screen">
          <div className="vote-screen-top">
            <span className="live-dot">EN VIVO</span>
            <span>PANTALLA DEL ESTAND</span>
          </div>
          <h2 className="vote-question">
            ¿Qué te gustaría probar primero en tu estand?
          </h2>
          <ul className="vote-bars" aria-label="Resultados de la votación">
            {options.map((option) => {
              const share = total ? votes[option.id] / total : 0;
              const isLeader = option.id === leader.id;
              return (
                <li
                  key={option.id}
                  className={`${isLeader ? "is-leader" : ""} ${myVote === option.id ? "is-mine" : ""}`}
                >
                  <div className="vote-bar-label">
                    <span>
                      {option.label}
                      {myVote === option.id && (
                        <small className="vote-mine-tag">TU VOTO</small>
                      )}
                    </span>
                    <strong>{Math.round(share * 100)}%</strong>
                  </div>
                  <div className="vote-track">
                    <span style={{ width: `${share * 100}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="vote-total" aria-live="polite">
            <strong>{total}</strong> votos · Va ganando {leader.label}
          </p>
        </div>
        <aside className="experience-panel vote-panel">
          <div className="panel-top">
            <span>06</span>
            <span>TU CELULAR ↗</span>
          </div>
          <div>
            <p className="eyebrow">ELEGÍ UNA OPCIÓN</p>
            <h2>
              Un voto.
              <br />
              <em>Todos lo ven.</em>
            </h2>
            {myVote ? (
              <div className="vote-thanks" role="status">
                <span className="success-check" aria-hidden="true">
                  ✓
                </span>
                <p>
                  ¡Gracias por votar! Mirá cómo se mueve tu opción en la
                  pantalla.
                </p>
              </div>
            ) : (
              <div className="vote-options">
                {options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className="quiz-option"
                    onClick={() => vote(option.id)}
                  >
                    <span>{option.label}</span>
                    <span className="option-marker" aria-hidden="true">
                      ↗
                    </span>
                  </button>
                ))}
              </div>
            )}
            <p className="panel-footnote">
              Votos simulados para la muestra. En un evento, cada celular vota
              una vez.
            </p>
          </div>
        </aside>
      </div>
      <EventCta title="Una votación en vivo con las preguntas y la pantalla de tu marca." />
    </div>
  );
}
