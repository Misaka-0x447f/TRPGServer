import Vue from "vue";
import store from "@/utils/vuex.ts";
import Host from "./Host.vue";
import SideTab from "@/pages/_public/SideTab/index.vue";
import router from "./router";
// @ts-ignore
import {library} from "@fortawesome/fontawesome-svg-core";
// @ts-ignore
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faGlobe, faLowVision, faUserFriends, faUsersCog, IconName} from "@fortawesome/free-solid-svg-icons";
import {Filter} from "@/utils/TypeScript";

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("side-tabs", SideTab);

Vue.config.productionTip = false;
library.add(faUsersCog, faGlobe, faUserFriends, faLowVision);
export type allowedIcons = Filter<"users-cog" | "globe" | "user-friends" | "low-vision"
  , IconName>;

// noinspection JSUnusedGlobalSymbols
new Vue({
  router,
  store,
  render: (h) => h(Host),
}).$mount("#host");
