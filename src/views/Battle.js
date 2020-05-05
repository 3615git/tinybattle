import React, { Component } from 'react'
import { connect } from "react-redux"

import EndGame from '../ui/battle/EndGame'
import Opponent from '../ui/battle/Opponent'
import StatsAndItems from '../ui/battle/StatsAndItems'
import Bars from '../ui/battle/Bars'
import Actions from '../ui/battle/Actions'
import Logs from '../ui/battle/Logs'
import DataLogs from '../ui/battle/DataLogs'
import VibrationWrapper from '../ui/battle/VibrationWrapper'
import { toHit, hitChance } from '../actions/combat/hit'
import { getRandomInt, clog } from "../utils/utils"

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
    const { attack, settings } = this.props
    clearTimeout(this.opponentTurn)
    this.opponentTurn = setTimeout(function() { 
      // Enemy's attack after reflexion delay
      attack({ type: this.opponentAttackChoice(), mode: `attack` }) 
      // Display enemy's attack UI
      this.setState({
        playerTurnUI: false
      })
    }.bind(this), settings.combatSpeed)
  }

  componentDidUpdate(prevProps) {
    const { opponent, player, playerTurn, settings, setGameState } = this.props
    const { battleEnd } = this.state

    // If opponent or player is dead, clear timer
    if (opponent.hitPoints === 0 || player.hitPoints === 0) {
      clearTimeout(this.opponentTurn)
      clearTimeout(this.playerTurn)

      if (!battleEnd) {
        this.setState({
          battleEnd: true
        })
      }

      // If player is dead
      if (player.hitPoints === 0 && !battleEnd) {
        setTimeout(function () {
          setGameState({ state: `defeat` })
        }, 4000)
      }

      // If opponent is dead
      if (opponent.hitPoints === 0 && !battleEnd) {
        clog(`setting timeout`, `stop`)
        setTimeout(function () {
          setGameState({ state: `victory` })
        }, 4000)
      }

      return false
    }

    // If turn changed, and it's opponent turn
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
    const { playerTurnUI } = this.state
    const { game, player, uicolor } = this.props

    clog(`Battle render`, `location`)

    // Low HP
    const hpRange = 10 - Math.round((player.hitPoints * 10) / player.maxHitPoints)

    const playerAreaClass = playerTurnUI ? `playerArea playerTurn danger_${hpRange}` : `playerArea opponentTurn danger_${hpRange}`

    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          <EndGame />
          <VibrationWrapper condition={game.opponentHit}>
            <Opponent color={uicolor} turn={playerTurnUI} />
          </VibrationWrapper>
          <DataLogs />
          <Logs color={uicolor} />
          <VibrationWrapper condition={game.playerHit}>
            <div className={playerAreaClass}>
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
