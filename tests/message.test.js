/* eslint-env jest */

const supertest = require("supertest");
const { router } = require("../router");

const { temporary, persistant } = require("../databases");
const { Message } = require("../repository");

beforeAll(async () => {
  await temporary.start();
  await persistant.start();
});

afterAll(async () => {
  await temporary.stop();
  await persistant.stop();
});

jest.mock("../requests");

it("should give a array of messages", async () => {
  await supertest(router)
    .get("/messages")
    .expect(200)
    .expect(res => {
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.errors).toBeInstanceOf(Array);

      res.body.data.forEach(message => {
        expect(message).toHaveProperty("message");
        expect(message).toHaveProperty("messageId");
        expect(message).toHaveProperty("senderId");
        expect(message).toHaveProperty("recipientId");
        expect(message).toHaveProperty("timestamp");

        if (new Message().isMongoDB) {
          expect(message).toHaveProperty("_id");
        } else {
          expect(message).toHaveProperty("id");
        }
      });
    });
});

it("should give a specific message", async () => {
  let message = await new Message({
    recipientId: "message.recipientId",
    senderId: "message.senderId",
    messageId: "message.messageId",
    message: "message.text",
    timestamp: "1995"
  }).create();
  let messageId;

  if (message.isMongoDB) {
    message = message.toJSON();
    messageId = message._id;
  } else {
    messageId = message.id;
  }

  await supertest(router)
    .get(`/messages/${messageId}`)
    .expect(200)
    .expect(res => {
      expect(res.body.data).toBeInstanceOf(Object);
      expect(res.body.errors).toBeInstanceOf(Array);

      expect(message).toHaveProperty("message", "message.text");
      expect(message).toHaveProperty("messageId", "message.messageId");
      expect(message).toHaveProperty("senderId", "message.senderId");
      expect(message).toHaveProperty("recipientId", "message.recipientId");

      new Message().deleteById(messageId);
    });
});

it("should confirm deleting a specific message", async () => {
  let message = await new Message({
      recipientId: "message.recipientId",
      senderId: "message.senderId",
      messageId: "message.messageId",
      message: "message.text",
      timestamp: "1995"
    }).create(),
    messageId;

  if (message.isMongoDB) {
    message = message.toJSON();
    messageId = message._id;
  } else {
    messageId = message.id;
  }

  await supertest(router)
    .delete(`/messages/${messageId}`)
    .expect(200)
    .expect(res => {
      expect(res.body.data).toBeNull();
      expect(res.body.errors).toBeInstanceOf(Array);
    });
});
