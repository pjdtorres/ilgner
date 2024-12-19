import { NavLink } from "react-router-dom";
import FormDispositivo from "../../components/Form";

function Cadastro() {
  return (
    <main className="container mt-4">
      <NavLink to={"/"} className="btn btn-primary">
        Dispositivos
      </NavLink>
      <FormDispositivo />
    </main>
  );
}

export default Cadastro;
