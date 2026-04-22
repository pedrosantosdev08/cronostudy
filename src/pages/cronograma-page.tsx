import { useState } from "react";
import { faBars, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MobileMenu } from "../components/MobileMenu/MobileMenu";
import { Calendar } from "../components/Calendar/Calendar";
import { PagesHeader } from "../components/PagesHeader/PagesHeader";

export const CronogramaPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // Centralizamos tudo com items-center e usamos o fundo escuro do seu projeto
    <div className="min-h-screen w-full bg-[#0d0a14] flex flex-col items-center px-6 py-10">
      {/* Header com largura máxima controlada e justify-between */}
      <header className="w-full max-w-5xl  flex justify-between items-start mb-10">
        <PagesHeader
          icon={faCalendar}
          variantColor="#9019FC"
          titleHeader={"Horário Semanal"}
          descriptionHeader={"Visualize e organize sua semana de estudos"}
        />

        {/* Lado Direito: Botão Menu */}

        <button
          className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors active:scale-95"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Abrir menu"
        >
          <FontAwesomeIcon icon={faBars} className="text-white text-2xl" />
        </button>
      </header>

      {/* Main Content Area */}

      <main className="flex w-full max-w-5xl  rounded-2xl">
        <Calendar />
      </main>

      {/* Componente de Menu (fora do fluxo principal) */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};
