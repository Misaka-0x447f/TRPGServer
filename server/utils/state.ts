export const userPool: OnlineUserData[] = [];

export interface OnlineUserData {
  user: string;
  credential: string;
}

export const namespacePool: Namespace[] = [];

export interface Namespace {
  name: string;
  child: {
    host: OnlineUserData["user"]            // host of the room
    master: Array<OnlineUserData["user"]>,  // game masters
    player: Array<OnlineUserData["user"]>,  // players
  };
  options?: {
    capacity?: {
      master: number,
      player: number, // max player count
    }
  };
}
