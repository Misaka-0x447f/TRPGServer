import {Server} from "../utils/ws";
import {commEvents} from "../../../bridge";
import {In} from "../../../bridge/userPushFailedAuth";

export const userPushFailedAuth = (s: Server) => {
  s.TX(commEvents.userPushFailedAuth, {} as In);
};
