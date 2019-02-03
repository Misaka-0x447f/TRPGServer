import {say} from "@/utils/i18n";
import {batchCreateProperty} from "@/utils/PropertyEditor";

export const init = () => {
  batchCreateProperty([
    {
      id: "gameType",
      text: "",
      value: "Nechronica"
    },
    {
      id: "name", text: say("nechronica", "characterName")
    },
    {
      id: "age", text: say("nechronica", "characterAge")
    },
    {
      id: "desc", text: say("nechronica", "characterDesc")
    },
    {
      id: "redundancyData", text: say("nechronica", "redundancyData"),
    },
    {
      id: "cache", text: say("nechronica", "cache"),
      value: ["", ""]
    },
    {
      id: "primaryFirmware", text: say("nechronica", "primaryFirmware")
    },
    {
      id: "secondaryFirmware", text: say("nechronica", "secondaryFirmware")
    },
    {
      id: "individuality", text: say("nechronica", "individuality")
    }
  ]);
};
