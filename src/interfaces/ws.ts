const env = process.env.NODE_ENV;
console.log(`ENV: ${env}`);
console.log(`${env === "development" ? ">" : " "} localhost`);
console.log(`${env === "production" ? ">" : " "} api.trpg.misaka.org`);

export const serverAddr = `ws://${window.location.hostname}:52504/`;
