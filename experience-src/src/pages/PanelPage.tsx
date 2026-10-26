import { Link } from "react-router-dom";
import { EVENT_WHATSAPP_URL } from "../contact";

const kpis = [
  { label: "Participaciones", value: "438", note: "en una jornada" },
  { label: "Contactos captados", value: "312", note: "71 % de quienes jugaron" },
  { label: "Premios entregados", value: "96", note: "de 120 disponibles" },
  { label: "Tiempo promedio", value: "48 s", note: "por participación" },
];

const hourly = [
  { hour: "10", value: 18 },
  { hour: "11", value: 33 },
  { hour: "12", value: 47 },
  { hour: "13", value: 33 },
  { hour: "14", value: 22 },
  { hour: "15", value: 43 },
  { hour: "16", value: 58 },
  { hour: "17", value: 72 },
  { hour: "18", value: 66 },
  { hour: "19", value: 46 },
];

const prizes = [
  { name: "10% OFF", given: 41, stock: 50 },
  { name: "Merchandising", given: 28, stock: 35 },
  { name: "Premio sorpresa", given: 22, stock: 30 },
  { name: "Premio mayor", given: 5, stock: 5 },
];

const sources = [
  { name: "Ruleta", share: 46 },
  { name: "Raspadita", share: 31 },
  { name: "Trivia", share: 23 },
];

const recent = [
  { name: "Lucía M.", phone: "388 ••• 4721", game: "Ruleta", result: "10% OFF", time: "18:42" },
  { name: "Martín G.", phone: "388 ••• 1098", game: "Trivia", result: "3 de 3", time: "18:39" },
  { name: "Sofía R.", phone: "387 ••• 5530", game: "Raspadita", result: "Merch", time: "18:35" },
  { name: "Joaquín P.", phone: "388 ••• 2287", game: "Ruleta", result: "Seguí jugando", time: "18:31" },
  { name: "Valentina C.", phone: "388 ••• 9014", game: "Raspadita", result: "2x1", time: "18:26" },
];

function downloadSampleCsv() {
  const rows = [
    ["nombre", "whatsapp", "experiencia", "resultado", "hora"],
    ...recent.map((row) => [row.name, row.phone, row.game, row.result, row.time]),
  ];
  const csv = rows
    .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
    .join("\n");
  if (typeof URL.createObjectURL !== "function") return;
  const url = URL.createObjectURL(
    new Blob([`﻿${csv}`], { type: "text/csv;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "contactos-muestra-new-tech.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function PanelPage() {
  const peak = Math.max(...hourly.map((item) => item.value));
  return (
    <div className="demo-container experience-page">
      <div className="page-head">
        <Link className="back-link" to="/">
          ← Todas las experiencias
        </Link>
        <span className="page-index">PANEL DE MUESTRA</span>
      </div>
      <div className="experience-intro">
        <p className="eyebrow">LO QUE RECIBE LA MARCA</p>
        <h1 className="display-title">
          El juego atrae gente.
          <br />
          <em>El panel muestra el resultado.</em>
        </h1>
        <p>
          Así se ven los números de una activación: cuántas personas
          participaron, cuántos contactos quedaron y qué premios salieron. Los
          datos de esta página son ficticios.
        </p>
      </div>

      <section className="panel-board" aria-label="Panel de muestra">
        <div className="panel-board-top">
          <span className="live-dot">EXPO DE MUESTRA · SÁBADO</span>
          <span className="panel-sample-tag">DATOS FICTICIOS</span>
        </div>

        <div className="kpi-grid">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="kpi">
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
              <small>{kpi.note}</small>
            </div>
          ))}
        </div>

        <div className="panel-columns">
          <div className="panel-card">
            <div className="panel-card-head">
              <h2>Participaciones por hora</h2>
              <span>Pico 17 h · {peak}</span>
            </div>
            <div
              className="hour-chart"
              role="img"
              aria-label={`Participaciones por hora entre las 10 y las 19. El pico fue a las 17 con ${peak}.`}
            >
              {hourly.map((item) => (
                <div key={item.hour} className="hour-col">
                  <span
                    className={item.value === peak ? "is-peak" : ""}
                    style={{ height: `${(item.value / peak) * 100}%` }}
                  >
                    <em>{item.value}</em>
                  </span>
                  <small>{item.hour}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card">
            <div className="panel-card-head">
              <h2>Premios entregados</h2>
              <span>96 / 120</span>
            </div>
            <ul className="prize-list">
              {prizes.map((prize) => (
                <li key={prize.name}>
                  <div>
                    <span>{prize.name}</span>
                    <strong>
                      {prize.given}
                      <small> / {prize.stock}</small>
                    </strong>
                  </div>
                  <div className="prize-track">
                    <span
                      style={{ width: `${(prize.given / prize.stock) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="panel-card-head panel-card-sub">
              <h2>Por experiencia</h2>
            </div>
            <div className="source-bar" aria-label="Participaciones por experiencia">
              {sources.map((source) => (
                <span key={source.name} style={{ flexGrow: source.share }}>
                  {source.name} {source.share}%
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="panel-card">
          <div className="panel-card-head">
            <h2>Últimos registros</h2>
            <button
              type="button"
              className="text-action"
              onClick={downloadSampleCsv}
            >
              Descargar CSV de muestra ↓
            </button>
          </div>
          <div className="table-scroll">
            <table className="recent-table">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">WhatsApp</th>
                  <th scope="col">Experiencia</th>
                  <th scope="col">Resultado</th>
                  <th scope="col">Hora</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.phone}</td>
                    <td>{row.game}</td>
                    <td>{row.result}</td>
                    <td>{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <aside className="event-cta" aria-label="Consultar por el panel">
        <div>
          <p className="eyebrow">PARA TU PRÓXIMO EVENTO</p>
          <p className="event-cta-title">
            Elegí la experiencia y recibí los contactos y números al terminar.
          </p>
        </div>
        <a
          className="button-primary"
          href={EVENT_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Consultar por WhatsApp <span aria-hidden="true">↗</span>
        </a>
      </aside>
    </div>
  );
}
