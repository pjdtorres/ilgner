import { useState } from "react";
function Card({ nome, descricao, ip }) {
  const [isOn, SetIsOn] = useState(true);

  // const [ip, SetIp] = useState("192.168.2.236");

  function sendComando(action) {
    console.log("Dispositivo com ip:", ip);
    console.log("Dispositivo com action:", action);
    // fetch(`http://localhost:3001/comando?ip=${ip}&action=${action}`).then(
    //   (response) => {
    //     if (response.ok) {
    //       return response.text();
    //     } else {
    //       throw new Error("Erro ao enviar");
    //     }
    //   }
    // );

    fetch(`http://localhost:3001/comando?ip=${ip}&action=${action}`)
      .then((response) => {
        console.log("resposta: ", response);
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Erro ao enviar");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("Erro:", error.message);
      });
  }

  function handleComando() {
    SetIsOn(!isOn);
    const action = isOn ? "desligar" : "ligar";
    sendComando(action);
  }

  return (
    <>
      <div className="card" style={{ width: "18em" }}>
        <div className="card-body d-flex flex-column align-items-center">
          <h5 className="card-title">{nome}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {descricao}
          </h6>
          <p className="card-text">IP: {ip}</p>
          <button
            type="button"
            className={!isOn ? "btn btn-success" : "btn btn-danger"}
            onClick={handleComando}
          >
            {isOn ? "Desligar" : "Ligar"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
