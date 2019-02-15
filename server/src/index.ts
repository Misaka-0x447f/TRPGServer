import * as ws from "ws";
import * as http from "http";

const server = http.createServer();
server.listen(80, "0.0.0.0");

const wsi = new ws.Server({server});

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
