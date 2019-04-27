import {Receive, Transfer} from "./index";
import {Namespace} from "../server/utils/state";

export interface Out extends Transfer {
  namespace: string;
}

export interface In extends Receive {
  result: response;
  child: Namespace["child"];
}

export enum response {
  ok = "ok",
}
