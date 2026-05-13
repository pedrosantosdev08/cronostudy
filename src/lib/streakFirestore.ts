import { doc, runTransaction } from "firebase/firestore";
import { db } from "./firebase";

/** YYYY-MM-DD no fuso local do dispositivo (mesma regra para leitura e escrita). */
export function dataLocalHoje(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function ehDiaImediatamenteAnterior(ultimaYmd: string, hojeYmd: string): boolean {
  const [y, mo, da] = hojeYmd.split("-").map(Number);
  const ref = new Date(y, mo - 1, da);
  ref.setDate(ref.getDate() - 1);
  const py = ref.getFullYear();
  const pm = String(ref.getMonth() + 1).padStart(2, "0");
  const pd = String(ref.getDate()).padStart(2, "0");
  return `${py}-${pm}-${pd}` === ultimaYmd;
}

const streakRef = (uid: string) => doc(db, "users", uid, "data", "streak");

/**
 * Registra a visita de hoje: atualiza Firestore e devolve a sequência atual (mínimo 1 após primeira visita).
 * Várias aberturas no mesmo dia não alteram a contagem.
 */
export async function registerDailyVisit(uid: string): Promise<number> {
  const hoje = dataLocalHoje();

  return runTransaction(db, async (transaction) => {
    const snap = await transaction.get(streakRef(uid));
    const ultima =
      snap.exists() && typeof snap.data().ultimaDataAtiva === "string"
        ? (snap.data().ultimaDataAtiva as string)
        : null;
    const sequenciaAtual =
      snap.exists() && typeof snap.data().sequencia === "number" ? snap.data().sequencia : 0;

    if (ultima === hoje) {
      return Math.max(1, sequenciaAtual);
    }

    let novaSequencia = 1;
    if (ultima && ehDiaImediatamenteAnterior(ultima, hoje)) {
      novaSequencia = Math.max(1, sequenciaAtual) + 1;
    }

    transaction.set(
      streakRef(uid),
      { ultimaDataAtiva: hoje, sequencia: novaSequencia },
      { merge: true },
    );
    return novaSequencia;
  });
}
