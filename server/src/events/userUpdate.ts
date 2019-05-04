import {OnlineUserData, userPool} from "../utils/state";
import {commEvents} from "../../../bridge";
import {isUndefined} from "lodash";
import uid from "uuid/v1";
import {Server} from "../utils/ws";
import {findUser} from "../utils/user";
import {TX} from "../../../bridge/Transfer";

export const setRegProcessor = (s: Server, m: TX<commEvents.userUpdate>) => {
  const found = findUser(m.user);
  if (isUndefined(found)) {
    const user: OnlineUserData = {
      user: m.user,
      credential: uid(),
      link: s,
      lastUp: null
    };
    userPool.push(user);
    s.TX(commEvents.userUpdate, {result: "ok", user: user.user, credential: user.credential});
  } else {
    if (m.credential) {
      if (found.credential === m.credential) {
        s.TX(commEvents.userUpdate, {result: "ok", user: found.user, credential: found.credential});
      } else {
        s.TX(commEvents.userUpdate, {result: "rejected"});
      }
      return;
    }
    s.TX(commEvents.userUpdate, {result: "exist"});
  }
};

export default setRegProcessor;
