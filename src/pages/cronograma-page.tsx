import { useState } from "react";
import { faBars, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MobileMenu } from "../components/MobileMenu/MobileMenu";
import { Calendar } from "../components/Calendar/Calendar";
import { PagesHeader } from "../components/PagesHeader/PagesHeader";

export const CronogramaPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#0d0a14] flex flex-col items-center overflow-x-hidden">
      <div className="w-full max-w-5xl px-4 py-6 md:px-8 md:py-12 flex flex-col h-full relative z-10">
        <header className="w-full flex justify-between items-center md:items-start mb-8 md:mb-12 gap-4">
          <div className="flex-1">
            <PagesHeader
              icon={faCalendar}
              variantColor="#9019FC"
              titleHeader={"Horário Semanal"}
              descriptionHeader={"Sua jornada de estudos organizada"}
            />
          </div>

          <button
            className="p-4 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl hover:bg-white/10 transition-all active:scale-90 shadow-xl"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <FontAwesomeIcon icon={faBars} className="text-white text-xl md:text-2xl" />
          </button>
        </header>

        <main className="w-full flex-1">
          <div className="bg-gradient-to-b from-white/[0.02] to-transparent rounded-[2.5rem] p-1">
            <Calendar />
          </div>
        </main>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] pointer-events-none z-0 rounded-full" />
    </div>
  );
};