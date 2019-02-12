export interface Out {
  user: string;
}

export interface In {
  response: regResponse;
}

export enum regResponse {
  ok = "ok",
  exist = "exist"
}
