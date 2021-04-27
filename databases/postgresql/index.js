const fs = require("fs");
const path = require("path");

const { Sequelize } = require("sequelize");
const models = {};
let sequelize;

const baseName = path.basename(__filename);
const modelsPath = path.join(__dirname, "models");

function connectDatabase({ database, username, host, port, password, dialect, options }, onError, onOpen) {
  sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect,
    logging: console.log,
    ...options,
  });
  sequelize.authenticate().then(resolve=>{
    onOpen(resolve);
  },reject=>{
    onError(reject);
  });
}

function connectModels(sequelize) {
  fs.readdirSync(modelsPath)
    .filter((file) => {
      return file.indexOf(".") !== 0 && file !== baseName && file.slice(-3) === ".js";
    })
    .forEach((file) => {
      const model = require(path.join(modelsPath, file))(sequelize, Sequelize.DataTypes);
      models[model.name] = model;
    });

  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });
}

function getClient() {
  return sequelize;
}

module.exports = {
  connectDatabase,
  connectModels,
  getClient,
  models,
};
