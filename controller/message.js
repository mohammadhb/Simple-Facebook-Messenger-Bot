const {Message,User} = require('../database/mongodb/index').Models;

/*
    Gets all the messages that sent along the bot
*/
async function getAllMessages(request,response){

    const messages = await new Message().getAll();
    return response.status(200).json({
        data:messages,
        errors:[]
    });

}

/*
    Gets specific Message
*/
async function getMessage(request,response) {
    
    const id = request.params.id;
    const message = await Message.getById(id);
    return response.status(200).json({
        data:message,
        errors:[]
    });

}

/*
    Deletes specific Message
*/
async function deleteMessage(request,response) {
    
    const id = request.params.id;
    const message = await Message.softDeleteById(id);
    return response.status(200).json({
        data:message,
        errors:[]
    });

}

module.exports = {
    getAllMessages,
    getMessage,
    deleteMessage
};