const IRepository = require("./irepository");
const { persistant } = require("../databases");

class Repository extends IRepository {
  constructor(data) {
    const model = persistant.models.Message;
    super(data, model);
  }
}

module.exports = Repository;
