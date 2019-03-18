import {Server} from "../utils/ws";
import {In, Out, response} from "../../serverInterfaces/namespaceCreate";
import {namespacePool} from "../utils/state";
import {find, isUndefined} from "lodash";
import {events} from "../../serverInterfaces";
import uid from "uuid/v1";

export const setProcessor = (s: Server, m: Out) => {
  const found = find(namespacePool, {name: m.namespace});
  if (isUndefined(found)) {
    const id = uid();
    namespacePool.push({
      name: m.namespace,
      uid: id,
      child: {
        owner: [m.uid],
        player: []
      },
      options: {
        capacity: {
          owner: 1,
          player: 32
        }
      }
    });
    s.TX(events.namespaceCreate, {result: response.ok, namespace: m.namespace, uid: id} as In);
  } else {
    if (found.child.player.length < found.options.capacity.player) {
      found.child.player.push(m.uid);
      s.TX(events.namespaceCreate, {result: response.ok} as In);
    } else {
      s.TX(events.namespaceCreate, {result: response.full} as In);
    }
  }
};

export default setProcessor;
