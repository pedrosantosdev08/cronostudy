import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "../../hooks/useStore";
import type { Materia } from "../../hooks/useStore";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface ConteudoCardProps {
  /** Quando omitido, usa todas as matérias do store. */
  items?: Materia[];
  /** Mensagem quando a lista exibida estiver vazia (ex.: filtro sem resultados). */
  emptyMessage?: string;
}

export const ConteudoCard = ({ items, emptyMessage }: ConteudoCardProps) => {
  const materiasStore = useStore((state) => state.materias);
  const materias = items ?? materiasStore;

  if (materias.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-white/5 rounded-3xl">
        <p className="text-gray-500 font-medium">
          {emptyMessage ?? "Nenhuma matéria agendada."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {materias.map((materia) => (
        <div
          key={materia.id}
          className="group relative flex items-center bg-[#1C192B]/60 hover:bg-[#24213d] border border-white/5 hover:border-purple-500/30 rounded-2xl p-4 gap-4 text-white transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
        >
          {/* Container do Ícone com Gradiente */}
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 group-hover:from-purple-600/20 group-hover:to-purple-900/20 transition-colors duration-300">
            <FontAwesomeIcon
              icon={materia.icon}
              className="text-2xl text-purple-400 group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Textos */}
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold truncate group-hover:text-purple-300 transition-colors">
              {materia.tema}
            </h2>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">
              <span className="text-purple-500/80">{materia.titulo}</span>
              <span className="w-1 h-1 rounded-full bg-neutral-700"></span>
              <span>{materia.tempo}</span>
            </div>
          </div>

          {/* Seta indicativa (opcional - visual) */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity pr-2">
            <FontAwesomeIcon icon={faChevronRight} className="text-neutral-600 text-sm" />
          </div>

          {/* Efeito de brilho na borda inferior (detalhe de design) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-purple-500 group-hover:w-1/2 transition-all duration-500 rounded-full" />
        </div>
      ))}
    </div>
  );
};