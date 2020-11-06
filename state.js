const { initPlayers } = require('./utils/initPlayers');
const { maxPlayers } = require('./config');

let state = {
  pool: initPlayers(maxPlayers),
  winners: []
};

module.exports = {
  getState: () => state,
  setState: nextState => { state = nextState; }
}
