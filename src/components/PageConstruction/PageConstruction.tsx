
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHammer, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useStore } from "../../hooks/useStore";

export const PageConstruction = () => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0d0a14] px-4 text-center">
      {/* Glow Effect de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 space-y-8 max-w-lg">
        {/* Ícone com Animação de Batida */}
        <div className="w-24 h-24 bg-purple-600/10 border border-purple-500/20 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-bounce">
          <FontAwesomeIcon icon={faHammer} className="text-purple-500 text-4xl" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl lg:text-6xl font-black text-white uppercase italic tracking-tighter">
            Em <span className="text-purple-500">Construção</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            {user?.displayName?.split(" ")[0] || "Estudante"}, estamos trabalhando duro para entregar essa funcionalidade. 
            Em breve você terá acesso total ao seu hub de estudos inteligente.
          </p>
        </div>

        {/* Barra de Progresso Decorativa */}
        <div className="w-full h-2 bg-white/5 border border-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-purple-600 w-2/3 shadow-[0_0_15px_rgba(147,51,234,0.5)] animate-pulse" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-black uppercase italic rounded-xl border border-white/10 transition-all active:scale-95"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Voltar
          </button>
          <button
            onClick={() => navigate("/home")}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-black uppercase italic rounded-xl transition-all active:scale-95 shadow-lg shadow-purple-500/25"
          >
            Ir para Home
          </button>
        </div>
      </div>

      <footer className="absolute bottom-12 w-full text-center">
        <p className="text-gray-600 text-xs uppercase tracking-widest font-bold">
          CronoStudy • Em Desenvolvimento
        </p>
      </footer>
    </div>
  );
};