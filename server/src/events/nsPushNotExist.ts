import {Server} from "../utils/ws";
import {events} from "../../../bridge";
import {In} from "../../../bridge/nsPushNotExist";

export const nsPushNotExist = (s: Server) => {
  s.TX(events.nsPushNotExist, {} as In);
};
