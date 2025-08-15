const http = require("http");
const WebSocket = require("ws");

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Serveur Chat Local en ligne");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Un utilisateur s'est connecté");

  ws.on("message", (message) => {
    console.log("Reçu :", message.toString());

    // Diffuse à tous les clients, y compris l'émetteur
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("Un utilisateur s'est déconnecté");
  });
});

server.listen(8080, () => {
  console.log("Serveur lancé sur http://localhost:8080");
});
