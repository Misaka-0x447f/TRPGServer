import {say} from "@/utils/i18n";
import {batchCreateProperty} from "@/utils/PropertyEditor";

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
  enhance = "enhance"
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
    }
  ]);
};
