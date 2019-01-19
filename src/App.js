import React, { Component } from 'react';
import './App.css';
import Match from './Match';

class App extends Component {

  matches = [];

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      summonerName: 'C9 Sneaky',
      start: 0,
      end: 5,
      items: [],
      champions: {},
      championData: {}
    };
  }

  componentDidMount() {
    this.loadMatches();
    this.loadChampions();
  }

  loadMatches() {
    this.setState({ isLoaded: false, error: null })
    fetch('/v1/api/matches/' + this.state.summonerName + '/' + this.state.start + '/' + this.state.end)
      .then(res => res.json())
      .then((result) => {
        if (!result.status) {
          this.setState({
            isLoaded: true,
            items: result,
          });
        } else {
          this.setState({
            isLoaded: true,
            items: [],
            error: result.status
          });
        }
      }, (error) => {

        this.setState({
          isLoaded: true,
          items: [],
          error,
        });
      })
  }

  loadChampions() {
    fetch('/static/data/en_US/champion.json')
      .then(res => res.json())
      .then((result) => {
        let champions = {}
        Object.keys(result.data).forEach((c) => {
          champions[result.data[c].key] = result.data[c]
          this.loadChampion(result.data[c].name);
        })
        this.setState({
          champions: champions
        })
        console.log(champions);
      }, (error) => {
        this.setState({
          error
        });
      })
  }

  loadChampion(name) {
    fetch('/static/data/en_US/champion/'+ name + '.json')
    .then(res => res.json())
    .then((result) => {
      if (result.data) {
        let championData = this.state.championData;
        championData[result.data[name].key] = result.data[name];
        this.setState({
          championData
        })
      }
    }, (error) => {
      this.setState({
        error
      });
    })
  }

  handleSummonerChange = (e) => {
    this.setState({ summonerName: e.target.value, items: [], start: 0, end: 5 });
  }

  handleLoadMatchesClick = (e) => {
    this.loadMatches();
  }

  handleNextClick = (e) => {
    this.setState({
      items: [],
      start: this.state.start + 5,
      end: this.state.end + 5
    });
    this.loadMatches();
  }

  handlePrevClick = (e) => {
    this.setState({
      items: [],
      start: this.state.start - 5,
      end: this.state.end - 5
    });
    this.loadMatches();
  }

  getPagination() {
    let pagination;
    if (this.state.start > 0) {
      pagination =
        <ul class='pagination w-100'>
          <li class="page-item"><a onClick={this.handlePrevClick} class="page-link" href="#">Previous</a></li>
          <li class="page-item"><a onClick={this.handleNextClick} class="page-link" href="#">Next</a></li>
        </ul>;
    } else {
      pagination =
        <ul class='pagination w-100'>
          <li class="page-item"><a onClick={this.handleNextClick} class="page-link" href="#">Next</a></li>
        </ul>
    }
    return pagination;
  }

  render() {
    const { error, isLoaded, items, summonerName, champions, championData } = this.state;
    if (error) {

      return (
        <div>
          <input type="text" value={summonerName} onChange={this.handleSummonerChange} />
          <button onClick={this.handleLoadMatchesClick}>Load Matches</button>
          <div class="alert alert-danger">Error: {error.message}</div>
        </div>
      );
    } else if (!isLoaded) {

      return (
        <div>
          <input type="text" value={summonerName} onChange={this.handleSummonerChange} />
          <button onClick={this.handleLoadMatchesClick}>Load Matches</button>
          <div>Loading...</div>
        </div>
      );

    } else {

      return (
        <div>
          <input type="text" value={summonerName} onChange={this.handleSummonerChange} />
          <button onClick={this.handleLoadMatchesClick}>Load Matches</button>
          <div class="list-group">
            {items.map(item => (
              <Match match={item} summoner={summonerName} champions={champions} championData={championData} />
            ))}
          </div>
          {this.getPagination()}
        </div>
      );
    }
  }
}

export default App;