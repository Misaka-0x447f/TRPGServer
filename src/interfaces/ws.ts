const env = process.env.NODE_ENV as string;
console.log(`ENV: ${env}`);
console.log(`${env === "development" ? ">" : " "} localhost`);
console.log(`${env === "production" ? ">" : " "} trpg-api.azurewebsites.net`);

// @ts-ignore
export const serverAddr = {
  development: `ws://${window.location.hostname}:52504/`,
  production: `ws://trpg-api.azurewebsites.net:52504/`
}[env];
