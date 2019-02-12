import WebSocket from "ws";

const wss = new WebSocket.Server({port: 52504});

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("<<< %s", message);
  });

  console.log("    connection established");
});

console.log("    Websocket server started");
