import WS from "ws";
import {serverAddr} from "@/interfaces/ws";
import {Method, WebsocketIn, WebsocketOut} from "../../serverInterfaces";

export class Comm {
  private w = new WS(serverAddr);

  public send(method: Method, data: object) {
    this.w.send({
      method,
      data: JSON.stringify(data)
    } as WebsocketOut);
    console.log(`>>> ${JSON.stringify(data)}`);
  }

  public registerListener(callback: (T: WebsocketIn) => void) {
    // @ts-ignore
    this.w.onmessage((e) => {
      console.log(`<<< ${JSON.stringify(e.data)}`);
      callback({data: e.data} as WebsocketIn);
    });
  }
}
