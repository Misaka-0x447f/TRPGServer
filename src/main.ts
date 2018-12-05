import Vue from "vue";
import store from "@/utils/vuex.ts";
import Host from "./Host.vue";
import router from "./router";
// @ts-ignore
import {library} from "@fortawesome/fontawesome-svg-core";
// @ts-ignore
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faGlobe, faLowVision, faUserFriends, faUsersCog} from "@fortawesome/free-solid-svg-icons";

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
library.add(faUsersCog, faGlobe, faUserFriends, faLowVision);


// noinspection JSUnusedGlobalSymbols
new Vue({
  router,
  store,
  render: (h) => h(Host),
}).$mount("#host");
