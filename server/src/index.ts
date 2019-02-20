import {listen, Server} from "../utils/ws";
import {events} from "../../serverInterfaces";
import {setRegProcessor} from "./userReg";

function connected(link: WebSocket) {
  const server = new Server(link);
  server.RX(events.reg, setRegProcessor);
}

listen(connected);
