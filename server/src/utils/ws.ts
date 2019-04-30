import {
  commEvents,
  Upstream,
  UpstreamListener,
  UpstreamListenerCallback,
  UpstreamListenerOptions
} from "../../../bridge";
import {isJSONString} from "./lang";
import {get} from "lodash";
import * as ws from "ws";
import auth from "./auth";
import {userPushFailedAuth} from "../events/userPushFailedAuth";

// TODO: memory leaks.
export class Server {
  private listener: UpstreamListener[] = [];
  private link: WebSocket;

  // whatever it's an internal implement we can do performance fix when needed.
  constructor(link: WebSocket) {
    this.link = link;
    // @ts-ignore
    this.link.on("message", (message: string) => {
      // parse error?
      if (!isJSONString(message)) {
        this.badRequest();
      }
      const req = JSON.parse(message) as Upstream;

      // no event defined?
      if (!req.hasOwnProperty("event")) {
        this.badRequest();
      }

      // log if not a heartbeat event
      if (req.event !== commEvents.userHeartbeat) {
        console.log("<<< %s", message);
      }

      this.listener.forEach((v: UpstreamListener) => {
        if (v.event === req.event) {
          // auth required?
          if (get(v, "options.auth") !== false) {
            const user = get(req, "extras.auth.user");
            const credential = get(req, "extras.auth.credential");
            // ...and auth failed?
            if (!auth(user, credential)) {
              userPushFailedAuth(this); // send authFailed
              return; // equal to "continue" in native forEach;
            }
            // auth required, succeed, has extra data;
            v.callback(this, req.payload, {auth: {user, credential}});
            return;
          }

          // no special action required, no extras
          v.callback(this, req.payload);
        }
      });
    });
  }

  // listen to client
  public RX(event: commEvents, callback: UpstreamListenerCallback, options?: UpstreamListenerOptions) {
    this.listener.push({event, callback, options});
  }

  // send to client
  public TX(event: commEvents, payload: object) {
    console.log(">>> %s", JSON.stringify({event, payload}));
    this.link.send(JSON.stringify({event, payload}));
  }

  private badRequest() {
    console.log(">>> [badRequest]");
    this.link.send(JSON.stringify({error: "unexpected request string."}));
  }
}

export const listen = (listener: (T: WebSocket) => void) => {
  const port = 6655;
  console.log("[ DONE ] Setting up server with port number " + port);
  const wss = new ws.Server({port});
  wss.on("connection", listener);
};
