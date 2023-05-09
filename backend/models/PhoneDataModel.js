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
	// pospešek x, y, z
	// svetlost okolice (tunel?)
	// zračni tlak??
	// rotacija naprave (gyroscope)
	// stanje ceste (rdeč, oramnzn, zelen tak da mybe number?)
});

module.exports = mongoose.model('PhoneData', PhoneDataSchema);
