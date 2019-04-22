import {events, UpstreamExtras} from "../../serverInterfaces";
import {In, Out, response} from "../../serverInterfaces/nsUpdateChild";
import {Server} from "../utils/ws";
import {nsBroadcast, nsPermCheck} from "../utils/ns";
import {isUndefined} from "lodash";
import ec, {ev, EvListeners} from "../utils/event";

export const setProcessor = (s: Server, m: Out, e: UpstreamExtras) => {
  const found = nsPermCheck(m.namespace, s, e.auth.user);
  if (isUndefined(found)) {
    return;
  }
  s.TX(events.nsUpdateChild, {result: response.ok, child: found.child} as In);
};

const updateHandler: EvListeners[ev.userChanged] = (ns) => {
  nsBroadcast(ns, events.nsUpdateChild, {result: response.ok, child: ns.child} as In);
};

ec.on(ev.userChanged, updateHandler);

export default setProcessor;
