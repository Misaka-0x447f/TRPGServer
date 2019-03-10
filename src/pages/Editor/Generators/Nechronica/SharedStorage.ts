import {
  CustomCollections,
  CustomRemains, equipTypes,
  FreeEnhanceDecideDef,
  idEnums,
  SocketRecordDef,
  texts
} from "@/interfaces/Nechronica";
import Watchable from "managed-object-proxy";
import {getRandomName} from "@/utils/math";
import {forIn, random} from "lodash";
import {Backpack} from "@/interfaces/Nechronica/Equips";
import {createProperty, updateProperty} from "@/utils/PropertyEditor";
import {getSlotsFromShared, needsClearEquipConfig} from "@/utils/Nechronica";

export const storageProxy = new Watchable();

export const randName = getRandomName();
export const randAge = random(8, 17).toString();

export const s: { [T in idEnums]: any } = storageProxy.init({
  gameType: "Nechronica",
  name: randName,
  age: randAge,
  desc: "",
  remains: "" as string | CustomRemains,
  cache: ["", ""],
  primaryFirmware: "",
  secondaryFirmware: "",
  individuality: "",
  enhance: [] as FreeEnhanceDecideDef[],
  arms: [] as Backpack,
  evolve: [] as Backpack,
  modify: [] as Backpack,
  collections: [] as CustomCollections[],
  defaultLocation: "",
  collectionsSocket: [] as SocketRecordDef[],
  equipsSocket: [] as SocketRecordDef[]
});

// copy everything to the property editor
forIn(s, (v, i) => {
  createProperty(i, (texts as any)[i], v);
});

export const computedProxy = new Watchable();

export const computed = computedProxy.init({
  arms: [0, 0, 0],
  evolve: [0, 0, 0],
  modify: [0, 0, 0]
});

// ------------- internal tasks ---------------- //

// computedSlots updated here
const updateSlotsFromShared = () => {
  forIn(equipTypes, (v) => {
    computed[v] = getSlotsFromShared(v);
  });
};

storageProxy.registerTrigger(updateSlotsFromShared);
updateSlotsFromShared();

const cleanEquipsConfig = () => {
  forIn(equipTypes, (v: equipTypes) => {
    if (needsClearEquipConfig(v) === true) {
      // For now just clean up all.
      s[v] = [];
    }
  });
};

computedProxy.registerTrigger(cleanEquipsConfig);

const mirror = () => {
  // copy everything to PE
  forIn(s, (v, i) => {
    updateProperty(i, v);
  });
};

storageProxy.registerTrigger(mirror);
