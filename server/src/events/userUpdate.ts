import {In, Out, regResponse} from "../../../bridge/userUpdate";
import {OnlineUserData, userPool} from "../utils/state";
import {commEvents} from "../../../bridge";
import {isUndefined} from "lodash";
import uid from "uuid/v1";
import {Server} from "../utils/ws";
import {findUser} from "../utils/user";

export const setRegProcessor = (s: Server, m: Out) => {
  const found = findUser(m.user);
  if (isUndefined(found)) {
    const user: OnlineUserData = {
      user: m.user,
      credential: uid(),
      link: s,
      lastUp: null
    };
    userPool.push(user);
    s.TX(commEvents.userUpdate, {result: regResponse.ok, user: user.user, credential: user.credential} as In);
  } else {
    if (m.credential) {
      if (found.credential === m.credential) {
        s.TX(commEvents.userUpdate, {result: regResponse.ok, user: found.user, credential: found.credential} as In);
      } else {
        s.TX(commEvents.userUpdate, {result: regResponse.rejected} as In);
      }
      return;
    }
    s.TX(commEvents.userUpdate, {result: regResponse.exist} as In);
  }
};

export default setRegProcessor;
