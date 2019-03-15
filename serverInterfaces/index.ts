import {Server} from "../server/utils/ws";

export enum events {
  reg = "reg",
  uncat = "uncategorized",
}

export interface Upstream {
  event: events;
  payload: OutPayload;
}

export interface Downstream {
  event: events;
  payload: InPayload;
}

// tslint:disable-next-line
export interface OutPayload {}

export interface InPayload {
  result: any;
}

export interface RXListener {
  event: events;
  callback: RXListenerCallback;
}

export type RXListenerCallback = (T: InPayload) => void;

export interface ServerRXListener {
  event: events;
  callback: ServerRXListenerCallback;
}

export type ServerRXListenerCallback = (L: Server, T: object) => void;
