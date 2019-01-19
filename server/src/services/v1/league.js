const debug = require('debug')('app:services:v1:index');
const config = require('../../config');
const LeagueJS = require('leaguejs');

const leagueJs = new LeagueJS(config.env.RIOT_API_KEY);


const LeagueService = {

  summoner: (summonerName) => {
    return leagueJs.Summoner.gettingByName(summonerName)
  },


  match: (matchId) => {
    return leagueJs.Match.gettingById(matchId)
  },

  matches: (summonerName, start, end) => {
    return leagueJs.Summoner.gettingByName(summonerName)
    .then((summonerRes) => {
      return leagueJs.Match.gettingListByAccount(summonerRes.accountId, undefined,
        { beginIndex: start || 0, endIndex: end || 10 })
    }, (error) => error.error)
    .then((matchesRes) => {
      if (matchesRes && matchesRes.matches) {
        return Promise.all(matchesRes.matches.map((match) => leagueJs.Match.gettingById(match.gameId)));
      } else {
        return Promise.resolve(matchesRes || 'Unable to find match history.');
      }
    })
  },

  champion: (summonerId, championId) => {
    return leagueJs.ChampionMastery.gettingBySummonerForChampion(summonerId, championId);
  }

};

module.exports = LeagueService;
