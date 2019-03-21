import {dict} from "@/utils/i18n";
import {ico} from "@/utils/FontAwesome";

export interface TabDef {
  id: string;                   // target template id
  text: keyof typeof dict.zh;
  icon: ico;
  // TODO: [Maybe] index?: number;               // how to sort tabs. default: 0;
  // TODO: [Maybe] align?: "bottom" | "top";           // default: "top";
}

/*
* for WebStorm users:
* you may want to disable "Unbound XML namespace prefix"
* to use named slot feature.
* */
