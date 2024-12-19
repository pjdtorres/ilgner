import mongoose from "mongoose";

const dispositivoSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  descricao: { type: String }
});

const Dispositivo = mongoose.model("Dispositivo", dispositivoSchema);

export default Dispositivo;
