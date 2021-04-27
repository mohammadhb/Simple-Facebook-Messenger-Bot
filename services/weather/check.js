const { User } = require("../../repository");
const {
  messenger: { sendMessageWithSeenAndTyping },
  weather: { searchCities, getWeatherByCityId },
} = require("../../requests");

// Because i wanted to respect the same pattern on Calling Services
// eslint-disable-next-line no-unused-vars
async function askCity(user, message, quick_response, routes, returnToManager) {
  try {
    await sendMessageWithSeenAndTyping(user.sender_id, "Where do you live?");
    await new User(user).updateState(routes.next);
  } catch (error) {
    console.error(error);
  }
}

// Because i wanted to respect the same pattern on Calling Services
// eslint-disable-next-line no-unused-vars
async function queryCities(user, message, quick_response, routes, returnToManager) {
  try {
    if (message) {
      await sendMessageWithSeenAndTyping(user.sender_id, `Let me search about your city "${message}" ...`);
      const locations = (await searchCities(message)).data;
      if (locations.length) {
        await sendMessageWithSeenAndTyping(
          user.sender_id,
          "Witch one is your city ?",
          locations.map((location) => {
            return {
              key: location.name,
              value: location.name,
            };
          })
        );
        await new User(user).updateState(routes.next);
      } else {
        await sendMessageWithSeenAndTyping(
          user.sender_id,
          `There was no such city as "${message}". Please Try Again ...`
        );
      }
    } else {
      //On error
      await sendMessageWithSeenAndTyping(user.sender_id, "That's not correct!");
      await new User(user).updateState(routes.previous);
    }
  } catch (error) {
    console.error(error.response);
  }
}

async function getWeather(user, message, quick_response, routes, returnToManager) {
  if (message) {
    await sendMessageWithSeenAndTyping(user.sender_id, `Retriving "${message}" Weather ... Hang Tight ...`);
    const weather = (await getWeatherByCityId(quick_response)).data.current;
    await sendMessageWithSeenAndTyping(
      user.sender_id,
      `Looks like its ${weather.condition.text} with ${weather.temp_c}°C and ${weather.humidity}% Humidity`
    );
    await new User(user).updateState(routes.next);

    user.state = routes.next;
    returnToManager(user, message);
  } else {
    //On error
    await sendMessageWithSeenAndTyping(user.sender_id, "That's not correct!");
    await new User(user).updateState(routes.previous);
  }
}

module.exports = [
  {
    title: "☀️ How's the Weather?",
    route: "/weather/askCity",
    routes: {
      previous: "/weather/queryCities",
      next: "/weather/queryCities",
    },
    service: askCity,
    hidden: false,
  },
  {
    title: "",
    route: "/weather/queryCities",
    routes: {
      next: "/weather/getWeather",
      previous: "",
    },
    service: queryCities,
    hidden: true,
  },

  {
    title: "",
    route: "/weather/getWeather",
    routes: {
      next: "",
      previous: "",
    },
    service: getWeather,
    hidden: true,
  },
];