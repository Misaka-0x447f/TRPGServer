import {Server} from "../utils/ws";
import {gameStatus, Namespace, namespacePool} from "../utils/state";
import {isUndefined} from "lodash";
import {commEvents, UpstreamExtras} from "../../../bridge";
import {findNs, userExistInNs} from "../utils/ns";
import {Ev, ev} from "../utils/event";
import {findUser} from "../utils/user";
import {TX} from "../../../bridge/Transfer";

export const setProcessor = (s: Server, m: TX<commEvents.nsJoin>, e: UpstreamExtras) => {
  const found = findNs(m.namespace);
  const foundUser = findUser(e.auth.user);
  if (userExistInNs(e.auth.user, found)) {
    s.TX(commEvents.nsJoin, {result: "ok"});
    return;
  }
  if (isUndefined(found)) {
    const nsPointer: Namespace = {
      name: m.namespace,
      child: {
        master: [foundUser],
        player: []
      },
      options: {
        capacity: {
          master: 1,
          player: 32
        }
      },
      status: gameStatus.waiting
    };
    namespacePool.push(nsPointer);
    s.TX(commEvents.nsJoin, {result: "ok"});
    Ev.emit(ev.userChanged, nsPointer);
  } else {
    if (found.child.player.length < found.options.capacity.player) {
      found.child.player.push(foundUser);
      s.TX(commEvents.nsJoin, {result: "ok"});
      Ev.emit(ev.userChanged, found);
    } else {
      s.TX(commEvents.nsJoin, {result: "full"});
    }
  }
};

export default setProcessor;
