import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState } from '../redux/actions/index'
import { gameSettings } from '../conf/settings'

import death from '../pics/ui/death.png'

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
    playerTurn: state.game.playerTurn,
    log: state.log,
    score: state.score,
    game: state.game
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGameState: payload => dispatch(setGameState(payload))
  }
}

class HallOfFame extends Component {

  constructor(props) {
    super(props)
    const { game } = this.props

    this.state = {
      scoreTab: game.previousState === `permadeath` ? `abyss` : `run`
    }
  }

  async componentDidMount() {
    // GET request using fetch with error handling
    try {
      const response = await fetch(gameSettings.getScoreUrl);
      const json = await response.json();
      this.setState({ score: json });

      if (!response.ok) {
        throw Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }

  changeTab = (tab) => {
    // Update state
    this.setState({
      scoreTab: tab
    })
  }

  parseScore = (mode) => {
    const { score } = this.state

    if (!score) {
      return <div className="loading">Loading scores, please wait!</div>
    } else {
      // Parse score data
      let scores = []
      let scoresHeader

      switch (mode) {
        case `run`:
          scoresHeader = (
            <>
              <span className="name">Name</span>
              <span className="">Level</span>
              <span className="">Rounds</span>
              <span className="">Run #</span>
            </>
          )

          for (let index = 0; index < score.run.length; index++) {
            const element = score.run[index];
            let levelStyle = { filter: `hue-rotate(${Math.round(element.run_maxlevel * (360 / gameSettings.maxLevel))}deg)` }

            scores.push(
              <div className="score" key={`score_run_${index}`}>
                <span className="name">{element.name}</span>
                <span className="level" style={levelStyle}>{element.run_maxlevel}</span>
                <span className="">{element.run_rounds}</span>
                <span className="">{element.game_runs}</span>
              </div>
            )
          }
          break;

        case `game`:
          scoresHeader = (
            <>
              <span className="name">Name</span>
              <span className="">Level</span>
              <span className="">Runs</span>
              <span className="">Battles</span>
            </>
          )

          for (let index = 0; index < score.game.length; index++) {
            const element = score.game[index];
            let levelStyle = { filter: `hue-rotate(${Math.round(element.game_maxlevel * (360 / gameSettings.maxLevel))}deg)` }

            scores.push(
              <div className="score" key={`score_game_${index}`}>
                <span className="name">{element.name}</span>
                <span className="level" style={levelStyle}>{element.game_maxlevel}</span>
                <span className="">{element.game_runs}</span>
                <span className="">{element.game_battles}</span>
              </div>
            )
          }
          break;

        case `abyss`:
          scoresHeader = (
            <>
              <span className="name">Name</span>
              <span className="">Abyss level</span>
            </>
          )

          for (let index = 0; index < score.alltime.length; index++) {
            const element = score.game[index];
            let levelStyle = { filter: `hue-rotate(${Math.round(element.game_maxlevel * (360 / gameSettings.maxLevel))}deg)` }

            scores.push(
              <div className="score">
                <span className="name">{element.name}</span>
                <span className="level" style={levelStyle}>{element.game_maxlevel}</span>
              </div>
            )
          }
          break;
      
        default:
          break;
      }

      return [
        <div className="scoreTitle columns" key="score_title">{scoresHeader}</div>,
        <div className="hallList" key="score_list">
          <div className="hallListContent columns">
            {scores}
          </div>
        </div>
      ]
    }
  }

  render() {

    const { setGameState, game } = this.props
    const { scoreTab } = this.state
    
    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          <div className="presentationArea">
            <div className="hall">
              <span className="title">Hall of Fame</span>
              <div className="hallTabs">
                <button className={scoreTab !== `run` ? `off` : `on`} onClick={() => this.changeTab(`run`)}>
                  Best run<span>Single run</span>
                </button>
                <button className={scoreTab !== `game` ? `off` : `on`} onClick={() => this.changeTab(`game`)}>
                  Best game<span>Multiple runs</span>
                </button>
                <button className={scoreTab !== `abyss` ? `off` : `on`} onClick={() => this.changeTab(`abyss`)}>
                  Abyss<span>of Permadeath</span>
                </button>
              </div>
              {scoreTab === `run` && this.parseScore(`run`)}
              {scoreTab === `game` && this.parseScore(`game`)}
              {scoreTab === `abyss` && this.parseScore(`abyss`)}
            </div>
          </div>
          <div className="actionArea">
            {game.previousState === `welcome` && <button className="navigation" onClick={() => setGameState({ state: `welcome_keepQuitState` })}>Back</button>}
            {game.previousState === `defeat` && <button className="navigation" onClick={() => setGameState({ state: `welcome` })}>Start again !</button>}
            {game.previousState === `permadeath` && <button className="navigation" onClick={() => setGameState({ state: `welcome` })}>Start again !</button>}
            {game.previousState === `endgame` && <button className="navigation picture abyss" onClick={() => setGameState({ state: `nextLoop` })}><img src={death} alt="The Abyss of Permadeath"/>Enter the Abyss</button>}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HallOfFame)
