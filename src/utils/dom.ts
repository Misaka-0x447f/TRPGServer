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
