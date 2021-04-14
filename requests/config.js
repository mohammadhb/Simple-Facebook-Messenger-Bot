module.exports = {
  config:{
    baseURL: "https://graph.facebook.com/v7.0",
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "json",
  },
  access_token:process.env.MESSENGER_BOT_ACCESS_TOKEN
};