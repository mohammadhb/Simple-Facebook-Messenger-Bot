const redis = require("./redis/index.js");
const mongodb = require("./mongodb/index.js");
const postgresql = require("./postgresql/index.js");
const { database:{config,database} } = require("../config");

// Redis Connection Helpers
const startRedis = ()=>{
  redis.connectDatabase(config.temporary, console.error.bind(console, "connection error:"), () => {});
};
const stopRedis = ()=>{
  redis.disconnectDatabase();
};

// Mongo DB Connection Helpers
const startMongoDB = ()=>{
  mongodb.connectDatabase(config.persistant, console.error.bind(console, "connection error:"), () => {
    console.log("MongoDB is Connected.");
  });
};
const stopMongoDB = ()=>{
  mongodb.getConnection().close();
};

// Redis Connection Helpers
const startPostgresql = ()=>{
  postgresql.connectDatabase(config.persistant, (error)=>{
    console.log(error);
  }, () => {
    console.log("Postgreql is Connected.");
    postgresql.connectModels(postgresql.getClient());
    postgresql.getClient().sync();
  });
  
};
const stopPostgresql = ()=>{
  postgresql.getClient().close();
};

module.exports = {
  database,
  temporary:{
    start:startRedis,
    stop:stopRedis,
    manager:redis,
  },
  persistant:{
    start:database==="POSTGRESQL"?startPostgresql:startMongoDB,
    stop:database==="POSTGRESQL"?stopPostgresql:stopMongoDB,
    models:database==="POSTGRESQL"?postgresql.models:mongodb.models,
    manager:database==="POSTGRESQL"?postgresql:mongodb,
  }
};
