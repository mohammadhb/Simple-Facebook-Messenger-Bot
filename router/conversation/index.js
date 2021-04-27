const router = require("express")();
const { event, verification } = require("../../controller/conversation");

router.post("/", (request, response) => event(request, response));
router.get("/", (request, response) => verification(request, response));

module.exports = router;
