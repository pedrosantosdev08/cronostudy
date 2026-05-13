export type DiaCalendarioSemana = { name: string; number: number; fullName: string };

/** Segunda → domingo; `name` = 3 primeiras letras do weekday (igual às matérias no cronograma). */
export function getSemanaCorrenteDiasCompleto(): DiaCalendarioSemana[] {
  const baseDate = new Date();
  const monday = baseDate.getDate() - baseDate.getDay() + 1;
  const out: DiaCalendarioSemana[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(baseDate.getFullYear(), baseDate.getMonth(), monday + i);
    const fullName = date.toLocaleDateString("pt-BR", { weekday: "long" });
    out.push({
      name: fullName.slice(0, 3),
      number: date.getDate(),
      fullName,
    });
  }
  return out;
}
