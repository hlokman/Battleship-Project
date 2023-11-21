const Ship = (length) => {
  if (length <= 0) {
    throw new Error("The minimum length must be 1");
  }
  let hits = 0;
  let shipLength = length;

  function hit() {
    if (hits !== shipLength) hits++;
  }

  function isSunk() {
    if (hits === shipLength) {
      return true;
    } else {
      return false;
    }
  }

  const getHits = () => hits;
  const getLength = () => shipLength;
  return { getLength, getHits, hit, isSunk };
};

export { Ship };
