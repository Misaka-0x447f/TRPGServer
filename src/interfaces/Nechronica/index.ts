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
      id: "arch", text: say("nechronica", "arch"),
    }
  ]);
};
