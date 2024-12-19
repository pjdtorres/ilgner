#include <WiFi.h>
#include <WiFiClient.h>

// WIFI
// const char *ssid = "pjdtorres_2G";      // The SSID (name) of the Wi-Fi network you want to connect to
// const char *password = "abelhas2019";   // The password of the Wi-Fi network
const char *ssid = "ASUS_mypt_2G";
const char *password = "mypt2022";

const int serverPort = 80; // Porta para o servidor TCP
const int rele = 14;

WiFiServer server(serverPort);

void setup(){

 Serial.begin(115200);
 
 pinMode(rele,OUTPUT);
 
  Serial.print("\nConectando à rede WiFi..");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConectado à rede WiFi!");
  Serial.println("Endereço IP: " + WiFi.localIP().toString());

  // Iniciar servidor TCP
  server.begin();
  Serial.println("\nServidor TCP iniciado!");
  
}


void loop(){

 WiFiClient client = server.available();
 
if(client){
  Serial.println("Novo cliente conectado!");
  
   // Aguardar até que o cliente envie algum dado
    while (client.connected() && !client.available()) {
      delay(1);
    }

    char command = client.read();

    // Verificar se o comando é "a" (acionar )
    Serial.println("command: " + String(command));
    if (command == 'a') {
      Serial.println("Comando para DESLIGAR recebido (rele = LOW)");
      client.println("ok");
      digitalWrite(rele, LOW);
       }
     if (command == 'A') {
      Serial.println("Comando para LIGAR recebido (rele = HIGH)");
      client.println("ok");
      // Acionar a fechadura (pino 14 / GPIO 14)
      digitalWrite(rele, HIGH);
    }

    client.stop();
    Serial.println("Cliente desconectado");
}  
}
