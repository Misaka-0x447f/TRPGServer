import {Server} from "../server/src/utils/ws";

// events that start with lodash means server event
export enum commEvents {
  nsGet = "nsGet",
  nsJoin = "nsJoin", // create or get in
  nsUpdateChild = "nsUpdateChild",
  nsPushNotJoined = "nsPushNotJoined",
  nsPushNotExist = "nsPushNotExist",
  userUpdate = "userUpdate",
  userHeartbeat = "userHeartbeat",
  userPushFailedAuth = "userPushFailedAuth",
}

// tslint:disable-next-line
export interface Transfer {
}

export interface Receive {
  result: any;
}

// Downstream

export interface Downstream {
  event: commEvents;
  payload: Receive;
}

export interface DownstreamListener {
  event: commEvents;
  callback: DownstreamListenerCallback;
}

export type DownstreamListenerCallback = (T: any) => void;

// Upstream

export interface Upstream {
  event: commEvents;
  extras?: UpstreamExtras;
  payload: Transfer;
}

export interface UpstreamSenderOptions {
  auth?: false;  // if false no auth need with this method;
}

export interface UpstreamListenerOptions {
  auth?: false; // exist so auth is not required by this method
}

// Receiving extra data in listener
export interface UpstreamExtras {
  // for get credential in listener
  auth?: {
    user: string;
    credential: string;
  };
}

export interface UpstreamListener {
  event: commEvents;
  callback: UpstreamListenerCallback;
  options?: UpstreamListenerOptions;
}

export type UpstreamListenerCallback = (L: Server, T: Transfer, E?: UpstreamExtras) => void;
