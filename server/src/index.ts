import ClusterWS, {Configurations, Socket, WSServer} from "clusterws";

import {setRegProcessor} from "./userReg";

const port = (process.env.PORT || 80) as number;

// tslint:disable-next-line
new ClusterWS({
  port,
  worker
} as Configurations);

function worker() {
  // Get websocket server
  const wss: WSServer = this.wss;
  // http/https server
  // const server: Server = this.server;

  // Listen on connections to websocket server
  wss.on("connection", (socket: Socket): void => {
    setRegProcessor(socket);
  });
}
