export interface WebsocketOut {
  method: Method;     // this attr play a role of route.
  data: object;       // depends on actual methods used.
}

export interface WebsocketIn {
  data: object;
}

export const enum Method {
  reg = "register"
}
