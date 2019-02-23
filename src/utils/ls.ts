// typescript limiter for browser's localstorage;
import {limitedStringify, limitedUnstringify} from "@/utils/lang";
import {isNull} from "lodash";

export enum LocalStorage {
  user = "user" // JSON; user information, including username and uid.
}

export class Env {
  public static set(key: LocalStorage, value: any) {
    window.localStorage.setItem(key, limitedStringify(value));
  }
  public static get(key: LocalStorage) {
    return limitedUnstringify(window.localStorage.getItem(key));
  }
  public static exist(key: LocalStorage) {
    return !isNull(window.localStorage.getItem(key));
  }
  public static clr(key: LocalStorage) {
    window.localStorage.removeItem(key);
  }
}
