(() => {
  var readline = require("readline");

  var maxPlayers = process.argv[2]; // N - number of players
  var maxPoints = process.argv[3]; // M - points to win

  var maxDiceValue = 6;
  var minDiceValue = 1;

  var scorecard = {};
  var leaderboard = [];

  var log = {
    afterRoll: ': You rolled a ',
    afterWin: ': Hurray, you won. Your rank is ',
    missNextTurn: ' twice consecutively, you will miss the next turn.',
    missThisTurn: ': Misses this turn.',
    rollPrompt: ': Its your turn to roll the dice, press any key to roll.',
    setup: 'Setting up player order...',
    startGame: 'Ready. Lets begin.\n'
  }

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  var generateRandNumber = (maxValue) => {
    return Math.floor(Math.random()*(maxValue) + 1);
  }

  const generatePlayerOrder = () => {
    console.log(log.setup);
    var order = {};

    while (Object.keys(order).length < maxPlayers) {
      var number = generateRandNumber(maxPlayers);

      if (!(number in order) && (order['Player-' + number] = {
        lastThrow: 0,
        skip: false
      }));
    }

    return order;
  }

  const playTurn = async (player) => {
    var value = generateRandNumber(maxDiceValue);
    console.log(player + log.afterRoll + value + '.');

    if (playerPool[player]['lastThrow'] === minDiceValue && value === minDiceValue) {
      console.log(player + log.afterRoll + minDiceValue + log.missNextTurn);

      playerPool[player]['skip'] = true
    }

    playerPool[player]['lastThrow'] = value;

    (player in scorecard) ? scorecard[player] += value : scorecard[player] = value;

    if (scorecard[player] >= maxPoints) {
      leaderboard.push(player)

      console.log(player + log.afterWin + leaderboard.length + '.');
      delete playerPool[player];

      return;
    }

    if (value === maxDiceValue) await promptDiceRoll(player);
  }

  const displayScoreCard = () => {
    console.log(scorecard, 'scorecard');
    console.log(leaderboard, 'leaderboard');
  }

  var keypress = () => {
    if (process.stdin.isTTY) process.stdin.setRawMode(true);

    return new Promise(resolve => process.stdin.once('data', () => {
      process.stdin.setRawMode(false);
      resolve();
    }))
  }

  var promptDiceRoll = async (player) => {
    console.log(player + log.rollPrompt);

    await keypress().then(async () => {
      await playTurn(player);
    });
  }

  var startGame = async () => {
    console.log(log.startGame);

    while (leaderboard.length < maxPlayers) {
      for (player in playerPool) {
        if (playerPool[player].skip) {
          console.log(player + log.missThisTurn);

          playerPool[player].skip = false;
          continue;
        }

        await promptDiceRoll(player).then(() => {
          displayScoreCard();
        });
      }
    }

    rl.close();
  }

  var playerPool = generatePlayerOrder();
  startGame();
})();
