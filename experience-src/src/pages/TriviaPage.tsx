import { useState } from "react";
import { Link } from "react-router-dom";
import DemoForm from "../components/DemoForm";

const questions = [
  {
    question: "¿Qué permite un código QR en un estand?",
    options: [
      "Abrir una experiencia desde el celular",
      "Instalar una aplicación automáticamente",
      "Conectar cualquier celular sin internet",
      "Guardar contactos sin permiso",
    ],
    correct: 0,
    fact: "Un QR puede llevar a una experiencia web desde la cámara del celular.",
  },
  {
    question: "¿Qué puede mostrar una experiencia 3D interactiva?",
    options: [
      "Solo una imagen fija",
      "Un producto desde distintos ángulos",
      "Únicamente texto",
      "Un video que no se puede controlar",
    ],
    correct: 1,
    fact: "Un objeto 3D deja explorar formas y detalles con un gesto.",
  },
  {
    question: "¿Qué dato ayuda a medir una activación?",
    options: [
      "El color del fondo",
      "La hora de apertura del navegador",
      "Cuántas personas completaron la experiencia",
      "El modelo de celular de cada visita",
    ],
    correct: 2,
    fact: "Las finalizaciones permiten entender cómo respondió el público.",
  },
];

export default function TriviaPage() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const current = questions[index];
  function choose(answer: number) {
    if (selected !== null) return;
    setSelected(answer);
    if (answer === current.correct) setScore((value) => value + 1);
  }
  function next() {
    if (index === questions.length - 1) setFinished(true);
    else {
      setIndex((value) => value + 1);
      setSelected(null);
    }
  }
  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }
  return (
    <div className="demo-container experience-page">
      <div className="page-head">
        <Link className="back-link" to="/">
          ← Todas las experiencias
        </Link>
        <span className="page-index">MUESTRA 02 / 03</span>
      </div>
      <div className="experience-intro">
        <p className="eyebrow">ACTIVACIÓN / CONOCIMIENTO</p>
        <h1 className="display-title">
          Tres preguntas.
          <br />
          <em>Una gran conversación.</em>
        </h1>
        <p>
          Una trivia breve que invita a participar, aprender algo y compartir el
          resultado.
        </p>
      </div>
      {finished ? (
        <div className="result-grid">
          <div className="result-score">
            <p className="eyebrow">TU RESULTADO</p>
            <strong aria-label={`Puntuación: ${score} de 3`}>
              {score} <small>de 3</small>
            </strong>
            <p>
              {score === 3
                ? "¡Excelente! Dominás la experiencia."
                : "Lo importante es animarse a participar."}
            </p>
            <button className="text-action" type="button" onClick={restart}>
              Volver a jugar ↗
            </button>
          </div>
          <div className="result-form">
            <p className="eyebrow">PARTICIPACIÓN SIMULADA</p>
            <h2>Tu puntaje puede llevarte más lejos.</h2>
            <p>
              En un evento, este paso podría darte acceso a un sorteo. Probá
              cómo sería el registro.
            </p>
            <DemoForm
              nameLabel="Nombre"
              submitLabel="Participar en el sorteo"
              compact
            />
          </div>
        </div>
      ) : (
        <div className="quiz-layout">
          <div className="quiz-main">
            <div className="quiz-progress">
              <span>PREGUNTA {String(index + 1).padStart(2, "0")} / 03</span>
              <span>{Math.round(((index + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="progress-track">
              <span
                style={{ width: `${((index + 1) / questions.length) * 100}%` }}
              />
            </div>
            <h2>{current.question}</h2>
            <div className="quiz-options">
              {current.options.map((option, optionIndex) => (
                <button
                  key={option}
                  type="button"
                  className={`quiz-option ${selected !== null && optionIndex === current.correct ? "is-correct" : ""} ${selected === optionIndex && optionIndex !== current.correct ? "is-wrong" : ""}`}
                  onClick={() => choose(optionIndex)}
                  disabled={selected !== null}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + optionIndex)}
                  </span>
                  <span>{option}</span>
                  <span className="option-marker" aria-hidden="true">
                    {selected !== null && optionIndex === current.correct
                      ? "✓"
                      : selected === optionIndex
                        ? "×"
                        : "↗"}
                  </span>
                </button>
              ))}
            </div>
            {selected !== null && (
              <div className="quiz-feedback" role="status">
                <strong>
                  {selected === current.correct
                    ? "¡Respuesta correcta!"
                    : "Casi. Mirá la respuesta correcta."}
                </strong>
                <p>{current.fact}</p>
                <button className="button-primary" type="button" onClick={next}>
                  {index === questions.length - 1
                    ? "Ver resultado"
                    : "Siguiente pregunta"}{" "}
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
          </div>
          <aside className="quiz-side">
            <span className="large-question-mark" aria-hidden="true">
              ?
            </span>
            <p className="eyebrow">JUGAR / APRENDER / CONECTAR</p>
            <p>
              Las preguntas pueden hablar de tu producto, tu marca o el tema del
              evento.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
