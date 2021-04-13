module.exports = {
  development: {
    url: process.env.MONGODB_DEV_DATABASE_URL,
    database: process.env.MONGODB_DEV_DATABASE_NAME,
    host: process.env.MONGODB_DEV_DATABASE_HOST,
    username: process.env.MONGODB_DEV_DATABASE_USER,
    password: process.env.MONGODB_DEV_DATABASE_PASS,
    dialect: "mongodb",
  },
  test: {
    url: process.env.MONGODB_TEST_DATABASE_URL,
    database: process.env.MONGODB_TEST_DATABASE_NAME,
    host: process.env.MONGODB_TEST_DATABASE_HOST,
    username: process.env.MONGODB_TEST_DATABASE_USER,
    password: process.env.MONGODB_TEST_DATABASE_PASS,
    dialect: "mongodb",
  },
  production: {
    url: process.env.MONGODB_PROD_DATABASE_URL,
    database: process.env.MONGODB_PROD_DATABASE_NAME,
    host: process.env.MONGODB_PROD_DATABASE_HOST,
    username: process.env.MONGODB_PROD_DATABASE_USER,
    password: process.env.MONGODB_PROD_DATABASE_PASS,
    dialect: "mongodb",
  }
};