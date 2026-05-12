import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

/** Campos salvos no Firestore (sem `icon`, que não é serializável). */
export interface MateriaFirestoreDoc {
  id: number;
  titulo: string;
  tema: string;
  data: string;
  dia: string;
  tempo: string;
}

export interface CronogramaFirestorePayload {
  materias: MateriaFirestoreDoc[];
  horasSemana: number;
  xp: number;
}

const cronogramaRef = (uid: string) => doc(db, "users", uid, "data", "cronograma");

export async function loadCronograma(uid: string): Promise<CronogramaFirestorePayload | null> {
  const snap = await getDoc(cronogramaRef(uid));
  if (!snap.exists()) return null;
  const d = snap.data();
  return {
    materias: Array.isArray(d.materias) ? d.materias : [],
    horasSemana: typeof d.horasSemana === "number" ? d.horasSemana : 0,
    xp: typeof d.xp === "number" ? d.xp : 0,
  };
}

export async function saveCronograma(
  uid: string,
  materias: { id: number; titulo: string; tema: string; data: string; dia: string; tempo: string }[],
  horasSemana: number,
  xp: number,
): Promise<void> {
  const payload: CronogramaFirestorePayload = {
    materias,
    horasSemana,
    xp,
  };
  await setDoc(cronogramaRef(uid), payload, { merge: true });
}
