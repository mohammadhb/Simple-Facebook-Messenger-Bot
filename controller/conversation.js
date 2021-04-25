const {Message,User} = require("../repository");
const mainService = require("../services");

/*
    A Preset Webhook for Bot to be fetch messages
*/
async function event(request,response){

  const body = request.body;

  if (body.object === "page") {

    for (let entry of body.entry){

      const event = entry.messaging[0];
      response.status(200).send("EVENT_RECEIVED");

      //Save any incoming messages
      new Message({
        recipientId:event.recipient.id,
        senderId:event.sender.id,
        messageId:event.message.mid,
        message:event.message.text,
        timestamp:event.timestamp
      }).create();

      let user = await new User().getBySenderId(event.sender.id);
      if(!user){
        user = await new User({
          sender_id:event.sender.id
        }).create();
      }

      //Sending User to Main Service
      await mainService(user,event.message.text,event.message.quick_reply?event.message.quick_reply.payload:null);

    }
    
  } else {

    response.sendStatus(404);

  }

}

/*
    A Preset Webhook for Bot to be verified
*/
function verification(request,response) {

  // Your verify token. Should be a random string.
  const VERIFY_TOKEN = process.env.MESSENGER_BOT_VERIFICATION_TOKEN;

  let mode = request.query["hub.mode"];
  let token = request.query["hub.verify_token"];
  let challenge = request.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      response.status(200).send(challenge);
    } else {
      response.sendStatus(403);
    }
  }

}

module.exports = {
  event,
  verification
};