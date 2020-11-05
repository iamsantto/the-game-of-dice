var { Player } = require('../models/Player');
var { randomizer } = require('./randomizer');

module.exports = {
  setup: (maxPlayers) => {
    var order = {};

    while (Object.keys(order).length < maxPlayers) {
      var number = randomizer(maxPlayers);

      if (!(number in order) && (order['Player-' + number] = new Player()));
    }

    return order;
  }
}
