import Vue from "vue";
import {defaults, forIn} from "lodash";

import {dict} from "@/utils/i18n";
import {emptyEventHandler, Filter} from "@/utils/TypeScript";
import {ico} from "@/utils/FontAwesome";

export class SideTabHandler {
  public storage: TabInfoCarrier = {};
  public closeTabMethod: () => void = emptyEventHandler;

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

  public destroyTab(obj: PathDef) {
    forIn(obj as any, (value, key) => {
      if (typeof value === "object" && this.storage.hasOwnProperty(key)) {
        let keysCount = -1;
        for (const v of value) {
          // @ts-ignore. key must exist.
          const host = (this.storage[key] as MenuValue).children;
          if (host.hasOwnProperty(v)) {
            // exist. clean it.
            Vue.delete(host, v);
            // count remaining items in this menu
            keysCount = Object.keys(host).length;
          } else {
            throw new Error(`Unexpected menu path: ${key}.${v}`);
          }
        }
        if (keysCount === 0) {
          // no items in the menu. clean it.
          Vue.delete(this.storage, key);
        }
      } else {
        throw new Error(`Unexpected menu path: ${key}`);
      }
    });
    this.closeTabMethod();
  }

  public registerTabDestroyMethod(method: () => void) {
    this.closeTabMethod = method;
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

type PathDef = {
  [T in menuName]?: Array<keyof typeof dict.zh>;
};

type menuNames = "editMenu" | "aboutMenu";
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
 *
 * Enabled:
 * Called when menu mounted. Only works with click for now.
 */

export type TabInfoCarrier = {
  [T in menuName]?: MenuValue;
};

export interface MenuValue {
  // TODO: [Maybe] align?: "bottom" | "top";           // should be show at the bottom? default: "top";
  index?: number;                     // arrange menus; default: 0;
  icon?: ico;
  children: {
    [T in keyof typeof dict.zh]?: MenuItem
  };
}

export interface MenuItem {
  style: MenuStyle;
  enabled?: () => boolean;
  handler?: (e?: CheckBoxEvent) => void | string;
}

interface CheckBoxEvent {
  eventType: checkBoxEventTypeEnum;
}

enum checkBoxEventTypeEnum {
  on = "on",
  off = "off"
}
