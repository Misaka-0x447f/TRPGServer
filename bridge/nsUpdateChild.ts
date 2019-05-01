import {Receive, Transfer} from "./index";
import {OnlineUserData} from "../server/src/utils/state";

export interface Out extends Transfer {
  namespace: string;
}

export interface In extends Receive {
  result: response;
  child: {
    master: Array<OnlineUserData["user"]>,
    player: Array<OnlineUserData["user"]>
  };
}

export enum response {
  ok = "ok",
}
