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
