import {FreeEnhanceDecideDef} from "@/interfaces/Nechronica";

export const Shared = {
  firm1: "Stacy",
  firm2: "Stacy",
  bonus: [] as FreeEnhanceDecideDef[]
};

export const sharedUpdateListener = [] as Array<() => void>;

export const sharedUpdated = () => {
  for (const i of sharedUpdateListener) {
    i();
  }
};
