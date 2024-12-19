import mongoose from "mongoose";

// Importar variáveis de ambiente.env
import * as dotenv from "dotenv";
dotenv.config({ path: "variables.env" });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.mongoUri, {});
    console.log("Conectado com sucesso ao MongoDB!!!".bgYellow.red.bold);
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    process.exit(1);
  }
};

export default conectarDB;
