import { HomeHeader } from "../components/HomeHeader/HomeHeader";
import { InfoCard } from "../components/InfoCard/InfoCard";
import { NavigationCard } from "../components/NavigationCards/NavigationCard";
import { INFOCARD_DATA, NAVIGATIONCARD_DATA } from "../data/data";

export const Home = () => {
  return (
    <div className="min-h-screen w-full flex justify-center bg-[#0d0a14] px-4 py-8">
      <main className="w-full max-w-xl lg:max-w-5xl flex flex-col items-start gap-10">
        <div className="w-full">
          <HomeHeader />
        </div>

        <div className="w-full flex flex-col lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 items-start gap-6">
          {INFOCARD_DATA.map((infocard) => (
            <InfoCard key={infocard.id} {...infocard} />
          ))}
        </div>
        <div>
          <h2 className="text-white text-3xl">Navegação Rápida</h2>
        </div>
        <div className="w-full flex flex-col items-start gap-6 lg:grid lg:grid-cols-3 lg:grid-rows-2 ">
          {NAVIGATIONCARD_DATA.map((navigationCard) => (
            <NavigationCard key={navigationCard.id} {...navigationCard} />
          ))}
        </div>
      </main>
    </div>
  );
};
