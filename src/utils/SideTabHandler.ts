import Vue from "vue";
import {defaults, findIndex, forIn} from "lodash";

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
    const errorWords = "Failed to remove menu item since it does not exist: ";
    forIn(obj, (value, key) => {
      if (typeof value === "object" && this.storage.hasOwnProperty(key)) {
        const host = (this.storage as any)[key].children as MenuItem[];
        forIn(value, (v) => {
          const index = findIndex(host, {name: v});
          if (index === -1) {
            throw new Error(`${errorWords}${key}/${JSON.stringify(v)}`);
          }
          host.splice(index, 1);
          if (host.length === 0) {
            // no items in the menu. clean it.
            Vue.delete(this.storage, key);
          }
        });
      } else {
        throw new Error(`${errorWords}${key}/*`);
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
        aboutMenu: {
          icon: ico.infoCircle,
          children: [
            {
              name: {
                scope: "global",
                key: "version"
              },
              style: MenuStyle.text
            },
            {
              name: {
                scope: "global",
                key: "about"
              },
              style: MenuStyle.textarea
            }
          ]
        }
      });
    /// never forgot to destroy tab when you leave.
      sideTab.destroyTab({
        aboutMenu: [
          {
            scope: "global",
            key: "version"
          },
          {
            scope: "global",
            key: "about"
          }
        ]
      });
 */

type PathDef = {
  [T in menuName]?: Array<MenuItem["name"]>;
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
  children: MenuItem[];
}

export interface MenuItem {
  name: {
    scope: string;
    key: string;    // will be pass to @/utils/i18n/e
  };
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
