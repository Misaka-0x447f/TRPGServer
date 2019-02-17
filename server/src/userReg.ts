import {In, Out, regResponse} from "../../serverInterfaces/userReg";
import {find} from "lodash";
import {userPool, OnlineUserData} from "../utils/state";
import uid from "uuid/v1";
import {Socket} from "clusterws";
import {events} from "../../serverInterfaces";

export const setRegProcessor = (socket: Socket) => {
    socket.on(events.reg, (m: Out) => {
      if (find(userPool, {name: m.data.username}) === undefined) {
        const user: OnlineUserData = {
          user: m.data.username,
          uid: uid()
        };
        userPool.push(user);
        socket.send(events.reg, {data: {result: regResponse.ok, ...user}} as In);
      } else {
        socket.send(events.reg, JSON.stringify({data: {result: regResponse.exist}} as In));
      }
    });
};
