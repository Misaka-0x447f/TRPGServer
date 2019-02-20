import {forIn} from "lodash";
// designed for change env anytime
// tslint:disable-next-line
let env = process.env.NODE_ENV as string;
export const serverAddrProfile = {
  development: `ws://localhost:6655`,
  production: `wss://api.trpg.misaka.org:6655`
};

// @ts-ignore
export const serverAddr = serverAddrProfile[env];

console.log(`ENV: ${env}`);
forIn(serverAddrProfile, (v, i) => {
  console.log(`${i === env ? "-->" : "   "} ${v}`);
});
