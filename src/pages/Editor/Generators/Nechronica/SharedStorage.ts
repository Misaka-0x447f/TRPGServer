import {CustomCollections, CustomRemains, FreeEnhanceDecideDef} from "@/interfaces/Nechronica";
import {Watchable} from "@/utils/lang";
import {getRandomName} from "@/utils/math";
import {forIn, random} from "lodash";
import {Backpack} from "@/interfaces/Nechronica/Equips";
import {updateProperty} from "@/utils/PropertyEditor";

export const storageProxy = new Watchable();

export const randName = getRandomName();
export const randAge = random(8, 17).toString();

export const s = storageProxy.init({
  gameType: "Nechronica",
  name: randName,
  age: randAge,
  desc: "",
  remains: "wasted" as string | CustomRemains,
  cache: ["", ""],
  primaryFirmware: "Stacy",
  secondaryFirmware: "Stacy",
  individuality: "Alice",
  enhance: [] as FreeEnhanceDecideDef[],
  arms: [] as Backpack,
  evolve: [] as Backpack,
  modify: [] as Backpack, // sync right is called when slot update callback.
  collections: ["photo"] as string[] | CustomCollections[],
  defaultLocation: "2"
});

export const computedProxy = new Watchable();

export const computed = computedProxy.init({
  arms: [1, 1, 0] as number[],
  evolve: [1, 1, 0] as number[],
  modify: [0, 0, 0] as number[]
});

export const syncRight = () => {
  // copy everything to PE
  forIn(s, (v, i) => {
    updateProperty(i, v);
  });
};

storageProxy.registerTrigger(syncRight);
