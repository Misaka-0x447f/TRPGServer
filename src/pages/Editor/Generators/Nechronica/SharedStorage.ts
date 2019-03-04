import {
  CustomCollections,
  CustomRemains,
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

export const storageProxy = new Watchable();

export const randName = getRandomName();
export const randAge = random(8, 17).toString();

export const s: { [T in idEnums]: any } = storageProxy.init({
  [idEnums.gameType]: "Nechronica",
  [idEnums.name]: randName,
  [idEnums.age]: randAge,
  [idEnums.desc]: "",
  [idEnums.remains]: "" as string | CustomRemains,
  [idEnums.cache]: ["", ""],
  [idEnums.Firm1]: "",
  [idEnums.Firm2]: "",
  [idEnums.ind]: "",
  [idEnums.enhance]: [] as FreeEnhanceDecideDef[],
  [idEnums.arms]: [] as Backpack,
  [idEnums.evolve]: [] as Backpack,
  [idEnums.modify]: [] as Backpack,
  [idEnums.collections]: [] as CustomCollections[],
  [idEnums.defaultLocation]: "",
  [idEnums.collectionsSocket]: [] as SocketRecordDef[],
  [idEnums.equipsSocket]: [] as SocketRecordDef[]
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

const mirror = () => {
  // copy everything to PE
  forIn(s, (v, i) => {
    updateProperty(i, v);
  });
};

storageProxy.registerTrigger(mirror);
