const {Cacher} = require("../database/index");

async function getUserFromCache(id){

  const cacher = await Cacher();

  let userCache = cacher.models.user;
  await userCache.setId(id);

  return userCache;

}

module.exports = {
  getUserFromCache
};