const { logger } = require('./console');

module.exports = {
  prompt: (name) => {
    logger(`${name}: Press any key to roll the die.`);

    if (process.stdin.isTTY) process.stdin.setRawMode(true);

    return new Promise(resolve => process.stdin.once('data', () => {
      process.stdin.setRawMode(false);
      resolve();
    }))
  }
};
