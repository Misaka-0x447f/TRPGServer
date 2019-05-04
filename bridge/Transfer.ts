import {commEvents} from "./index";
import {OnlineUserData} from "../server/src/utils/state";

export interface Transfer {
  [commEvents.nsExit]: {namespace: string;},
  [commEvents.nsGet]: {namespace: string;},
  [commEvents.nsJoin]: {namespace: string;},
  [commEvents.nsUpdateChild]: {namespace: string;},
  [commEvents.userHeartbeat]: {namespace: string;},
  [commEvents.userUpdate]: {
    user: OnlineUserData["user"];
    credential?: OnlineUserData["credential"];
  }
}

export default Transfer;

export type TX<T> = T extends keyof Transfer ? Transfer[T] : never;
