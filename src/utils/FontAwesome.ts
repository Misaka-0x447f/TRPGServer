import {library} from "@fortawesome/fontawesome-svg-core";
import {
  faCaretDown,
  faCaretUp,
  faChevronLeft,
  faChevronRight,
  faFileCode,
  faGlobe,
  faInfoCircle,
  faLowVision,
  faPenSquare,
  faPlus,
  faStreetView,
  faUserFriends,
  faUsersCog, faUserTag
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
    faStreetView,
    faPenSquare,
    faCaretUp,
    faCaretDown,
    faPlus,
    faFileCode,
    faUserFriends,
    faUserTag
  );
}

export enum ico {
  chevronLeft = "chevron-left",
  chevronRight = "chevron-right",
  penSquare = "pen-square",
  infoCircle = "info-circle",
  streetView = "street-view",
  caretUp = "caret-up",
  caretDown = "caret-down",
  plus = "plus",
  fileCode = "file-code",
  userFriends = "user-friends",
  userTag = "user-tag"
}
