import {EventEmitter} from "events";
import {Namespace, OnlineUserData} from "./state";

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
  public static emit<T extends ev, K extends Parameters<EvListeners[T]>>(event: T, ...payload: K) {
    Ev.ec.emit(event, ...payload);
  }

  public static on<T extends ev, K extends EvListeners[T]>(event: T, callback: K) {
    Ev.ec.on(event, callback);
  }

  public static off<T extends ev, K extends EvListeners[T]>(event: T, callback: K) {
    Ev.ec.off(event, callback);
  }

  private static ec = new EventEmitter();
}
