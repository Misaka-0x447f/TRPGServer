import {events, Upstream} from "../../serverInterfaces";
import {isJSON} from "./lang";
import * as ws from "ws";

interface Listener {
  event: events;
  callback: (T: object) => void;
}

export class Server {
  private listener: Listener[] = [];
  private link: WebSocket;

  // whatever it's an internal implement we can do performance fix when needed.

  constructor(link: WebSocket) {
    this.link = link;
    // @ts-ignore
    this.link.onmessage((message: MessageEvent) => {
      console.log("<<< %s", message);
      if (!isJSON(message.data)) {
        this.badRequest();
      }
      const req = JSON.parse(message.data) as Upstream;
      if (!req.hasOwnProperty("event")) {
        this.badRequest();
      }
      this.listener.forEach((v: Listener) => {
        if (v.event === req.event) {
          v.callback(req.payload);
        }
      });
    });
  }

  public RX(event: events, callback: Listener["callback"]) {
    this.listener.push({event, callback});
  }

  public TX(event: events, message: object) {
    this.link.send(JSON.stringify({event, payload: JSON.stringify(message)}));
  }

  private badRequest() {
    this.TX(events.uncat, {message: "bad request."});
  }
}

export const listen = (listener: (T: WebSocket) => void) => {
  const wss = new ws.Server({port: (process.env.PORT || 80) as number});
  wss.on("connection", listener);
};
