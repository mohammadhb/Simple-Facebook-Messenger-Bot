const {node_env} = require("./common");
const database = process.env.DATABASE;

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
};

const mongodbConfig = node_env === "test" ?
  {
    database: process.env.MONGODB_TEST_DATABASE_NAME,
    host: process.env.MONGODB_TEST_DATABASE_HOST,
    username: process.env.MONGODB_TEST_DATABASE_USER,
    password: process.env.MONGODB_TEST_DATABASE_PASS,
    dialect: "mongodb",
    options,
  }:
  {
    database: process.env.MONGODB_DATABASE_NAME,
    host: process.env.MONGODB_DATABASE_HOST,
    username: process.env.MONGODB_DATABASE_USER,
    password: process.env.MONGODB_DATABASE_PASS,
    dialect: "mongodb",
    options,
  };

const postgresqlConfig = node_env === "test" ? 
  {
    database: process.env.POSTGRESQL_TEST_DATABASE_NAME,
    host: process.env.POSTGRESQL_TEST_DATABASE_HOST,
    username: process.env.POSTGRESQL_TEST_DATABASE_USER,
    password: process.env.POSTGRESQL_TEST_DATABASE_PASS,
    dialect: "postgres",
    options:{}
  }:
  {
    database: process.env.POSTGRESQL_DATABASE_NAME,
    host: process.env.POSTGRESQL_DATABASE_HOST,
    username: process.env.POSTGRESQL_DATABASE_USER,
    password: process.env.POSTGRESQL_DATABASE_PASS,
    dialect: "postgres",
    options:{}
  };

module.exports = {

  database,
  config:database==="POSTGRESQL"?postgresqlConfig:mongodbConfig
    
};