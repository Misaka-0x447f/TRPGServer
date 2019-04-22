import {Server} from "../utils/ws";
import {events} from "../../serverInterfaces";
import {In} from "../../serverInterfaces/userPushFailedAuth";

// TODO: use event system

export const userPushFailedAuth = (s: Server) => {
  console.log(">>> [authFailed]");
  s.TX(events.userPushFailedAuth, {} as In);
};
