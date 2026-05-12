import { useEffect, useMemo, useState } from "react";
import { faBookBookmark, faBookOpen, faFilter } from "@fortawesome/free-solid-svg-icons";
import { PagesHeader } from "../components/PagesHeader/PagesHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConteudoCard } from "../components/ConteudoCard/ConteudoCard";
import { useStore } from "../hooks/useStore";

export const ConteudoPage = () => {
  const materias = useStore((state) => state.materias);
  const [filtroTitulo, setFiltroTitulo] = useState<string>("Tudo");

  const categorias = useMemo(() => {
    const unicos = [...new Set(materias.map((m) => m.titulo))].filter(Boolean).sort();
    return ["Tudo", ...unicos];
  }, [materias]);

  const materiasFiltradas = useMemo(() => {
    if (filtroTitulo === "Tudo") return materias;
    return materias.filter((m) => m.titulo === filtroTitulo);
  }, [materias, filtroTitulo]);

  useEffect(() => {
    if (filtroTitulo === "Tudo") return;
    if (!materias.some((m) => m.titulo === filtroTitulo)) {
      setFiltroTitulo("Tudo");
    }
  }, [materias, filtroTitulo]);

  return (
    <div className="min-h-screen w-full bg-[#0d0a14] text-white flex flex-col items-center pb-20">
      {/* Container Principal */}
      <div className="w-full max-w-6xl px-6 py-8 md:py-16 flex flex-col gap-10">
        
        {/* Header da Página */}
        <header className="relative">
          <PagesHeader
            icon={faBookOpen}
            variantColor="#0077E0"
            titleHeader={"Conteúdos"}
            descriptionHeader={
              "Acesse materiais e recursos de estudo organizados por matéria"
            }
          />
          {/* Linha decorativa */}
          <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-blue-500/50 to-transparent" />
        </header>

        <main className="flex flex-col gap-8">
          
          {/* Seção de Filtros */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-neutral-400">
              <FontAwesomeIcon icon={faFilter} className="text-sm" />
              <span className="text-xs font-bold uppercase tracking-widest">Filtrar por matéria</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categorias.map((cat) => {
                const ativo = filtroTitulo === cat;
                return (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setFiltroTitulo(cat)}
                    className={`px-5 py-2 rounded-full border text-sm font-medium transition-all active:scale-95 ${
                      ativo
                        ? "bg-purple-600/30 border-purple-500/60 text-white shadow-[0_0_16px_rgba(168,85,247,0.2)]"
                        : "bg-white/5 border-white/10 text-neutral-300 hover:bg-purple-600/20 hover:border-purple-500/50"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Listagem de Cards */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
                  <FontAwesomeIcon icon={faBookBookmark} className="text-purple-500 text-sm"/>
                </div>
                <h2 className="text-xl font-semibold tracking-tight">
                  {filtroTitulo === "Tudo" ? "Todos os conteúdos" : filtroTitulo}
                </h2>
              </div>
              
              <span className="text-xs text-neutral-500 font-mono">
                {materiasFiltradas.length}
                {filtroTitulo !== "Tudo" && materias.length > 0 ? (
                  <span className="text-neutral-600"> / {materias.length}</span>
                ) : null}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ConteudoCard
                items={materiasFiltradas}
                emptyMessage={
                  materias.length > 0 && filtroTitulo !== "Tudo"
                    ? "Nenhuma sessão agendada nesta disciplina."
                    : undefined
                }
              />
            </div>
          </section>
          
        </main>
      </div>
    </div>
  );
};