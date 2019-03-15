import {InPayload, OutPayload} from "./index";

export interface Out extends OutPayload {
  user: string;
  uid?: string;
}

export interface In extends InPayload {
  result: regResponse;
  user?: string;
  uid?: string;
}

export enum regResponse {
  ok = "ok",
  exist = "exist",
  rejected = "rejected"
}
