import express from "express";

import {
  criarDispositivo,
  atualizarDispositivo,
  deletarDispositivo,
  listarDispositivoByID,
  listarDispositivos
} from "../controllers/dispositivoController.js";

import {
  enviarComandoController,
  verificarDispositivo
} from "../controllers/comandoController.js";

const router = express.Router();

router.get("/dispositivos", listarDispositivos);
router.get("/comando", enviarComandoController);
router.get("/status", verificarDispositivo);
router.get("/dispositivo/:id", listarDispositivoByID);
router.post("/dispositivos", criarDispositivo);
router.put("/dispositivo/:id", atualizarDispositivo);
router.delete("/dispositivo/:id", deletarDispositivo);

export default router;
