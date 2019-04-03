export const userPool: OnlineUserData[] = [];

export interface OnlineUserData {
  user: string;
  uid: string;
}

export const namespacePool: NamespacePool[] = [];

export interface NamespacePool {
  name: string;
  uid: string;
  child: {
    host: string        // host of the room
    master: string[],   // game masters
    player: string[],   // players
  };
  options?: {
    capacity?: {
      master: number,
      player: number, // max player count
    }
  };
}
