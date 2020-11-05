var { initPlayers } = require('./initPlayers');
var { logger, leaderboard } = require('./console');
var { prompt } = require('./prompt');
var { roll } = require('./roll');

module.exports = {
  play: async ({ maxPlayers, minDiceValue, maxPoints, maxDiceValue}) => {
    var pool = initPlayers(maxPlayers);
    var winners = [];

    var routine = async (name) => {
      await prompt(name)
        .then(() => calculate(name, roll(name, maxDiceValue)));
    }

    var calculate = async (name, value) => {
      var player = pool[name];

      if (player.previous === minDiceValue && value === minDiceValue) {
        logger(name, 'skipNext', value)
        player.skip = true
      }

      player.previous = value;
      player.score += value;

      if (player.score >= maxPoints) {
        winners.push(name);
        player.rank = winners.length;

        logger(name, 'win', player.rank);
        return;
      }

      if (value === maxDiceValue) {
        logger(name, 'repeat');
        await routine(name);
      }
    }

    while (winners.length < maxPlayers) {
      for (name in pool) {
        var player = pool[name];
        if (player.rank) continue;
        if (player.skip) {
          logger(name, 'skip');

          player.skip = false;
          continue;
        }

        await routine(name).then(() => leaderboard(pool));
      }
    }
  }
}
