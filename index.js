(() => {
  var maxPlayers = process.argv[2];
  var maxPoints = process.argv[3];
  var order = [];
  var players = {};

  while (order.length < maxPlayers) {
    var number = Math.floor(Math.random()*(maxPlayers) + 1);
    if (order.indexOf(number) == -1) {
        order.push(number);
    }
  }
})();
