import {Server} from "../utils/ws";
import {In, Out, response} from "../../serverInterfaces/namespaceQuery";
import {namespacePool} from "../utils/state";
import {find, isUndefined} from "lodash";
import {events} from "../../serverInterfaces";

export const setProcessor = (s: Server, m: Out) => {
  const found = find(namespacePool, {name: m.namespace});
  if (isUndefined(found)) {
    s.TX(events.namespaceQuery, {result: response.null} as In);
  } else {
    s.TX(events.namespaceQuery, {result: response.ok} as In);
  }
};

export default setProcessor;
