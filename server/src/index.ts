import * as ws from "ws";
import {regProcessor} from "./userReg";
import {Method, Status, WebsocketOut} from "../../serverInterfaces";
import {out} from "../utils/ws";

const port = (process.env.PORT || 80) as number;

const wsi = new ws.Server({port});

wsi.on("connection", function connection(c) {
  c.on("message", (message: string) => {
    console.log("<<< %s", message);
    let req = JSON.parse(message);
    if (typeof req !== "object" || !req.hasOwnProperty("method")) {
      out(c, {status: Status.badRequest, data: {message: "unexpected request: invalid request."}});
    }
    req = req as WebsocketOut;
    if (req.method === Method.reg) {
      regProcessor(c, req);
    } else {
      out(c, {status: Status.badRequest, data: {message: "unexpected request: not recognized method."}});
    }
  });
  console.log("    connection established");
});

console.log("    Websocket server started");
