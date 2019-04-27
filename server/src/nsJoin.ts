import {Server} from "../utils/ws";
import {In, Out, response} from "#/nsJoin";
import {Namespace, namespacePool} from "../utils/state";
import {isUndefined} from "lodash";
import {events, UpstreamExtras} from "#/index";
import {findNs, userExistInNs} from "../utils/ns";
import ec, {ev, EvListeners} from "../utils/event";

export const setProcessor = (s: Server, m: Out, e: UpstreamExtras) => {
  const found = findNs(m.namespace);
  if (userExistInNs(e.auth.user, found)) {
    s.TX(events.nsJoin, {result: response.ok} as In);
    return;
  }
  if (isUndefined(found)) {
    const nsPointer: Namespace = {
      name: m.namespace,
      child: {
        master: [e.auth.user],
        player: []
      },
      childLink: [
        {
          user: e.auth.user,
          link: s
        }
      ],
      options: {
        capacity: {
          master: 1,
          player: 32
        }
      }
    };
    namespacePool.push(nsPointer);
    s.TX(events.nsJoin, {result: response.ok} as In);
    ec.emit(ev.userChanged, ...[nsPointer] as Parameters<EvListeners[ev.userChanged]>);
  } else {
    if (found.child.player.length < found.options.capacity.player) {
      found.child.player.push(e.auth.user);
      found.childLink.push({user: e.auth.user, link: s});
      s.TX(events.nsJoin, {result: response.ok} as In);
      ec.emit(ev.userChanged, ...[found] as Parameters<EvListeners[ev.userChanged]>);
    } else {
      s.TX(events.nsJoin, {result: response.full} as In);
    }
  }
};

export default setProcessor;
