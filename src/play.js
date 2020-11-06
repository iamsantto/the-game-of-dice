const { calculate } = require('./calculate');
const { getState, initPool } = require('../state');
const { logger, leaderboard } = require('../utils/console');
const { prompt } = require('../utils/prompt');
const { roll } = require('../utils/roll');

module.exports = {
  play: async (maxPlayers) => {
    let pool = initPool();
    let winners = [];

    while (winners.length < maxPlayers) {
      for (name in pool) {
        const player = pool[name];
        if (player.rank) continue;
        if (player.skip) {
          logger(name, 'skip');

          player.skip = false;
          continue;
        }

        await prompt(name)
          .then(() => calculate(name, roll(name)))
          .then(() => {
            const state = getState();
            pool = state.pool;
            winners = state.winners;

            leaderboard(pool)
          });
      }
    }
  }
}
