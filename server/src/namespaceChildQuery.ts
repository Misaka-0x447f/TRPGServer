import {events, UpstreamExtras} from "../../serverInterfaces";
import {In, Out, response} from "../../serverInterfaces/namespaceChildQuery";
import {Server} from "../utils/ws";
import {nsBroadcast, nsPermCheck} from "../utils/ns";
import {isUndefined} from "lodash";
import ec, {ev, EvListeners} from "../utils/event";

export const setProcessor = (s: Server, m: Out, e: UpstreamExtras) => {
  const found = nsPermCheck(m.namespace, s, e.auth.user);
  if (isUndefined(found)) {
    return;
  }
  s.TX(events.namespaceChildQuery, {result: response.ok, child: found.child} as In);
};

const updateHandler: EvListeners[ev.userChanged] = (ns) => {
  nsBroadcast(ns, events.namespaceChildQuery, {result: response.ok, child: ns.child} as In);
};

ec.on(ev.userChanged, updateHandler);

export default setProcessor;
