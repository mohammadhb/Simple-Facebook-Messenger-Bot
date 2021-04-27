const { Message } = require("../repository");
const {
  cache: { updateCache,deleteCache,getAllCacheKeysByPattern },
} = require("../utils/index");

/**
 * @swagger
 *
 * /messages:
 *   get:
 *     tags:
 *       - Message
 *     description: Gets all the messages that sent along the bot
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Got all the messages successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         description: The message
 *                         example: Example Message
 *                       messageId:
 *                         type: string
 *                         description: Facebook Messenger message ID
 *                         example: m_EKooS0f-M6Efn9OIvhHXyWuR0_qR6ObtxMuiXWeWdkjS29AjPjU9Mos4UCmYyqF5IWpuVFPnB4GvTHB-shFO3A
 *                       recipientId:
 *                         type: string
 *                         description: Message recipient ID
 *                         example: 100492362178594
 *                       senderId:
 *                         type: string
 *                         description: Message sender ID
 *                         example: 3805403212840161
 *                       timestamp:
 *                         type: date
 *                         description: Message sent date
 *                         example: 2021-04-13T10:40:31.150Z
 *                       _id:
 *                         type: string
 *                         description: Message local ID
 *                         example: 6075751f50fb431d35fdb599
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         description: Error message.
 *                         example: Not Found
 *                       description:
 *                         type: string
 *                         description: Error description.
 *                         example: No item has found because no message has been sent along
 */

//Gets all the messages that sent along the bot
async function getAllMessages(request, response) {

  let {page=1,limit=10} = request.query;
  page=parseInt(page);
  limit=parseInt(limit);

  const messages = await new Message().getAllPaginated(),
    countAllMessages = await new Message().countAll();

  const data = {
    data:messages,
    meta:{
      count:countAllMessages,
      pages:Math.ceil(countAllMessages/limit),
      page,
      limit
    }
  };

  response.status(200).json({
    ...data,
    errors: [],
  });

  try {
    await updateCache(request.cacheId, data);
  } catch (error) {
    console.error(error);
  }

}

/**
 * @swagger
 *
 * /messages/{message_id}:
 *   get:
 *     tags:
 *       - Message
 *     description: Gets specific message that sent along the bot
 *     parameters:
 *       - $ref: "#/parameters/message_id"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Got the message successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: The message
 *                       example: Example Message
 *                     messageId:
 *                       type: string
 *                       description: Facebook Messenger message ID
 *                       example: m_EKooS0f-M6Efn9OIvhHXyWuR0_qR6ObtxMuiXWeWdkjS29AjPjU9Mos4UCmYyqF5IWpuVFPnB4GvTHB-shFO3A
 *                     recipientId:
 *                       type: string
 *                       description: Message recipient ID
 *                       example: 100492362178594
 *                     senderId:
 *                       type: string
 *                       description: Message sender ID
 *                       example: 3805403212840161
 *                     timestamp:
 *                       type: date
 *                       description: Message sent date
 *                       example: 2021-04-13T10:40:31.150Z
 *                     _id:
 *                       type: string
 *                       description: Message local ID
 *                       example: 6075751f50fb431d35fdb599
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         description: Error message.
 *                         example: Not Found
 *                       description:
 *                         type: string
 *                         description: Error description.
 *                         example: No item has found because no message has been sent along
 */

//Gets specific Message
async function getMessage(request, response) {

  const id = request.params.id;
  const message = await new Message().getById(id);

  const data = {
    data:message
  };

  response.status(200).json({
    ...data,
    errors: [],
  });

  try {
    await updateCache(request.cacheId, data);
  } catch (error) {
    console.error(error);
  }

}

/**
 * @swagger
 *
 * /messages/{message_id}:
 *   delete:
 *     tags:
 *       - Message
 *     description: Deletes specific message that sent along the bot
 *     parameters:
 *       - $ref: "#/parameters/message_id"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Deleted the message successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: The message
 *                       example: Example Message
 *                     messageId:
 *                       type: string
 *                       description: Facebook Messenger message ID
 *                       example: m_EKooS0f-M6Efn9OIvhHXyWuR0_qR6ObtxMuiXWeWdkjS29AjPjU9Mos4UCmYyqF5IWpuVFPnB4GvTHB-shFO3A
 *                     recipientId:
 *                       type: string
 *                       description: Message recipient ID
 *                       example: 100492362178594
 *                     senderId:
 *                       type: string
 *                       description: Message sender ID
 *                       example: 3805403212840161
 *                     timestamp:
 *                       type: date
 *                       description: Message sent date
 *                       example: 2021-04-13T10:40:31.150Z
 *                     _id:
 *                       type: string
 *                       description: Message local ID
 *                       example: 6075751f50fb431d35fdb599
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         description: Error message.
 *                         example: Not Found
 *                       description:
 *                         type: string
 *                         description: Error description.
 *                         example: No item has found because no message has been sent along
 */
//Deletes specific Message
async function deleteMessage(request, response) {
  const id = request.params.id;
  const message = await new Message().deleteById(id);
  response.status(200).json({
    data: message,
    errors: [],
  });

  try {
    await deleteCache(request.cacheId);
    const cacheKeys = await getAllCacheKeysByPattern(`${request.cacheKey}/*/*`);
    for ( const cacheKey of cacheKeys ){
      await deleteCache(cacheKey);
    }

  } catch (error) {
    // Error tracing (e.g. Sentry)
    console.error(error);
  }

}

module.exports = {
  getAllMessages,
  getMessage,
  deleteMessage,
};
