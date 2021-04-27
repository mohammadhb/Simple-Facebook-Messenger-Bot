const router = require("express")();
const {getAllMessages,getMessage,deleteMessage} = require("../../controller/message");
const {CACHE_KEYS} = require("../../constants");
const { cacheMany, cacheOne, cachePurge } = require("../../middlewares/cache");

router.get("/", cacheMany(CACHE_KEYS.MESSAGE), getAllMessages);
router.get("/:id", cacheOne(CACHE_KEYS.MESSAGE), getMessage);
router.delete("/:id",cachePurge(CACHE_KEYS.MESSAGE), deleteMessage);

module.exports = router;
