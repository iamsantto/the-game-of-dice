module.exports = {
  maxDiceValue: 6,
  maxPlayers: parseInt(process.argv[2]) || null, // N - number of players
  maxPoints: parseInt(process.argv[3]) || null, // M - points to win
  minDiceValue: 1
}
