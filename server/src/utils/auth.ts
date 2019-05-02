import {userPool} from "./state";
import {find, isUndefined} from "lodash";

export const auth = (user: string, credential: string) => {
  const found = find(userPool, {user, credential});
  if (isUndefined(found)) {
    return false;
  }
  return user === found.user;
};

export default auth;
