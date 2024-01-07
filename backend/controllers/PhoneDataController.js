import { createPool } from '@post-me/mpi';

var PhonedataModel = require('../models/PhoneDataModel.js');



async function calculateShakingLevel(accelerometerData, gyroscopeData) {
    ///////////////EXAMPLE//////////////////////////////
    const array = [accelerometerData, gyroscopeData];
    const N_WORKERS = 4;

    // Create the workers
    const workers =  [];
    for (let i = 0; i < N_WORKERS; ++i) {
        workers.push(new Worker('./worker.js'));
    }

    // Create a pool of mutually interconnected workers
    const workerPool = await createPool(workers);

    // Pass different parameter to the parallel method based on the rank of the worker
    const root = 0;
    const args = (rank) => rank === root ? array : null;
    const transfer = (rank, [arr]) => rank === root ? [arr.buffer] : [];

    // Call the parallel method 'sort'
    const result = await workerPool.call('calculateStandardDeviation', args, transfer);

    // The sorted array is returned by the root worker
    const finalResult = result[root];
    //////////////////////////////////////////////////

    // Calculate standard deviation for accelerometer data
    const accelerometerStandardDeviation = calculateStandardDeviation(accelerometerData);
    // Calculate standard deviation for gyroscope data
    const gyroscopeStandardDeviation = calculateStandardDeviation(gyroscopeData);
    // Determine shaking level based on standard deviation values
    if (accelerometerStandardDeviation > 0.5 || gyroscopeStandardDeviation > 0.5) {
        console.log('High shaking level');
      return 2;
    } else if (accelerometerStandardDeviation > 0.3 || gyroscopeStandardDeviation > 0.3) {
        console.log('Medium shaking level');
        return 1;
    } else {
        console.log('Low shaking level');
        return 0;
    }
  }
  
  // Function to calculate the standard deviation of an array of numbers
  function calculateStandardDeviation(data) {
    const n = data.length;
    if (n <= 1) {
      return 0;
    }
    // Calculate the mean
    const mean = data.reduce((sum, value) => sum + value, 0) / n;
    // Calculate the sum of squares of differences from the mean
    const sumOfSquares = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0);
    // Calculate the variance
    const variance = sumOfSquares / (n - 1);
    // Calculate the standard deviation
    const standardDeviation = Math.sqrt(variance);
    return standardDeviation;
  }

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

    listUser: function (req, res) {
        var username = req.params.user;

        PhonedataModel.find({capturedBy: username}, function (err, PhoneDatas) {
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
        // console.log(req.body.capturedBy);

        // console.log(req.body.accelerometerX);
        // console.log(req.body.accelerometerY);
        console.log(req.body);
        // console.log(req.body.longitude_end);
        

        var PhoneData = new PhonedataModel({
            capturedBy : req.body.capturedBy,
            latitude_start : req.body.latitude_start,
            longitude_start : req.body.longitude_start,
            latitude_end : req.body.latitude_end,
            longitude_end : req.body.longitude_end,
            captureDate : new Date(),
            accelerometerX: req.body.accelerometerX,
            accelerometerY: req.body.accelerometerY,
            accelerometerZ: req.body.accelerometerZ,
            userAccelerometerX: req.body.userAccelerometerX,
            userAccelerometerY: req.body.userAccelerometerY,
            userAccelerometerZ: req.body.userAccelerometerZ,
            gyroscopeX: req.body.gyroscopeX,
            gyroscopeY: req.body.gyroscopeY,
            gyroscopeZ: req.body.gyroscopeZ,
            lightIntensity: req.body.lightIntensity,
            roadQuality: calculateShakingLevel(req.body.accelerometerX, req.body.gyroscopeX)
        });

        console.log(PhoneData);


        PhoneData.save(function (err, PhoneData) {
            console.log("Napaka: " + err);
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
