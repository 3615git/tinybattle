import React, { Component } from 'react'
import { connect } from "react-redux"

import EndGame from '../ui/battle/EndGame'
import Opponent from '../ui/battle/Opponent'
import StatsAndItems from '../ui/battle/StatsAndItems'
import Bar from '../ui/battle/Bar'
import Actions from '../ui/battle/Actions'
import Logs from '../ui/battle/Logs'
import DataLogs from '../ui/battle/DataLogs'
import VibrationWrapper from '../ui/battle/VibrationWrapper'
import { toHit, hitChance } from '../actions/combat/hit'
import { getRandomInt, clog } from "../utils/utils"
import { findBuff } from '../actions/combat/stats'

import { setGameState, attack } from '../redux/actions/index'

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
    playerTurn: state.game.playerTurn,
    game: state.game,
    settings: state.game.settings,
    log: state.log,
    uicolor: state.game.uicolor
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
      playerTurnUI: this.props.playerTurn
    }
  }

  // Alternate turn UI and battle mode
  changeTurn = () => {
    const { opponent, game, attack, setGameState } = this.props
    
    if (game.playerTurn || game.skipTurn) {
      // Display player's attack UI
      this.setState({
        playerTurnUI: true
      })
      // Reset log to "your turn" state
      setGameState({ state: `playerTurn` })
    } else {
      // Enemy's attack after reflexion delay, if not stunned
      if (findBuff(opponent, `temporary`, `STUN`)) {
        attack({ type: `skip` })
      }
      else {
        attack({ type: this.opponentAttackChoice(), mode: `attack` })
      }
      // Display enemy's attack UI
      this.setState({
        playerTurnUI: false
      })
    }
  }

  // Skip timer
  skipTurnChange = () => {
    clearTimeout(this.opponentTurn)
    clearTimeout(this.playerTurn)
    this.changeTurn()
  }
 
  opponentAttackChoice = () => {
    const { opponent, player } = this.props
    let attackType
    
    // Opponent is humanoid or beast ?
    if (opponent.humanoid) {
      let physicalHitChance = hitChance(toHit(opponent, player, `physical`))
      let magicalHitChance = hitChance(toHit(opponent, player, `magical`))
      const hasSTRWeapon = opponent.weapons.STR
      const hasMAGWeapon = opponent.weapons.MAG
      // If weapon, motivation is 30% better than "naked" hit
      if (hasSTRWeapon) physicalHitChance += 30
      if (hasMAGWeapon) magicalHitChance += 30
      // Motivation rule
      const totalMotivation = physicalHitChance + magicalHitChance
      const physicalMotivation = Math.round(physicalHitChance * 100 / totalMotivation)
      const roll = getRandomInt(1, 100)
      // Temporary basic system
      if (roll <= physicalMotivation) attackType = `physical`
      else attackType = `magical`
    } else {
      // Beasts just attack
      attackType  = `physical`
    }

    return attackType
  }

  launchOpponentTurn = () => {
    const { settings, log } = this.props

    // Slow logs needs more time
    let waitTime
    if (log.delay === `long`) {
      waitTime = settings.combatSpeed * 1.5
    } else {
      waitTime = settings.combatSpeed
    }

    clearTimeout(this.opponentTurn)
    this.opponentTurn = setTimeout(function() { 
      this.changeTurn()
    }.bind(this), waitTime)
  }

  componentDidUpdate(prevProps) {
    const { opponent, player, playerTurn, settings, game } = this.props
    const { battleEnd } = this.state

    // If opponent or player is dead, clear timer
    if (opponent.hitPoints === 0 || player.hitPoints === 0) {
      clearTimeout(this.opponentTurn)
      clearTimeout(this.playerTurn)

      if (!battleEnd) {
        this.endGame = setTimeout(function () {
          this.setState({
            battleEnd: true
          })
        }.bind(this), 2000)
      }

      return false
    }

    // If turn changed, and it's opponent turn
    if (prevProps.playerTurn !== playerTurn && playerTurn === false && !game.skipTurn) {
      this.launchOpponentTurn()
    }

    // If turn changed and it's player's turn
    if (prevProps.playerTurn !== playerTurn && playerTurn === true) {
      clearTimeout(this.playerTurn)
      this.playerTurn = setTimeout(function () {
        this.changeTurn()
      }.bind(this), settings.combatSpeed)
    }
  }

  componentWillUnmount() {
    // Clear timers
    clearTimeout(this.opponentTurn)
    clearTimeout(this.playerTurn)
    clearTimeout(this.endGame)

  }

  render() {
    const { playerTurnUI, battleEnd } = this.state
    const { game, player, uicolor } = this.props

    clog(`Battle render`, `location`)

    // Low HP
    const hpRange = 10 - Math.round((player.hitPoints * 10) / player.maxHitPoints)

    const playerAreaClass = playerTurnUI ? `playerArea playerTurn danger_${hpRange}` : `playerArea opponentTurn danger_${hpRange}`

    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          <EndGame display={battleEnd} />
          <VibrationWrapper condition={game.opponentHit}>
            <Opponent color={uicolor} turn={playerTurnUI} />
          </VibrationWrapper>
          <DataLogs />
          <Logs color={uicolor} skip={this.skipTurnChange} />
          <VibrationWrapper condition={game.playerHit}>
            <div className={playerAreaClass}>
              <Bar type="hitPoints" />
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
