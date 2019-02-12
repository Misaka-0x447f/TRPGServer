import {serverAddr} from "@/interfaces/ws";
import {Method, WebsocketIn, WebsocketOut} from "../../serverInterfaces";
import {Watchable} from "@/utils/lang";
import {isUndefined} from "lodash";

export class Comm {
  private w = new WebSocket(serverAddr);
  private outBufferProxy = new Watchable();
  private outBuffer: WebsocketOut[] = this.outBufferProxy.init([]);

  constructor() {
    // traffic control
    setInterval(() => {
      this.outBufferProxy.triggerAll();
    }, 300);

    this.outBufferProxy.registerTrigger(() => {
      if (this.outBuffer.length > 50) {
        console.warn(`Warning: too many (${this.outBuffer.length}) websocket outgoing traffic`);
      }
      if (this.w.readyState !== 1 || this.outBuffer.length === 0) {
        return; // will be try again
      }
      const payload = this.outBuffer.shift();
      if (isUndefined(payload)) {
        return;
      }
      this.w.send(JSON.stringify(payload));
      console.log(`>>> ${JSON.stringify(payload.data)}`);
    });
  }

  public send(method: Method, data: object) {
    this.outBuffer.push({
      method,
      data
    } as WebsocketOut);
  }

  public registerListener(callback: (T: WebsocketIn) => void) {
    // @ts-ignore
    this.w.onmessage = (e: MessageEvent) => {
      console.log(`<<< ${e.data}`);
      callback({data: JSON.parse(e.data)} as WebsocketIn);
    };
  }
}
