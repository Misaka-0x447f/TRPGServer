import {WebsocketIn, WebsocketOut} from "./index";

export interface Out extends WebsocketOut {
  data: {
    username: string
  };
}

export interface In extends WebsocketIn {
  data: {
    result: regResponse,
    uid?: string
  };
}

export enum regResponse {
  ok = "ok",
  exist = "exist"
}
