import {Equips, Socket, SpecialEffect, Type} from "./index";

export const modify: Equips[] = [
  {
    label: "limiter",
    type: Type.passive,
    socket: Socket.any,
    effect: {
      ap: 2,
      special: SpecialEffect.destroyTrigger
    },
    tech: 1
  },
  {
    label: "bomb",
    type: Type.passive,
    socket: Socket.any,
    effect: {
      special: SpecialEffect.bomb
    },
    tech: 2
  },
  {
    label: "enhancedHand",
    type: Type.passive,
    socket: Socket.hand,
    effect: {
      melee: 1,
      fight: 1,
      special: SpecialEffect.handDef
    },
    tech: 3
  }
];
