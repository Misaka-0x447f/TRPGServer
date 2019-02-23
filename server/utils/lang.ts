export class Watchable {
  private storage: object = {};
  private triggers: Array<() => void> = [];

  public init<T>(obj: T) {
    this.storage = obj as unknown as object;
    return new Proxy(this.storage, {
      get: (target: object, property: string) => {
        // @ts-ignore since just want to simulate original getter.
        return obj[property];
      },
      // @ts-ignore
      set: (target: object, property: string, value: any) => {
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
