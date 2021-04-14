const { User } = require("../../database/mongodb").Models;
const { sendMessageWithSeenAndTyping } = require("../../requests");
const cacheUtil = require("../../utils/cache");

async function register(user, message, routes) {
  try {
    const userCache = await cacheUtil.getUserFromCache(user.id);

    await sendMessageWithSeenAndTyping(user.id, "Hi, this is your first time with me!");
    await sendMessageWithSeenAndTyping(user.id, "What's your name?");
    userCache.status = routes.next;
  } catch (error) {
    // console.error(error);
  }
}

async function getFirstName(user, message, routes) {
  try {
    const userCache = await cacheUtil.getUserFromCache(user.id);
    if (message) {
      await new User().updateById(user.id, { firstname: message });
      await sendMessageWithSeenAndTyping(user.id, `${message}, What's your birthday date?`);
      userCache.firstname = message;
      userCache.status = routes.next;
    } else {
      //On error
      await sendMessageWithSeenAndTyping(user.id, "That's not correct!");
      userCache.status = routes.previous;
    }
  } catch (error) {
    console.error(error);
  }
}

async function getBirthday(user, message, routes) {
  try {
    const userCache = await cacheUtil.getUserFromCache(user.id);
    if (message) {
      await new User().updateById(user.id, { birthdate: message });
      await sendMessageWithSeenAndTyping(
        user.id,
        `${userCache.user.firstname}, Do you want to know how many days are till your birthday ?`,
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
      userCache.birthdate = message;
      userCache.status = routes.next;
    } else {
      //On error
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

async function getAnswerForDaysTillBirthday(user, message, routes) {
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
    const userCache = await cacheUtil.getUserFromCache(user.id);
    if (message) {
      const reply = possibleReplies.find((reply) => reply.key == message.toLowerCase());
      if (reply) {
        
        if(reply.value){
          await sendMessageWithSeenAndTyping(
            user.id,
            `There are ${calculateDayDifferenceFrom(
              userCache.user.birthday
            )} days left until your next birthday.`
          );
          userCache.status = routes.next;
        }else {
          await sendMessageWithSeenAndTyping(
            user.id,
            "👋 Goodbye"
          );
          userCache.status = routes.next;
        }

      } else {
        await sendMessageWithSeenAndTyping(
          user.id,
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
    console.error(error);
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
