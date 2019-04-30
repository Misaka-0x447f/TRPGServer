import WSL from "reconnecting-websocket";
import {serverAddr} from "@/interfaces/ws";
import {
  Downstream,
  DownstreamListener,
  DownstreamListenerCallback,
  commEvents,
  Transfer,
  Upstream,
  UpstreamSenderOptions
} from "@/../../bridge";
import {timeout} from "@/utils/lang";
import {get} from "lodash";
import {authAvailable, Env, LocalStorage, logOut} from "@/utils/ls";
import router, {RouterName} from "@/router";

// TODO: memory leak.
class Client {
  private ws = new WSL(serverAddr);
  private listener: DownstreamListener[] = [];

  constructor() {
    this.ws.addEventListener("message", (e: MessageEvent) => {
      console.log(`<<< ${e.data}`);
      actHere();
      const d = (JSON.parse(e.data) as Downstream);

      this.listener.forEach((v: DownstreamListener) => {
        if (v.event === d.event) {
          v.callback(d.payload);
        }
      });
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
    this.listener.push({event, callback});
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
  await timeout(333);
  linkStatus.act--;
}

export const heartbeat = (l: Client) => {
  if (linkStatus.link && authAvailable()) {
    l.TX(commEvents.userHeartbeat, {});
    actHere();
  }
};

export const heartbeatTimer = setInterval(heartbeat, 3000);
