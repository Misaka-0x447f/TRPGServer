import {In, Out, regResponse} from "../../serverInterfaces/userReg";
import {OnlineUserData, userPool} from "../utils/state";
import {events} from "../../serverInterfaces";
import {find} from "lodash";
import uid from "uuid/v1";
import {Server} from "../utils/ws";

export const setRegProcessor = (s: Server, m: Out) => {
  if (find(userPool, {name: m.username}) === undefined) {
    const user: OnlineUserData = {
      user: m.username,
      uid: uid()
    };
    userPool.push(user);
    s.TX(events.reg, {result: regResponse.ok, ...user} as In);
  } else {
    s.TX(events.reg, {result: regResponse.exist} as In);
  }
};
