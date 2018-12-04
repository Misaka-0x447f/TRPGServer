export const timeout = async (time: number) => {
  return new Promise((success) => {
    setTimeout(() => {
      success();
    }, time);
  });
};
