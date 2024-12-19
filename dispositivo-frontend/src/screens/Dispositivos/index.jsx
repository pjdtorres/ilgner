import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Card from "../../components/Card";

function Dispositivos() {
  const [dispositivos, setDispositivos] = useState([]);
  // const [form, setForm] = useState({ ip: "", nome: "", descricao: "" });
  // const [isEditing, setIsEditing] = useState(false);
  // const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchDispositivos = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/dispositivos`);
        setDispositivos(response.data);
      } catch (error) {
        console.error("Erro ao buscar dispositivo", error);
      }
    };

    fetchDispositivos();
  }, []);

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-around align-items-center w-75">
        <h1>Dispositivos Cadastrados</h1>
        <NavLink to={"/cadastro"} className="btn btn-primary">
          Cadastrar
        </NavLink>
      </div>

      <section className="d-flex justify-content-start flex-wrap gap-3 mt-3">
        {dispositivos.map((dispositivo, index) => {
          return (
            <Card
              key={index}
              nome={dispositivo.nome}
              descricao={dispositivo.descricao}
              ip={dispositivo.ip}
            />
          );
        })}
      </section>
    </div>
  );
}

export default Dispositivos;
