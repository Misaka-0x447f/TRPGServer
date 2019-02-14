import WSLib from "ws";

const wsi = new WSLib.Server({port: 80});

wsi.on("connection", function connection(ws) {
  ws.on("message", (message) => {
    console.log("<<< %s", message);
    const data = JSON.stringify({data: {msg: "ACK"}});
    console.log(`>>> %s`, data);
    ws.send(data);
  });
  console.log("    connection established");
});

console.log("    Websocket server started");
