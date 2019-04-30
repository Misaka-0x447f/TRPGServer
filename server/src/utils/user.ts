import {OnlineUserData, userPool} from "./state";
import {find} from "lodash";

export const findUser = (user: OnlineUserData["user"]) => {
  return find(userPool, {user});
};
