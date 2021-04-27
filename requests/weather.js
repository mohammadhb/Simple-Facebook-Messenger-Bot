const axios = require("axios");
const {
  request: {
    weather: { config, api_key },
  },
} = require("../config");

const client = axios.create(config);

function searchCities(query) {
  const path = "/search.json",
    options = {
      params: { key: api_key, aqi: "no", q: query },
    };

  return client.get(path, options);
}

function getWeatherByCityId(query) {
  const path = "/current.json",
    options = {
      params: { key: api_key, aqi: "no", q: query },
    };

  return client.get(path, options);
}

module.exports = {
  searchCities,
  getWeatherByCityId,
};
