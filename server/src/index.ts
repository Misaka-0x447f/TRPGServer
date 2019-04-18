import {listen, Server} from "../utils/ws";
import {events} from "../../serverInterfaces";
import reg from "./userReg";
import namespaceQuery from "./namespaceQuery";
import namespaceCreate from "./namespaceCreate";
import namespaceChildQuery from "./namespaceChildQuery";

function connected(link: WebSocket) {
  const server = new Server(link);
  server.RX(events.reg, reg, {auth: false});
  server.RX(events.namespaceQuery, namespaceQuery);
  server.RX(events.namespaceCreate, namespaceCreate);
  // manually update namespace child
  server.RX(events.namespaceChildQuery, namespaceChildQuery);
}

listen(connected);
