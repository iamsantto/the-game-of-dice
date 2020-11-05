var { logger } = require("./console");
var { randomizer } = require("./randomizer");

module.exports = {
  roll: (name, maxDiceValue) => {
    var value = randomizer(maxDiceValue);

    logger(name, 'roll', value);
    return value;
  }
};
