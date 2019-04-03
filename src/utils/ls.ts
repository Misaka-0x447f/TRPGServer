// typescript limiter for browser's localstorage;
import {limitedStringify, limitedUnstringify} from "@/utils/lang";
import {isNull} from "lodash";
import router from "@/router";

export enum LocalStorage {
  __auth = "__auth" // JSON; user information, including username and uid.
}

export interface LocalStorageDef {
  __auth: {
    user: string;
    uid: string;
  };
}

export class Env {
  public static set(key: LocalStorage, value: any) {
    window.localStorage.setItem(key, limitedStringify(value));
  }
  public static get(key: LocalStorage) {
    if (Env.exist(key)) {
      return limitedUnstringify(window.localStorage.getItem(key));
    }
    console.warn(`Environment variable get failed: ${key}`);
    return;
  }
  public static exist(key: LocalStorage) {
    return !isNull(window.localStorage.getItem(key));
  }
  public static clr(key: LocalStorage) {
    window.localStorage.removeItem(key);
  }
}

export const logOut = () => {
  Env.clr(LocalStorage.__auth);
  router.push("/");
};
