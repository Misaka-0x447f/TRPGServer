import {dict} from "@/utils/i18n";
import {assign, unset} from "lodash";

export class Menu {
  public storage: MenuCarrier = {};

  public constructTab(obj: MenuCarrier) {
    this.storage = assign(this.storage, obj);
  }

  public destoryTab(obj: string[]) {
    for (const i of obj) {
      unset(this.storage, i);
    }
  }
}

export type MenuCarrier = {
  [T in keyof typeof dict.zh]?: MenuValue;
};

export interface MenuValue {
  align?: "bottom" | "top";     // should be show at the bottom? default: "top";
  index?: number;               // arrange menus; default: 0;
  children: {
    [T in keyof typeof dict.zh]?: MenuStyle;
  };
}

export type MenuStyle = "click" | "checkBox"; // | "input: planned feature maybe sometime when required";
