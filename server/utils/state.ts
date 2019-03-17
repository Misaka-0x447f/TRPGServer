import {Watchable} from "./lang";

const onlineUserDataProxy = new Watchable();
export const userPool: OnlineUserData[] = onlineUserDataProxy.init([]);

export interface OnlineUserData {
  user: string;
  uid: string;
}

export const namespacePool: NamespacePool[] = [];

export interface NamespacePool {
  name: string;
  uid: string;
  child: {
    owner: string[];  // uid
    player: string[],
    spectator: string[]
  };
}
