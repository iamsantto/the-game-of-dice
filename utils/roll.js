const { logger } = require('./console');
const { randomizer } = require('./randomizer');
const { maxDiceValue } = require('../config');

module.exports = {
  roll: (name) => {
    const value = randomizer(maxDiceValue);

    logger(`${name}: You rolled a ${value}.`);
    return value;
  }
};
