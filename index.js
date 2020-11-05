(() => {
  var readline = require('readline');
  var { play } = require('./src');
  var config = {
    maxPlayers: process.argv[2], // N - number of players
    maxPoints: process.argv[3], // M - points to win
    maxDiceValue: 6,
    minDiceValue: 1
  }

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  logger('start');

  play(config)
    .then(() => {
      rl.close();
    });
})();
