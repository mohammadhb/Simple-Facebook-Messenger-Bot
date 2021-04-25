const {
  cache: { retriveCache, normalizeCache },
} = require("../utils/index");

function cacheMany(id) {
  return async function cacheManyMiddleware(request, response, next) {

    const { page = 1, limit = 10 } = request.query;
    request.cacheId = `${id}/${page}/${limit}`;

    const cached = normalizeCache(await retriveCache(request.cacheId));
    if (cached) return response.json(cached);

    return next();
    
  };
}

function cacheOne(id) {
  return async function cacheOneMiddleware(request, response, next) {

    request.cacheId = `${id}/${request.params.id}`;

    const cached = normalizeCache(await retriveCache(request.cacheId));
    if (cached) return response.json(cached);

    return next();
    
  };
}

module.exports = {
  cacheMany,
  cacheOne,
};
