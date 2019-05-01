// typescript limiter for browser's localstorage;
import {limitedStringify, limitedUnstringify} from "@/utils/lang";
import {isNull} from "lodash";
import router, {RouterName} from "@/router";

export enum LocalStorage {
  __auth = "__auth", // JSON; user information, including username and credential.
  currNs = "currNs"
}

export interface LocalStorageDef {
  [LocalStorage.__auth]: {
    user: string;
    credential: string;
  };
  [LocalStorage.currNs]: string;
}

export class Env {
  public static set<T extends LocalStorage, K extends LocalStorageDef[T]>(key: T, value: K) {
    window.localStorage.setItem(key, limitedStringify(value));
  }
  public static get<T extends LocalStorage, K extends LocalStorageDef[T]>(key: T) {
    if (Env.exist(key)) {
      return limitedUnstringify(window.localStorage.getItem(key)) as K;
    }
    throw new Error(`Local storage not found: ${key}`);
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
