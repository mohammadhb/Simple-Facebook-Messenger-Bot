const mongoose = require("mongoose");
let client;

function getClient() {
  return client;
}

function getConnection() {
  return mongoose.connection;
}

async function connectDatabase(
  { database, username, host, port = 27017, password, options },
  onError,
  onOpen
) {
  let uri;
  if (username && password)
    uri = `mongodb://${username}:${password}@${host}:${port}/${database}`;
  else uri = `mongodb://${host}:${port}/${database}`;

  await mongoose.connect(uri, options);

  mongoose.connection.on("error", onError);
  mongoose.connection.on("open", onOpen);
}

module.exports = {
  getClient,
  getConnection,
  connectDatabase,
  models: {
    Message: require("./models/message.model").model,
    User: require("./models/user.model").model
  }
};
