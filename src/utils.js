function getRandomInt(min, max) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Type Error');
  }

  if (min > max) {
    throw new Error('min should be less than or equal to max');
  }

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber;
}

module.exports = { getRandomInt };
