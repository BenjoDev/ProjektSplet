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
	'gyroscopeZ' : Number,
	'roadQuality': Number // rdec = 2, oranzn = 1, zelen = 0 posebi model
	// svetlost tunela
});

module.exports = mongoose.model('PhoneData', PhoneDataSchema);
