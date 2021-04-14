const package = require("./package.json");

module.exports = {
  openapi: "3.0.0",
  info: {
    title: package.name,
    version: package.version,
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "API",
    },
  ],
  host: "localhost",
  basePath: "",
  schemas: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
};