import state from "@/utils/state";
import Vue from "vue";
import {cloneDeep, find, isUndefined} from "lodash";
import {limitedStringify} from "@/utils/lang";

export interface PropertyData {
  id: string;                       // must be a valid javascript identifier
  value: any;                       // stored as numeric string, enum string, or just string
  text: string;                     // human readable property text
}

export const getPropertyById = (id: string) => {
  const found = find(
    state.editor.storage.definition, {id}
  ) as PropertyData | undefined;
  if (typeof found === "undefined") {
    console.warn(`property not found: ${id}. received ${JSON.stringify(found)}`);
    return undefined;
  } else {
    if (typeof found.value === "object") {
      return {
        id: found.id,
        value: JSON.parse(found.value),
        text: found.text
      } as PropertyData;
    } else {
      return found;
    }
  }
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
  return !isUndefined(
    find(
      state.editor.storage.definition, {id}
    ) as PropertyData | undefined
  );
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

  const d = cloneDeep(state.editor.storage.definition) as PropertyData[];
  d.push({
    id,
    value: !isUndefined(value) ? limitedStringify(value) : "",
    text
  });

  Vue.set(state.editor.storage, "definition", d);
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
