import { useState } from "react";
import { useStore } from "../../hooks/useStore";
import { CalendarDays } from "../CalendarDays/CalendarDay";
import { ModalMateria } from "../ModalMateria/ModalMateria";
import { SlotVazio } from "../SlotVazio/SlotVazio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const Calendar = () => {
  const materias = useStore((state) => state.materias);
  const removerMateria = useStore((state) => state.removerMateria);

  const hojeResumido = new Date()
    .toLocaleDateString("pt-BR", { weekday: "long" })
    .slice(0, 3);

  const [diaAtivo, setDiaAtivo] = useState(hojeResumido);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const materiasFiltradas = materias.filter((m) => m.dia === diaAtivo);

  return (
    <div className="flex flex-col w-full gap-6">
      <main className="flex flex-col bg-[#1C192B] w-full max-w-5xl border border-white/5 rounded-3xl p-4 md:p-8 shadow-2xl">
        <CalendarDays diaAtivo={diaAtivo} onSelectDay={setDiaAtivo} />

        <div className="flex flex-col gap-4 mt-8">
          <header className="flex justify-between items-center border-b border-white/5 pb-2 px-1">
            <h2 className="text-white/40 uppercase text-[10px] font-black tracking-[0.2em]">
              Cronograma • {diaAtivo}
            </h2>
            <span className="text-white/20 text-[10px] font-bold">
              {materiasFiltradas.length} MATÉRIAS
            </span>
          </header>

          <div className="flex flex-col gap-3 min-h-25">
            {materiasFiltradas.map((materia) => (
              <div
                key={materia.id}
                className="group p-4 bg-white/5 hover:bg-white/8 border border-white/10 rounded-2xl flex justify-between items-center transition-all duration-300"
              >
                <div className="flex flex-col pr-4">
                  <strong className="text-white text-base md:text-lg tracking-tight font-semibold">
                    {materia.titulo}
                  </strong>
                  <span className="text-xs md:text-sm text-gray-400 font-medium line-clamp-1">
                    {materia.tema}
                  </span>
                  <span className="text-white font-bold">{materia.tempo}</span>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-[10px] font-bold text-gray-500 bg-black/20 px-2 py-1 rounded-md">
                    {materia.data}
                  </span>
                  
                  <button 
                    onClick={() => removerMateria(materia.id)}
                    className="md:opacity-0 group-hover:opacity-100 flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-red-500 transition-all duration-200"
                  >
                    <span className="hidden md:inline">EXCLUIR</span>
                    <FontAwesomeIcon icon={faXmark} className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
            
            <SlotVazio onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#1C192B] p-6 md:p-8 rounded-[2.5rem] border border-white/10 w-full max-w-md shadow-3xl">
            <ModalMateria
              diaSelecionado={diaAtivo}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};