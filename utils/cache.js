const {redis} = require("../databases");

function retriveCache(id){

  const cacher = redis.manager.getClients().cacher;
  return cacher.getAsync(id);

}

function updateCache(id,data){

  const cacher = redis.manager.getClients().cacher;
  return cacher.setAsync(id,JSON.stringify(data));

}

function normalizeCache(data){
  return JSON.parse(data);
}

module.exports = {
  updateCache,
  retriveCache,
  normalizeCache
};