/* eslint-env jest */

module.exports = {
  messenger: {
    markSeen: jest.fn(),
    setTyping: jest.fn(),
    sendMessage: jest.fn(),
    sendMessageWithSeenAndTyping: jest.fn()
  },
  weather: {
    searchCities: jest.fn().mockReturnValue({ data: [{ name: "Tehran" }] }),
    getWeatherByCityId: jest.fn()
  }
};
