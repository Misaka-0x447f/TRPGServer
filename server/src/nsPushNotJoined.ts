import {Server} from "../utils/ws";
import {events} from "#/index";
import {In} from "#/nsPushNotJoined";

export const nsPushNotJoined = (s: Server) => {
  s.TX(events.nsPushNotJoined, {} as In);
};
