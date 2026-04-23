import { Route, Routes } from "react-router";
import { Home } from "./pages/home-page";
import { CronogramaPage } from "./pages/cronograma-page";
import { RedacaoPage } from "./pages/redacao-page";
import { DesempenhoPage } from "./pages/desempenho";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" index element={<Home/>}/>
        { /*Outras rotas */ }
        <Route path="/cronograma" element={<CronogramaPage/>}/>
        <Route path="/redacoes" element={<RedacaoPage/>}/>
        <Route path="/desempenho" element={<DesempenhoPage/>}/>
      </Routes>
    </>
  );
}

export default App;
