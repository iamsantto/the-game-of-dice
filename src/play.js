const { initPlayers } = require('./initPlayers');
const { logger, leaderboard } = require('./console')

module.exports = {
  play: async (config) => {
    var { maxPlayers } = config;
    var pool = initPlayers(maxPlayers);

    while (leaderboard.length < maxPlayers) {
      for (player in pool) {
        if (pool[player].skip) {
          logger(player, 'skip');

          pool[player].skip = false;
          continue;
        }

        await prompt(player)
          .then(async () => {
            await roll(player, config)
              .then(() => leaderboard(pool));
          });
      }
    }
  }
}
