import {uniqueId, random, padStart} from "lodash";
import sha1 from "sha1";

export const getHashByString = (s: string) => {
  return sha1(s).toString().substr(-8);
};

export const getRandomHash = () => {
  const source = uniqueId(new Date().getTime().toString());
  return sha1(source).toString().substr(-8);
};

export const getRandomName = () => {
  let sto = "";
  for (let i = 0; i < 3; i++) {
    sto += (random(11, 36)).toString(36);
  }
  sto += "-";
  sto += padStart(random(0, 9999).toString(), 4, "0");
  return sto.toUpperCase();
};
