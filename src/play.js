module.exports = {
  play = async () => {
    while (leaderboard.length < maxPlayers) {
      for (player in playerPool) {
        if (playerPool[player].skip) {
          logger('skip', player);
          playerPool[player].skip = false;

          continue;
        }
        if (checkSkip(playerPool[player])) continue;

        logger('prompt', player);
        await prompt(player)
          .then(() => {
            await roll(player);
            showLeaderBoard();
          });
      }
    }
  }
}
