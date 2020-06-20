import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState, settings  } from '../redux/actions/index'
import { clog } from '../utils/utils'
import { gameSettings } from '../conf/settings'

import death from '../pics/ui/death.png'

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
    const { player, loop, score, settings } = this.props

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
          loop: loop
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
    const { setGameState, player, score } = this.props
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
              <div className="bigTitle">You won !</div>
              <div>All hail the mighty {player.name} !</div>
              <div className="separator"></div>
              <div className="stats">
                <table>
                  <tbody>
                    <tr>
                      <td>Runs</td>
                      <td>{score.game.runs}</td>
                    </tr>
                    <tr>
                      <td>Battles</td>
                      <td>{score.game.battles.total} ({score.game.battles.defeats} lost)</td>
                    </tr>
                    <tr>
                      <td>Rounds</td>
                      <td>{score.game.round}</td>
                    </tr>
                    <tr>
                      <td>Damage dealt</td>
                      <td>{score.game.damage}</td>
                    </tr>
                    <tr>
                      <td>Physical damage</td>
                      <td><span className="physicaldamage">{score.game.action.attack.damage}</span> ({score.game.action.attack.total})</td>
                    </tr>
                    <tr>
                      <td>Magical damage</td>
                      <td><span className="magicaldamage">{score.game.action.cast.damage}</span> ({score.game.action.cast.total})</td>
                    </tr>
                    <tr>
                      <td>Health restored</td>
                      <td>{score.game.heal}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>Congratulations ! <br /><br />But the <span className="element_darkness">Abyss of Permadeath</span> awaits...</div>
            </div>
          </div>
          <div className="actionArea">
            <button className="navigation" onClick={() => setGameState({ state: `hallOfFame` })}>Hall of fame{submitButton}</button>
            <button className="navigation abyss picture" onClick={() => setGameState({ state: `nextLoop` })}><img src={death} alt="The Abyss of Permadeath"/>Enter the Abyss</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Defeat)
