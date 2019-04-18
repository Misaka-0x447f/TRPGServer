import {Server} from "../utils/ws";
import {events} from "../../serverInterfaces";
import {In} from "../../serverInterfaces/authFailed";

export const authFailed = (s: Server) => {
  console.log(">>> [authFailed]");
  s.TX(events.authFailed, {} as In);
};
