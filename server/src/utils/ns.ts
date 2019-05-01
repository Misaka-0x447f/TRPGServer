import {Namespace, namespacePool, OnlineUserData} from "./state";
import {nsPushNotJoined} from "../events/nsPushNotJoined";
import {nsPushNotExist} from "../events/nsPushNotExist";
import {commEvents} from "../../../bridge";
import {Server} from "./ws";
import {find, forIn, isUndefined} from "lodash";

export const findNs = (ns: string) => {
  return find(namespacePool, {name: ns});
};

export const userExistInNs = (user: OnlineUserData["user"], ns: Namespace) => {
  if (isUndefined(ns)) {
    return false;
  }
  if (!isUndefined(find(ns.child.master, (o) => o.user === user))) {
    return true;
  }
  return !isUndefined(find(ns.child.player, (o) => o.user === user));
};

export const nsPermCheckByName = (ns: string, s: Server, user: OnlineUserData["user"]) => {
  const found = findNs(ns);
  if (isUndefined(found)) {
    nsPushNotExist(s);
    return;
  }
  if (!userExistInNs(user, found)) {
    nsPushNotJoined(s);
    return;
  }
  return found;
};

export const nsBroadcastByEventName = (ns: Namespace, event: commEvents, payload: object) => {
  forIn(ns.child.master, (v: OnlineUserData) => {
    v.link.TX(event, payload);
  });
  forIn(ns.child.player, (v: OnlineUserData) => {
    v.link.TX(event, payload);
  });
};

export const nsRemoveMasterByIndex = (ns: Namespace, i: string) => {
  ns.child.master.splice(parseInt(i, 10), 1);
};

export const nsRemoveUserByIndex = (ns: Namespace, i: string) => {
  ns.child.player.splice(parseInt(i, 10), 1);
};

export const nsRemoveByIndex = (nsIndex: string) => {
  namespacePool.splice(parseInt(nsIndex, 10), 1);
};

export const nsGetChildListForClient = (ns: Namespace) => {
  const child = {
    master: [],
    player: []
  };
  for (const vMaster of ns.child.master) {
    child.master.push(vMaster.user);
  }
  for (const vPlayer of ns.child.player) {
    child.player.push(vPlayer.user);
  }
  return child;
};
