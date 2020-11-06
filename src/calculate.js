const { getState, setState } = require('../state');
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
      logger(`${name}: You rolled two consecutive ${value}s, you will miss your next turn.`);
      player.skip = true;
    }

    player.previous = value;
    player.score += value;

    setState(state);

    if (player.score >= maxPoints) {
      winners.push(name);
      player.rank = winners.length;

      logger(`${name}: You won. Your rank is ${player.rank}.`);
      setState(state);
      return;
    }

    if (value === maxDiceValue) {
      logger(`${name}: You get to roll again.`);
      await prompt(name)
      .then(() => module.exports.calculate(name, roll(name)));
    }
  }
}
