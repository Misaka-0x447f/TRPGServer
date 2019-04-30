import {EventEmitter} from "events";

export const enum ev {
  menuButtonClick = "menuButtonClick",
}

export interface EvListeners {
  [ev.menuButtonClick]: () => void;
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

export default Ev;
