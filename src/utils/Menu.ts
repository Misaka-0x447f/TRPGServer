import {dict} from "@/utils/i18n";
import {assign, unset} from "lodash";
import {allowedIcons} from "@/main";

export class Menu {
  public storage: MenuCarrier = {};

  public constructTab(obj: MenuCarrier) {
    this.storage = assign(this.storage, obj);
  }

  public destroyTab(obj: string[]) {
    for (const i of obj) {
      unset(this.storage, i);
    }
  }
}

type dictName = keyof typeof dict.zh;

export type MenuCarrier = {
  [T in dictName]?: MenuValue;
};

export interface MenuValue {
  align?: "bottom" | "top";           // should be show at the bottom? default: "top";
  index?: number;                     // arrange menus; default: 0;
  children: {
    [T in dictName]?: {
      style: MenuStyle,
      handler: (e: MenuEvent) => boolean
      icon?: allowedIcons
    };
  };
}

export interface MenuEvent {
  event: "click" | "off" | "on";      // Which event happened?
}

export type MenuStyle = "click" | "checkBox"; // | "input: planned feature maybe sometime when required";
