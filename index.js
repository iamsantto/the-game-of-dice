(() => {
  const readline = require('readline');
  const { maxPlayers } = require('./config');
  const { play } = require('./src/play');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  play(maxPlayers)
    .then(() => {
      rl.close();
    });
})();
