// EP stands for enhance point
import {computed, computedProxy, s, storageProxy} from "@/pages/Editor/Generators/Nechronica/SharedStorage";
import {CustomCollections, equipTypes, FreeEnhanceDecideDef, ns} from "@/interfaces/Nechronica";
import {cloneDeep, find, flatten, forIn, isNull, isUndefined} from "lodash";
import {Equip, EquipText, Socket} from "@/interfaces/Nechronica/Equips";
import {arms} from "@/interfaces/Nechronica/Equips/Arms";
import {evolve} from "@/interfaces/Nechronica/Equips/Evolve";
import {modify} from "@/interfaces/Nechronica/Equips/Modify";
import {say} from "@/utils/i18n";

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
export const getInheritedEP = (which: equipTypes, firm1: string, firm2: string) => {
  const map = {
    Transparent: [0, 0, 0],
    Stacy: [1, 1, 0],
    Thanatos: [1, 0, 1],
    Gothic: [0, 1, 1],
    Requiem: [2, 0, 0],
    Baroque: [0, 2, 0],
    Romanesque: [0, 0, 2]
  };

  const queryMap = (name: string, w: equipTypes) => {
    // if not exist return zero.
    if (!map.hasOwnProperty(name)) {
      return 0;
    }

    let label = -1;
    if (w === equipTypes.arms) {
      label = 0;
    } else if (w === equipTypes.evolve) {
      label = 1;
    } else if (w === equipTypes.modify) {
      label = 2;
    }
    // @ts-ignore; already checked at this point.
    return (map[name] as number[])[label];
  };

  return queryMap(firm1, which) + queryMap(firm2, which);
};
export const getFreeEP = (which: equipTypes, decide: FreeEnhanceDecideDef[]) => {
  let sto = 0;
  for (const i of decide) {
    if (i.label === which) {
      sto += i.points;
    }
  }
  return sto;
};
export const getSlotsFromShared = (which: equipTypes) => {
  const p1 = getInheritedEP(which, s.primaryFirmware, s.secondaryFirmware);
  const p2 = getFreeEP(which, s.enhance);
  return EPSlotMap[p1 + p2];
};

export const updateSlotsFromShared = () => {
  forIn(equipTypes, (v) => {
    computed[v] = getSlotsFromShared(v);
  });
};

storageProxy.registerTrigger(updateSlotsFromShared);
updateSlotsFromShared();

const getAllEquipTexts = () => {
  return cloneDeep(say(ns, "builtInArms"))
    .concat(say(ns, "builtInEvolve"))
    .concat(say(ns, "builtInModify")) as EquipText[];
};

const getAllEquips = () => {
  return cloneDeep(arms)
    .concat(evolve)
    .concat(modify) as Equip[];
};

const getEquipTextsFromEquipLabel = (l: string) => {
  const a = find(getAllEquipTexts(), {label: l});
  if (isUndefined(a)) {
    throw new Error(`equip query does not exist: ${l}`);
  }
  return a;
};

const getEquipFromEquipLabel = (l: string) => {
  const a = find(getAllEquips(), {label: l});
  if (isUndefined(a)) {
    throw new Error(`equip query does not exist: ${l}`);
  }
  return a;
};

const equipTextArrayToEquipArray = (e: EquipText[]) => {
  const a = [] as Equip[];
  for (const v of e) {
    a.push(
      getEquipFromEquipLabel(
        v.label
      )
    );
  }
  return a;
};

const selectEquipFromEquipGroupWhereSocketEqualToSocketDotAny = (e: Equip[]) => {
  const a = [] as EquipText[]; // storage of equips which needs to do that.
  for (const v of e) {
    if (v.socket === Socket.any) {
      a.push(getEquipTextsFromEquipLabel(v.label));
    }
  }
  return a;
};

export const getEquippedEquips = (which?: equipTypes) => {
  const a = [] as EquipText[];
  forIn(equipTypes, (v: equipTypes) => {
    if (v === which || isUndefined(which)) {
      // @ts-ignore
      forIn(flatten(s[v]), (p: EquipText | null) => {
        if (!isNull(p)) {
          a.push(getEquipTextsFromEquipLabel(p.label));
        }
      });
    }
  });
  return a;
};

export const getEquipsToBeSet = () => {
  return selectEquipFromEquipGroupWhereSocketEqualToSocketDotAny(
    equipTextArrayToEquipArray(
      getEquippedEquips()
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

export const needsClearEquipConfig = (v: equipTypes) => {
  let flag = false;
  // i: tech level - 1; j: max slots on this tech level; k: specified slot;
  // @ts-ignore
  forIn(computed[v], (j: number, i: number) => {
    // has this tech level?
    if (s[v].hasOwnProperty(i)) {
      // starts from max possible slots; ends equip length;
      for (let k = j; k < s[v][i].length; k++) {
        if (s[v][i].hasOwnProperty(k) && s[v][i][k] !== null) {
          // an equip located in a slot that does not exist. needs to be clean.
          flag = true;
          return;  // This line means 'break' the 'forIn' here.
        }
      }
    }
    // if not, no equip here, no need to clean, check next.
  });
  return flag;
};

export const cleanEquipsConfig = () => {
  forIn(equipTypes, (v: equipTypes) => {
    if (needsClearEquipConfig(v) === true) {
      // For now just clean up all.
      s[v] = [];
    }
  });
};

computedProxy.registerTrigger(cleanEquipsConfig);
