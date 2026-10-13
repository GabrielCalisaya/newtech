import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("publica bases completas y accesibles para el sorteo de la página web", async () => {
  const [html, buildScript, home] = await Promise.all([
    read("../bases-sorteo/index.html"),
    read("../scripts/build-site.mjs"),
    read("../index.html"),
  ]);

  assert.match(html, /<html lang="es">/);
  assert.match(
    html,
    /rel="canonical" href="https:\/\/www\.newtech\.net\.ar\/bases-sorteo\/"/,
  );
  assert.match(html, /name="robots" content="noindex, follow"/);
  assert.match(html, /13 de octubre de 2026/);
  assert.match(html, /28 de octubre de 2026[^<]*23:59/);
  assert.match(html, /30 de octubre de 2026[^<]*20:00/);
  assert.match(html, /mayores de 18 años/);
  assert.match(html, /República Argentina/);
  assert.match(html, /Sin obligación de compra/i);
  assert.match(html, /Quiero una página para/);
  assert.match(html, /selección aleatoria/i);
  assert.match(html, /una \(1\) página web personalizada/);
  assert.match(html, /dominio/i);
  assert.match(html, /hosting/i);
  assert.match(html, /dos \(2\) suplentes/);
  assert.match(html, /cuarenta y ocho \(48\) horas/);
  assert.match(html, /1\/N/);
  assert.match(
    html,
    /no está patrocinada, avalada, administrada ni asociada con Instagram/i,
  );
  assert.match(html, /libera a Instagram/i);
  assert.match(html, /href="\.\.\/privacidad\.html"/);
  assert.match(html, /data-field="organizer-tax-id">CUIT 20-40927991-1</);
  assert.match(
    html,
    /Buenos Aires 1330, San Salvador de Jujuy, Jujuy, República Argentina/,
  );
  assert.doesNotMatch(html, /\b(?:PENDIENTE|COMPLETAR|TODO)\b|\{\{/);

  assert.match(buildScript, /"bases-sorteo"/);
  assert.match(home, /href="bases-sorteo\/">Bases del sorteo/);
});
