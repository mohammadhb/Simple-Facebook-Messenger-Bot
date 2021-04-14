const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const envConfigs = require("./config");
const basename = path.basename(__filename);

const env = process.env.NODE_ENV || "development";
const config = envConfigs[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, {
  dialect: config.dialect,
});

const modelPath = path.join(__dirname, "models");
fs.readdirSync(modelPath)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    const model = require(path.join(modelPath, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
