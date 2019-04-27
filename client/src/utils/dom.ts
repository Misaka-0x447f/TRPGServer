export function getAttrInEvent(e: Event, attrName: string) {
  let currentElement = e.target as Element;
  while (!currentElement.hasAttribute(attrName)) {
    if (!currentElement.parentElement) {
      return null;
    }
    currentElement = currentElement.parentElement;
  }
  return currentElement.getAttribute(attrName);
}

export const mergeClasses = (...args: Array<object | string>) => {
  let c = "";
  for (const i of args) {
    if (typeof i === "object") {
      for (const j in i) {
        // @ts-ignore
        if (i[j]) {
          c = `${c} ${j}`;
        }
      }
    } else {
      c = `${c} ${i}`;
    }
  }
  return c;
};
