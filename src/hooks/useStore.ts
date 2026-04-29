import { create } from "zustand";
import type { User } from "firebase/auth";

// 1. Interface estrita para a Redação
export interface Redacao {
  id: number;
  titulo: string;
  tema: string;
  data: string;
  arquivoReal?: File | null;
  corrigida: boolean;
  nota?: number;
}

interface Materia {
  id: number;
  titulo: string;
  tema: string;
  data: string;
  dia: string;
  tempo: string;
}

interface StudyStore {
  // Estado do Usuário (Firebase Integration)
  user: User | null;
  setUser: (user: User | null) => void;

  // Estados de Progresso
  diasConsecutivos: number;
  horasSemana: number;
  metaDiaria: number;
  xp: number;

  // Listas
  materias: Materia[];
  redacoes: Redacao[];
  redacoesCorrigidas: Redacao[];

  // Ações
  adicionarMateria: (novaMateria: Omit<Materia, "dia">, diaDaSemana: string, horas: number) => void;
  removerMateria: (id: number) => void;
  adicionarRedacao: (novaRedacao: Redacao) => void;
  removerRedacao: (id: number) => void;
  corrigirRedacao: (id: number, nota: number) => void;
}

export const useStore = create<StudyStore>()((set) => ({
  // Valores Iniciais
  user: null,
  diasConsecutivos: 0,
  horasSemana: 0,
  metaDiaria: 0,
  xp: 0,
  materias: [],
  redacoes: [],
  redacoesCorrigidas: [],

  // Ação para o Firebase Observer
  setUser: (user) => set({ user }),

  adicionarMateria: (novaMateria, diaDaSemana, horas) =>
    set((state) => ({
      materias: [...state.materias, { ...novaMateria, dia: diaDaSemana }],
      horasSemana: state.horasSemana + horas,
      xp: state.xp + horas * 0.2,
    })),

  removerMateria: (id) =>
    set((state) => ({
      materias: state.materias.filter((m) => m.id !== id),
    })),

  adicionarRedacao: (novaRedacao) =>
    set((state) => ({
      redacoes: [novaRedacao, ...state.redacoes],
      xp: state.xp + 0.5,
    })),

  corrigirRedacao: (id, nota) =>
    set((state) => {
      const item = state.redacoes.find((r) => r.id === id);
      if (!item) return state;

      const atualizada: Redacao = { ...item, corrigida: true, nota };

      return {
        redacoes: state.redacoes.filter((r) => r.id !== id),
        redacoesCorrigidas: [atualizada, ...state.redacoesCorrigidas],
        xp: state.xp + 2.0,
      };
    }),

  removerRedacao: (id) =>
    set((state) => ({
      redacoes: state.redacoes.filter((r) => r.id !== id),
      redacoesCorrigidas: state.redacoesCorrigidas.filter((r) => r.id !== id),
      xp: Math.max(0, state.xp - 0.5),
    })),
}));