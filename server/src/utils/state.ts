import {Server} from "./ws";

export const userPool: OnlineUserData[] = [];

export interface OnlineUserData {
  user: string;
  credential: string;
}

export const namespacePool: Namespace[] = [];

export interface Namespace {
  name: string;
  child: {
    master: Array<OnlineUserData["user"]>,  // game masters
    player: Array<OnlineUserData["user"]>,  // players
  };
  childLink: UserLink[];
  options?: {
    capacity?: {
      master: number,
      player: number, // max player count
    }
  };
}

export interface UserLink {
  user: OnlineUserData["user"];
  link: Server;
}
