import {Server} from "../utils/ws";
import {In, Out, response} from "#/nsGet";
import {isUndefined} from "lodash";
import {events} from "#/index";
import {findNs} from "../utils/ns";

export const setProcessor = (s: Server, m: Out) => {
  const found = findNs(m.namespace);
  if (isUndefined(found)) {
    s.TX(events.nsGet, {result: response.null} as In);
  } else {
    s.TX(events.nsGet, {result: response.ok} as In);
  }
};

export default setProcessor;
