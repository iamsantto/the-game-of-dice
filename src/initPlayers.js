const { Player } = require('../models/Player');
const { randomizer } = require('../utils/randomizer');

module.exports = {
  initPlayers: (maxPlayers) => {
    let order = {};

    while (Object.keys(order).length < maxPlayers) {
      const number = randomizer(maxPlayers);

      if (!(number in order)
        && (order['Player-' + number] = new Player()));
    }

    return order;
  }
};
