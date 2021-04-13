function event(request,response){

    const body = request.body;

	if (body.object === "page") {

		body.entry.forEach((entry) => {
			let webhook_event = entry.messaging[0];
			console.log(webhook_event);
		});
		response.status(200).send("EVENT_RECEIVED");

	} else {

		response.sendStatus(404);

	}

}

function verification(request,response) {

    // Your verify token. Should be a random string.
	let VERIFY_TOKEN = "7CB01D7F515916C707E9F734AD3149CA9A308CD547978F258CBC26CAAF941FF8";

	// Parse the query params
	let mode = request.query["hub.mode"];
	let token = request.query["hub.verify_token"];
	let challenge = request.query["hub.challenge"];

	// Checks if a token and mode is in the query string of the request
	if (mode && token) {
		// Checks the mode and token sent is correct
		if (mode === "subscribe" && token === VERIFY_TOKEN) {
			// Responds with the challenge token from the request
			console.log("WEBHOOK_VERIFIED");
			response.status(200).send(challenge);
		} else {
			// Responds with '403 Forbidden' if verify tokens do not match
			response.sendStatus(403);
		}
	}

}

module.exports = {
    event,
    verification
};