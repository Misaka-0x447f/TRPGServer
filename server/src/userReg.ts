import * as ws from "ws";
import {In, Out, regResponse} from "../../serverInterfaces/userReg";
import {out} from "../utils/ws";
import {Status} from "../../serverInterfaces";
import {find} from "lodash";
import {onlineUser, OnlineUserData} from "../utils/state";
import uid from "uuid/v4";

export const regProcessor = (c: ws, m: Out) => {
  if (find(onlineUser, {name: m.data.username}) === undefined) {
    const user: OnlineUserData = {
      name: m.data.username,
      uid: uid(),
      connection: c
    };
    onlineUser.push(user);
    out(c, {status: Status.ok, data: {result: regResponse.ok, uid: user.uid}} as In);
  } else {
    out(c, {status: Status.ok, data: {result: regResponse.exist}} as In);
  }
};
