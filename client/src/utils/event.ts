import {EventEmitter} from "events";

export const enum ev {
  menuButtonClick = "menuButtonClick",
}

export interface EvListeners {
  [ev.menuButtonClick]: () => void;
}

export class Ev {
  public static emit<T extends ev>(event: T, ...payload: Parameters<EvListeners[T]>) {
    Ev.ec.emit(event, ...payload);
  }

  public static on<T extends ev>(event: T, callback: EvListeners[T]) {
    Ev.ec.on(event, callback);
  }

  public static off<T extends ev>(event: T, callback: EvListeners[T]) {
    Ev.ec.off(event, callback);
  }

  private static ec = new EventEmitter();
}

export default Ev;
