import {includes, isUndefined, cloneDeep} from "lodash";

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
