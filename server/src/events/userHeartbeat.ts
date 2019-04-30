import {UpstreamExtras} from "../../../bridge";
import {Server} from "../utils/ws";
import {Out} from "../../../bridge/userHeartbeat";
import {findUser} from "../utils/user";
import {getTimestamp} from "../utils/lang";

export const userHeartbeat = (s: Server, m: Out, e: UpstreamExtras) => {
  const found = findUser(e.auth.user);
  // user must be exist here.
  found.lastUp = getTimestamp();
};
