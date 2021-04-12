const router = require("express")();

// Creates the endpoint for our webhook
router.post("/", (req, res) => {
	const body = req.body;

	if (body.object === "page") {

		body.entry.forEach((entry) => {
			let webhook_event = entry.messaging[0];
			console.log(webhook_event);
		});
		res.status(200).send("EVENT_RECEIVED");

	} else {

		res.sendStatus(404);

	}
});

router.get("/", (req, res) => {
	// Your verify token. Should be a random string.
	let VERIFY_TOKEN = "7CB01D7F515916C707E9F734AD3149CA9A308CD547978F258CBC26CAAF941FF8";

	// Parse the query params
	let mode = req.query["hub.mode"];
	let token = req.query["hub.verify_token"];
	let challenge = req.query["hub.challenge"];

	// Checks if a token and mode is in the query string of the request
	if (mode && token) {
		// Checks the mode and token sent is correct
		if (mode === "subscribe" && token === VERIFY_TOKEN) {
			// Responds with the challenge token from the request
			console.log("WEBHOOK_VERIFIED");
			res.status(200).send(challenge);
		} else {
			// Responds with '403 Forbidden' if verify tokens do not match
			res.sendStatus(403);
		}
	}
});

module.exports = router;
