import {ico} from "../FontAwesome";
import {MenuStyle, TabInfoCarrier} from "../SideTabHandler";

export const menu: TabInfoCarrier = {
  aboutMenu: {
    icon: ico.infoCircle,
    children: {
      version: {
        style: MenuStyle.text
      },
      about: {
        style: MenuStyle.textarea
      }
    }
  }
};

export default menu;
