import {Server} from "../utils/ws";
import {events} from "../../serverInterfaces";
import {In} from "../../serverInterfaces/namespaceNotJoined";

export const namespaceNotJoined = (s: Server) => {
  s.TX(events.namespaceNotJoined, {} as In);
};
