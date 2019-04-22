import {Namespace, namespacePool, OnlineUserData, UserLink} from "./state";
import {namespaceNotJoined} from "../src/namespaceNotJoined";
import {namespaceNotExist} from "../src/namespaceNotExist";
import {events} from "../../serverInterfaces";
import {Server} from "./ws";
import {find, forIn, isUndefined} from "lodash";

export const findNs = (ns: string) => {
  return find(namespacePool, {name: ns});
};

export const userExistInNs = (user: OnlineUserData["user"], ns: Namespace) => {
  if (isUndefined(ns)) {
    return false;
  }
  if (!isUndefined(find(ns.child.master, (o) => o === user))) {
    return true;
  }
  return !isUndefined(find(ns.child.player, (o) => o === user));
};

export const nsPermCheck = (ns: string, s: Server, user: OnlineUserData["user"]) => {
  const found = findNs(ns);
  if (isUndefined(found)) {
    namespaceNotExist(s);
    return;
  }
  if (!userExistInNs(user, found)) {
    namespaceNotJoined(s);
    return;
  }
  return found;
};

export const nsBroadcast = (ns: Namespace, event: events, payload: object) => {
  forIn(ns.childLink, (v: UserLink) => {
    v.link.TX(event, payload);
  });
};
