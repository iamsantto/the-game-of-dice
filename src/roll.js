module.exports = {
  roll: async function(player, {
    minDiceValue,
    maxPoints,
    maxDiceValue
  }) {
    var value = generateRandNumber(maxDiceValue);
    console.log(player + log.afterRoll + value + '.');

    if (playerPool[player]['lastThrow'] === minDiceValue && value === minDiceValue) {
      console.log(player + log.afterRoll + minDiceValue + log.missNextTurn);

      playerPool[player]['skip'] = true
    }

    playerPool[player]['lastThrow'] = value;

    (player in scorecard) ? scorecard[player] += value : scorecard[player] = value;

    if (scorecard[player] >= maxPoints) {
      leaderboard.push(player)

      console.log(player + log.afterWin + leaderboard.length + '.');
      delete playerPool[player];

      return;
    }

    if (value === maxDiceValue) {
      console.log(player + log.rollAgain);
      await promptDiceRoll(player);
    }
  }
}
