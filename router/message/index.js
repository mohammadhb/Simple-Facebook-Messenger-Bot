const router = require("express")();
const {getAllMessages,getMessage,deleteMessage} = require("../../controller/message");

router.get("/", (request, response) => getAllMessages(request,response));
router.get("/:id", (request, response) => getMessage(request,response));
router.delete("/:id", (request, response) => deleteMessage(request,response));

module.exports = router;
