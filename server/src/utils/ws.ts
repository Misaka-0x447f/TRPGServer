import {commEvents, Upstream, UpstreamListenerCallback, UpstreamListenerOptions} from "../../../bridge";
import {isJSONString} from "./lang";
import {get, isEmpty, isUndefined} from "lodash";
import * as ws from "ws";
import auth from "./auth";
import {userPushFailedAuth} from "../events/userPushFailedAuth";
import {EventEmitter} from "events";

export class Server {
  private Ev = new EventEmitter();
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
      if (![
        commEvents.userHeartbeat,
        commEvents.userPushFailedAuth
      ].includes(req.event)) {
        console.log(`<<< ${req.event} ${isEmpty(req.payload) ? "" : JSON.stringify(req.payload)}`);
      }

      this.Ev.emit(req.event, req);
    });
  }

  public RX(...obj: Array<[commEvents, UpstreamListenerCallback, UpstreamListenerOptions?]>) {
    for (const v of obj) {
      this.RXSingle(...v);
    }
  }

  // public Off(...obj: Array<[commEvents, UpstreamListenerCallback, UpstreamListenerOptions?]>) {
  //   for (const v of obj) {
  //     this.Ev.off(v[0], v[1]);
  //   }
  // }

  public TX(event: commEvents, payload: object) {
    if (this.link.readyState === this.link.OPEN) {
      console.log(`>>> ${event} ${isEmpty(payload) ? "" : JSON.stringify(payload)}`);
      this.link.send(JSON.stringify({event, payload}));
    }
  }

  // listen to client
  private RXSingle(event: commEvents, callback: UpstreamListenerCallback, options?: UpstreamListenerOptions) {
    const eventHandlerFactory = () => {
      return (req: Upstream) => {
        if (isUndefined(get(options, "auth"))) {
          // auth required
          const user = get(req, "extras.auth.user");
          const credential = get(req, "extras.auth.credential");
          if (!auth(user, credential)) {
            // auth failed
            userPushFailedAuth(this); // send authFailed
            return;
          } else {
            // auth required, succeed
            callback(this, req.payload, {auth: {user, credential}});
            return;
          }
        }
        // no options, everything is default
        callback(this, req.payload);
      };
    };
    this.Ev.on(event, eventHandlerFactory());
  }

  private badRequest() {
    console.log("<<< (badRequest)");
    this.link.send(JSON.stringify({error: "unexpected request string."}));
  }
}

export const listen = (create: (T: WebSocket) => void) => {
  const port = 6655;
  console.log("[ DONE ] Setting up server with port number " + port);
  const wss = new ws.Server({port});
  wss.on("connection", create);
};
