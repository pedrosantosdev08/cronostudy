import { useStore } from "../hooks/useStore";
import { HomeHeader } from "../components/HomeHeader/HomeHeader";
import { InfoCard } from "../components/InfoCard/InfoCard";
import { NavigationCard } from "../components/NavigationCards/NavigationCard";
import { INFOCARD_DATA, NAVIGATIONCARD_DATA } from "../data/data";

export const Home = () => {
  // Pegando os valores do store com fallbacks (valores padrão) para evitar erros de undefined
  const diasConsecutivos = useStore((state) => state.diasConsecutivos) ?? 0;
  const horasSemana = useStore((state) => state.horasSemana) ?? 0;
  const metaDiaria = useStore((state) => state.metaDiaria) ?? 0;
  const xp = useStore((state) => state.xp) ?? 0;

  const getDynamicValue = (id: number) => {
    switch (id) {
      case 1:
        return diasConsecutivos;
      case 2:
        // Garante que é número antes de exibir
        return `${horasSemana}h`;
      case 3:
        return `${metaDiaria}%`;
      case 4:
        return Number(xp).toFixed(2);
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#0d0a14] px-4 py-8">
      <main className="w-full max-w-xl lg:max-w-5xl flex flex-col items-start gap-10">
        <div className="w-full">
          <HomeHeader />
        </div>

        {/* INFO CARDS (Top Stats) */}
        <div className="w-full flex flex-col lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 items-start gap-6">
          {INFOCARD_DATA.map((infocard) => (
            <InfoCard
              key={infocard.id}
              {...infocard}
              // O InfoCard deve estar preparado para receber string ou number
              infoNumber={getDynamicValue(infocard.id)}
            />
          ))}
        </div>

        <div>
          <h2 className="text-white text-2xl lg:text-3xl font-black italic uppercase tracking-tighter">
            Navegação Rápida
          </h2>
        </div>

        {/* NAVIGATION CARDS */}
        <div className="w-full flex flex-col items-start gap-6 lg:grid lg:grid-cols-3">
          {NAVIGATIONCARD_DATA.map((navCard) => (
            <NavigationCard key={navCard.id} {...navCard} />
          ))}
        </div>
      </main>
    </div>
  );
};