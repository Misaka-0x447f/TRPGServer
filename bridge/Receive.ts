import {commEvents} from "./index";
import {OnlineUserData} from "../server/src/utils/state";

export interface Receive {
  [commEvents.nsGet]: {
    result: "ok" | "null"
  },
  [commEvents.nsJoin]: {
    result: "ok" | "full"
  },
  [commEvents.nsPushNotExist]: {},
  [commEvents.nsPushNotJoined]: {},
  [commEvents.nsUpdateChild]: {
    result: "ok",
    child: {
      master: Array<OnlineUserData["user"]>,
      player: Array<OnlineUserData["user"]>
    };
  },
  [commEvents.userPushFailedAuth]: {},
  [commEvents.userUpdate]: {
    result: "ok" | "exist" | "rejected";
    user?: string;
    credential?: string;
  }
}

export default Receive;

export type RX<T> = T extends keyof Receive ? Receive[T] : never;
