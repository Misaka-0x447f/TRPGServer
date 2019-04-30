import {Server} from "./ws";
import {Timestamp} from "./lang";

export const userPool: OnlineUserData[] = [];

export interface OnlineUserData {
  user: string;
  credential: string;
  link: Server;
  lastUp: Timestamp;
}

export const namespacePool: Namespace[] = [];

export enum gameStatus {
  waiting
}

export interface Namespace {
  name: string;
  child: {
    master: OnlineUserData[],  // game masters
    player: OnlineUserData[],  // players
  };
  options?: {
    capacity?: {
      master: number,
      player: number, // max player count
    }
  };
  status: gameStatus;
}
