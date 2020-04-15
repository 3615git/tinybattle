import React, { Component } from 'react'
import { connect } from "react-redux"
import * as Vibrant from 'node-vibrant'

import EndGame from '../ui/battle/EndGame'
import Opponent from '../ui/battle/Opponent'
import StatsAndItems from '../ui/battle/StatsAndItems'
import Bars from '../ui/battle/Bars'
import Actions from '../ui/battle/Actions'
import Logs from '../ui/battle/Logs'
import VibrationWrapper from '../ui/battle/VibrationWrapper'

import { setGameState, attack } from '../redux/actions/index'

import '../css/app.css'
import '../css/battle_logs.scss'
import '../css/battle_stats.scss'
import '../css/items.scss'
import '../css/animations.css'

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
    playerTurn: state.game.playerTurn,
    game: state.game,
    settings: state.game.settings,
    log: state.log
  }
}

function mapDispatchToProps(dispatch) {
  return {
    attack: payload => dispatch(attack(payload)),
    setGameState: payload => dispatch(setGameState(payload))
  }
}

class Battle extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playerTurnUI: this.props.playerTurn,
      playerHitpoints: this.props.player.hitPoints,
      opponentHitpoints: this.props.opponent.hitPoints,
      monstercolor: {
        vibrant: `black`,
        darkVibrant: `rgba(0, 0, 0, 0.4)`,
        darkMuted: `rgba(0, 0, 0, 0.4)`
      }
    }
  }

  fetchPalette = (imgSrc) => {
    Vibrant.from(imgSrc).getPalette()
      .then(palette => {
        this.setState({
          monstercolor: {
            vibrant: palette.Vibrant.getHex(),
            darkVibrant: palette.DarkVibrant.getHex(),
            darkMuted: palette.DarkMuted.getHex()
          }
        })
      })
  }

  launchOpponentTurn = () => {
    const { attack, settings } = this.props
    clearTimeout(this.opponentTurn)
    this.opponentTurn = setTimeout(function() { 
      // Enemy's attack after reflexion delay
      attack({ type: `physical`, mode: `attack` }) 
      // Display enemy's attack UI
      this.setState({
        playerTurnUI: false
      })
    }.bind(this), settings.combatSpeed)
  }

  componentDidMount() {
    const { opponent } = this.props
    this.fetchPalette(opponent.pic)
  }

  componentDidUpdate(prevProps) {
    const { opponent, playerTurn, settings, setGameState } = this.props
    // If opponent is dead, clear timer
    if (opponent.hitPoints === 0) clearTimeout(this.opponentTurn)

    // If turn changed and it's opponent turn
    if (prevProps.playerTurn !== playerTurn && playerTurn === false) {
      this.launchOpponentTurn();
    }

    // If turn changed and it's player's turn
    if (prevProps.playerTurn !== playerTurn && playerTurn === true) {
      clearTimeout(this.playerTurn)
      this.playerTurn = setTimeout(function () {
        // Display player's attack UI
        this.setState({
          playerTurnUI: true
        })
        // Reset log to "your turn" state
        setGameState({ state: `playerTurn` })
      }.bind(this), settings.combatSpeed)
    }
  }

  componentWillUnmount() {
    // Clear opponent's turn timer
    if (this.opponentTurn) {
      clearTimeout(this.opponentTurn)
      clearTimeout(this.playerTurn)
    }
  }

  render() {
    const { monstercolor, playerTurnUI } = this.state
    const { game } = this.props

    const playerAreaClass = playerTurnUI ? `playerArea playerTurn` : `playerArea opponentTurn`

    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          <EndGame />
          <VibrationWrapper condition={game.opponentHit}>
            <Opponent color={monstercolor} turn={playerTurnUI} />
          </VibrationWrapper>
          <Logs color={monstercolor} />
          <VibrationWrapper condition={game.playerHit}>
            <div className={playerAreaClass}>
              {/* <Infos /> */}
              <Bars />
              <StatsAndItems />
              <Actions />
            </div>
          </VibrationWrapper>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Battle)
