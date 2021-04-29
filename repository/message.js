const IRepository = require("./irepository");
const { persistant } = require("../databases");

class Repository extends IRepository {
  constructor(data) {
    super(data, persistant.models.Message);
  }
}

module.exports = Repository;
