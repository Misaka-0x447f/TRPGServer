import WSL from "reconnecting-websocket";
import {serverAddr} from "@/interfaces/ws";
import {Downstream, events, Transfer, RXListener, RXListenerCallback, Upstream} from "../../serverInterfaces";
import {generatePulse, Watchable} from "@/utils/lang";

export type linkStatusCallback = (on: boolean) => void;

// TODO: memory leak.
class Client {
  private ws = new WSL(serverAddr);
  private listener: RXListener[] = [];

  constructor() {
    this.ws.addEventListener("message", (e: MessageEvent) => {
      console.log(`<<< ${e.data}`);
      generatePulse(sharedNetStatus, ["RX"]);
      const d = (JSON.parse(e.data) as Downstream);
      this.listener.forEach((v: RXListener) => {
        if (v.event === d.event) {
          v.callback(d.payload);
        }
      });
    });
    this.ws.addEventListener("open", () => {
      sharedNetStatus.link = true;
    });
    this.ws.addEventListener("close", () => {
      sharedNetStatus.link = false;
    });
  }

  public TX(event: events, payload: Transfer) {
    this.ws.send(JSON.stringify({event, payload} as Upstream));
    console.log(`>>> ${JSON.stringify({event, payload} as Upstream)}`);
    generatePulse(sharedNetStatus, ["TX"]);
  }

  public RX(event: events, callback: RXListenerCallback) {
    this.listener.push({event, callback});
  }
}

export const link = new Client();

// only for special purpose, do not access outside of 'components/netstat'
export const sharedNetStatusProxy = new Watchable();
export const sharedNetStatus = sharedNetStatusProxy.init({RX: false, TX: false, link: false});
