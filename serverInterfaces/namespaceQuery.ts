import {Receive, Transfer} from "./index";

export interface Out extends Transfer {
  namespace: string;
}

export interface In extends Receive {
  result: response;
  namespace?: string;
}

export enum response {
  ok = "ok",
  null = "null", // not-exist
}
