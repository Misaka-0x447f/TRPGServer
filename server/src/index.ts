import * as ws from "ws";

const wsi = new ws.Server({port: 6655});

wsi.on("connection", function connection(server) {
  server.on("message", (message) => {
    console.log("<<< %s", message);
    const data = JSON.stringify({data: {msg: "ACK"}});
    console.log(`>>> %s`, data);
    server.send(data);
  });
  console.log("    connection established");
});

console.log("    Websocket server started");
