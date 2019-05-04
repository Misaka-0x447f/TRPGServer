import WSL from "reconnecting-websocket";
import {serverAddr} from "@/interfaces/ws";
import {commEvents, DnCallback, Downstream, UpSendOptions, Upstream} from "@/../../bridge";
import {timeout} from "@/utils/lang";
import {get} from "lodash";
import {authAvailable, Env, LocalStorage, logOut} from "@/utils/ls";
import router, {RouterName} from "@/router";
import {EventEmitter} from "events";
import {TX} from "../../../bridge/Transfer";

class Client {
  private ws = new WSL(serverAddr);
  private ev = new EventEmitter();

  constructor() {
    this.ws.addEventListener("message", (e: MessageEvent) => {
      const d = JSON.parse(e.data) as Downstream;
      console.log(`<<< ${d.event} ${JSON.stringify(d.payload)}`);
      actHere();
      this.ev.emit(d.event, d.payload);
    });
    this.ws.addEventListener("open", () => {
      linkStatus.link = true;
    });
    this.ws.addEventListener("close", () => {
      linkStatus.link = false;
    });
  }

  public TX<T extends commEvents>(event: T, payload: TX<T>, options?: UpSendOptions) {
    if (get(options, "auth") === false) {
      this.ws.send(JSON.stringify({event, payload} as Upstream));
      console.log(`>>> ${event} ${JSON.stringify(payload)} [noAuth]`);
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
        console.log(`>>> ${event} ${JSON.stringify(payload)}`);
      } else {
        // Auth required but no info about it.
        console.warn(`Auth required by event ${event}, but no auth info available here.`);
        logOut();
      }
    }

    actHere();
  }

  public RX<T extends commEvents>(event: T, callback: DnCallback<T>) {
    this.ev.on(event, callback);
  }

  public Off<T extends commEvents>(event: T, callback: DnCallback<T>) {
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
    l.TX(commEvents.userHeartbeat, {namespace: Env.get(LocalStorage.currNs)});
    actHere();
  }
};

setInterval(() => heartbeat(link), 3000);
