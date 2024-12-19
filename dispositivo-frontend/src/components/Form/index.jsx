import axios from "axios";
import { useEffect, useState } from "react";

function FormDispositivo() {
  const [dispositivos, setDispositivos] = useState([]);
  const [form, setForm] = useState({ ip: "", nome: "", descricao: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

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

  async function handleSubmit(e) {
    e.preventDefault();
    if (isEditing) {
      try {
        await axios.put(`http://localhost:3001/dispositivo/${editId}`, form);
        setDispositivos(
          dispositivos.map((d) => (d._id === editId ? { ...d, ...form } : d))
        );
        setIsEditing(false);
        setEditId(null);
      } catch (error) {
        console.error("Erro ao atualizar dispositivo:", error.message);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3001/dispositivos",
          form
        );
        setDispositivos([...dispositivos, response.data]);
      } catch (error) {
        console.error("Erro ao cadastrar dispositivo:", error);
      }
      setForm({ ip: "", nome: "", descricao: "" });
    }
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  }

  function handleEdit(id) {
    const dispositivo = dispositivos.find((d) => d._id === id);
    setForm({
      ip: dispositivo.ip,
      nome: dispositivo.nome,
      descricao: dispositivo.descricao
    });
    setIsEditing(true);
    setEditId(id);
  }

  async function handleDelete(id) {
    console.log("Deletando dispositivo com id:", id);
    const isConfirmed = window.confirm(
      "Tem certeza que quer deletar o dispositivo?"
    );

    if (isConfirmed) {
      try {
        console.log("dispositivos: ", dispositivos);
        console.log("id: ", id);
        await axios.delete(`http://localhost:3001/dispositivo/${id}`);

        setDispositivos(dispositivos.filter((d) => d._id !== id));
      } catch (error) {
        console.error("Erro ao deletar dispositivo:", error);
      }
    }
  }

  return (
    <div className="container w-75">
      <h2>Cadastro do Dispositivo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">IP</label>
          <input
            type="text"
            className="form-control"
            id="ip"
            value={form.ip}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nome do Dispositivo</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={form.nome}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição do Dispositivo</label>
          <input
            type="text"
            className="form-control"
            id="descricao"
            value={form.descricao}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-start gap-3 w-50">
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Atualizar" : "Cadastrar"}
          </button>
          <button
            type="reset"
            className="btn btn-secondary"
            onClick={() => {
              setForm({ ip: "", nome: "", descricao: "" });
            }}
          >
            Limpar
          </button>
        </div>
      </form>

      <h2 className="mt-3">Dispositivos Cadastrados</h2>
      <table className="table mt-3">
        <thead>
          <tr>
            <th scope="col">IP</th>
            <th scope="col">Nome</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {dispositivos.map((dispositivo) => {
            return (
              <tr key={dispositivo._id}>
                <td>{dispositivo.ip}</td>
                <td>{dispositivo.nome}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => {
                      handleEdit(dispositivo._id);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      handleDelete(dispositivo._id);
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FormDispositivo;
