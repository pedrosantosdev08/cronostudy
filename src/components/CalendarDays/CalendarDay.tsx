const baseDate = new Date();
const days: { name: string; number: number; fullName: string }[] = [];
const monday = baseDate.getDate() - baseDate.getDay() + 1;

for (let i = 0; i < 7; i++) {
  const date = new Date(baseDate.getFullYear(), baseDate.getMonth(), monday + i);
  const dayName = date.toLocaleDateString("pt-BR", { weekday: "long" });
  const dayNumber = date.getDate();

  days.push({
    name: dayName.slice(0, 3),
    number: dayNumber,
    fullName: dayName,
  });
}

interface CalendarDaysProps {
  onSelectDay: (dayName: string) => void;
  diaAtivo: string;
}

export const CalendarDays = ({ onSelectDay, diaAtivo }: CalendarDaysProps) => {
  return (
    <div className="w-full">
      {/* Mobile: Flex com Scroll 
          Desktop (lg): Grid com 7 colunas (grid-cols-7)
      */}
      <div className="flex lg:grid lg:grid-cols-7 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-3 snap-x snap-mandatory no-scrollbar">
        {days.map((day, index) => {
          const isSelected = diaAtivo === day.name;
          
          return (
            <button 
              key={index} 
              onClick={() => onSelectDay(day.name)}
              className={`
                snap-center shrink-0 lg:shrink
                relative flex flex-col items-center justify-center 
                w-16 h-20 lg:w-full lg:h-24 rounded-2xl cursor-pointer 
                transition-all duration-300 outline-none
                ${isSelected 
                  ? "bg-purple-600 shadow-lg shadow-purple-900/40 scale-100 lg:scale-105" 
                  : "bg-white/5 border border-white/5 hover:bg-white/10"
                }
              `}
            >
              <span className={`
                text-[10px] lg:text-xs font-bold uppercase tracking-widest mb-1
                ${isSelected ? "text-purple-100" : "text-gray-500"}
              `}>
                {day.name}
              </span>

              <span className={`
                text-xl lg:text-2xl font-black
                ${isSelected ? "text-white" : "text-gray-200"}
              `}>
                {day.number}
              </span>

              {isSelected && (
                <div className="absolute bottom-2 w-1 h-1 bg-white rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};