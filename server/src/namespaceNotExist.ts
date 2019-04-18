import {Server} from "../utils/ws";
import {events} from "../../serverInterfaces";
import {In} from "../../serverInterfaces/namespaceNotExist";

export const namespaceNotExist = (s: Server) => {
  s.TX(events.namespaceNotExist, {} as In);
};
