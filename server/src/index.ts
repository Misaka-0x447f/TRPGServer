import {listen, Server} from "./utils/ws";
import {events} from "../../bridge";
import userUpdate from "./events/userUpdate";
import nsGet from "./events/nsGet";
import nsJoin from "./events/nsJoin";
import nsUpdateChild from "./events/nsUpdateChild";

function connected(link: WebSocket) {
  const server = new Server(link);
  server.RX(events.userUpdate, userUpdate, {auth: false});
  server.RX(events.nsGet, nsGet);
  server.RX(events.nsJoin, nsJoin);
  // manually update namespace child
  server.RX(events.nsUpdateChild, nsUpdateChild);
}

listen(connected);

// TODO: missing room close, user leave, heartbeat
