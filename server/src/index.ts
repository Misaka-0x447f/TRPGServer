import {setRegProcessor} from "./userReg";
import io from "socket.io";

const port = (process.env.PORT || 80) as number;
const server = io();
server.listen(port);

setRegProcessor(server);

console.log("Websocket server started");
