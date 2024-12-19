import { Route, Routes } from "react-router-dom";
import Cadastro from "./screens/Cadastro";
import Dispositivos from "./screens/Dispositivos";

function rotas() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dispositivos />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </div>
  );
}

export default rotas;
