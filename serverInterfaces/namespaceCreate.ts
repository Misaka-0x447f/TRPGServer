import {Receive, Transfer} from "./index";

export interface Out extends Transfer {
  namespace: string;
  uid?: string;
}

export interface In extends Receive {
  result: response;
  namespace?: string;
  uid?: string;
}

export enum response {
  ok = "ok",
  full = "full",
}
