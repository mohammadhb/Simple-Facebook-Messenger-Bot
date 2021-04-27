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

  getAllPaginated() {
    if (this.isMongoDB) return this.model.getAllPaginated();
    return this.model.findAll();
  }

  countAll() {
    if (this.isMongoDB) return this.model.countAll();
    return this.model.findAll();
  }

  getAll() {
    if (this.isMongoDB) return this.model.find();
    return this.model.findAll();
  }

  getById(id) {
    if (this.isMongoDB) return this.model.getById(id);
    return this.model.findOne({
      where: {
        id,
      },
    });
  }

  deleteById(id) {
    if (this.isMongoDB) return this.model.deleteOne({ _id: id });
    return this.model.findOne({
      where: {
        id,
      },
    });
  }

  updateById(id, data) {
    if (this.isMongoDB) return this.model.updateById(id, data);
    return this.model.findOne(
      {
        where: {
          id,
        },
      },
      data
    );
  }
}

module.exports = IRepository;
