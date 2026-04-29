import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

// Componentes
import { InicialCard } from "../components/InicialCard/IncialCard";
import { InicialHeader } from "../components/InicialHeader/InicialHeader";
import { InicialMenu } from "../components/InicialMenu/InicialMenu";
import { AuthModal } from "../components/AuthModal/AuthModal";

// Dados e Assets
import { INICIALCARD } from "../data/data";

export const InicialPage = () => {
  // Estados de Controle Globais
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#0d0a14] px-4 selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* HEADER CONTAINER */}
      <header className="w-full max-w-xl lg:max-w-5xl py-6">
        <InicialHeader onOpenMenu={() => setIsMenuOpen(true)} />
      </header>

      <main className="w-full max-w-xl lg:max-w-5xl flex flex-col items-center gap-24 py-12 lg:py-24">
        
        {/* HERO SECTION */}
        <section className="flex flex-col items-center text-center gap-8">
          <span className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-widest animate-pulse">
            ✨ Organize seus estudos de forma inteligente
          </span>

          <div className="space-y-4">
            <h1 className="text-4xl lg:text-7xl font-black text-white uppercase italic tracking-tighter leading-[0.9]">
              Seu cronograma de estudos <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-400">
                mais eficiente
              </span>
            </h1>
            <p className="text-gray-400 text-base lg:text-xl max-w-2xl mx-auto leading-relaxed">
              Planeje, organize e acompanhe seus estudos com uma plataforma
              completa. Tenha controle total sobre seu aprendizado e alcance
              seus objetivos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-black uppercase italic rounded-xl transition-all active:scale-95 shadow-lg shadow-purple-500/25"
            >
              Começar agora gratuitamente
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-black uppercase italic rounded-xl border border-white/10 transition-all">
              Ver demonstração
            </button>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="recursos" className="w-full space-y-16">
          <header className="flex flex-col items-center text-center gap-4">
            <h2 className="text-3xl lg:text-5xl font-black text-white uppercase italic tracking-tighter">
              Recursos completos para <br /> seu{" "}
              <span className="text-purple-500">sucesso</span>
            </h2>
            <p className="text-gray-500 text-sm lg:text-base max-w-md">
              Tudo que você precisa para organizar e otimizar seus estudos em
              uma única plataforma
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {INICIALCARD.map((card) => (
              <InicialCard key={card.id} {...card} />
            ))}
          </div>
        </section>

        {/* MOCKUP / WIDGETS SECTION */}
        <section id="sobre" className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
          <div className="space-y-8 text-left">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-5xl font-black text-white uppercase italic tracking-tighter leading-tight">
                Transforme a forma como você <br />
                <span className="text-purple-500">organiza seus estudos</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                O <span className="text-white font-bold">CronoStudy</span> foi
                criado para estudantes que buscam mais produtividade e
                organização. Nossa plataforma oferece ferramentas intuitivas que
                facilitam o planejamento e acompanhamento do seu progresso
                acadêmico.
              </p>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Interface intuitiva",
                "Sincronização em tempo real",
                "Relatórios de progresso",
                "Acesso multi-dispositivo",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-300 font-medium"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-[10px]">
                    ✔
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual Mockup Widgets */}
          <div className="relative bg-gradient-to-br from-purple-900/20 to-transparent p-8 rounded-3xl border border-white/5 shadow-inner">
            <div className="bg-[#16121f] p-4 rounded-2xl border border-white/10 shadow-xl mb-6 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center text-purple-400">
                  <FontAwesomeIcon icon={faCalendar} className="text-xl" />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase font-bold tracking-wider">
                    Próxima atividade
                  </span>
                  <span className="text-white font-black italic">
                    Matemática - 14:00
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#16121f] p-6 rounded-2xl border border-white/10 shadow-xl mb-6 ml-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-white font-bold">Progresso Semanal</span>
                  <span className="text-purple-400 font-black">75%</span>
                </div>
                <div className="w-full h-3 bg-[#0d0a14] rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-purple-600 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full"></div>
          </div>
        </section>

        {/* CTA FINAL SECTION */}
        <section className="w-full py-20">
          <div className="w-full bg-gradient-to-b from-[#16121f] to-transparent border border-white/5 rounded-[40px] p-12 lg:p-20 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            <div className="space-y-4 relative z-10">
              <h3 className="text-3xl lg:text-6xl font-black text-white uppercase italic tracking-tighter">
                Pronto para <span className="text-purple-500">começar?</span>
              </h3>
              <p className="text-gray-400 text-lg max-w-xl mx-auto">
                Junte-se a milhares de estudantes que já estão organizando seus
                estudos de forma mais eficiente.
              </p>
            </div>

            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="relative z-10 px-12 py-5 bg-purple-600 hover:bg-purple-700 text-white font-black uppercase italic rounded-2xl transition-all active:scale-95 shadow-[0_0_30px_rgba(147,51,234,0.3)]"
            >
              Criar conta gratuita agora
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full max-w-5xl flex flex-col items-center gap-8 py-12 mt-auto">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <p className="text-gray-600 text-xs uppercase tracking-widest font-bold">
          © {new Date().getFullYear()} CronoStudy
        </p>
      </footer>

      {/* MODAIS E OVERLAYS (Renderizados por fora para evitar quebra de z-index) */}
      <InicialMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onOpenAuth={() => setIsAuthModalOpen(true)} 
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};