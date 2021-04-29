const { database } = require("../databases");

class IRepository {
  constructor(data, model) {
    this.isMongoDB = database === "MONGODB";
    this.isPostgreSQL = database === "POSTGRESQL";

    this.model = model;
    this.data = data;
  }

  create() {
    if (this.isMongoDB) return this.model.create(this.data);
    return new this.model(this.data).save();
  }

  getAllPaginated(page, limit) {
    if (this.isMongoDB) return this.model.getAllPaginated(page, limit);
    return this.model.findAll({
      offset: (page - 1) * limit,
      limit
    });
  }

  countAll() {
    if (this.isMongoDB) return this.model.countAll();
    return this.model.count();
  }

  getAll() {
    if (this.isMongoDB) return this.model.findAll();
    return this.model.findAll();
  }

  getById(id) {
    if (this.isMongoDB) return this.model.getById(id);
    return this.model.findOne({
      where: {
        id
      }
    });
  }

  deleteById(id) {
    if (this.isMongoDB) return this.model.deleteOne({ _id: id });
    return this.model.destroy({
      where: {
        id
      }
    });
  }

  updateById(id, data) {
    if (this.isMongoDB) return this.model.updateById(id, data);
    return this.model.update(
      {
        where: {
          id
        }
      },
      data
    );
  }
}

module.exports = IRepository;
