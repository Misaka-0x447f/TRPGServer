import state from "@/utils/state";
import Vue from "vue";
import {cloneDeep, find, findIndex} from "lodash";

export interface Property {
  data: PropertyData[];
}

export interface PropertyData {
  id: string;                       // must be a valid javascript identifier
  value: string;                    // numeric string, enum string, or just string
  text: string;                     // human readable property text
}

export const PropertyExist = (id: string) => {
  return findIndex(state.editor.storage.data, {id} as any) !== -1;
};


export const batchCreateProperty = (obj: PropertyCreateDef[]) => {
  for (const i of obj) {
    createProperty(i.id, i.text, i.value);
  }
};

interface PropertyCreateDef {
  id: string;
  text: string;
  value?: string;
}

export const createProperty = (id: string, text: string, value?: string) => {
  if (PropertyExist(id)) {
    return false;
  }

  const d = cloneDeep(state.editor.storage.data) as PropertyData[];
  d.push({
    id,
    value: value ? value : "",
    text
  });

  Vue.set(state.editor.storage, "data", d);
};

export const updateProperty = (id: string, value: string) => {
  const target = find(state.editor.storage.data, {id}) as PropertyData | undefined;
  if (target === undefined) {
    console.warn(`Property does not exist while searching storage: ${id}`);
    return false;
  }
  Vue.set(target, "value", value);
  return true;
};
