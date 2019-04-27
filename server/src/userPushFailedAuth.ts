import {Server} from "../utils/ws";
import {events} from "../../bridge";
import {In} from "../../bridge/userPushFailedAuth";

// TODO: use event system

export const userPushFailedAuth = (s: Server) => {
  console.log(">>> [authFailed]");
  s.TX(events.userPushFailedAuth, {} as In);
};
