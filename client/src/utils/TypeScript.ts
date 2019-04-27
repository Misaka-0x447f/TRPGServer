export type Filter<T, U> = T extends U ? T : never; // Remove types from T that are not assignable to U

function extend<T, U>(first: T, second: U): T & U {
  const result = {} as T & U;
  // tslint:disable-next-line
  for (const id in first) {
    (result as any)[id] = (first as any)[id];
  }
  for (const id in second) {
    if (!result.hasOwnProperty(id)) {
      (result as any)[id] = (second as any)[id];
    }
  }
  return result;
}

export function getEmptyEventHandler() {
  return () => {
    return;
  };
}
