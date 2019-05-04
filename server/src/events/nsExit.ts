import {Server} from "../utils/ws";
import {findNs, nsRemoveUserByName} from "../utils/ns";
import {isUndefined} from "lodash";
import {commEvents, UpstreamExtras} from "../../../bridge";
import {Ev, ev} from "../utils/event";
import {TX} from "../../../bridge/Transfer";

export const nsExit = (s: Server, m: TX<commEvents.nsExit>, e: UpstreamExtras) => {
  const found = findNs(m.namespace);
  if (!isUndefined(found)) {
    nsRemoveUserByName(found, e.auth.user);
    Ev.emit(ev.userChanged, found);
  }
};
