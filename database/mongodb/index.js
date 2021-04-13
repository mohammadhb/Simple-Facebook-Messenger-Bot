const mongoose = require("mongoose");

const options = {
  useCreateIndex:true,
  useNewUrlParser:true,
  useFindAndModify:true,
  useUnifiedTopology: true
};
const client = mongoose.connect("mongodb://localhost/messenger_bot", options);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {});

module.exports = {
  Client:client,
  Models:{
    Message: require("./models/message.model").model,
    User: require("./models/user.model").model,
  }
};