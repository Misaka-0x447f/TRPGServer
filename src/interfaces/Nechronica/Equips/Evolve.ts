import {Equips, Socket, SpecialEffect, Type} from "./index";

export const evolve: Equips[] = [
  {
    label: "regenerate",
    type: Type.passive,
    socket: Socket.any,
    effect: {
      special: SpecialEffect.heal
    },
    tech: 1
  },
  {
    label: "heart",
    type: Type.passive,
    socket: Socket.body,
    effect: {
      ap: 1
    },
    tech: 1
  },
  {
    label: "kemonomimi",
    type: Type.passive,
    socket: Socket.head,
    effect: {
      ap: 1,
      special: SpecialEffect.invincible
    },
    tech: 2
  },
  {
    label: "multiLeg",
    type: Type.passive,
    socket: Socket.leg,
    effect: {
      special: SpecialEffect.supportLegPart
    },
    tech: 3
  }
];
