(() => {
  var readline = require('readline');
  var { play } = require('./src/play');

  var config = {
    maxDiceValue: 6,
    maxPlayers: parseInt(process.argv[2]), // N - number of players
    maxPoints: parseInt(process.argv[3]), // M - points to win
    minDiceValue: 1
  }

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  play(config)
    .then(() => {
      rl.close();
    });
})();
