import {Namespace, OnlineUserData} from "./state";
import {isUndefined, find} from "lodash";

export const userExistInNs = (user: OnlineUserData["user"], ns: Namespace) => {
  if (isUndefined(ns)) {
    return false;
  }
  if (ns.child.host === user) {
    return true;
  }
  if (!isUndefined(find(ns.child.master, (o) => o === user))) {
    return true;
  }
  return !isUndefined(find(ns.child.player, (o) => o === user));
};
