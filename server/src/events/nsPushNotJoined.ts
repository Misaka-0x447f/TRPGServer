import {Server} from "../utils/ws";
import {commEvents} from "../../../bridge";
import {In} from "../../../bridge/nsPushNotJoined";
import {ev, Ev} from "../utils/event";

export const nsPushNotJoined = (s: Server) => {
  s.TX(commEvents.nsPushNotJoined, {} as In);
};

Ev.on(ev.nsNotJoinedAsIntend, nsPushNotJoined);
