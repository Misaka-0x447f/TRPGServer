// events that start with lodash means server event
import Transfer from "./Transfer";
import {Server} from "../server/src/utils/ws";
import Receive from "./Receive";

export const enum commEvents {
  nsGet = "nsGet",
  nsJoin = "nsJoin", // create or get in
  nsExit = "nsExit",
  nsUpdateChild = "nsUpdateChild",
  nsPushNotJoined = "nsPushNotJoined",
  nsPushNotExist = "nsPushNotExist",
  userUpdate = "userUpdate",
  userHeartbeat = "userHeartbeat",
  userPushFailedAuth = "userPushFailedAuth",
}

// Downstream
export interface Downstream {
  event: commEvents;
  payload: any; // disable ts check here
}

export type DnCallback<U> = U extends keyof Receive ? (Payload: Receive[U]) => void : never;

// Upstream
export interface Upstream {
  event: commEvents;
  extras?: UpstreamExtras;
  payload: any; // disable ts check here
}

export interface UpSendOptions {
  auth?: false;  // if false no auth need with this method;
}

export interface UpRecvOptions {
  auth?: false; // exist so auth is not required by this method
}

export type UpCallback<U> = U extends keyof Transfer ? (L: Server, P: Transfer[U], E?: UpstreamExtras) => void : never;

// Receiving extra data in listener
export interface UpstreamExtras {
  // for get credential in listener
  auth?: {
    user: string;
    credential: string;
  };
}
