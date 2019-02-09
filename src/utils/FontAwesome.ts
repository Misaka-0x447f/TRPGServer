import {library} from "@fortawesome/fontawesome-svg-core";
import {
  faCaretDown,
  faCaretUp,
  faChevronLeft,
  faChevronRight,
  faEye,
  faGlobe,
  faInfoCircle,
  faLowVision, faPlus,
  faUserEdit,
  faUserFriends,
  faUsersCog,
  faFileMedicalAlt
} from "@fortawesome/free-solid-svg-icons";
import Vue from "vue";
// @ts-ignore
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default function fontAwesomeInit() {
  Vue.component("font-awesome-icon", FontAwesomeIcon);
  library.add(
    faUsersCog,
    faGlobe,
    faUserFriends,
    faLowVision,
    faChevronLeft,
    faChevronRight,
    faInfoCircle,
    faEye,
    faUserEdit,
    faCaretUp,
    faCaretDown,
    faPlus,
    faFileMedicalAlt
  );
}

export enum ico {
  userCogs = "users-cog",
  globe = "globe",
  userFriends = "user-friends",
  lowVision = "low-vision",
  chevronLeft = "chevron-left",
  chevronRight = "chevron-right",
  userEdit = "user-edit",
  infoCircle = "info-circle",
  eye = "eye",
  caretUp = "caret-up",
  caretDown = "caret-down",
  plus = "plus",
  fileMedicalAlt = "file-medical-alt"
}
