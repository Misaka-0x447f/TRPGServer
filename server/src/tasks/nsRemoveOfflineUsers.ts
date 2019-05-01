import {Namespace, namespacePool, OnlineUserData} from "../utils/state";
import {forIn, isEmpty} from "lodash";
import {getTimestamp} from "../utils/lang";
import {nsRemoveByIndex, nsRemoveMasterByIndex, nsRemoveUserByIndex} from "../utils/ns";
import {Ev, ev} from "../utils/event";

const agent = () => {
  forIn(namespacePool, (nsPointer: Namespace, i) => {
    let hasUpdateFlag = false;
    // remove offline game master
    forIn(nsPointer.child.master, (vMaster: OnlineUserData, iMaster) => {
      if (isTimeout(vMaster)) {
        nsRemoveMasterByIndex(nsPointer, iMaster);
        Ev.emit(ev.nsNotJoinedAsIntend, vMaster.link);
        hasUpdateFlag = true;
      }
    });

    // remove room if game master leaves
    if (isEmpty(nsPointer.child.master)) {
      nsRemoveByIndex(i);
      Ev.emit(ev.nsNotExistAsIntend, nsPointer);
      hasUpdateFlag = true;
    }

    // remove offline players
    forIn(nsPointer.child.player, (vPlayer: OnlineUserData, iPlayer) => {
      if (isTimeout(vPlayer)) {
        nsRemoveUserByIndex(nsPointer, iPlayer);
        Ev.emit(ev.nsNotJoinedAsIntend, vPlayer.link);
        hasUpdateFlag = true;
      }
    });

    if (hasUpdateFlag) {
      Ev.emit(ev.userChanged, nsPointer);
    }
  });
};

const isTimeout = (d: OnlineUserData) => {
  return d.lastUp < getTimestamp() - 5000;
};

setInterval(agent, 5000);
