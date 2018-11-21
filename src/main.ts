import Vue from "vue";
import Host from "./Host.vue";
import router from "./router";
// @ts-ignore
import {library} from "@fortawesome/fontawesome-svg-core";
// @ts-ignore
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faGlobe, faUsersCog} from "@fortawesome/free-solid-svg-icons";

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
library.add(faUsersCog, faGlobe);

// noinspection JSUnusedGlobalSymbols
new Vue({
  router,
  render: (h) => h(Host),
}).$mount("#host");
