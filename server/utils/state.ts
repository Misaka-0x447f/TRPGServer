import * as ws from "ws";
import {Watchable} from "./lang";
import {findIndex} from "lodash";

const onlineUserDataProxy = new Watchable();
export const onlineUser: OnlineUserData[] = onlineUserDataProxy.init([]);

export interface OnlineUserData {
  name: string;
  uid: string;
  connection: ws;
}

// GC?
onlineUserDataProxy.registerTrigger(() => {
  while (onlineUser.length > 5000000) {
    const i = findIndex(onlineUser, (o: OnlineUserData) => {
      return o.connection.readyState === 3;
    });
    if (i >= 0) {
      onlineUser.splice(i, 1);
    } else {
      throw new Error(`Cannot release memory. (Current length: ${onlineUser.length})`);
    }
  }
});
