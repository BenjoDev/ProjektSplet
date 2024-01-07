import { joinPool } from '@post-me/mpi';

const connection = await joinPool(self);

// The parallel sort method
const calculateStandardDeviation = (communicator) => async (array) => {
  const root = 0;
  let subArray = await communicator.send(array, root);
  subArray.sort((a, b) => a - b);
  const sorted = await communicator.reduce(subArray, merge, root);

  return sorted;
}

// Expose parallel methods to the application
connection.registerMethods({ calculateStandardDeviation });

// Merge two sorted arrays into a single sorted array
function merge(a0, a1) {/* ... */}