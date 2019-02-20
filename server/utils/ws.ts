import {events, ServerRXListener, ServerRXListenerCallback, Upstream} from "../../serverInterfaces";
import {isJSON} from "./lang";
import * as ws from "ws";

export class Server {
  private listener: ServerRXListener[] = [];
  private link: WebSocket;

  // whatever it's an internal implement we can do performance fix when needed.
  constructor(link: WebSocket) {
    this.link = link;
    // @ts-ignore
    this.link.on("message", (message: string) => {
      console.log("<<< %s", message);
      if (!isJSON(message)) {
        this.badRequest();
      }
      const req = JSON.parse(message) as Upstream;
      if (!req.hasOwnProperty("event")) {
        this.badRequest();
      }
      this.listener.forEach((v: ServerRXListener) => {
        if (v.event === req.event) {
          v.callback(this, req.payload);
        }
      });
    });
  }

  public RX(event: events, callback: ServerRXListenerCallback) {
    this.listener.push({event, callback});
  }

  public TX(event: events, payload: object) {
    console.log(">>> %s", JSON.stringify({event, payload}));
    this.link.send(JSON.stringify({event, payload}));
  }

  private badRequest() {
    this.TX(events.uncat, {message: "bad request."});
  }
}

export const listen = (listener: (T: WebSocket) => void) => {
  const wss = new ws.Server({port: (process.env.PORT || 6655) as number});
  wss.on("connection", listener);
};
