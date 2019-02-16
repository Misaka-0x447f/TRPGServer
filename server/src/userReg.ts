import {In, Out, events, regResponse} from "../../serverInterfaces/userReg";
import {find} from "lodash";
import {userPool, OnlineUserData} from "../utils/state";
import uid from "uuid/v1";
import * as io from "socket.io";
import {namespace} from "../../serverInterfaces";

export const setRegProcessor = (server: io.Server) => {
  server.of(namespace.reg).on("connection", (client) => {
    client.on(events.reg, (m: Out) => {
      if (find(userPool, {name: m.data.username}) === undefined) {
        const user: OnlineUserData = {
          user: m.data.username,
          uid: uid()
        };
        userPool.push(user);
        client.emit(events.reg, JSON.stringify({data: {result: regResponse.ok, ...user}} as In));
        console.log(1);
      } else {
        client.emit(events.reg, JSON.stringify({data: {result: regResponse.exist}} as In));
      }
    });
  });
};
