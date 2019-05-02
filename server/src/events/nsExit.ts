import {Out} from "../../../bridge/nsExit";
import {Server} from "../utils/ws";
import {findNs, nsRemoveUserByName} from "../utils/ns";
import {isUndefined} from "lodash";
import {UpstreamExtras} from "../../../bridge";
import {Ev, ev} from "../utils/event";

export const nsExit = (s: Server, m: Out, e: UpstreamExtras) => {
  const found = findNs(m.namespace);
  if (!isUndefined(found)) {
    nsRemoveUserByName(found, e.auth.user);
    Ev.emit(ev.userChanged, found);
  }
};
