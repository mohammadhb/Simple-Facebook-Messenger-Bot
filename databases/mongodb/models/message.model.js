const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const modelName = "Message";
const collection = "messages";

const schema = new Schema({
  message: {
    type: String,
    default: null
  },
  messageId: {
    type: String,
    default: null
  },
  recipientId: {
    type: String,
    default: null
  },
  senderId: {
    type: String,
    default: null
  },
  timestamp: {
    type: Date,
    default: null
  },
  _data_lifecycle: {
    create: {
      date: {
        type: Date,
        default: new Date()
      }
    },
    update: {
      date: {
        type: Date,
        default: new Date()
      }
    },
    delete: {
      value: {
        type: Boolean,
        default: false
      },
      date: {
        type: Date,
        default: null
      }
    },
    enable: {
      value: {
        type: Boolean,
        default: true
      }
    }
  }
});

schema.statics.getAllPaginated = function (page = 1, pageLimit = 10) {
  const model = this.model(modelName);

  const query = {},
    skip = (page - 1) * pageLimit,
    limit = pageLimit;

  const fields = {
    __v: 0
  };

  return model.find(query).skip(skip).limit(limit).select(fields).exec();
};

schema.statics.countAll = function () {
  const model = this.model(modelName);
  const query = {};

  return model.count(query).exec();
};

schema.methods.getAll = function () {
  const model = this.model(modelName);

  let query = {};

  const fields = {
    __v: 0,
    _data_lifecycle: 0
  };

  return model
    .find(query)
    .populate("User", "-__v -_data_lifecycle")
    .select(fields)
    .exec();
};

schema.statics.getById = function (id) {
  const model = this.model(modelName);

  let query = {
    _id: id
  };

  const fields = {
    __v: 0,
    _data_lifecycle: 0
  };

  return model
    .findOne(query)
    .populate("User", "-__v -_data_lifecycle")
    .select(fields)
    .exec();
};

const model = mongoose.model(modelName, schema, collection);

module.exports = {
  model,
  schema
};
