/**
 * Converte o texto de duração usado nas matérias (ex.: "1h 30min", "30min") em horas decimais.
 */
export function parseTempoExibicaoParaHoras(tempo: string): number {
  const t = tempo.trim().toLowerCase();
  if (!t) return 0;
  if (t === "30min") return 0.5;
  const comH30 = t.match(/^(\d+(?:\.\d+)?)h\s*30min$/);
  if (comH30) return parseFloat(comH30[1]) + 0.5;
  const soH = t.match(/^(\d+(?:\.\d+)?)h$/);
  if (soH) return parseFloat(soH[1]);
  const soMin = t.match(/^(\d+)\s*min$/);
  if (soMin) return parseInt(soMin[1], 10) / 60;
  const n = parseFloat(t);
  return Number.isFinite(n) ? n : 0;
}
