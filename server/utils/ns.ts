import {Namespace, namespacePool, OnlineUserData} from "./state";
import {find, isUndefined} from "lodash";
import {namespaceNotExist} from "../src/namespaceNotExist";
import {Server} from "./ws";
import {namespaceNotJoined} from "../src/namespaceNotJoined";

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
  const found = find(namespacePool, {name: ns});
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
