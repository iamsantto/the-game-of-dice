const { Player } = require('../models/Player');
const { randomizer } = require('./randomizer');

module.exports = {
  initPlayers: (maxPlayers) => {
    const order = {};

    while (Object.keys(order).length < maxPlayers) {
      const number = randomizer(maxPlayers);

      if (!(number in order)
        && (order['Player-' + number] = new Player()));
    }

    return order;
  }
};
