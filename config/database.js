const { node_env } = require("./common");
const database = process.env.DATABASE;

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true
};

const mongodbConfig =
  node_env === "test"
    ? {
      database: process.env.MONGODB_TEST_DATABASE_NAME,
      host: process.env.MONGODB_TEST_DATABASE_HOST,
      port: process.env.MONGODB_TEST_DATABASE_PORT | 27017,
      username: process.env.MONGODB_TEST_DATABASE_USER,
      password: process.env.MONGODB_TEST_DATABASE_PASS,
      dialect: "mongodb",
      options
    }
    : {
      database: process.env.MONGODB_DATABASE_NAME,
      host: process.env.MONGODB_DATABASE_HOST,
      port: process.env.MONGODB_DATABASE_PORT | 27017,
      username: process.env.MONGODB_DATABASE_USER,
      password: process.env.MONGODB_DATABASE_PASS,
      dialect: "mongodb",
      options
    };

const postgresqlConfig =
  node_env === "test"
    ? {
      database: process.env.POSTGRESQL_TEST_DATABASE_NAME,
      host: process.env.POSTGRESQL_TEST_DATABASE_HOST,
      port: process.env.POSTGRESQL_TEST_DATABASE_PORT | 5432,
      username: process.env.POSTGRESQL_TEST_DATABASE_USER,
      password: process.env.POSTGRESQL_TEST_DATABASE_PASS,
      dialect: "postgres",
      options: {}
    }
    : {
      database: process.env.POSTGRESQL_DATABASE_NAME,
      host: process.env.POSTGRESQL_DATABASE_HOST,
      port: process.env.POSTGRESQL_DATABASE_PORT | 5432,
      username: process.env.POSTGRESQL_DATABASE_USER,
      password: process.env.POSTGRESQL_DATABASE_PASS,
      dialect: "postgres",
      options: {}
    };

const redisConfig =
  node_env === "test"
    ? {
      database: "cacher",
      host: process.env.REDIS_TEST_DATABASE_HOST,
      username: process.env.REDIS_TEST_DATABASE_USER,
      password: process.env.REDIS_TEST_DATABASE_PASS,
      dialect: "redis",
      options: {}
    }
    : {
      database: "cacher",
      host: process.env.REDIS_DATABASE_HOST,
      username: process.env.REDIS_DATABASE_USER,
      password: process.env.REDIS_DATABASE_PASS,
      dialect: "redis",
      options: {}
    };

module.exports = {
  database,
  config: {
    temporary: redisConfig,
    persistant: database === "POSTGRESQL" ? postgresqlConfig : mongodbConfig
  }
};
