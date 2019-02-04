import state from "@/utils/state";
import Vue from "vue";
import {cloneDeep, find, isUndefined} from "lodash";
import {limitedStringify} from "@/utils/lang";

export interface Property {
  data: PropertyData[];
}

export interface PropertyData {
  id: string;                       // must be a valid javascript identifier
  value: string;                    // numeric string, enum string, or just string
  text: string;                     // human readable property text
}

export const getPropertyById = (id: string) => {
  return find(
    state.editor.storage.data, {id}
  ) as PropertyData | undefined;
};

// export const getPropertyValueById = (id: string) => {
//   const i = getPropertyById(id);
//   if (isUndefined(i)) {
//     return undefined;
//   } else {
//     return i.value;
//   }
// };

export const PropertyExist = (id: string) => {
  return !isUndefined(getPropertyById(id));
};


export const batchCreateProperty = (obj: PropertyCreateDef[]) => {
  for (const i of obj) {
    createProperty(i.id, i.text, i.value);
  }
};

interface PropertyCreateDef {
  id: string;
  text: string;
  value?: any;
}

export const createProperty = (id: string, text: string, value?: string) => {
  if (PropertyExist(id)) {
    // refused to create.
    return false;
  }

  const d = cloneDeep(state.editor.storage.data) as PropertyData[];
  d.push({
    id,
    value: !isUndefined(value) ? limitedStringify(value) : "",
    text
  });

  Vue.set(state.editor.storage, "data", d);
};

export const updateProperty = (id: string, value: any) => {
  const target = getPropertyById(id);
  if (target === undefined) {
    console.warn(`Property does not exist: ${id}. Will not create one.`);
    return false;
  }

  Vue.set(target, "value", limitedStringify(value));
  return true;
};
