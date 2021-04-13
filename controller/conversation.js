/*
    A Preset Webhook for Bot to be fetch messages
*/
const {Message,User} = require("../database/mongodb/index").Models;
const cacheUtil = require("../utils/cache");
const mainService = require("../services/index");

async function event(request,response){

  const body = request.body;

  if (body.object === "page") {

    for (let entry of body.entry){

      const event = entry.messaging[0];
      console.log(event);
            

      //Save any incoming messages
      new Message({
        recipientId:event.recipient.id,
        senderId:event.sender.id,
        messageId:event.message.mid,
        message:event.message.text,
        timestamp:event.timestamp
      }).save();

      console.log(event);

      let userCache = await cacheUtil.getUserFromCache(event.sender.id),
        user;

                

      if(userCache.user){
        // console.log(userCache.user);
        // console.log(userCache.status);
        user = userCache;
      }else {
        user = await new User().getById(event.sender.id);
        if(!user){
          user = await new User({
            id:event.sender.id
          }).save();
        }
        userCache.user = user;
      }

      //Sending User to Main Service
            
      await mainService(user,event.message.text);

      response.status(200).send("EVENT_RECEIVED");

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
  let VERIFY_TOKEN = "7CB01D7F515916C707E9F734AD3149CA9A308CD547978F258CBC26CAAF941FF8";

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