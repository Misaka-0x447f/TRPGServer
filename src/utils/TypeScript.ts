export type Filter<T, U> = T extends U ? T : never; // Remove types from T that are not assignable to U

export function getEmptyEventHandler() {
  return () => {
    return;
  };
}
