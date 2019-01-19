const debug = require('debug')('app:controllers:v1:index');

const LeagueService = require('../../services/v1/league');

const LeagueController = {

  summoner: async (req, res) => {
    debug('executing summoner action: ' + req.params.summonerName);

    const summoner = await LeagueService.summoner(req.params.summonerName);
    res.status(200).send(summoner);
  },

  matches: async (req, res) => {
    debug('executing matches action: ' + req.params.summoner);

    const matches = await LeagueService.matches(req.params.summoner, req.params.start, req.params.end);
    res.status(200).send(matches);
  },

  match: async (req, res) => {
    debug('executing match action: ' + req.params.matchId);

    const match = await LeagueService.match(req.params.matchId);
    res.status(200).send(match);
  },

  champion: async (req, res) => {
    debug('executing champion action: ' + req.params.summonerId + ' - ' + req.params.championId);

    const champion = await LeagueService.champion(req.params.summonerId, req.params.championId);
    res.status(200).send(champion);
  }

};

module.exports = LeagueController;
