(async () => {
  var readline = require("readline");

  var maxPlayers = process.argv[2];
  var maxPoints = process.argv[3];
  var maxDiceValue = 6;
  var minDiceValue = 1;
  var scorecard = {};
  var skipTracker = {};
  var rankings = [];

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('Setting up player order...');

  var getRandNumber = (maxValue) => {
    return Math.floor(Math.random()*(maxValue) + 1);
  }

  const generatePlayerOrder = () => {
    var order = {};

    while (Object.keys(order).length < maxPlayers) {
      var number = getRandNumber(maxPlayers);

      if (!(number in order) && (order['Player-' + number] = {
        lastThrow: 0,
        skip: false
      }));
    }

    return order;
  }

  var playerOrder = generatePlayerOrder();

  const playTurn = async (player) => {
    var number = getRandNumber(maxDiceValue);
    console.log('You just rolled a ', number + '.');

    if (playerOrder[player]['lastThrow'] === minDiceValue && number === minDiceValue) {
      playerOrder[player]['skip'] = true
      console.log(player + ': You rolled ' + minDiceValue + ' twice consecutively, you will miss the next turn.')
    }

    playerOrder[player]['lastThrow'] = number;

    player in scorecard ? scorecard[player] += number : scorecard[player] = number;

    if (scorecard[player] > maxPoints) {
      rankings.push(player)
      delete playerOrder[player];

      console.log('Hurray, ' + player +' won. Your rank is ' + rankings.length + '.')
      return;
    }

    if (number === maxDiceValue) await promptDiceRoll(player);
  }

  const displayScoreCard = () => {
    console.log(playerOrder, 'order');
    console.log(scorecard, 'scorecard');
    console.log(rankings, 'leaderboard');
  }

  var keypress = async () => {
    if (process.stdin.isTTY) process.stdin.setRawMode(true);

    return new Promise(resolve => process.stdin.once('data', () => {
      process.stdin.setRawMode(false);
      resolve();
    }))
  }

  var promptDiceRoll = async (player) => {
    console.log(player + ': Its your turn to roll the dice, press any key to roll.');

    await keypress().then(async () => {
      await playTurn(player);
    });
  }

  while (rankings.length < maxPlayers) {
    for (player in playerOrder) {
      if (playerOrder[player].skip) {
        console.log(player + 'misses this turn.');
        playerOrder[player].skip = false;
        continue;
      }
      await promptDiceRoll(player).then(() => {
        displayScoreCard();
      });
    }
  }

  rl.close();
})();
