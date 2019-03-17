import {Receive, TransferAuth} from "./index";

export interface Out extends TransferAuth {
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
