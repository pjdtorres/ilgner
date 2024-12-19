import Dispositivo from "../models/dispositivo.js";

export const criarDispositivo = async (req, res) => {
  try {
    const { ip, nome, descricao } = req.body;
    const novoDispositivo = new Dispositivo({ ip, nome, descricao });
    console.log("criarDispositivo: ", novoDispositivo);

    await novoDispositivo.save();

    res.status(201).json(novoDispositivo);
  } catch (error) {
    res.status(500).send(`Erro ao criar dispositivo ERRO: ${error.message}`);
  }
};

export const listarDispositivos = async (req, res) => {
  try {
    const dispositivos = await Dispositivo.find();
    // console.log("listarDispositivos: ", dispositivos);
    res.send(dispositivos);
  } catch (error) {
    res.status(500).send(`Erro ao listar dispositivos ERRO: ${error.message}`);
  }
};

export const listarDispositivoByID = async (req, res) => {
  try {
    const { id } = req.params;

    const dispositivo = await Dispositivo.findById(id);
    // console.log("Dispositivo: ", dispositivo);
    res.send(dispositivo);
  } catch (error) {
    res.status(500).send(`Erro ao listar dispositivos ERRO: ${error.message}`);
  }
};

export const atualizarDispositivo = async (req, res) => {
  try {
    const { ip, nome, descricao } = req.body;
    const { id } = req.params;

    const dispositivoAtualizado = await Dispositivo.findByIdAndUpdate(id, {
      ip,
      nome,
      descricao
    });

    res.status(200).json(dispositivoAtualizado);
  } catch (error) {
    res
      .status(500)
      .send(`Erro ao atualizar dispositivo ERRO: ${error.message}`);
  }
};

export const deletarDispositivo = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteDispositivo = await Dispositivo.findByIdAndDelete(id);
    console.log("deletarDispositivo: ", deleteDispositivo);

    if (deleteDispositivo) {
      console.log("dispositivo deletado!");
      res.status(200).send({ message: "dispositivo deletado" });
    } else {
      console.log("dispositivo não existe!");
      res.status(200).send({ message: "dispositivo não existe" });
    }
    // res.status(204).send({ message: "dispositivo deletado" });
  } catch (error) {
    res.status(500).send(`Erro ao deletar dispositivo ERRO: ${error.message}`);
  }
};

export default {
  criarDispositivo,
  atualizarDispositivo,
  deletarDispositivo,
  listarDispositivoByID,
  listarDispositivos
};
