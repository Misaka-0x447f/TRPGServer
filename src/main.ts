import Vue from "vue";
import Host from "./Host.vue";
import router from "./router";
import store from "@/utils/vuex.ts";

import SideTab from "@/pages/_public/SideTab/index.vue";
import {SideTabHandler} from "@/utils/SideTabHandler";
import fontAwesomeInit from "@/utils/FontAwesome";

Vue.config.productionTip = false;

fontAwesomeInit();

Vue.component("side-tabs", SideTab);
export const sideTab = new SideTabHandler();

// noinspection JSUnusedGlobalSymbols
new Vue({
  router,
  store,
  render: (h) => h(Host),
}).$mount("#host");
