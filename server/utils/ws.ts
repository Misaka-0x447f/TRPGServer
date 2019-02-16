import * as ws from "ws";
import {WebsocketIn} from "../../serverInterfaces";

export const out = (c: ws, data: WebsocketIn) => {
  console.log(`>>> ${JSON.stringify(data)}`);
  c.send(JSON.stringify(data));
};
