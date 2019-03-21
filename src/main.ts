import Vue from "vue";
import Host from "./Host.vue";
import router from "./router";
import fontAwesomeInit from "@/utils/FontAwesome";

Vue.config.productionTip = false;

fontAwesomeInit();

// noinspection JSUnusedGlobalSymbols
new Vue({
  router,
  render: (h) => h(Host),
}).$mount("#host");
