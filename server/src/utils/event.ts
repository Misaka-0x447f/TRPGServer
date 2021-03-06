import {EventEmitter} from "events";
import {Namespace, OnlineUserData} from "./state";
import * as util from "util";

export const enum ev {
  userChanged = "userChanged",
  nsNotExistAsIntend = "nsNotExistAsIntend",
  nsNotJoinedAsIntend = "nsNotJoinedAsIntend"
}

export interface EvListeners {
  [ev.userChanged]: (ns: Namespace) => void;
  [ev.nsNotExistAsIntend]: (ns: Namespace) => void;
  [ev.nsNotJoinedAsIntend]: (user: OnlineUserData["link"]) => void;
}

export class Ev {
  public static emit<T extends ev>(event: T, ...payload: Parameters<EvListeners[T]>) {
    Ev.ec.emit(event, ...payload);
    console.log(`--- [${event}] ---
    ${util.inspect(payload)}`);
  }

  public static on<T extends ev>(event: T, callback: EvListeners[T]) {
    Ev.ec.on(event, callback);
  }

  public static off<T extends ev>(event: T, callback: EvListeners[T]) {
    Ev.ec.off(event, callback);
  }

  private static ec = new EventEmitter();
}
