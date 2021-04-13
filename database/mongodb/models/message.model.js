const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Types = Schema.Types

const modelName = 'Message'
const collectionName = 'messages';

const schema = new Schema({

	message: {
		type:String,
		default:null
	},
	messageId: {
		type:String,
		default:null
	},
	timestamp:{
		type:Date,
		default:null
	},
	recipientId: {
		type:String,
		default:null
	},
	senderId: {
		type:String,
		default:null
	},
	timestamp: {
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



const model = mongoose.model(modelName, schema, collection)

module.exports = {
	model,
	schema
}
