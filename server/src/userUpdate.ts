import {In, Out, regResponse} from "../../bridge/userUpdate";
import {OnlineUserData, userPool} from "../utils/state";
import {events} from "../../bridge";
import {find, isUndefined} from "lodash";
import uid from "uuid/v1";
import {Server} from "../utils/ws";

export const setRegProcessor = (s: Server, m: Out) => {
  const found = find(userPool, {user: m.user});
  if (isUndefined(found)) {
    const user: OnlineUserData = {
      user: m.user,
      credential: uid()
    };
    userPool.push(user);
    s.TX(events.userUpdate, {result: regResponse.ok, ...user} as In);
  } else {
    if (m.credential) {
      if (found.credential === m.credential) {
        s.TX(events.userUpdate, {result: regResponse.ok, ...found});
      } else {
        s.TX(events.userUpdate, {result: regResponse.rejected});
      }
      return;
    }
    s.TX(events.userUpdate, {result: regResponse.exist} as In);
  }
};

export default setRegProcessor;
