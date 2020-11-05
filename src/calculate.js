const { getState, setState } = require('../models/State');
const { maxDiceValue, maxPoints, minDiceValue } = require('../config');
const { logger } = require('../utils/console');
const { prompt } = require('../utils/prompt');
const { roll } = require('../utils/roll');

module.exports = {
  calculate: async (name, value) => {
    const state = getState();
    const pool = state.pool;
    const winners = state.winners;
    const player = pool[name];

    if (player.previous === minDiceValue && value === minDiceValue) {
      logger(name, 'skipNext', value)
      player.skip = true
    }

    player.previous = value;
    player.score += value;

    setState(state);

    if (player.score >= maxPoints) {
      winners.push(name);
      player.rank = winners.length;

      logger(name, 'win', player.rank);
      setState(state);
      return;
    }

    if (value === maxDiceValue) {
      logger(name, 'repeat');
      await prompt(name)
      .then(() => module.exports.calculate(name, roll(name)));
    }
  }
}
