import {Server} from "../utils/ws";
import {commEvents} from "../../../bridge";
import {Namespace} from "../utils/state";
import {nsBroadcastByEventName} from "../utils/ns";
import {ev, Ev} from "../utils/event";

export const nsPushNotExist = (s: Server) => {
  s.TX(commEvents.nsPushNotExist, {});
};

const nsBroadcastPushNotExist = (ns: Namespace) => {
  nsBroadcastByEventName(ns, commEvents.nsPushNotExist, {});
};

Ev.on(ev.nsNotExistAsIntend, nsBroadcastPushNotExist);
