import {Server} from "../server/utils/ws";

export enum events {
  reg = "reg",
  namespaceQuery = "namespaceQuery",
  namespaceCreate = "namespaceCreate" // create or get in
}

export interface Upstream {
  event: events;
  options?: {
    auth?: {
      user: string;
      uid: string;
    };
  };
  payload: Transfer;
}

export interface Downstream {
  event: events;
  extras?: {
    auth?: false;
  };
  payload: Receive;
}

// tslint:disable-next-line
export interface Transfer {}

export interface Receive {
  result: any;
}

// Downstream Listeners

export interface DownstreamOptions {
  auth?: false; // if false, client thought that auth not required
}

export interface DownstreamListener {
  event: events;
  callback: DownstreamListenerCallback;
  options?: DownstreamOptions;
}

export type DownstreamListenerCallback = (T: Receive) => void;

// Upstream Listener

export interface UpstreamOptions {
  auth?: false; // if false, auth is not required by this method
}

// Receiving extra data in listener
export interface UpstreamExtras {
  // for get uid in listener
  auth?: {
    user: string;
    uid: string;
  };
}

export interface UpstreamListener {
  event: events;
  callback: UpstreamListenerCallback;
  options?: UpstreamOptions;
}

export type UpstreamListenerCallback = (L: Server, T: Transfer, E?: UpstreamExtras) => void;
