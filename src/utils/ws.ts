import WSL from "reconnecting-websocket";
import {serverAddr} from "@/interfaces/ws";
import {Downstream, events, RXListener, RXListenerCallback, Upstream} from "../../serverInterfaces";

class Client {
  private ws = new WSL(serverAddr);
  private listener: RXListener[] = [];

  constructor() {
    this.ws.addEventListener("message", (e: MessageEvent) => {
      console.log(`<<< ${e.data}`);
      const d = (JSON.parse(e.data) as Downstream);
      this.listener.forEach((v: RXListener) => {
        if (v.event === d.event) {
          v.callback(d.payload);
        }
      });
    });
  }

  public TX(event: events, payload: object) {
    console.log(`>>> ${JSON.stringify({event, payload} as Upstream)}`);
    this.ws.send(JSON.stringify({event, payload} as Upstream));
  }

  public RX(event: events, callback: RXListenerCallback) {
    this.listener.push({event, callback});
  }
}

export const link = new Client();
