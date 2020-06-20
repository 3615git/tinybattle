import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState, settings  } from '../redux/actions/index'
import { clog } from '../utils/utils'
import { gameSettings } from '../conf/settings'

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
    game: state.game,
    score: state.score,
    loop: state.game.loop
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGameState: payload => dispatch(setGameState(payload)),
    settings: payload => dispatch(settings(payload))
  }
}

class Defeat extends Component {

  constructor(props) {
    super(props)

    const { score } = this.props

    this.state = {
      scoreSubmitted: score.run.scoreSent ? `success` : false
    }
  }

  componentDidMount() {
    const { player, score, loop, settings } = this.props

    if (!score.run.scoreSent) {
      // POST request using fetch with error handling
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          name: player.name,
          run_rounds: score.run.round,
          run_maxlevel: score.run.maxlevel,
          game_runs: score.game.runs,
          game_rounds: score.game.round,
          game_maxlevel: score.game.maxlevel,
          game_battles: score.game.battles.total,
          game_battles_defeats: score.game.battles.defeats,
          game_battles_victories: score.game.battles.victories,
          alltime_runs: score.alltime.runs,
          alltime_rounds: score.alltime.round,
          abyss: loop
        })
      }
  
      fetch(gameSettings.postScoreUrl, requestOptions)
        .then(async response => {
          const data = await response.json();

          this.setState({
            scoreSubmitted: `success`
          })

          // Prevent multiple sending using refresh
          settings({ setting: `submitScore` })
  
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            this.setState({
              scoreSubmitted: `responseError`
            })
            return Promise.reject(error);
          }
        })
        .catch(error => {
          console.error('There was an error!', error);
          this.setState({
            scoreSubmitted: `networkError`
          })
        }
      )
    }
  }

  render() {
    const { setGameState, game, player, score } = this.props
    const { scoreSubmitted } = this.state

    clog(`EndGame screen`, `location`)

    // Submit score botton
    let submitButton = <span>Submitting score...</span>
    if (scoreSubmitted === `success`) submitButton = <span>Score sent !</span>
    else if (scoreSubmitted === `responseError`) submitButton = <span>Score not sent, sorry =[</span>
    else if (scoreSubmitted === `networkError`) submitButton = <span>No internet, score not sent =[</span>

    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          <div className="presentationArea highIndex">
            <div className="victoryWrapper">
              <div className="bigTitle">The End</div>
              <div>Congratulations {player.name} !</div>
              <div className="separator"></div>
              <div className="stats">
                  You reached Abyss level
                  <div className="abyssTitle">{game.level}</div>
              </div>
              <div>Thank you for playing !</div>
            </div>
          </div>
          <div className="actionArea">
            <button className="navigation abyss" onClick={() => setGameState({ state: `resetThenHallOfFame` })}>Hall of fame{submitButton}</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Defeat)
