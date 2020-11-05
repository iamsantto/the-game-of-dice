var keypress = () => {
  if (process.stdin.isTTY) process.stdin.setRawMode(true);

  return new Promise(resolve => process.stdin.once('data', () => {
    process.stdin.setRawMode(false);
    resolve();
  }))
}

module.exports = {
  prompt: async (player) => {
    await keypress();
  }
}
