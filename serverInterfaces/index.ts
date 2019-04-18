import {Server} from "../server/utils/ws";

// events that start with lodash means server event
export enum events {
  reg = "reg",
  namespaceQuery = "namespaceQuery",
  namespaceCreate = "namespaceCreate", // create or get in
  namespaceChildQuery = "namespaceChildQuery",
  authFailed = "authFailed",
  namespaceNotJoined = "namespaceNotJoined",
  namespaceNotExist = "namespaceNotExist",
}

// tslint:disable-next-line
export interface Transfer {
}

export interface Receive {
  result: any;
}

// Downstream

export interface Downstream {
  event: events;
  payload: Receive;
}

/*
* No downstream listener/sender options here.
* If auth failed, it could be figure out by extra data.
* */

export interface DownstreamListener {
  event: events;
  callback: DownstreamListenerCallback;
}

export type DownstreamListenerCallback = (T: any) => void;

// Upstream

export interface Upstream {
  event: events;
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
  event: events;
  callback: UpstreamListenerCallback;
  options?: UpstreamListenerOptions;
}

export type UpstreamListenerCallback = (L: Server, T: Transfer, E?: UpstreamExtras) => void;
