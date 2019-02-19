export enum events {
  reg = "reg",
  uncat = "uncategorized",
}

export interface Upstream {
  event: events;
  payload: object;
}

export interface Downstream {
  event: events;
  payload: object;
}
