// EP stands for enhance point
import {computed, s, storageProxy} from "@/pages/Editor/Generators/Nechronica/SharedStorage";
import {CustomCollections, enhance, FreeEnhanceDecideDef} from "@/interfaces/Nechronica";
import {forIn, find, isUndefined} from "lodash";
import {Equip, Socket} from "@/interfaces/Nechronica/Equips";
import {arms} from "@/interfaces/Nechronica/Equips/Arms";
import {evolve} from "@/interfaces/Nechronica/Equips/Evolve";
import {modify} from "@/interfaces/Nechronica/Equips/Modify";

export const EPSlotMap = [
  [0, 0, 0],
  [1, 0, 0],
  [1, 1, 0],
  [1, 1, 1],
  [2, 1, 1],
  [2, 2, 1],
  [2, 2, 2],
  [3, 2, 2],
  [3, 3, 2],
  [3, 3, 3]
];
export const getInheritedEP = (which: enhance, firm1: string, firm2: string) => {
  const map = {
    Transparent: [0, 0, 0],
    Stacy: [1, 1, 0],
    Thanatos: [1, 0, 1],
    Gothic: [0, 1, 1],
    Requiem: [2, 0, 0],
    Baroque: [0, 2, 0],
    Romanesque: [0, 0, 2]
  };

  if (!map.hasOwnProperty(firm1)) {
    throw new Error(`unknown firmware ${firm1}. contact the factory.`);
  }

  if (!map.hasOwnProperty(firm2)) {
    throw new Error(`unknown firmware ${firm2}. contact the factory.`);
  }

  const queryMap = (name: string, w: enhance) => {
    let label = -1;
    if (w === enhance.arms) {
      label = 0;
    } else if (w === enhance.evolve) {
      label = 1;
    } else if (w === enhance.modify) {
      label = 2;
    }
    // @ts-ignore; already checked at this point.
    return (map[name] as number[])[label];
  };

  return queryMap(firm1, which) + queryMap(firm2, which);
};
export const getFreeEP = (which: enhance, decide: FreeEnhanceDecideDef[]) => {
  let sto = 0;
  for (const i of decide) {
    if (i.label === which) {
      sto += i.points;
    }
  }
  return sto;
};
export const getSlotsFromShared = (which: enhance) => {
  const p1 = getInheritedEP(which, s.primaryFirmware, s.secondaryFirmware);
  const p2 = getFreeEP(which, s.enhance);
  return EPSlotMap[p1 + p2];
};

export const updateSlotsFromShared = () => {
  forIn(enhance, (v) => {
    computed[v] = getSlotsFromShared(v);
  });
};

storageProxy.registerTrigger(updateSlotsFromShared);
updateSlotsFromShared();

const selectEquipLabelFromEquipGroupWhereSocketEqualToSocketDotAny = (e: Equip[]) => {
  const a = []; // storage of equips which needs to do that.
  for (const v of e) {
    if (v.socket === Socket.any) {
      a.push(v.label);
    }
  }
  return a;
};

export const getEquipsToBeSet = () => {
  return selectEquipLabelFromEquipGroupWhereSocketEqualToSocketDotAny(arms).concat(
    selectEquipLabelFromEquipGroupWhereSocketEqualToSocketDotAny(evolve).concat(
      selectEquipLabelFromEquipGroupWhereSocketEqualToSocketDotAny(modify)
    )
  );
};

export const getCollectionByLabel = (c: CustomCollections[], label: string): CustomCollections => {
  const a = find(c, {label});
  if (isUndefined(a)) {
    throw new Error("Cannot found collection.");
  }
  return a;
};
