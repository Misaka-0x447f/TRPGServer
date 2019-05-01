import {UpstreamExtras} from "../../../bridge";
import {Server} from "../utils/ws";
import {Out} from "../../../bridge/userHeartbeat";
import {findUser} from "../utils/user";
import {getTimestamp} from "../utils/lang";
import {findNs, userExistInNs} from "../utils/ns";
import {isUndefined} from "lodash";
import {nsPushNotExist} from "./nsPushNotExist";
import {nsPushNotJoined} from "./nsPushNotJoined";

export const userHeartbeat = (s: Server, m: Out, e: UpstreamExtras) => {
  const found = findUser(e.auth.user);
  // user must be exist here. if not, auth failed.
  const foundNs = findNs(m.namespace);
  if (isUndefined(foundNs)) {
    nsPushNotExist(s);
    return;
  }
  if (!userExistInNs(e.auth.user, foundNs)) {
    nsPushNotJoined(s);
    return;
  }
  found.lastUp = getTimestamp();
};
