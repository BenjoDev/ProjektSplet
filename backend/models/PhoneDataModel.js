var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PhoneDataSchema = new Schema({
	'capturedBy' : {
		type: Schema.Types.ObjectId,
		ref: 'user'
   	},
	'latitude' : Number,
	'longitude' : Number,
	'captureDate' : Date,
	'accelerometerX' : Number,
	'accelerometerY' : Number,
	'accelerometerZ' : Number,
	'userAccelerometerX' : Number,
	'userAccelerometerY' : Number,
	'userAccelerometerZ' : Number,
	'gyroscopeX' : Number,
	'gyroscopeY' : Number,
	'gyroscopeZ' : Number

	// svetlost okolice (tunel?)
	// zračni tlak??
	// stanje ceste (rdeč, oramnzn, zelen tak da mybe number?)
});

module.exports = mongoose.model('PhoneData', PhoneDataSchema);
