import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useStore } from "../../hooks/useStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import CronoStudyLogo from "../../assets/favicon-32x32.png";

export const HomeHeader = () => {
  const user = useStore((state) => state.user);

  const obterSaudacao = () => {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) return "Bom dia";
    if (hora >= 12 && hora < 18) return "Boa tarde";
    return "Boa noite";
  };

  const [periodo] = useState(obterSaudacao);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <header className="w-full space-y-10">
      {/* Top Bar: Logo e Logout */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center group cursor-default">
          <img 
            src={CronoStudyLogo} 
            alt="Logo CronoStudy" 
            className="h-10 w-10 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300"
          />
          <span className="text-white font-black italic uppercase tracking-tighter text-xl">
            CronoStudy
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="group flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/40 rounded-2xl transition-all active:scale-95 shadow-xl"
        >
          <span className="hidden sm:block text-gray-500 group-hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors">
            Sair da conta
          </span>
          <FontAwesomeIcon 
            icon={faSignOutAlt} 
            className="text-gray-500 group-hover:text-red-500 transition-colors" 
          />
        </button>
      </div>

      {/* Greeting Section */}
      <div className="space-y-4">
        <div className="inline-flex px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-widest">
          ✨ Painel de Controle Ativo
        </div>
        
        <div className="space-y-2">
          <h1 className="text-5xl lg:text-5xl font-black text-white uppercase italic tracking-tighter leading-[0.9]">
            {periodo},{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-white to-purple-500">
              {user?.displayName?.split(" ")[0] || "Estudante"}
            </span>
          </h1>
          <p className="text-gray-400 text-base lg:text-lg max-w-xl leading-relaxed">
            Seu progresso acadêmico está sendo monitorado. Continue com sua rotina para manter seu <span className="text-white font-bold italic">Streak de estudos</span>.
          </p>
        </div>
      </div>

      {/* Linha Decorativa (Igual à da InicialPage) */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
    </header>
  );
};