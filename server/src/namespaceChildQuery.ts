import {events, UpstreamExtras} from "../../serverInterfaces";
import {In, Out, response} from "../../serverInterfaces/namespaceChildQuery";
import {Server} from "../utils/ws";
import {nsPermCheck} from "../utils/ns";
import {isUndefined} from "lodash";

export const setProcessor = (s: Server, m: Out, e: UpstreamExtras) => {
  const found = nsPermCheck(m.namespace, s, e.auth.user);
  if (isUndefined(found)) {
    return;
  }
  s.TX(events.namespaceChildQuery, {result: response.ok, child: found.child} as In);
};

export default setProcessor;
