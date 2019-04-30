import {listen, Server} from "./utils/ws";
import {commEvents} from "../../bridge";
import userUpdate from "./events/userUpdate";
import nsGet from "./events/nsGet";
import nsJoin from "./events/nsJoin";
import nsUpdateChild from "./events/nsUpdateChild";
import {userHeartbeat} from "./events/userHeartbeat";
import "tasks";

function connected(link: WebSocket) {
  const server = new Server(link);
  server.RX(commEvents.userUpdate, userUpdate, {auth: false});
  server.RX(commEvents.userHeartbeat, userHeartbeat);
  server.RX(commEvents.nsGet, nsGet);
  server.RX(commEvents.nsJoin, nsJoin);
  // manually update namespace child
  server.RX(commEvents.nsUpdateChild, nsUpdateChild);
}

listen(connected);

// TODO: missing room close, user leave
// TODO: make all events event driven
