// typescript limiter for browser's localstorage;
import {limitedStringify, limitedUnstringify} from "@/utils/lang";
import {isNull} from "lodash";
import router, {RouterName} from "@/router";

export enum LocalStorage {
  __auth = "__auth", // JSON; user information, including username and credential.
}

export interface LocalStorageDef {
  __auth: {
    user: string;
    credential: string;
  };
}

export class Env {
  // TODO: change the any to type defined
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
  router.push({name: RouterName.startup});
};

export const authAvailable = () => {
  return Env.exist(LocalStorage.__auth);
};
