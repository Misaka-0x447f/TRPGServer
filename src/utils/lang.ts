import {cloneDeep, includes, isNull, isUndefined} from "lodash";

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
    return "undefined";
  } else if (typeof v === "string") {
    return v;
  } else {
    throw new Error(`Unexpected type: ${typeof v}`);
  }
};

export const limitedUnstringify = (v: string | null) => {
  if (isNull(v)) {
    return null;
  }
  if (v === "null") {
    return null;
  } else if (isJSONString(v)) {
    return JSON.parse(v);
  } else if (v === "undefined") {
    return undefined;
  } else if (isNumeric(v)) {
    return Number(v);
  } else {
    return v;
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

export const isJSONString = (data: string) => {
  if (typeof data !== "string") {
    console.warn("Unexpected isJSON test");
    return false;
  }
  try {
    const d = JSON.parse(data);
    return d && typeof d === "object";
  } catch (e) {
    return false;
  }
};

