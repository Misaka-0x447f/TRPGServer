import {Equips, Socket, Type} from "./index";

export const arms: Equips[] = [
  {
    label: "fight",
    type: Type.passive,
    socket: Socket.head,
    effect: {
      ap: 1
    },
    tech: 1
  },
  {
    label: "spikedClub",
    type: Type.action,
    socket: Socket.hand,
    cost: 2,
    range: 0,
    effect: {
      melee: 1,
      chain: true
    },
    tech: 1
  },
  {
    label: "ironClub",
    type: Type.action,
    socket: Socket.hand,
    cost: 3,
    range: 0,
    effect: {
      melee: 2,
      atk: 1
    },
    tech: 1
  },
  {
    label: "bramble",
    type: Type.suffix,
    socket: Socket.any,
    cost: 0,
    effect: {
      melee: 1,
      fight: 1
    },
    tech: 2
  },
  {
    label: "armedBoot",
    type: Type.action,
    socket: Socket.leg,
    cost: 2,
    range: 0,
    effect: {
      melee: 2,
      atk: 1
    },
    tech: 2
  },
  {
    label: "push",
    type: Type.rapid,
    socket: Socket.head,
    cost: 0,
    range: 0,
    effect: {
      move: 1
    },
    tech: 2
  },
  {
    label: "serratedKnife",
    type: Type.action,
    socket: Socket.hand,
    cost: 3,
    range: 0,
    effect: {
      melee: 4,
      atk: 1,
    },
    tech: 3
  },
  {
    label: "weeder",
    type: Type.action,
    socket: Socket.hand,
    cost: 2,
    range: 0,
    effect: {
      melee: 2,
      fatal: true,
      atk: 1
    },
    tech: 3
  }
];
