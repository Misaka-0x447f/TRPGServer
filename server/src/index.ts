import * as ws from "ws";

const wsi = new ws.Server({port: 80});

wsi.on("connection", function connection(c) {
  c.on("message", (message) => {
    console.log("<<< %s", message);
    const data = JSON.stringify({data: {msg: "ACK"}});
    console.log(`>>> %s`, data);
    c.send(data);
  });
  console.log("    connection established");
});

console.log("    Websocket server started");
