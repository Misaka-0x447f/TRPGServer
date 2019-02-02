import {uniqueId} from "lodash";
import sha1 from "sha1";

export const getRandomHash = () => {
  const source = uniqueId(new Date().getTime().toString());
  return sha1(source).toString().substr(-8);
};
