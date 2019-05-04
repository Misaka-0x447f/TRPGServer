import {Server} from "../utils/ws";
import {commEvents} from "../../../bridge";
import {ev, Ev} from "../utils/event";

export const nsPushNotJoined = (s: Server) => {
  s.TX(commEvents.nsPushNotJoined, {});
};

Ev.on(ev.nsNotJoinedAsIntend, nsPushNotJoined);
