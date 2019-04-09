import {Server} from "../../utils/ws";
import {events} from "../../../serverInterfaces";
import {In} from "../../../serverInterfaces/serverEvent/authFailed";

export const authFailed = (s: Server) => {
  console.log(">>> [authFailed]");
  s.TX(events._auth, {} as In);
};

export default authFailed;
