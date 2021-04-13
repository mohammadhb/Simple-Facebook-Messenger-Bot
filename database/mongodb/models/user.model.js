const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const Types = Schema.Types;

const modelName = 'User';
const collection = 'users';

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


const model = mongoose.model(modelName, schema, collection);

module.exports = {
	model,
	schema
}
