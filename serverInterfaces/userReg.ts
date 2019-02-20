export interface Out {
  username: string;
}

export interface In {
  result: regResponse;
  user?: string;
  uid?: string;
}

export enum regResponse {
  ok = "ok",
  exist = "exist"
}
