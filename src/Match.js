import React, { Component } from 'react';

export default class Match extends Component {

    summonerIdentity = null;

    constructor(props) {
        super(props);
        this.summonerIdentity = this.getSummonerIdentity();
        this.summoner = this.getSummoner();
        this.champion = this.getChampion();
        this.team = this.getTeam();
        this.teammates = this.getTeammates();

    }

    durationToReadable(seconds) {
        var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
        var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
        return numminutes + "m " + numseconds + "s";
    }

    getSummonerIdentity() {
        let match = this.props.match;
        return match.participantIdentities.find((p) => p.player.summonerName === this.props.summoner);
    }

    getSummoner() {
        let match = this.props.match;
        return match.participants.find((p) => p.participantId === this.summonerIdentity.participantId);
    }

    getTeammates() {
        let match = this.props.match;
        let mates = match.participants.filter((p) => p.teamId === this.team.teamId)
        return match.participantIdentities.filter((p) => mates[p.participantId])
    }

    getChampion() {
        return this.props.champions[this.summoner.championId];
    }

    getTeam() {
        return this.props.match.teams.find((t => t.teamId === this.summoner.teamId));
    }

    getTeammatesNames() {
        return this.teammates.map((t) => t.player.summonerName);
    }

    getKDA() {
        return Math.floor(this.summoner.stats.kills / this.summoner.stats.deaths) + ':1 KDA';
    }

    getCPM() {
        // TODO
    }

    getSpells(id) {
        let spells = this.props.championData[id].spells;
        if (spells) {
            spells = spells.map((s) => s.name)
            return spells.join(', ')
        }
        return '';
    }

    render() {
        let match = this.props.match;
        let duration = this.durationToReadable(match.gameDuration);
        let teammates = this.getTeammatesNames();
        return (
            <div className={this.team.win + "  list-group-item flex-column"}>
                <div class="row">
                    <div title="result" class="col-md-2">
                        {this.team.win === 'Fail' ? 'Defeat' : 'Win'}
                    </div>
                    <div title="duration" class="col-md-2">
                        {duration}
                    </div>
                    <div title="KDA" class="col-md-2">
                        {this.getKDA()}
                    </div>
                    <div title="teammates" class="col-md-2">
                        {teammates.join(', ')}
                    </div>
                    <div title="champion" class="col-md-4">
                        {this.champion.name} lvl {this.summoner.stats.champLevel}
                    </div>
                </div>
                <div class="row">
                    <div title="Spells" class="col-md-2">
                        {this.getSpells(this.champion.key)}
                    </div>
                    <div title="Items" class="col-md-2">
                        TODO: summoner tiems
                    </div>
                    <div title="items-bought" class="col-md-2">
                        TODO: items-bought
                    </div>
                    <div title="total-creep" class="col-md-4">
                        TODO: total-creep
                    </div>
                    <div title="CPM" class="col-md-2">
                        TODO: creep per min
                    </div>
                </div>
            </div>
        );
    }
}

/** important
 *
 game duration
 outcome (victory or defeat)
 summoner name
 champion name
 champion level in the match
 summoner spells
 K/DA
 items bought during the match (names should be fine don't need any icons)
 summoner runes


total creep score
creep score per minute (total creeps divided by game duration)
 */