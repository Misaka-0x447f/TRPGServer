import {cloneDeep, fill, includes, isNull, isUndefined, isArray, set} from "lodash";

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
    throw new Error(`Unexpected type: ${typeof v}, got ${v}`);
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
  if (!isArray(a)) {
    if (isUndefined(a)) {
      return e;
    }
    throw new Error(`Unexpected argument; expect type array, got ${a}`);
  }
  const initLength = a.length;
  fill(a, cloneDeep(e), initLength);
  return a[i];
};

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

export const generatePulse = (obj: object, path: string[]) => {
  set(obj, path, true);
  set(obj, path, false);
};
