export interface WebsocketOut {
  method: Method;     // this attr play a role of route.
  data: object;       // depends on actual methods used.
}

export interface WebsocketIn {
  status: Status;
  data: object;
}

export const enum Method {
  reg = "register"
}

export const enum Status {
  ok = "ok",
  badRequest = "badRequest",
  serverError = "serverError"
}
