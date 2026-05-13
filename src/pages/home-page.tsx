import { useStore } from "../hooks/useStore";
import { HomeHeader } from "../components/HomeHeader/HomeHeader";
import { InfoCard } from "../components/InfoCard/InfoCard";
import { NavigationCard } from "../components/NavigationCards/NavigationCard";
import { INFOCARD_DATA, NAVIGATIONCARD_DATA } from "../data/data";

export const Home = () => {
  const diasConsecutivos = useStore((state) => state.diasConsecutivos) ?? 0;
  const horasSemana = useStore((state) => state.horasSemana) ?? 0;
  const metaDiaria = useStore((state) => state.metaDiaria) ?? 0;
  const xp = useStore((state) => state.xp) ?? 0;

  const getDynamicValue = (id: number) => {
    switch (id) {
      case 1:
        return diasConsecutivos;
      case 2:
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
    <div className="min-h-screen w-full flex justify-center bg-[#0d0a14] px-4 py-12 relative overflow-hidden">
      {/* Efeito de iluminação sutil no fundo para profundidade */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <main className="w-full max-w-xl lg:max-w-5xl flex flex-col items-start gap-16 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="w-full">
          <HomeHeader />
        </div>

        {/* INFO CARDS (Top Stats) */}
        <section className="w-full space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-6 bg-purple-600 rounded-full" />
            <h2 className="text-white text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
              Estatísticas Atuais
            </h2>
          </div>
          
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INFOCARD_DATA.map((infocard) => (
              <InfoCard
                key={infocard.id}
                {...infocard}
                infoNumber={getDynamicValue(infocard.id)}
              />
            ))}
          </div>
        </section>

        {/* NAVIGATION SECTION */}
        <section className="w-full space-y-8">
          <div className="space-y-2">
            <h2 className="text-white text-3xl lg:text-4xl font-black italic uppercase tracking-tighter">
              Navegação <span className="text-purple-500">Rápida</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-transparent rounded-full" />
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {NAVIGATIONCARD_DATA.map((navCard) => (
              <NavigationCard key={navCard.id} {...navCard} />
            ))}
          </div>
        </section>

        {/* FOOTER DECORATION */}
        <footer className="w-full pt-12 pb-6 flex justify-center border-t border-white/5">
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.5em]">
            CronoStudy v1.0 • Sistema Operacional de Estudos
          </p>
        </footer>
      </main>
    </div>
  );
};