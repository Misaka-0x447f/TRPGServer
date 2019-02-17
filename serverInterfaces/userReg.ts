export interface Out {
  data: {
    username: string
  };
}

export interface In {
  data: {
    result: regResponse,
    user?: string,
    uid?: string
  };
}

export enum regResponse {
  ok = "ok",
  exist = "exist"
}
