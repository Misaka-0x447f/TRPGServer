import {library} from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faGlobe,
  faInfoCircle,
  faLowVision,
  faUserFriends,
  faUsersCog
} from "@fortawesome/free-solid-svg-icons";
import Vue from "vue";
// @ts-ignore
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default function fontAwesomeInit() {
  Vue.component("font-awesome-icon", FontAwesomeIcon);
  library.add(faUsersCog, faGlobe, faUserFriends, faLowVision, faChevronRight, faInfoCircle);
}

export enum ico {
  userCogs = "users-cog",
  globe = "globe",
  userFriends = "user-friends",
  lowVision = "low-vision",
  chevronRight = "chevron-right",
  infoCircle = "info-circle"
}
