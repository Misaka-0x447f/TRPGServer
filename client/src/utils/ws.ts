import WSL from "reconnecting-websocket";
import {serverAddr} from "@/interfaces/ws";
import {
  commEvents,
  Downstream,
  DownstreamListenerCallback,
  Transfer,
  Upstream,
  UpstreamSenderOptions
} from "@/../../bridge";
import {timeout} from "@/utils/lang";
import {get} from "lodash";
import {authAvailable, Env, LocalStorage, logOut} from "@/utils/ls";
import router, {RouterName} from "@/router";
import {Out} from "../../../bridge/userHeartbeat";
import {EventEmitter} from "events";

class Client {
  private ws = new WSL(serverAddr);
  private ev = new EventEmitter();

  constructor() {
    this.ws.addEventListener("message", (e: MessageEvent) => {
      console.log(`<<< ${e.data}`);
      actHere();
      const d = (JSON.parse(e.data) as Downstream);
      this.ev.emit(d.event, d.payload);
    });
    this.ws.addEventListener("open", () => {
      linkStatus.link = true;
    });
    this.ws.addEventListener("close", () => {
      linkStatus.link = false;
    });
  }

  public TX(event: commEvents, payload: Transfer, options?: UpstreamSenderOptions) {
    if (get(options, "auth") === false) {
      this.ws.send(JSON.stringify({event, payload} as Upstream));
      console.log(`>>> [noAuth] ${JSON.stringify({event, payload} as Upstream)}`);
    } else {
      if (authAvailable()) {
        const authObj = Env.get(LocalStorage.__auth);
        this.ws.send(JSON.stringify({
          event, payload, extras: {
            auth: {
              user: get(authObj, "user"),
              credential: get(authObj, "credential")
            }
          }
        } as Upstream));
        console.log(`>>> ${JSON.stringify({event, payload} as Upstream)}`);
      } else {
        // Auth required but no info about it.
        console.warn(`Auth required by event ${event}, but no auth info available here.`);
        logOut();
      }
    }

    actHere();
  }

  public RX(event: commEvents, callback: DownstreamListenerCallback) {
    this.ev.on(event, callback);
  }

  public Off(event: commEvents, callback: DownstreamListenerCallback) {
    this.ev.off(event, callback);
  }
}

export const link = new Client();

link.RX(commEvents.userPushFailedAuth, () => {
  router.push({name: RouterName.authError});
});

link.RX(commEvents.nsPushNotExist, () => {
  router.push({name: RouterName.nsNotExist});
});

link.RX(commEvents.nsPushNotJoined, () => {
  router.push({name: RouterName.nsNotJoined});
});

export const linkStatus = {
  link: false,
  act: 0
};

async function actHere() {
  linkStatus.act++;
  await timeout(200);
  linkStatus.act--;
}

export const heartbeat = (l: Client) => {
  if (linkStatus.link && authAvailable() && Env.exist(LocalStorage.currNs)) {
    l.TX(commEvents.userHeartbeat, {namespace: Env.get(LocalStorage.currNs)} as Out);
    actHere();
  }
};

setInterval(() => heartbeat(link), 3000);
