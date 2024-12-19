import net from "net";

function enviarComando(ip, comando) {
  const port = 80;

  console.log(`Enviando comando "${comando}" para o dispositivo ${ip}...\n`);
  console.log();

  return new Promise((resolve, reject) => {
    const client = net.createConnection({ host: ip, port }, () => {
      client.write(comando);
    });

    client.on("data", (data) => {
      resolve(data.toString());
      client.end();
    });

    client.on("error", (error) => {
      reject(new Error(`Erro de conexão: ${error}`));
    });

    client.on("end", () => {
      console.log("Conexão encerrada\n");
    });
  });
}

export default enviarComando;
