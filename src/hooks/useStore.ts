import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Interface para o objeto de Redação
interface Redacao {
  id: number;
  titulo: string;
  tema: string;
  data: string;
  arquivoReal?: File | null; // Adicione isso aqui
}

interface StudyStore {
  diasConsecutivos: number;
  horasSemana: number;
  metaDiaria: number;
  xp: number;
  redacoes: Redacao[];
  progressoCronograma: number;
  progressoConteudos: number;
  progressoChecklist: number;

  // Ações
  adicionarHora: (valor: number) => void;
  adicionarRedacao: (novaRedacao: Redacao) => void;
  adicionarXP: (valor: number) => void;
   removerRedacao: (id: number) => void;
}

export const useStore = create<StudyStore>()(
  persist(
    (set) => ({
      diasConsecutivos: 0,
      horasSemana: 0,
      metaDiaria: 0,
      xp: 0.0,
      redacoes: [],
      progressoCronograma: 0,
      progressoConteudos: 0,
      progressoChecklist: 0,

      adicionarHora: (valor) =>
        set((state) => ({ horasSemana: state.horasSemana + valor })),

      adicionarRedacao: (novaRedacao) =>
        set((state) => ({
          redacoes: [novaRedacao, ...state.redacoes],
          // Ganha 0.50 de XP por redação
          xp: state.xp + 0.5,
        })),

      removerRedacao: (id: number) =>
        set((state) => ({
          redacoes: state.redacoes.filter((red) => red.id !== id),
          xp: Math.max(0, state.xp - 0.5),
        })),

      adicionarXP: (valor) => set((state) => ({ xp: state.xp + valor })),
    }),
    {
      name: "estudos-app-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
