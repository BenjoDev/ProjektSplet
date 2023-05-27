var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PhoneDataSchema = new Schema({
	// 'capturedBy' : {
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'user'
   	// },
	'capturedBy' : String,
	'latitude_start' : Number,
	'longitude_start' : Number,
	'latitude_end' : Number,
	'longitude_end' : Number,
	'captureDate' : Date,
	'accelerometerX': [Number],
	'accelerometerY': [Number],
	'accelerometerZ': [Number],
	'userAccelerometerX': [Number],
	'userAccelerometerY': [Number],
	'userAccelerometerZ': [Number],
	'gyroscopeX': [Number],
	'gyroscopeY': [Number],
	'gyroscopeZ': [Number],
	'lightIntensity': Number,
	'roadQuality': Number
	// TODO 'roadQuality': Number // rdec = 2, oranzn = 1, zelen = 0 posebi model

});

module.exports = mongoose.model('PhoneData', PhoneDataSchema);
