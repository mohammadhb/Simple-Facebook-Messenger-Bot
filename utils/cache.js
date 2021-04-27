const {
  temporary: { manager },
} = require("../databases");

function retriveCache(id) {
  const cacher = manager.getClient("cacher");
  return cacher.getAsync(id);
}

function updateCache(id, data) {
  const cacher = manager.getClient("cacher");
  return cacher.setAsync(id, JSON.stringify(data));
}

function deleteCache(id) {
  const cacher = manager.getClient("cacher");
  return cacher.delAsync(id);
}

async function getAllCacheKeysByPattern(patten) {
  const cacher = manager.getClient("cacher");
  return cacher.sendCommandAsync("KEYS",[patten]);

}

function normalizeCache(data) {
  return JSON.parse(data);
}

module.exports = {
  updateCache,
  retriveCache,
  deleteCache,
  getAllCacheKeysByPattern,
  normalizeCache,
};
