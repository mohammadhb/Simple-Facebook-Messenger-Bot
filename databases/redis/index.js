let redis = require("redis");

const bluebird = require("bluebird");
bluebird.promisifyAll(redis);

let clients = {};

function connectDatabase({database,username,host,port,password,options},onError,onOpen){

  if(clients[database]) return;

  clients[database] = redis.createClient({
    user:username,
    password:password,
    host:host,
    port:port,
    db:Object.keys(clients).length,
    ...options
  });

  clients[database].on("error", onError);
  clients[database].on("connect", onOpen);
  
}

async function disconnectDatabase(){

  for ( const client of Object.values(clients)){
    await client.sendCommand("FLUSHALL");
    await client.end(true);
  }
  
}

function getClients(database){
  return clients[database];
}

module.exports = {
  connectDatabase,
  disconnectDatabase,
  getClients
};
