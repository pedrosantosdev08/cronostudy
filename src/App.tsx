import { useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { loadCronograma } from "./lib/cronogramaFirestore";
import { registerDailyVisit } from "./lib/streakFirestore";
import { useStore } from "./hooks/useStore";
import { Route, Routes, useNavigate } from "react-router";
import { InicialPage } from "./pages/inicial-page";
import { Home } from "./pages/home-page";
import { CronogramaPage } from "./pages/cronograma-page";
import { RedacaoPage } from "./pages/redacao-page";
import { DesempenhoPage } from "./pages/desempenho";
import { ConteudoPage } from "./pages/conteudo-page";
import { ChecklistPage } from "./pages/checklist-page";



export default function App() {
  const setUser = useStore((state) => state.setUser);
  const user = useStore((state) => state.user);
  const hydrateCronogramaFromRemote = useStore((state) => state.hydrateCronogramaFromRemote);
  const resetCronogramaLocal = useStore((state) => state.resetCronogramaLocal);
  const setDiasConsecutivos = useStore((state) => state.setDiasConsecutivos);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        if (window.location.pathname === "/") {
          navigate("/home", { replace: true });
        }
      } else {
        setUser(null);
        navigate("/", { replace: true });
      }
    });

    return () => unsubscribe();
  }, [setUser, navigate]);

  useEffect(() => {
    if (!user) {
      resetCronogramaLocal();
      return;
    }

    resetCronogramaLocal();

    let cancelled = false;

    void (async () => {
      try {
        await user.getIdToken();
      } catch {
        return;
      }
      if (cancelled) return;
      const uid = user.uid;

      // Não usar Promise.all: se o streak falhar, o cronograma ainda deve hidratar.
      void loadCronograma(uid)
        .then((data) => {
          if (cancelled) return;
          if (data) {
            hydrateCronogramaFromRemote(data.materias, data.horasSemana, data.xp);
          }
        })
        .catch((err) => {
          console.error("[cronograma] Falha ao carregar do Firestore:", err);
        });

      void registerDailyVisit(uid)
        .then((diasStreak) => {
          if (cancelled) return;
          setDiasConsecutivos(diasStreak);
        })
        .catch((err) => {
          console.error("[streak] Falha ao registrar visita:", err);
        });
    })();

    return () => {
      cancelled = true;
    };
  }, [user, hydrateCronogramaFromRemote, resetCronogramaLocal, setDiasConsecutivos]);

  return (
    <Routes>
      <Route path="/" index element={<InicialPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/conteudos" element={<ConteudoPage />} />
      <Route path="/checklist" element={<ChecklistPage />} />
      <Route path="/cronograma" element={<CronogramaPage />} />
      <Route path="/redacoes" element={<RedacaoPage />} />
      <Route path="/desempenho" element={<DesempenhoPage />} />
    </Routes>
  );
}