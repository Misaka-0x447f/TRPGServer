import {say} from "@/utils/i18n";
import {batchCreateProperty} from "@/utils/PropertyEditor";
import {Shared} from "@/pages/Editor/Generators/Nechronica/Page4SharedStorage";

export const ns = "nechronica";

export enum idEnums {
  gameType = "gameType",
  name = "name",
  age = "age",
  desc = "desc",
  remains = "remains",
  cache = "cache",
  Firm1 = "primaryFirmware",
  Firm2 = "secondaryFirmware",
  ind = "individuality",
  enhance = "enhance",
  arms = "arms",
  evolve = "evolve",
  modify = "modify"
}

export const enum enhance {
  arms = "arms",
  evolve = "evolve",
  modify = "modify"
}

export interface FreeEnhanceDecideDef {
  label: string;
  points: number;
}

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

// EP stands for enhance point
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

export const getInheritedEPFromShared = (which: enhance) => {
  return getInheritedEP(which, Shared.firm1, Shared.firm2);
};

export const getFreeEPFromShared = (which: enhance) => {
  let sto = 0;
  for (const i of Shared.bonus) {
    if (i.label === which) {
      sto += i.points;
    }
  }
  return sto;
};

export const getSlotsFromShared = (which: enhance) => {
  const p1 = getInheritedEPFromShared(which);
  const p2 = getFreeEPFromShared(which);
  return EPSlotMap[p1 + p2];
};

// export const getEPFromPE = (which: enhance) => {
//   const firm1 = getPropertyById("firm1");
//   const firm2 = getPropertyById("firm2");
//   if (isUndefined(firm1) || isUndefined(firm2)) {
//     return getFreeEPFromPE(which) + getInheritedEP(which, "Transparent", "Transparent");
//   } else {
//     return getFreeEPFromPE(which) + getInheritedEP(which, firm1.value, firm2.value);
//   }
// };
//
// export const getFreeEPFromPE = (which: enhance) => {
//   let sto = 0;
//   const obj = getPropertyById("enhance");
//   if (!isUndefined(obj)) {
//     for (const i of obj.value as FreeEnhanceDecideDef[]) {
//       if (i.label === which) {
//         sto += i.points;
//       }
//     }
//   }
//   return sto;
// };

export const init = () => {
  batchCreateProperty([
    {
      id: idEnums.gameType,
      text: "",
      value: "Nechronica"
    },
    {
      id: idEnums.name, text: say(ns, "characterName")
    },
    {
      id: idEnums.age, text: say(ns, "characterAge")
    },
    {
      id: idEnums.desc, text: say(ns, "characterDesc")
    },
    {
      id: idEnums.remains, text: say(ns, "remains"),
      value: "01"
    },
    {
      id: idEnums.cache, text: say(ns, "cache"),
      value: ["", ""]
    },
    {
      id: idEnums.Firm1, text: say(ns, "primaryFirmware"),
      value: "Stacy"
    },
    {
      id: idEnums.Firm2, text: say(ns, "secondaryFirmware"),
      value: "Stacy"
    },
    {
      id: idEnums.ind, text: say(ns, "individuality"),
      value: "Alice"
    },
    {
      id: idEnums.enhance, text: say(ns, "enhance"),
      value: []
    },
    {
      id: idEnums.arms, text: say(ns, "arms"),
      value: []
    },
    {
      id: idEnums.evolve, text: say(ns, "evolve"),
      value: []
    },
    {
      id: idEnums.modify, text: say(ns, "modify"),
      value: []
    }
  ]);
};
