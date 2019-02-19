import {Downstream, Upstream} from "./index";

export interface Out extends Upstream {
  payload: {
    username: string
  };
}

export interface In extends Downstream {
  payload: {
    result: regResponse,
    user?: string,
    uid?: string
  };
}

export enum regResponse {
  ok = "ok",
  exist = "exist"
}
