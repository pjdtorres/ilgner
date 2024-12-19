import express from "express";
import cors from "cors";
import colors from "colors";

import router from "./routes/routes.js";

import conectarDB from "../src/config/db.js";

const porto = process.env.PORTO || 4000;
console.log("Porto:".bgMagenta, porto.bgMagenta);

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
conectarDB();

// const mongoUri = "mongodb://localhost:27017/dispositivos";

// mongoose
//   .connect(mongoUri)
//   .then(() => {
//     console.log("Conectado com sucesso ao MongoDB");
//   })
//   .catch((error) => {
//     console.error("Erro ao conectar ao MongoDB:", error);
//   });

app.use(router); // Incluído o prefixo /api
// app.use('/api', router); // Incluído o prefixo /api

app.listen(porto, () => {
  console.log(
    `Servidor rodando no endereço: ${process.env.FRONTEND_URL}`.bgYellow.blue
      .bold
  );
});
