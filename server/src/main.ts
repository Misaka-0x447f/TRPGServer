import WebSocket from "ws";

const wss = new WebSocket.Server({ port: 52504 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });

  ws.send("Hello");
});

console.log("Websocket server started");
