import router, {RouterName} from "@/router";
import {Env, LocalStorage} from "@/utils/ls";
import {commEvents} from "../../../bridge";
import {link} from "@/utils/ws";

export const exitNamespace = () => {
  if (!Env.exist(LocalStorage.currNs)) {
    return;
  }
  link.TX(commEvents.nsExit, {namespace: Env.get(LocalStorage.currNs)});
  Env.clr(LocalStorage.currNs);
  router.push({name: RouterName.nsSelect});
};
