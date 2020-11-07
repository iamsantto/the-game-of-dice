
(() => {
  const readline = require('readline');
  const { logger } = require('./utils/console');
  const { maxPlayers, maxPoints } = require('./config');
  const { play } = require('./src/play');

  if (!maxPlayers || !maxPoints) {
    logger('Please enter valid arguments N & M.');
    return;
  };

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  play(maxPlayers, maxPoints)
    .then(() => {
      rl.close();
    });
})();
