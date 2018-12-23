import Vue from "vue";
import {defaults, forIn} from "lodash";

import {dict} from "@/utils/i18n";
import {Filter} from "@/utils/TypeScript";
import {ico} from "@/utils/FontAwesome";

export class SideTabHandler {
  public storage: TabInfoCarrier = {};

  public updateTab(obj: TabInfoCarrier) {
    forIn(obj, (value, key) => {
      Vue.set(this.storage, key, defaults(
        value,
        {
          align: "top",
          index: 0
        }
      ));
    });
  }

  public destroyTab(obj: menuNames[]) {
    for (const key of obj) {
      Vue.delete(this.storage, key);
    }
  }
}

/*  /// example
    sideTab.updateTab({
      templateMenu: {
        icon: ico.userCogs,
        children: {
          useNechronica: {
            style: MenuStyle.click,
            handler: () => {
              console.log("clicked")
            }
          }
        }
      }
    });
    /// never forgot to destroy tab when you leave.
 */

type menuNames = "fileMenu" | "viewMenu" | "templateMenu" | "aboutMenu";
type menuName = Filter<menuNames, keyof typeof dict.zh>;

export enum MenuStyle {
  click = "click",
  // TODO: checkBox = "checkBox",
  text = "text",
  textarea = "textarea"
}

/* Handlers:
 * click?: () => void
 * checkBox: (e?: CheckBoxEvent) => void
 * text?: () => string /// if handler exist and return a string, override the key name.
 * textarea?: () => string /// use \n for word wrap
 */

export type TabInfoCarrier = {
  [T in menuName]?: MenuValue;
};

export interface MenuValue {
  // TODO: align?: "bottom" | "top";           // should be show at the bottom? default: "top";
  // TODO: index?: number;                     // arrange menus; default: 0;
  icon?: ico;
  children: {
    [T in keyof typeof dict.zh]?: {
      style: MenuStyle,
      handler?: (e?: CheckBoxEvent) => void | string
    }
  };
}

interface CheckBoxEvent {
  eventType: checkBoxEventTypeEnum;
}

enum checkBoxEventTypeEnum {
  on = "on",
  off = "off"
}
