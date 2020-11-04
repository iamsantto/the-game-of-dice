(async () => {
  var readline = require("readline");

  var maxPlayers = process.argv[2];
  var maxPoints = process.argv[3];
  var maxDiceValue = 6;
  var order = [];
  var scorecard = {};
  var lastThrow = {};

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('Setting up player order...');

  var getRandNumber = (maxValue) => {
    return Math.floor(Math.random()*(maxValue) + 1);
  }

  while (order.length < maxPlayers) {
    var number = getRandNumber(maxPlayers);

    if (order.indexOf(number) == -1) {
      order.push(number);
    }
  }

  const playTurn = (player) => {
    var number = getRandNumber(maxDiceValue);

    console.log('you just rolled a ', number);

    if(player in scorecard) {
      scorecard[player] += number;
      lastThrow[player] = number;

      return;
    }

    scorecard[player] = number;
    lastThrow[player] = number;
  }

  const displayScoreCard = () => {
    console.log(scorecard);
  }

  var keypress = async (player) => {
    if (process.stdin.isTTY) process.stdin.setRawMode(true);
    return new Promise(resolve => process.stdin.once('data', () => {
      process.stdin.setRawMode(false);
      playTurn(player);
      displayScoreCard();
      resolve();
    }))
  }

  for (let index = 0; index < order.length; index++) {
    console.log('Player-' + order[index] + ' its your turn to roll the dice, press any key to roll.');
    await keypress(order[index]);
  }

  rl.close();
})();
