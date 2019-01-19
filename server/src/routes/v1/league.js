const express = require('express');

const router = express.Router();

const LeagueController = require('../../controllers/v1/league');

router.route('/summoner/:summonerName')
  .get(LeagueController.summoner);

router.route('/matches/:summoner/:start/:end')
  .get(LeagueController.matches);

router.route('/match/:matchId')
  .get(LeagueController.match);

router.route('/champion/:summonerId/:championId')
  .get(LeagueController.champion);

module.exports = router;
