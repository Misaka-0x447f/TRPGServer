import {In, Out, regResponse} from "../../serverInterfaces/userReg";
import {OnlineUserData, userPool} from "../utils/state";
import {events} from "../../serverInterfaces";
import {find} from "lodash";
import uid from "uuid/v1";

export const setRegProcessor = (m: Out) => {
  if (find(userPool, {name: m.payload.username}) === undefined) {
    const user: OnlineUserData = {
      user: m.payload.username,
      uid: uid()
    };
    userPool.push(user);
    this.TX(events.reg, {payload: {result: regResponse.ok, ...user}} as In);
  } else {
    this.TX(events.reg, {payload: {result: regResponse.exist}} as In);
  }
};

