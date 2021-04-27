const { User } = require("../../repository");
const {
  messenger: { sendMessageWithSeenAndTyping },
} = require("../../requests");

// Because i wanted to respect the same pattern on Calling Services
// eslint-disable-next-line no-unused-vars
async function register(user, message, quick_response, routes, returnToManager) {
  try {
    await new User(user).updateState(routes.next);
    await sendMessageWithSeenAndTyping(user.sender_id, "Hi, this is your first time with me!");
    await sendMessageWithSeenAndTyping(user.sender_id, "What's your name?");
  } catch (error) {
    console.error(error);
  }
}

// Because i wanted to respect the same pattern on Calling Services
// eslint-disable-next-line no-unused-vars
async function getFirstName(user, message, quick_response, routes, returnToManager) {
  try {
    if (message) {
      await new User(user).updateState(routes.next);
      await new User(user).updateFirstname(message);
      await sendMessageWithSeenAndTyping(user.sender_id, `${message}, What's your birthday date?`);
    } else {
      //On error
      await sendMessageWithSeenAndTyping(user.sender_id, "That's not correct!");
    }
  } catch (error) {
    console.error(error.response);
  }
}

// Because i wanted to respect the same pattern on Calling Services
// eslint-disable-next-line no-unused-vars
async function getBirthday(user, message, quick_response, routes, returnToManager) {
  try {
    if (message && /([0-9]){4}(-)([0-9]){2}(-)([0-9]){2}/.test(message)) {
      await new User(user).updateState(routes.next);
      await new User(user).updateBirthdate(message);
      await sendMessageWithSeenAndTyping(
        user.sender_id,
        `${user.firstname}, Do you want to know how many days are till your birthday ?`,
        [
          {
            key: "Nope",
            value: 0,
          },
          {
            key: "Yeah",
            value: 1,
          },
        ]
      );
    } else {
      await sendMessageWithSeenAndTyping(
        user.sender_id,
        "That's not correct! Please Send me birthday in \"yyyy-mm-dd\" format"
      );
    }
  } catch (error) {
    console.error(error);
  }
}

function calculateDayDifferenceFrom(date) {
  const result = Math.ceil((new Date(date) - new Date()) / 1000 / 3600 / 24) % 365;
  if (result < 0) return result + 365;
  return result;
}

async function getAnswerForDaysTillBirthday(user, message, quick_response, routes, returnToManager) {
  const possibleReplies = [
    {
      key: "yeah",
      value: true,
    },
    {
      key: "yes",
      value: true,
    },
    {
      key: "yup",
      value: true,
    },
    {
      key: "no",
      value: false,
    },
    {
      key: "nope",
      value: false,
    },
    {
      key: "nah",
      value: false,
    },
  ];

  try {
    if (message) {
      const reply = possibleReplies.find((reply) => reply.key == message.toLowerCase());
      if (reply) {
        if (reply.value) {
          await sendMessageWithSeenAndTyping(
            user.sender_id,
            `There are ${calculateDayDifferenceFrom(user.birthdate)} days left until your next birthday.`
          );
        } else {
          await sendMessageWithSeenAndTyping(user.sender_id, "👋 Goodbye");
        }
        await new User(user).updateState(routes.next);

        await sendMessageWithSeenAndTyping(user.sender_id, "Ok, You are now registred in our system.");
        user.state = routes.next;
        returnToManager(user, message);
      } else {
        await sendMessageWithSeenAndTyping(
          user.sender_id,
          "Sorry I didn't quite get that! Please answer with yes or no.",
          [
            {
              key: "Nope",
              value: 0,
            },
            {
              key: "Yeah",
              value: 1,
            },
          ]
        );
      }
    } else {
      //On error
    }
  } catch (error) {
    console.error(error.response.data);
  }
}

module.exports = [
  {
    title: "Register",
    route: "/user/register",
    routes: {
      next: "/user/register/getFirstName",
      previous: "/user/register",
    },
    service: register,
    hidden: true,
  },
  {
    title: "Get First Name",
    route: "/user/register/getFirstName",
    routes: {
      next: "/user/register/getBirthday",
      previous: "",
    },
    service: getFirstName,
    hidden: true,
  },
  {
    title: "Get Birthday",
    route: "/user/register/getBirthday",
    routes: {
      next: "/user/register/getAnswerForDaysTillBirthday",
      previous: "user/register/getFirstName",
    },
    service: getBirthday,
    hidden: true,
  },
  {
    title: "Get Answer for Days till Birthday",
    route: "/user/register/getAnswerForDaysTillBirthday",
    routes: {
      next: "",
      previous: "user/register/getBirthday",
    },
    service: getAnswerForDaysTillBirthday,
    hidden: true,
  },
];