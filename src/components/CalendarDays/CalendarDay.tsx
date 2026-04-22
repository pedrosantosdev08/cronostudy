const baseDate = new Date(); // Data atual
const days: { name: string; number: number }[] = [];

// Encontra o domingo da semana atual
const sunday = baseDate.getDate() - baseDate.getDay();

for (let i = 0; i < 7; i++) {
  const date = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth(),
    sunday + i,
  );

  // Formata para o nome do dia por extenso
  const dayName = date.toLocaleDateString("pt-BR", { weekday: "long" });
  const dayNumber = date.getDate();

  days.push({
    name: dayName.slice(0, 3),
    number: dayNumber,
  });
}

export const CalendarDays = () => {
  return (
    <div className="text-white flex flex-col lg:flex-row text-2xl gap-1.5 justify-around items-center p-6 border border-white/5 rounded-2xl">
      {days.map((day, index) => (
        <div key={index} className="flex flex-col border-b items-center mb-5">
          <span className="text-white text-3xl capitalize">{day.name}</span>
          <span>{day.number}</span>
        </div>
      ))}
    </div>
  );
};
