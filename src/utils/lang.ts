import {cloneDeep, includes, isUndefined} from "lodash";

export const timeout = async (time: number) => {
  return new Promise((success) => {
    setTimeout(() => {
      success();
    }, time);
  });
};

export const isNumeric = (n: string | number) => {
  if (typeof n === "string") {
    return !isNaN(parseFloat(n));
  }
  return isFinite(n);
};

export const limitedStringify = (v: any) => {
  if (includes(["object", "number", "null"], typeof v)) {
    return JSON.stringify(v);
  } else if (isUndefined(v)) {
    return "undef";
  } else if ("string" === typeof v) {
    return v;
  } else {
    throw new Error(`Unexpected type: ${typeof v}`);
  }
};

export const xr = (a: any[], i: number, e: any) => {
  // this function tries to read array by index. if index not exist, push e.
  while (a.length <= i) {
    a.push(cloneDeep(e));
  }
  return a[i];
};

export class Watchable {
  private storage: object = {};
  private triggers: Array<(T: string) => void> = [];

  public init<T>(obj: T) {
    this.storage = obj as unknown as object;
    return new Proxy(this.storage, {
      get: (target: object, property: symbol) => {
        // // strict mode
        // if (!target.hasOwnProperty(property)) {
        //   console.log(property);
        //   throw new Error(`Refused to write: invalid target ${property}`);
        // }
        if (property.toString() === "__isInstanceOf_Watchable") {
          return true;
        }
        // @ts-ignore since just want to simulate original getter.
        return obj[property];
      },
      // @ts-ignore
      set: (target: object, property: symbol, value: any) => {
        // if (!target.hasOwnProperty(property)) {
        //   console.log(property);
        //   throw new Error(`Refused to write: invalid target ${property}`);
        // }
        // // @ts-ignore
        // console.log(target[property]);
        // console.log(value);
        // @ts-ignore
        if (target[property].__isInstanceOf_Watchable && !value.__isInstanceOf_Watchable) {
          throw new Error("Tries to overwrite a proxy pointer " +
            "with a pointer that is not pointing at a proxy.");
        }
        // @ts-ignore
        obj[property] = value;
        for (const i of this.triggers) {
          i(property.toString());
        }
        return true;
      }
    }) as unknown as T;
  }

  public registerTrigger(listener: (T: string) => void) {
    this.triggers.push(listener);
  }
}
