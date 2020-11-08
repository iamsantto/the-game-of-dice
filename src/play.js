const { calculate } = require('./calculate');
const { getState, initPool } = require('../state');
const { logger, tabulate } = require('../utils/console');
const { prompt } = require('../utils/prompt');
const { roll } = require('../utils/roll');

module.exports = {
  play: async (maxPlayers, maxPoints) => {
    let { pool, winners } = initPool(maxPlayers);

    while (winners.length < maxPlayers) {
      for (name in pool) {
        const player = pool[name];

        if (player.rank) continue;

        if (player.skip) {
          logger(`${name}: Misses this turn.`);
          player.skip = false;
          continue;
        }

        await prompt(name)
          .then(() => calculate(name, roll(name), maxPoints))
          .then(() => {
            const state = getState();
            pool = state.pool;
            winners = state.winners;

            tabulate(pool, [ 'score', 'rank' ]);
          });
      }
    }

     return pool;
  }
};
