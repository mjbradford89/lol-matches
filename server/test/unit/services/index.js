const assert = require('assert');

const IndexService = require('../../../src/services/v1/league');

suite('IndexService', () => {
  suite('#league()', () => {
    test('should return "league" string', async () => {
      const league = await IndexService.league();
      assert.equal(league, 'league');
    });
  });
});
