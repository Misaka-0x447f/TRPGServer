import {listen, Server} from "./utils/ws";
import {commEvents} from "../../bridge";
import userUpdate from "./events/userUpdate";
import nsGet from "./events/nsGet";
import nsJoin from "./events/nsJoin";
import nsUpdateChild from "./events/nsUpdateChild";
import {userHeartbeat} from "./events/userHeartbeat";
import {nsExit} from "./events/nsExit";
import "./tasks";

function connected(link: WebSocket) {
  const server = new Server(link);
  server.RXGroup(
    [commEvents.userUpdate, userUpdate, {auth: false}],
    [commEvents.userHeartbeat, userHeartbeat],
    [commEvents.nsGet, nsGet],
    [commEvents.nsJoin, nsJoin],
    [commEvents.nsUpdateChild, nsUpdateChild],
    [commEvents.nsExit, nsExit]
  );
}

listen(connected);

// TODO: missing room close, user leave
