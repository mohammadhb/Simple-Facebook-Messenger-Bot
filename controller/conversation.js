const { Message, User } = require("../repository");
const mainService = require("../services");
const {
  bot: { verification_token }
} = require("../config");

const {
  HTTP_CODES
} = require("../constants");

/*
    A Preset Webhook for Bot to be fetch messages
*/
async function event(request, response) {
  const body = request.body;

  if (body.object === "page") {
    for (let entry of body.entry) {
      const event = entry.messaging[0];

      //Save any incoming messages
      await new Message({
        recipientId: event.recipient.id,
        senderId: event.sender.id,
        messageId: event.message.mid,
        message: event.message.text,
        timestamp: event.timestamp
      }).create();

      let user = await new User().getBySenderId(event.sender.id);
      if (!user) {
        user = await new User({
          sender_id: event.sender.id
        }).create();
      }

      //Sending User to Main Service
      await mainService(
        user,
        event.message.text,
        event.message.quick_reply ? event.message.quick_reply.payload : null
      );

      return response.status(HTTP_CODES.HTTP_OK).send("EVENT_RECEIVED");
    }
  } else {
    return response.sendStatus(HTTP_CODES.HTTP_NOT_FOUND);
  }
}

/*
    A Preset Webhook for Bot to be verified
*/
function verification(request, response) {
  let mode = request.query["hub.mode"];
  let token = request.query["hub.verify_token"];
  let challenge = request.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === verification_token) {
      response.status(HTTP_CODES.HTTP_OK).send(challenge);
    } else {
      response.sendStatus(HTTP_CODES.HTTP_FORBIDDEN);
    }
  }
}

module.exports = {
  event,
  verification
};
