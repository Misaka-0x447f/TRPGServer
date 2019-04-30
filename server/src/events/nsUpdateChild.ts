import {commEvents, UpstreamExtras} from "../../../bridge";
import {In, Out, response} from "../../../bridge/nsUpdateChild";
import {Server} from "../utils/ws";
import {nsBroadcastByEventName, nsPermCheckByName} from "../utils/ns";
import {isUndefined} from "lodash";
import {Ev, ev} from "../utils/event";
import {Namespace} from "../utils/state";

export const setProcessor = (s: Server, m: Out, e: UpstreamExtras) => {
  const found = nsPermCheckByName(m.namespace, s, e.auth.user);
  if (isUndefined(found)) {
    return;
  }
  nsPushUpdateChild(s, found);
};

const nsPushUpdateChild = (s: Server, ns: Namespace) => {
  s.TX(commEvents.nsUpdateChild, {result: response.ok, child: ns.child} as In);
};

const nsBroadcastUpdateChild = (ns: Namespace) => {
  nsBroadcastByEventName(ns, commEvents.nsUpdateChild, {result: response.ok, child: ns.child} as In);
};

Ev.on(ev.userChanged, nsBroadcastUpdateChild);

export default setProcessor;
