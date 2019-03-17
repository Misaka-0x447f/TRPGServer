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
        player: [],
        spectator: []
      }
    });
    s.TX(events.namespaceCreate, {result: response.ok, namespace: m.namespace, uid: id} as In);
  } else {
    found.child.player.push(m.uid);
    s.TX(events.namespaceCreate, {result: response.ok} as In);
  }
};

export default setProcessor;
