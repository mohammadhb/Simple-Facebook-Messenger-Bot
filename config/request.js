exports.messenger = {
  config: {
    baseURL: "https://graph.facebook.com/v7.0",
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "json",
  },
  access_token: process.env.MESSENGER_BOT_ACCESS_TOKEN,
};

exports.weather = {
  config: {
    baseURL: "https://api.weatherapi.com/v1",
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "json",
  },
  api_key: process.env.WEATHER_SERVICE_API_KEY,
};
