import router, {RouterName} from "@/router";
import {Env, LocalStorage} from "@/utils/ls";

export const exitNamespace = () => {
  Env.clr(LocalStorage.currNs);
  router.push({name: RouterName.nsSelect});
};
