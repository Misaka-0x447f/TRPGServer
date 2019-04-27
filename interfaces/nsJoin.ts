import {Receive, Transfer} from "./index";

export interface Out extends Transfer {
  namespace: string;
}

export interface In extends Receive {
  result: response;
}

export enum response {
  ok = "ok",
  full = "full",
}
