import {Server} from "../utils/ws";
import {commEvents} from "../../../bridge";

export const userPushFailedAuth = (s: Server) => {
  s.TX(commEvents.userPushFailedAuth, {});
};
