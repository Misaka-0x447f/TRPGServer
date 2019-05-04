import {commEvents, UpstreamExtras} from "../../../bridge";
import {Server} from "../utils/ws";
import {nsBroadcastByEventName, nsGetChildListForClient, nsPermCheckByName} from "../utils/ns";
import {isUndefined} from "lodash";
import {Ev, ev} from "../utils/event";
import {Namespace} from "../utils/state";
import {TX} from "../../../bridge/Transfer";

export const setProcessor = (s: Server, m: TX<commEvents.nsUpdateChild>, e: UpstreamExtras) => {
  const found = nsPermCheckByName(m.namespace, s, e.auth.user);
  if (isUndefined(found)) {
    return;
  }
  nsPushUpdateChild(s, found);
};

const nsPushUpdateChild = (s: Server, ns: Namespace) => {
  s.TX(commEvents.nsUpdateChild, {result: "ok", child: nsGetChildListForClient(ns)});
};

const nsBroadcastUpdateChild = (ns: Namespace) => {
  nsBroadcastByEventName(ns, commEvents.nsUpdateChild, {result: "ok", child: nsGetChildListForClient(ns)});
};

Ev.on(ev.userChanged, nsBroadcastUpdateChild);

export default setProcessor;
