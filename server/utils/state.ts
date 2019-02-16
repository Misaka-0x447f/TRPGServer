import {Watchable} from "./lang";

const onlineUserDataProxy = new Watchable();
export const userPool: OnlineUserData[] = onlineUserDataProxy.init([]);

export interface OnlineUserData {
  user: string;
  uid: string;
}
