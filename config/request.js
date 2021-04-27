const { access_token } = require("./bot");
const { weather_api_key } = require("./api_key");

exports.messenger = {
  config: {
    baseURL: "https://graph.facebook.com/v7.0",
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "json",
  },
  access_token,
};

exports.weather = {
  config: {
    baseURL: "https://api.weatherapi.com/v1",
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "json",
  },
  api_key: weather_api_key,
};