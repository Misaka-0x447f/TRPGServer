import {say} from "@/utils/i18n";
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

export const texts = {
  [idEnums.gameType]: "",
  [idEnums.name]: say(ns, "characterName"),
  [idEnums.age]: say(ns, "characterAge"),
  [idEnums.desc]: say(ns, "characterDesc"),
  [idEnums.remains]: say(ns, "remains"),
  [idEnums.cache]: say(ns, "cache"),
  [idEnums.Firm1]: say(ns, "primaryFirmware"),
  [idEnums.Firm2]: say(ns, "secondaryFirmware"),
  [idEnums.ind]: say(ns, "individuality"),
  [idEnums.enhance]: say(ns, "enhance"),
  [idEnums.arms]: say(ns, "arms"),
  [idEnums.evolve]: say(ns, "evolve"),
  [idEnums.modify]: say(ns, "modify"),
  [idEnums.collections]: say(ns, "collections"),
  [idEnums.defaultLocation]: say(ns, "defaultLocation"),
  [idEnums.collectionsSocket]: say(ns, "collectionsSocket"),
  [idEnums.equipsSocket]: say(ns, "equipsSocket")
};
