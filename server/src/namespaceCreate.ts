import {Server} from "../utils/ws";
import {In, Out, response} from "../../serverInterfaces/namespaceCreate";
import {namespacePool} from "../utils/state";
import {find, isUndefined} from "lodash";
import {events, UpstreamExtras} from "../../serverInterfaces";
import uid from "uuid/v1";

export const setProcessor = (s: Server, m: Out, e: UpstreamExtras) => {
  const found = find(namespacePool, {name: m.namespace});
  if (isUndefined(found)) {
    const id = uid();
    namespacePool.push({
      name: m.namespace,
      uid: id,
      child: {
        host: e.auth.uid,
        master: [e.auth.uid],
        player: []
      },
      options: {
        capacity: {
          master: 1,
          player: 32
        }
      }
    });
    s.TX(events.namespaceCreate, {result: response.ok} as In);
  } else {
    if (found.child.player.length < found.options.capacity.player) {
      found.child.player.push(e.auth.uid);
      s.TX(events.namespaceCreate, {result: response.ok} as In);
    } else {
      s.TX(events.namespaceCreate, {result: response.full} as In);
    }
  }
};

export default setProcessor;
