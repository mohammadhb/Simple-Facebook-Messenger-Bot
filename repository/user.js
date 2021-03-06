const IRepository = require("./irepository");
const { persistant } = require("../databases");

class Repository extends IRepository {
  constructor(data) {
    super(data, persistant.models.User);
  }
  getBySenderId(id) {
    if (this.isMongoDB) return this.model.getBySenderId(id);
    return this.model.findOne({
      where: {
        sender_id: id
      }
    });
  }
  deleteBySenderId(id) {
    if (this.isMongoDB) return this.model.deleteOne({ sender_id: id });
    return this.model.destroy({
      where: {
        sender_id: id
      }
    });
  }
  updateFirstname(data) {
    if (this.isMongoDB)
      return this.model.updateById(this.data._id, {
        $set: {
          firstname: data
        }
      });
    return this.model.update(
      {
        firstname: data
      },
      {
        where: {
          id: this.data.id
        }
      }
    );
  }
  updateBirthdate(data) {
    if (this.isMongoDB)
      return this.model.updateById(this.data.id, {
        $set: {
          birthdate: data
        }
      });
    return this.model.update(
      {
        birthdate: new Date(data)
      },
      {
        where: {
          id: this.data.id
        }
      }
    );
  }
  updateState(data) {
    if (this.isMongoDB)
      return this.model.updateById(this.data.id, {
        $set: {
          state: data
        }
      });
    return this.model.update(
      {
        state: data
      },
      {
        where: {
          id: this.data.id
        }
      }
    );
  }
}

module.exports = Repository;
