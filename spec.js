const { expect } = require('chai');
const sinon = require('sinon');
const PromptModule = require('./utils/prompt');

describe('play game', () => {
  let play;
  let stub;

  before(() => {
    stub = sinon.stub(PromptModule, 'prompt').resolves();
    play = require('./src/play').play;
  });

  after(() => {
    stub.restore();
  })

  it('should return player leaderboard', async () => {
    const result = await play(2,5);

    expect(result['Player-1'].rank).to.be.above(0);
    expect(result['Player-1'].score).to.be.above(4);

    expect(result['Player-2'].rank).to.be.above(0);
    expect(result['Player-2'].score).to.be.above(4);
  })
});
