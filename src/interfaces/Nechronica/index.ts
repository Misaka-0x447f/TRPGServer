import {say} from "@/utils/i18n";
import {batchCreateProperty} from "@/utils/PropertyEditor";
import {syncRight} from "@/pages/Editor/Generators/Nechronica/SharedStorage";
import {Socket} from "@/interfaces/Nechronica/Equips";

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
  modify = "modify",
  collections = "collections",
  defaultLocation = "defaultLocation",
  collectionsSocket = "collectionsSocket",
  equipsSocket = "equipsSocket"
}

// do not just change string remember check every import
export enum equipTypes {
  arms = "arms",
  evolve = "evolve",
  modify = "modify"
}

export interface FreeEnhanceDecideDef {
  label: string;
  points: number;
}

export interface CustomRemains {
  title: string;
  desc: string;
}

export interface CustomCollections {
  label: string;
  title?: string;
  desc?: string;
}

export interface SocketRecordDef {
  label: string;
  socket: Socket;
}

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
      id: idEnums.desc, text: say(ns, "characterDesc"),
      value: ""
    },
    {
      id: idEnums.remains, text: say(ns, "remains"),
      value: ""
    },
    {
      id: idEnums.cache, text: say(ns, "cache"),
      value: ["", ""]
    },
    {
      id: idEnums.Firm1, text: say(ns, "primaryFirmware"),
      value: ""
    },
    {
      id: idEnums.Firm2, text: say(ns, "secondaryFirmware"),
      value: ""
    },
    {
      id: idEnums.ind, text: say(ns, "individuality"),
      value: ""
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
    },
    {
      id: idEnums.collections, text: say(ns, "collections"),
      value: []
    },
    {
      id: idEnums.defaultLocation, text: say(ns, "defaultLocation"),
      value: ""
    },
    {
      id: idEnums.collectionsSocket, text: say(ns, "collectionsSocket"),
      value: []
    },
    {
      id: idEnums.equipsSocket, text: say(ns, "equipsSocket"),
      value: []
    }
  ]);
  syncRight();
};
