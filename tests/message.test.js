/* eslint-env jest */

const { Message } = require("../database/mongodb/index").Models;

const supertest = require("supertest");
const { router } = require("../router");

const mongoose = require("mongoose");
const { Cacher } = require("../database");

afterAll(async () => {
  const redis = await Cacher();
  await redis.closeConnection(true);
  await mongoose.connection.close();
});

jest.mock("../requests/index");

it("should give a array of messages", async () => {
  await supertest(router)
    .get("/messages")
    .expect(200)
    .expect((res) => {

      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.errors).toBeInstanceOf(Array);

      res.body.data.forEach((message) => {
        expect(message).toHaveProperty("message");
        expect(message).toHaveProperty("messageId");
        expect(message).toHaveProperty("senderId");
        expect(message).toHaveProperty("recipientId");
        expect(message).toHaveProperty("timestamp");
        expect(message).toHaveProperty("_id");
      });

    });
});

it("should give a specific message", async () => {

  let message = await new Message({
    recipientId:"message.recipientId",
    senderId:"message.senderId",
    messageId:"message.messageId",
    message:"message.text",
    timestamp:"1995"
  }).save();

  message = message.toJSON();
  // console.log(message,`/message/${message._id}`)

  await supertest(router)
    .get(`/messages/${message._id}`)
    .expect(200)
    .expect((res) => {

      expect(res.body.data).toBeInstanceOf(Object);
      expect(res.body.errors).toBeInstanceOf(Array);

      expect(message).toHaveProperty("message","message.text");
      expect(message).toHaveProperty("messageId","message.messageId");
      expect(message).toHaveProperty("senderId","message.senderId");
      expect(message).toHaveProperty("recipientId","message.recipientId");

      new Message().deleteOne({_id:message._id});

    });
});

it("should give a specific message", async () => {

  let message = await new Message({
    recipientId:"message.recipientId",
    senderId:"message.senderId",
    messageId:"message.messageId",
    message:"message.text",
    timestamp:"1995"
  }).save();

  message = message.toJSON();

  await supertest(router)
    .delete(`/messages/${message._id}`)
    .expect(200)
    .expect((res) => {

      expect(res.body.data).toBeInstanceOf(Object);
      expect(res.body.errors).toBeInstanceOf(Array);

      expect(res.body.data).toHaveProperty("deletedCount",1);

    });
});