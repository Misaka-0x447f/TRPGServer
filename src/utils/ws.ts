import WSL from "reconnecting-websocket";
import {serverAddr} from "@/interfaces/ws";
import {Downstream, events, RXListener, RXListenerCallback, Transfer, Upstream} from "../../serverInterfaces";
import {timeout} from "@/utils/lang";

// TODO: memory leak.
class Client {
  private ws = new WSL(serverAddr);
  private listener: RXListener[] = [];

  constructor() {
    this.ws.addEventListener("message", (e: MessageEvent) => {
      console.log(`<<< ${e.data}`);
      actHere();
      const d = (JSON.parse(e.data) as Downstream);
      this.listener.forEach((v: RXListener) => {
        if (v.event === d.event) {
          v.callback(d.payload);
        }
      });
    });
    this.ws.addEventListener("open", () => {
      linkStatus.link = true;
    });
    this.ws.addEventListener("close", () => {
      linkStatus.link = false;
    });
  }

  public TX(event: events, payload: Transfer) {
    this.ws.send(JSON.stringify({event, payload} as Upstream));
    console.log(`>>> ${JSON.stringify({event, payload} as Upstream)}`);
    actHere();
  }

  public RX(event: events, callback: RXListenerCallback) {
    this.listener.push({event, callback});
  }
}

export const link = new Client();

// only for special purpose, do not access outside of 'components/netstat'
export const linkStatus = {
  link: false,
  act: 0
};

async function actHere() {
  linkStatus.act++;
  await timeout(333);
  linkStatus.act--;
}
