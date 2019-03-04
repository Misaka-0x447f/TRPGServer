import {
  CustomCollections,
  CustomRemains,
  FreeEnhanceDecideDef,
  SocketRecordDef,
  storageInit
} from "@/interfaces/Nechronica";
import Watchable from "managed-object-proxy";
import {getRandomName} from "@/utils/math";
import {forIn, random} from "lodash";
import {Backpack} from "@/interfaces/Nechronica/Equips";
import {updateProperty} from "@/utils/PropertyEditor";

storageInit();

export const storageProxy = new Watchable();

export const randName = getRandomName();
export const randAge = random(8, 17).toString();

// These status are immutable during runtime.
export const s = storageProxy.init({
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
  modify: [] as Backpack, // sync right is called when slot update callback.
  collections: [] as CustomCollections[],
  defaultLocation: "",
  collectionsSocket: [] as SocketRecordDef[],
  equipsSocket: [] as SocketRecordDef[]
});

export const computedProxy = new Watchable();

export const computed = computedProxy.init({
  arms: [0, 0, 0] as number[],
  evolve: [0, 0, 0] as number[],
  modify: [0, 0, 0] as number[]
});

const syncRight = () => {
  // copy everything to PE
  forIn(s, (v, i) => {
    updateProperty(i, v);
  });
};

storageProxy.registerTrigger(syncRight);
