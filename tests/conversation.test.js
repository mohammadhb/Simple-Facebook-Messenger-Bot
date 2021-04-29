/* eslint-env jest */

const {
  messenger: { sendMessageWithSeenAndTyping }
} = require("../requests");

const supertest = require("supertest");
const { router } = require("../router");

const { temporary, persistant } = require("../databases");
const { User } = require("../repository");

const {
  calculator: { calculateDayDifferenceFromNow }
} = require("../utils/index");

beforeAll(async () => {
  await temporary.start();
  await persistant.start();
});

afterAll(async () => {
  new User().deleteBySenderId("sender");
  await temporary.stop();
  await persistant.stop();
});

jest.mock("../requests");

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
                id: "recipient"
              },
              sender: {
                id: "sender"
              },
              message: {
                text: "Hi"
              }
            }
          ]
        }
      ]
    })
    .expect(200)
    .expect(() => {
      expect(sendMessageWithSeenAndTyping.mock.calls.length).toBe(2);

      expect(sendMessageWithSeenAndTyping.mock.calls[0][0]).toBe("sender");
      expect(sendMessageWithSeenAndTyping.mock.calls[0][1]).toBe(
        "Hi, this is your first time with me!"
      );

      expect(sendMessageWithSeenAndTyping.mock.calls[1][0]).toBe("sender");
      expect(sendMessageWithSeenAndTyping.mock.calls[1][1]).toBe(
        "What's your name?"
      );
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
                id: "recipient"
              },
              sender: {
                id: "sender"
              },
              message: {
                text: "Name"
              }
            }
          ]
        }
      ]
    })
    .expect(200)
    .expect(() => {
      expect(sendMessageWithSeenAndTyping.mock.calls.length).toBe(1);

      expect(sendMessageWithSeenAndTyping.mock.calls[0][0]).toBe("sender");
      expect(sendMessageWithSeenAndTyping.mock.calls[0][1]).toBe(
        "Name, What's your birthday date?"
      );
    });
});

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
                id: "recipient"
              },
              sender: {
                id: "sender"
              },
              message: {
                text: "1995-12-25"
              }
            }
          ]
        }
      ]
    })
    .expect(200)
    .expect(() => {
      expect(sendMessageWithSeenAndTyping.mock.calls.length).toBe(1);

      expect(sendMessageWithSeenAndTyping.mock.calls[0][0]).toBe("sender");
      expect(sendMessageWithSeenAndTyping.mock.calls[0][1]).toBe(
        "Name, Do you want to know how many days are till your birthday ?"
      );
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
                id: "recipient"
              },
              sender: {
                id: "sender"
              },
              message: {
                text: "yes"
              }
            }
          ]
        }
      ]
    })
    .expect(200)
    .expect(() => {
      expect(sendMessageWithSeenAndTyping.mock.calls.length).toBe(3);

      expect(sendMessageWithSeenAndTyping.mock.calls[0][0]).toBe("sender");
      expect(sendMessageWithSeenAndTyping.mock.calls[0][1]).toBe(
        `There are ${calculateDayDifferenceFromNow(
          "1995-12-25"
        )} days left until your next birthday.`
      );

      expect(sendMessageWithSeenAndTyping.mock.calls[1][0]).toBe("sender");
      expect(sendMessageWithSeenAndTyping.mock.calls[1][1]).toBe(
        "Ok, You are now registred in our system."
      );

      expect(sendMessageWithSeenAndTyping.mock.calls[2][0]).toBe("sender");
      expect(sendMessageWithSeenAndTyping.mock.calls[2][1]).toBe(
        "Name, What else i can do for you?"
      );
    });
});

//Weather
it("should ask for your city", async () => {
  await supertest(router)
    .post("/conversations")
    .send({
      object: "page",
      entry: [
        {
          messaging: [
            {
              recipient: {
                id: "recipient"
              },
              sender: {
                id: "sender"
              },
              message: {
                text: "☀️ How's the Weather?",
                quick_reply: {
                  payload: "/weather/askCity"
                }
              }
            }
          ]
        }
      ]
    })
    .expect(200)
    .expect(() => {
      expect(sendMessageWithSeenAndTyping.mock.calls.length).toBe(1);

      expect(sendMessageWithSeenAndTyping.mock.calls[0][0]).toBe("sender");
      expect(sendMessageWithSeenAndTyping.mock.calls[0][1]).toBe(
        "Where do you live?"
      );
    });
});

it("should gave you a list of cities", async () => {
  await supertest(router)
    .post("/conversations")
    .send({
      object: "page",
      entry: [
        {
          messaging: [
            {
              recipient: {
                id: "recipient"
              },
              sender: {
                id: "sender"
              },
              message: {
                text: "Tehran"
              }
            }
          ]
        }
      ]
    })
    .expect(() => {
      expect(sendMessageWithSeenAndTyping.mock.calls.length).toBe(2);

      expect(sendMessageWithSeenAndTyping.mock.calls[0][0]).toBe("sender");
      expect(sendMessageWithSeenAndTyping.mock.calls[0][1]).toBe(
        "Let me search about your city \"Tehran\" ..."
      );

      expect(sendMessageWithSeenAndTyping.mock.calls[1][0]).toBe("sender");
      expect(sendMessageWithSeenAndTyping.mock.calls[1][1]).toBe(
        "Witch one is your city ?"
      );
      expect(sendMessageWithSeenAndTyping.mock.calls[1][2]).toBeInstanceOf(
        Array
      );
      expect(sendMessageWithSeenAndTyping.mock.calls[1][2][0]).toBeInstanceOf(
        Object
      );
      expect(sendMessageWithSeenAndTyping.mock.calls[1][2][0]).toHaveProperty(
        "key",
        "Tehran"
      );
      expect(sendMessageWithSeenAndTyping.mock.calls[1][2][0]).toHaveProperty(
        "value",
        "Tehran"
      );
    });
});
