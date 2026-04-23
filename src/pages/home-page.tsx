import { useStore } from "../hooks/useStore";
import { HomeHeader } from "../components/HomeHeader/HomeHeader";
import { InfoCard } from "../components/InfoCard/InfoCard";
import { NavigationCard } from "../components/NavigationCards/NavigationCard";
import { INFOCARD_DATA, NAVIGATIONCARD_DATA } from "../data/data";

export const Home = () => {
  // Desestruturando para facilitar o uso
  const { diasConsecutivos, horasSemana, metaDiaria, xp, redacoes } = useStore();

  const getDynamicValue = (id: number) => {
    switch (id) {
      case 1: return diasConsecutivos;
      case 2: return `${horasSemana}h`;
      case 3: return `${metaDiaria}%`;
      case 4: return xp.toFixed(2);
      default: return 0;
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
              infoNumber={getDynamicValue(infocard.id)}
            />
          ))}
        </div>

        <div>
          <h2 className="text-white text-3xl font-bold">Navegação Rápida</h2>
        </div>

        {/* NAVIGATION CARDS (Cards de progresso) */}
        <div className="w-full flex flex-col items-start gap-6 lg:grid lg:grid-cols-3 lg:grid-rows-2">
          {NAVIGATIONCARD_DATA.map((navCard) => (
            <NavigationCard
              key={navCard.id}
              {...navCard}
              // Se o card for de Redações (ID 4), usamos o tamanho da lista na store
              progress={navCard.id === 4 ? redacoes.length : navCard.progress}
            />
          ))}
        </div>
      </main>
    </div>
  );
};