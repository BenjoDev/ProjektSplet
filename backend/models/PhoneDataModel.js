var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PhoneDataSchema = new Schema({
	'capturedBy' : {
		type: Schema.Types.ObjectId,
		ref: 'user'
   	},
	'latitude' : Number,
	'longitude' : Number,
	'captureDate' : Date
});

module.exports = mongoose.model('PhoneData', PhoneDataSchema);
