import {Namespace, namespacePool, OnlineUserData} from "../utils/state";
import {forIn, isEmpty, isNull} from "lodash";
import {getTimestamp} from "../utils/lang";
import {nsRemoveByIndex, nsRemoveMasterByIndex, nsRemovePlayerByIndex} from "../utils/ns";
import {Ev, ev} from "../utils/event";

const agent = () => {
  forIn(namespacePool, (nsPointer: Namespace, i) => {
    let hasUpdateFlag = false;
    // remove offline game master
    forIn(nsPointer.child.master, (vMaster: OnlineUserData, iMaster) => {
      if (isTimeout(vMaster)) {
        nsRemoveMasterByIndex(nsPointer, iMaster);
        hasUpdateFlag = true;
      }
    });

    // remove room if game master leaves
    if (isEmpty(nsPointer.child.master)) {
      nsRemoveByIndex(i);
      Ev.emit(ev.nsNotExistAsIntend, nsPointer);
      return;
    }

    // remove offline players
    forIn(nsPointer.child.player, (vPlayer: OnlineUserData, iPlayer) => {
      if (isTimeout(vPlayer)) {
        nsRemovePlayerByIndex(nsPointer, iPlayer);
        hasUpdateFlag = true;
      }
    });

    if (hasUpdateFlag) {
      Ev.emit(ev.userChanged, nsPointer);
    }
  });
};

const isTimeout = (d: OnlineUserData) => {
  if (isNull(d.lastUp)) {
    return false;
  }
  return d.lastUp < getTimestamp() - 10000;
};

setInterval(agent, 5000);
