import {Server} from "../server/utils/ws";

export enum events {
  reg = "reg",
  uncat = "uncategorized",
}

export interface Upstream {
  event: events;
  payload: object;
}

export interface Downstream {
  event: events;
  payload: object;
}

export interface RXListener {
  event: events;
  callback: RXListenerCallback;
}

export type RXListenerCallback = (T: object) => void;

export interface ServerRXListener {
  event: events;
  callback: ServerRXListenerCallback;
}

export type ServerRXListenerCallback = (L: Server, T: object) => void;
