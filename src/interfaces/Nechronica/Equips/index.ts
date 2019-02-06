export enum Type {
  passive = "passive",  // Auto, always effective.
  trigger = "trigger",  // Judge, ask use or not while triggered.
  // Triggered if: enemy in range, use skills.
  rapid = "rapid",      // Rapid, append to other equips effect.
  action = "action",    // Action, can be use if available.
  suffix = "suffix",    // Damage, happened if main attack success.
}

export enum Socket {
  head = "head",
  hand = "hand",
  body = "body",
  leg = "leg",
  any = "any",
}

export interface Effect {
  ap?: number;          // add ap.
  atk?: number;         // atk up.
  melee?: number;       // melee effect up
  fight?: number;
  shoot?: number;
  cannon?: number;
  move?: number;
  precision?: number;   // 支援.
  jam?: number;
  def?: number;         // dmg down.
  blockMove?: number;
  blockApBy2?: boolean; // 摔倒.
  fatal?: boolean;      // 切斷. Disable a part. If enemy has no part, dmg x2
  chain?: boolean;      // 爆發. also attack a nearby part. If no part dmg x2.
  aoe?: boolean;        // 全體攻擊.
  combo?: number;
  special?: SpecialEffect;
}

export enum SpecialEffect {
  heal = "heal",                      // auto recovery parts if not destoryed at the end of round.
  invincible = "invincible",          // is not able to be destroy.
  supportLegPart = "supportLegPart",  // other leg parts still works if destroy.
  destroyTrigger = "destroyTrigger",  // effect trigger if destroyed.
  bomb = "bomb",                      // Trigger a bomb if destroyed.
  handDef = "handDef"                 // got extra 1 point def on hand.
}

export interface Equip {
  label: string;
  type: Type;
  socket: Socket;
  cost?: number;    // if passive then no cost
  range?: number;   // if no range then only self
  effect: Effect;
  tech: number;     // tech level
}

export interface EquipText {
  label: string;
  text: string;
  desc: string;
  tech: number;  // tech level (T1~T3)
}

export type Backpack = Array<Array<EquipText | null>>;
