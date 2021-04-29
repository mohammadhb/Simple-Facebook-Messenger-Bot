const router = require("express")();
const { event, verification } = require("../../controller/conversation");

router.post("/", event);
router.get("/", verification);

module.exports = router;
