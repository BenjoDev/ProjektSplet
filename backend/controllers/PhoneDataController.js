var PhonedataModel = require('../models/PhoneDataModel.js');

/**
 * PhoneDataController.js
 *
 * @description :: Server-side logic for managing PhoneDatas.
 */
module.exports = {

    /**
     * PhoneDataController.list()
     */
    list: function (req, res) {
        PhonedataModel.find(function (err, PhoneDatas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PhoneData.',
                    error: err
                });
            }

            return res.json(PhoneDatas);
        });
    },

    /**
     * PhoneDataController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        PhonedataModel.findOne({_id: id}, function (err, PhoneData) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PhoneData.',
                    error: err
                });
            }

            if (!PhoneData) {
                return res.status(404).json({
                    message: 'No such PhoneData'
                });
            }

            return res.json(PhoneData);
        });
    },

    /**
     * PhoneDataController.create()
     */
    create: function (req, res) {

        console.log(req.session.userId);
        console.log(req.body.latitude);
        console.log(req.body.longitude);

        console.log(req.body);

        var PhoneData = new PhonedataModel({
            capturedBy : req.session.userId,
			latitude : req.body.latitude,
			longitude : req.body.longitude,
            captureDate : new Date(),
            accelerometerX : req.body.accelerometerX,
			accelerometerY : req.body.accelerometerY,
            accelerometerZ : req.body.accelerometerZ,
			userAccelerometerX : req.body.userAccelerometerX,
            userAccelerometerY : req.body.userAccelerometerY,
			userAccelerometerZ : req.body.userAccelerometerZ,
            gyroscopeX : req.body.gyroscopeX,
			gyroscopeY : req.body.gyroscopeY,
            gyroscopeZ : req.body.gyroscopeZ,
			lightIntensity : req.body.lightIntensity,
        });

        PhoneData.save(function (err, PhoneData) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating PhoneData',
                    error: err
                });
            }

            return res.status(201).json(PhoneData);
        });
    },

    /**
     * PhoneDataController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        PhonedataModel.findOne({_id: id}, function (err, PhoneData) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PhoneData',
                    error: err
                });
            }

            if (!PhoneData) {
                return res.status(404).json({
                    message: 'No such PhoneData'
                });
            }

            PhoneData.capturedBy = req.body.capturedBy ? req.body.capturedBy : PhoneData.capturedBy;
            PhoneData.latitude = req.body.latitude ? req.body.latitude : PhoneData.latitude;
			PhoneData.longitude = req.body.longitude ? req.body.longitude : PhoneData.longitude;
			
            PhoneData.save(function (err, PhoneData) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating PhoneData.',
                        error: err
                    });
                }

                return res.json(PhoneData);
            });
        });
    },

    /**
     * PhoneDataController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        PhonedataModel.findByIdAndRemove(id, function (err, PhoneData) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the PhoneData.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
