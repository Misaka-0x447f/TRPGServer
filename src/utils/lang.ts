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
  private triggers: Array<() => void> = [];

  public init<T>(obj: T) {
    this.storage = obj as unknown as object;
    return new Proxy(this.storage, {
      get: (target: object, property: string) => {
        // // strict mode
        // if (!target.hasOwnProperty(property)) {
        //   console.log(property);
        //   throw new Error(`Refused to write: invalid target ${property}`);
        // }
        // @ts-ignore since just want to simulate original getter.
        return obj[property];
      },
      // @ts-ignore
      set: (target: object, property: string, value: any) => {
        // if (!target.hasOwnProperty(property)) {
        //   console.log(property);
        //   throw new Error(`Refused to write: invalid target ${property}`);
        // }
        // @ts-ignore
        obj[property] = value;
        for (const i of this.triggers) {
          i();
        }
        return true;
      }
    }) as unknown as T;
  }

  public registerTrigger(listener: () => void) {
    this.triggers.push(listener);
  }

  public triggerAll() {
    for (const i of this.triggers) {
      i();
    }
  }
}
