import router, {RouterName} from "@/router";
import state from "@/utils/state";

export const exitNamespace = () => {
  state.online.namespace.name = undefined;
  router.push({name: RouterName.nsSelect});
};
