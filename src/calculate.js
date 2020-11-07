const { getState, setState } = require('../state');
const { logger } = require('../utils/console');
const { maxDiceValue, minDiceValue } = require('../config');
const { prompt } = require('../utils/prompt');
const { roll } = require('../utils/roll');

module.exports = {
  calculate: async (name, value, maxPoints) => {
    const state = getState();
    const { pool, winners } = state;
    const player = pool[name];

    if (player.previous === minDiceValue && value === minDiceValue) {
      player.skip = true;
      logger(`${name}: You rolled two consecutive ${value}s, you will miss your next turn.`);
    }

    player.previous = value;
    player.score += value;
    setState(state);

    if (player.score >= maxPoints) {
      winners.push(name);
      player.rank = winners.length;
      setState(state);

      logger(`${name}: You won. Your rank is ${player.rank}.`);
      return;
    }

    if (value === maxDiceValue) {
      logger(`${name}: You get to roll again.`);
      await prompt(name)
      .then(() => module.exports.calculate(name, roll(name), maxPoints));
    }
  }
};
