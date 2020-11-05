var log = {
  prompt: ': Its your turn to roll the dice, press any key to roll.',
  repeat: ': You get to roll again.',
  roll: ': You rolled a ',
  skip: ': Misses this turn.',
  skipNext: ' twice consecutively, you will miss the next turn.',
  win: ': Hurray, you won. Your rank is '
};

module.exports = {
  logger: (
    player = '',
    key,
    number = ''
  ) => console.log(`${player}${log[key]}${number}`),

  leaderboard: (pool) => console.table(pool, [ 'score', 'rank' ])
};
