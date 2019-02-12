export interface WebsocketOut {
  method: Method;     // this attr play a role of route.
  data: string;       // depends on actual methods used.
}

export interface WebsocketIn {
  data: string;
}

export const enum Method {
  reg = "register"
}
