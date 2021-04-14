/* eslint-env jest */

const {sendMessageWithSeenAndTyping} = require("../requests/index");

const supertest = require("supertest");
const {router} = require("../router");

const mongoose = require("mongoose");
const {Cacher} = require("../database");

afterAll(async ()=>{
  const redis = await Cacher();
  await redis.closeConnection(true);
  await mongoose.connection.close();
});

jest.mock("../requests/index");

it("should ask for the 'First Name' on first message", async () => {
  await supertest(router)
    .post("/conversations")
    .send({
      object: "page",
      entry: [
        {
          messaging: [
            {
              recipient: {
                id: "recipient",
              },
              sender: {
                id: "sender",
              },
              message: {
                text: "Hi",
              },
            },
          ],
        },
      ],
    })
    .expect(200)
    .expect(() => {

      expect(sendMessageWithSeenAndTyping.mock.calls.length).toBe(2);
  
      expect(sendMessageWithSeenAndTyping.mock.calls[0][0]).toBe("sender");
      expect(sendMessageWithSeenAndTyping.mock.calls[0][1]).toBe("Hi, this is your first time with me!");
  
      expect(sendMessageWithSeenAndTyping.mock.calls[1][0]).toBe("sender");
      expect(sendMessageWithSeenAndTyping.mock.calls[1][1]).toBe("What's your name?");

    });
});

it("should ask for the 'Birthday' on sending 'First Name'", async () => {
  await supertest(router)
    .post("/conversations")
    .send({
      object: "page",
      entry: [
        {
          messaging: [
            {
              recipient: {
                id: "recipient",
              },
              sender: {
                id: "sender",
              },
              message: {
                text: "Name",
              },
            },
          ],
        },
      ],
    })
    .expect(200)
    .expect(() => {
      expect(sendMessageWithSeenAndTyping.mock.calls.length).toBe(1);
  
      expect(sendMessageWithSeenAndTyping.mock.calls[0][0]).toBe("sender");
      expect(sendMessageWithSeenAndTyping.mock.calls[0][1]).toBe("Name, What's your birthday date?");

    });
});

function calculateDayDifferenceFrom(date) {
  const result = Math.ceil((new Date(date) - new Date()) / 1000 / 3600 / 24) % 365;
  if (result < 0) return result + 365;
  return result;
}

it("should ask for the 'Days' till 'Birthday' on responding 'Birthday' date", async () => {
  await supertest(router)
    .post("/conversations")
    .send({
      object: "page",
      entry: [
        {
          messaging: [
            {
              recipient: {
                id: "recipient",
              },
              sender: {
                id: "sender",
              },
              message: {
                text: "1995-12-25",
              },
            },
          ],
        },
      ],
    })
    .expect(200)
    .expect(() => {
      expect(sendMessageWithSeenAndTyping.mock.calls.length).toBe(1);
  
      expect(sendMessageWithSeenAndTyping.mock.calls[0][0]).toBe("sender");
      expect(sendMessageWithSeenAndTyping.mock.calls[0][1]).toBe("Name, Do you want to know how many days are till your birthday ?");

    });
});

it("should tell you the 'Days' till 'Birthday' on responding 'Yes'", async () => {
  await supertest(router)
    .post("/conversations")
    .send({
      object: "page",
      entry: [
        {
          messaging: [
            {
              recipient: {
                id: "recipient",
              },
              sender: {
                id: "sender",
              },
              message: {
                text: "yes",
              },
            },
          ],
        },
      ],
    })
    .expect(200)
    .expect(() => {
      expect(sendMessageWithSeenAndTyping.mock.calls.length).toBe(1);
  
      expect(sendMessageWithSeenAndTyping.mock.calls[0][0]).toBe("sender");
      expect(sendMessageWithSeenAndTyping.mock.calls[0][1]).toBe(`There are ${calculateDayDifferenceFrom("1995-12-25")} days left until your next birthday.`);
      
    });
});