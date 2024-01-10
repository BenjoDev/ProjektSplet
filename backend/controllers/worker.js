// import { joinPool } from '@post-me/mpi';
const { joinPool } = require('@post-me/mpi');


const connection = await joinPool(self);

// The parallel sort method
const calculateStandardDeviation = (communicator) => async (array) => {

  const root = 0;
  let data = await communicator.scatter(array, root);

  console.log(data);
  
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

    console.log(standardDeviation);

    
    return standardDeviation;

}

// Expose parallel methods to the application
connection.registerMethods({ calculateStandardDeviation });

// Merge two sorted arrays into a single sorted array
function merge(a0, a1) {/* ... */}