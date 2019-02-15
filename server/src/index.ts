import * as ws from "ws";

const port = (process.env.PORT || 80) as number;

const wsi = new ws.Server({port});

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
