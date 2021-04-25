const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const modelName = "User";
const collection = "users";

const schema = new Schema({

  sender_id: {
    type:String,
    default:null
  },
  firstname: {
    type:String,
    default:null
  },
  birthdate: {
    type:Date,
    default:null
  },
  state: {
    type:String,
    default:null
  },

  _data_lifecycle:{
    create:{
      date:{
        type:Date,
        default:new Date()
      }
    },
    update:{
      date:{
        type:Date,
        default:new Date()
      }
    },
    delete:{
      value:{
        type:Boolean,
        default:false
      },
      date:{
        type:Date,
        default:null
      }
    },
    enable:{
      value:{
        type:Boolean,
        default:true
      }
    },
  }

});

schema.statics.getBySenderId = function(id){

  return this.model(modelName).findOne({
    sender_id:id
  });

};

schema.statics.updateById = function(id,update){

  return this.model(modelName).updateOne({
    _id:id
  },update);

};

schema.methods.matchUserBySearch = function(query){

  const regex = new RegExp(query,"ig");

  return this.model(modelName).find({
		
    $or:[
      {
        firstname:regex
      }
    ]

  });

};

const model = mongoose.model(modelName, schema, collection);

module.exports = {
  model,
  schema
};
