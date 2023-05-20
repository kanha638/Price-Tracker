const environment = "dev";
const app = {
  PORT: 4200,
  clientURI: environment === "dev" ? "http://localhost" : "",
  publicServerURI: environment === "dev" ? "http://localhost:8080" : "",
  scrapingServerURL: environment === "dev" ? "http://localhost:5000" : "",
};

export default app;
