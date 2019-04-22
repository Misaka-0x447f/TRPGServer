import {Server} from "../utils/ws";
import {events} from "../../serverInterfaces";
import {In} from "../../serverInterfaces/nsPushNotExist";

export const nsPushNotExist = (s: Server) => {
  s.TX(events.nsPushNotExist, {} as In);
};
