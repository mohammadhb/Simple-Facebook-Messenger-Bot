const {
  cache: { retriveCache, normalizeCache }
} = require("../utils");

function cacheMany(id) {
  return async function cacheManyMiddleware(request, response, next) {
    const { page = 1, limit = 10 } = request.query;
    request.cacheId = `${id}/${page}/${limit}`;

    const cached = normalizeCache(await retriveCache(request.cacheId));
    if (cached) return response.json({ ...cached, errors: [] });

    return next();
  };
}

function cacheOne(id) {
  return async function cacheOneMiddleware(request, response, next) {
    request.cacheId = `${id}/${request.params.id}`;

    const cached = normalizeCache(await retriveCache(request.cacheId));
    if (cached) return response.json({ ...cached, errors: [] });

    return next();
  };
}

function cachePurge(id) {
  return async function cachePurgeMiddleware(request, response, next) {
    request.cacheId = `${id}/${request.params.id}`;
    request.cacheKey = id;

    return next();
  };
}

module.exports = {
  cacheMany,
  cacheOne,
  cachePurge
};
