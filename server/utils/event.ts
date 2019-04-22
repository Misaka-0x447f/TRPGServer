import {EventEmitter} from "events";
import {Namespace} from "./state";

export const enum ev {
  userChanged = "userChanged"
}

export interface EvListeners {
  [ev.userChanged]: (ns: Namespace) => void;
}

export const ec = new EventEmitter();

export default ec;
