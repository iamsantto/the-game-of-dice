const { initPlayers } = require('./utils/initPlayers');

let state = {
  pool: {},
  winners: []
};

module.exports = {
  getState: () => state,
  initPool: (maxPlayers) => {
    state.pool = initPlayers(maxPlayers);
    return state;
  },
  setState: nextState => { state = nextState; }
}
