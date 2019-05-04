import {Server} from "../utils/ws";
import {isUndefined} from "lodash";
import {commEvents} from "../../../bridge";
import {findNs} from "../utils/ns";
import {TX} from "../../../bridge/Transfer";

export const setProcessor = (s: Server, m: TX<commEvents.nsGet>) => {
  const found = findNs(m.namespace);
  if (isUndefined(found)) {
    s.TX(commEvents.nsGet, {result: "ok"});
  } else {
    s.TX(commEvents.nsGet, {result: "null"});
  }
};

export default setProcessor;
