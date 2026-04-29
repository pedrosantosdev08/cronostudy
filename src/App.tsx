import { useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useStore } from "./hooks/useStore";
import { Route, Routes, useNavigate } from "react-router";
import { InicialPage } from "./pages/inicial-page";
import { Home } from "./pages/home-page";
import { CronogramaPage } from "./pages/cronograma-page";
import { RedacaoPage } from "./pages/redacao-page";
import { DesempenhoPage } from "./pages/desempenho";
import { ConteudoPage } from "./pages/conteudo";
import { ChecklistPage } from "./pages/checklist-page";



export default function App() {
  const setUser = useStore((state) => state.setUser);
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