import WSL from "reconnecting-websocket";
import {serverAddr} from "@/interfaces/ws";
import {
  Downstream,
  DownstreamListener,
  DownstreamListenerCallback,
  DownstreamOptions,
  events,
  Transfer,
  Upstream
} from "../../serverInterfaces";
import {timeout} from "@/utils/lang";
import {get} from "lodash";
import {Env, LocalStorage, logOut} from "@/utils/ls";
import router from "@/router";

interface ClientTXOptions {
  auth?: false;  // if false no auth need with this method;
}

// TODO: memory leak.
class Client {
  private ws = new WSL(serverAddr);
  private listener: DownstreamListener[] = [];

  constructor() {
    this.ws.addEventListener("message", (e: MessageEvent) => {
      console.log(`<<< ${e.data}`);
      // noinspection JSIgnoredPromiseFromCall
      actHere();
      const d = (JSON.parse(e.data) as Downstream);

      // got an auth error?
      if (get(d, "extras.auth") === false) {
        // auth error. router push.
        router.push({name: "authError"});
        return;
      }

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

  public TX(event: events, payload: Transfer, options?: ClientTXOptions) {
    if (get(options, "auth") === false) {
      this.ws.send(JSON.stringify({event, payload} as Upstream));
      console.log(`>>> [noAuth] ${JSON.stringify({event, payload} as Upstream)}`);
    } else {
      if (Env.exist(LocalStorage.__auth)) {
        const authObj = Env.get(LocalStorage.__auth);
        this.ws.send(JSON.stringify({
          event, payload, options: {
            auth: {
              user: get(authObj, "user"),
              uid: get(authObj, "uid")
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

    // noinspection JSIgnoredPromiseFromCall
    actHere();
  }

  public RX(event: events, callback: DownstreamListenerCallback, options?: DownstreamOptions) {
    this.listener.push({event, callback, options});
  }
}

export const link = new Client();

// only for special purpose, do not access outside of 'components/netstat'
export const linkStatus = {
  link: false,
  act: 0
};

async function actHere() {
  linkStatus.act++;
  await timeout(333);
  linkStatus.act--;
}
