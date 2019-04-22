import {Server} from "../utils/ws";
import {events} from "../../serverInterfaces";
import {In} from "../../serverInterfaces/nsPushNotJoined";

export const nsPushNotJoined = (s: Server) => {
  s.TX(events.nsPushNotJoined, {} as In);
};
