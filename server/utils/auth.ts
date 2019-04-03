import {userPool} from "./state";
import {find, isUndefined} from "lodash";

export const auth = (user: string, uid: string) => {
  const found = find(userPool, {uid});
  if (isUndefined(found)) {
    return false;
  }
  return user === found.user;
};

export default auth;
