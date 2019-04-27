import {Server} from "../utils/ws";
import {events} from "../../bridge";
import {In} from "../../bridge/nsPushNotJoined";

export const nsPushNotJoined = (s: Server) => {
  s.TX(events.nsPushNotJoined, {} as In);
};
