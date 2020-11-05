var { logger } = require('./console');

module.exports = {
  prompt: (player) => {
    logger(player, 'prompt');

    if (process.stdin.isTTY) process.stdin.setRawMode(true);

    return new Promise(resolve => process.stdin.once('data', () => {
      process.stdin.setRawMode(false);
      resolve();
    }))
  }
}
