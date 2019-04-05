import {Receive} from "./index";

export interface In extends Receive {
  result: roomExceptionResult;
}

export enum roomExceptionResult {
  disconnected = "disconnected",
  disappear = "disappear",
}
