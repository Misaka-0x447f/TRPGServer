import {Server} from "../server/utils/ws";

export enum events {
  reg = "reg",
  namespaceQuery = "namespaceQuery",
  namespaceCreate = "namespaceCreate" // create or get in
}

export interface Upstream {
  event: events;
  payload: Transfer;
}

export interface Downstream {
  event: events;
  payload: Receive;
}

// tslint:disable-next-line
export interface Transfer {}

export interface Receive {
  result: any;
}

// TransferWithAuth
export interface TransferAuth extends Transfer {
  user: string;
  uid: string;
}

export interface RXListener {
  event: events;
  callback: RXListenerCallback;
}

export type RXListenerCallback = (T: Receive) => void;

export interface ServerRXListener {
  event: events;
  callback: ServerRXListenerCallback;
}

export type ServerRXListenerCallback = (L: Server, T: object) => void;
