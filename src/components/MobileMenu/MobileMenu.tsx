import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <>
      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-60 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
        aria-hidden="true" 
      />

      {/* PAINEL LATERAL */}
      <aside
        aria-label="Estatísticas do Cronograma" // Dá nome à seção para acessibilidade
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 h-full w-70 bg-[#161223] border-l border-white/10 z-70 p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end mb-8">
          <button 
            onClick={onClose} 
            className="text-white/60 hover:text-white cursor-pointer"
            aria-label="Fechar menu" // Essencial para semântica
          >
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </button>
        </div>

        {/* Estatisticas do cronograma */}
        <section className="flex flex-col gap-4">
          <header>
            <h2 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">
              Semana Atual
            </h2>
            <time className="text-white text-lg font-medium">
              20 de abr. — 26 de abr
            </time>
          </header>

          <div className="w-full h-px bg-white/5 my-2" role="separator"></div>

          <div>
            <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">
              Total Planejado
            </h3>
            <data value="8" className="text-white text-2xl font-bold">
              8H
            </data>
          </div>
        </section>
      </aside>
    </>
  );
};