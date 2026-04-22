import { Route, Routes } from "react-router";
import { Home } from "./pages/home-page";
import { CronogramaPage } from "./pages/cronograma-page";
import { Redacao } from "./pages/redacao-page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" index element={<Home/>}/>
        { /*Outras rotas */ }
        <Route path="/cronograma" element={<CronogramaPage/>}/>
        <Route path="/redacoes" element={<Redacao/>}/>
      </Routes>
    </>
  );
}

export default App;
