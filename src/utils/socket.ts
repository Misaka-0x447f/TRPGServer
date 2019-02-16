import io from "socket.io-client";
import {namespace} from "../../serverInterfaces";
import {serverAddr} from "@/interfaces/ws";
//
// const ioConnect = () => {
//   io.connect(`${serverAddr}`);
// };
//
// ioConnect();

export const ioOf = (route: namespace) => {
  return io(`${serverAddr}${route}`);
};
