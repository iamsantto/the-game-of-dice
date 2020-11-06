const { initPlayers } = require('./utils/initPlayers');
const { maxPlayers } = require('./config');

let state = {
  pool: {},
  winners: []
};

module.exports = {
  getState: () => state,
  initPool: () => {
    state.pool = initPlayers(maxPlayers);
    return state.pool;
  },
  setState: nextState => { state = nextState; }
}
