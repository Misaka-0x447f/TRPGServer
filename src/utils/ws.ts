import {serverAddr} from "@/interfaces/ws";
import {Method, WebsocketIn, WebsocketOut} from "../../serverInterfaces";
import {getUnixTimestamp, Watchable} from "@/utils/lang";
import {isUndefined, remove} from "lodash";

export class Comm {
  public w = new WebSocket(serverAddr);
  private outBufferProxy = new Watchable();
  private outBuffer: Array<WebsocketOut & { timestamp: number }> = this.outBufferProxy.init([]);
  private outRequestCount = 0;
  private bufferLength = 1;
  private timeout = 30000;

  constructor() {
    // traffic control
    setInterval(() => {
      this.outBufferProxy.triggerAll();
    }, 300);

    this.outBufferProxy.registerTrigger(() => {
      // clean up timed-out request
      remove(this.outBuffer, (o: WebsocketOut & { timestamp: number }) => {
        return getUnixTimestamp() - o.timestamp > this.timeout;
      });

      if (this.w.readyState !== 1 || this.outBuffer.length === 0) {
        return;
      }
      const payload = this.outBuffer.shift();
      this.outRequestCount++;
      if (isUndefined(payload)) {
        return;
      }
      this.w.send(JSON.stringify(payload));
      this.outRequestCount--;
      console.log(`>>> ${JSON.stringify(payload.data)}`);
    });
  }

  public send(method: Method, data: object) {
    if (this.w.readyState > 1 || this.outBuffer.length >= this.bufferLength) {
      return false;
    }
    const d = {
      method,
      data,
      timestamp: getUnixTimestamp()
    };
    this.outBuffer.push(d);
    return true;
  }

  public registerListener(callback: (T: WebsocketIn) => void) {
    // @ts-ignore
    this.w.onmessage = (e: MessageEvent) => {
      console.log(`<<< ${e.data}`);
      callback({data: JSON.parse(e.data)} as WebsocketIn);
    };
  }

  public registerErrorListener(callback: (e: Event) => void) {
    this.w.onerror = (ev: Event) => {
      callback(ev);
    };
  }
}
