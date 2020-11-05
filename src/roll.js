const { logger } = require("./console");
const { randomizer } = require("./randomizer");

module.exports = {
  roll: (name, maxDiceValue) => {
    var value = randomizer(maxDiceValue);

    logger(name, 'roll', value);
    return value;
  }
};
