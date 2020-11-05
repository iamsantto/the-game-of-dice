(() => {
  const readline = require('readline');
  const { play } = require('./src/play');
  const { maxPlayers } = require('./config');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  play(maxPlayers)
    .then(() => {
      rl.close();
    });
})();
