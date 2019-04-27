import {Receive, Transfer} from "./index";

export interface Out extends Transfer {
  user: string;
  credential?: string;
}

export interface In extends Receive {
  result: regResponse;
  user?: string;
  credential?: string;
}

export enum regResponse {
  ok = "ok",
  exist = "exist",
  rejected = "rejected"
}
