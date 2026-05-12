import { create } from "zustand";
import type { User } from "firebase/auth";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { getMateriaIcon } from "../lib/materiaIcons";
import type { MateriaFirestoreDoc } from "../lib/cronogramaFirestore";
import { saveCronograma } from "../lib/cronogramaFirestore";

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

export interface Materia {
  id: number;
  titulo: string;
  tema: string;
  data: string;
  dia: string;
  tempo: string;
  icon: IconDefinition;
}

function materiasParaFirestore(materias: Materia[]): MateriaFirestoreDoc[] {
  return materias.map(({ id, titulo, tema, data, dia, tempo }) => ({
    id,
    titulo,
    tema,
    data,
    dia,
    tempo,
  }));
}

function persistCronogramaIfLoggedIn(
  materias: Materia[],
  horasSemana: number,
  xp: number,
  user: User | null,
) {
  const uid = user?.uid;
  if (!uid) return;
  void saveCronograma(uid, materiasParaFirestore(materias), horasSemana, xp).catch((err) => {
    console.error("[cronograma] Falha ao salvar no Firestore:", err);
  });
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

  /** Substitui cronograma vindo do Firestore (após login / carga inicial). */
  hydrateCronogramaFromRemote: (
    materias: MateriaFirestoreDoc[],
    horasSemana: number,
    xp: number,
  ) => void;
  /** Limpa dados do cronograma (logout ou troca de usuário antes de nova carga). */
  resetCronogramaLocal: () => void;

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

  setUser: (user) => set({ user }),

  hydrateCronogramaFromRemote: (materiasDoc, horasSemana, xp) =>
    set({
      materias: materiasDoc.map((m) => ({
        ...m,
        icon: getMateriaIcon(m.titulo),
      })),
      horasSemana,
      xp,
    }),

  resetCronogramaLocal: () =>
    set({
      materias: [],
      horasSemana: 0,
      xp: 0,
    }),

  adicionarMateria: (novaMateria, diaDaSemana, horas) =>
    set((state) => {
      const materias = [...state.materias, { ...novaMateria, dia: diaDaSemana }];
      const horasSemana = state.horasSemana + horas;
      const xp = state.xp + horas * 0.2;
      persistCronogramaIfLoggedIn(materias, horasSemana, xp, state.user);
      return { materias, horasSemana, xp };
    }),

  removerMateria: (id) =>
    set((state) => {
      const materias = state.materias.filter((m) => m.id !== id);
      persistCronogramaIfLoggedIn(materias, state.horasSemana, state.xp, state.user);
      return { materias };
    }),

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
