import {Server} from "../utils/ws";
import {events} from "#/index";
import {In} from "#/nsPushNotExist";

export const nsPushNotExist = (s: Server) => {
  s.TX(events.nsPushNotExist, {} as In);
};
