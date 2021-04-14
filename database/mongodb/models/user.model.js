const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const modelName = "User";
const collection = "users";

const schema = new Schema({

  id: {
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

schema.methods.getByObjectId = function(id){

  return this.model(modelName).findOne({
    _id:id
  });

};

schema.methods.getById = function(id){

  return this.model(modelName).findOne({
    id
  });

};

schema.methods.updateById = function(id,update){

  return this.model(modelName).updateOne({
    id
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
