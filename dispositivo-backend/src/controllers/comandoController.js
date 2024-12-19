import enviarComando from "../utils/enviarComando.js";

export const enviarComandoController = async (req, res) => {
  try {
    const ip = req.query.ip;
    const action = req.query.action;

    console.log(`Enviando comando: "${action}" para o dispositivo ${ip} ...`);

    console.log("\nIP:", ip);
    console.log("action:", action);

    if (!ip) {
      console.log("Atenção: IP é obrigatório".bgYellow.red.bold);
      return res.status(400).send("IP é obrigatório");
    }

    if (!action) {
      console.log("Atenção: Ação é obrigatória".bgYellow.red.bold);
      return res.status(400).send("Ação é obrigatória");
    }

    let acionamento;
    if (action === "ligar") {
      acionamento = "A";
    } else if (action === "desligar") {
      acionamento = "a";
    } else {
      return res
        .status(400)
        .send('Comando inválido, envie "ligar" ou "desligar"');
    }

    const result = enviarComando(ip, acionamento);
    res.send(result);
  } catch (error) {
    // res.status(500).send(`Erro: ${error.message}`);
    res.status(200).send(`Erro`);
  }
};

export const verificarDispositivo = async (req, res) => {
  try {
    const ip = req.query.ip;

    if (!ip) {
      return res.status(400).send("IP é obrigatório");
    }

    const statusComando = "status";
    const result = enviarComando(ip, statusComando);
    res.send(result);
  } catch (error) {
    res.status(500).send(`Erro: ${error.message}`);
  }
};

export default { enviarComando, verificarDispositivo };
