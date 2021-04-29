const redis = require("./redis");
const mongodb = require("./mongodb");
const postgresql = require("./postgresql");
const {
  database: { config, database }
} = require("../config");

// Redis Connection Helpers
const startRedis = async () => {
  redis.connectDatabase(
    config.temporary,
    console.error.bind(console, "connection error:"),
    () => {}
  );
};
const stopRedis = async () => {
  redis.disconnectDatabase();
};

// Mongo DB Connection Helpers
const startMongoDB = async () => {
  await mongodb.connectDatabase(
    config.persistant,
    console.error.bind(console, "connection error:"),
    () => {
      console.log("MongoDB is Connected.");
    }
  );
};
const stopMongoDB = async () => {
  await mongodb.getConnection().close();
};

// Redis Connection Helpers
const startPostgresql = async () => {
  await postgresql.connectDatabase(
    config.persistant,
    error => {
      console.log(error);
    },
    () => {
      console.log("Postgreql is Connected.");
      postgresql.connectModels(postgresql.getClient());
      return postgresql.getClient().sync();
    }
  );
};
const stopPostgresql = async () => {
  postgresql.getClient().close();
};

module.exports = {
  database,
  temporary: {
    start: startRedis,
    stop: stopRedis,
    manager: redis
  },
  persistant: {
    start: database === "POSTGRESQL" ? startPostgresql : startMongoDB,
    stop: database === "POSTGRESQL" ? stopPostgresql : stopMongoDB,
    models: database === "POSTGRESQL" ? postgresql.models : mongodb.models,
    manager: database === "POSTGRESQL" ? postgresql : mongodb
  }
};
