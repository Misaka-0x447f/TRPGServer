import {Server} from "../utils/ws";
import {commEvents} from "../../../bridge";
import {In} from "../../../bridge/nsPushNotExist";
import {Namespace} from "../utils/state";
import {nsBroadcastByEventName} from "../utils/ns";
import {ev, Ev} from "../utils/event";

export const nsPushNotExist = (s: Server) => {
  s.TX(commEvents.nsPushNotExist, {} as In);
};

const nsBroadcastPushNotExist = (ns: Namespace) => {
  nsBroadcastByEventName(ns, commEvents.nsPushNotExist, {} as In);
};

Ev.on(ev.nsNotExistAsIntend, nsBroadcastPushNotExist);
