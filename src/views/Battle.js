import React, { Component } from 'react'
import { connect } from "react-redux"

import Opponent from '../components/Opponent'
import Logs from '../components/Logs'
import PlayerInfo from '../components/PlayerInfo'
import PlayerStats from '../components/PlayerStats'
import PlayerItems from '../components/PlayerItems'
import PlayerGauge from '../components/PlayerGauge'
import Action from '../components/Action'
import { diceRoll } from '../utils/utils'
import { rage } from '../combat/rage'
import '../css/app.css'
import '../css/items.css'

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
    playerTurn: state.playerTurn
  }
}

class Battle extends Component {

  makeLog = (action, roll, special, result) => {
    const { player, opponent, playerTurn } = this.props
    let activePlayer = playerTurn ? { ...player } : { ...opponent }
    let targetPlayer = !playerTurn ? { ...player } : { ...opponent }

    const log = {
      activePlayer, targetPlayer, action, roll, special, result
    }
    this.setState({ log })
  }

  // Attacks
  physicalAttack = () => {
    const { player, opponent, playerTurn } = this.props
    let activePlayer = playerTurn ? { ...player } : { ...opponent }
    let targetPlayer = !playerTurn ? { ...player } : { ...opponent }

    let result = activePlayer.STR

    // todo : add item bonus

    let special
    const roll = diceRoll(20)

    if (roll <= 3) {
      result -= parseInt(diceRoll(6))
      special = `fumble`
    }
    if (roll >= 17) {
      result += parseInt(diceRoll(6))
      special = `critical`
    }

    // todo : remove shield/dodge

    // Final HP count
    targetPlayer.hitPoints -= result

    // Rage
    rage(`physical`, targetPlayer, result)

    // Display result
    this.makeLog(`physicalAttack`, roll, special, result)

    return {
      player: playerTurn ? activePlayer : targetPlayer,
      opponent: !playerTurn ? activePlayer : targetPlayer
    }
  }

  physicalSpecial = () => {
    const { player, opponent, playerTurn } = this.props
    let activePlayer = playerTurn ? { ...player } : { ...opponent }
    let targetPlayer = !playerTurn ? { ...player } : { ...opponent }

    let result = activePlayer.STR

    // todo : add item bonus

    let special
    const roll = diceRoll(20)

    if (roll <= 3) {
      result -= parseInt(diceRoll(6))
      special = `fumble`
    }
    if (roll >= 17) {
      result += parseInt(diceRoll(6))
      special = `critical`
    }

    // todo : remove shield/dodge

    // Special attack!
    result = result * 3

    // Final HP count
    targetPlayer.hitPoints -= result

    // Rage
    rage(`physical`, targetPlayer, result)

    // Display result
    this.makeLog(`physicalSpecial`, roll, special, result)

    return {
      player: playerTurn ? activePlayer : targetPlayer,
      opponent: !playerTurn ? activePlayer : targetPlayer
    }
  }

  resolveAction = (action) => {
    // Todo : disable all action buttons

    // Compute new data
    let updatedData
    switch (action) {
      case `physicalAttack`:
        updatedData = this.physicalAttack()
        break;
      case `physicalSpecial`:
        updatedData = this.physicalSpecial()
        break;
      default:
        break;
    }

    // Log and apply
    this.setState(prevState => ({
      player: updatedData.player,
      opponent: updatedData.opponent
    }))
  }

  opponentAction = () => {
    setTimeout(() => {
      this.resolveAction(`physicalAttack`)
    }, 1000);
  }

  nextRound = () => {
    this.setState({
      log: null
    })
    this.refreshGame()
  }

  refreshGame = () => {
    const { player, opponent } = this.props
    let log

    // Player lost
    if (player.hitPoints <= 0) {
      log = player.name + ` is dead.`
      this.setState({ log })
    }
    // Next opponent
    else if (opponent.hitPoints <= 0) {
      log = opponent.name + ` is dead.`
      this.setState({ log })
    }
    // Keep going
    else {
      this.setState(prevState => ({
        playerTurn: !prevState.playerTurn
      }))

      if (this.props.playerTurn) this.opponentAction()
    }
  }

  render() {
    const { player, opponent, playerTurn, log } = this.props

    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          <PlayerInfo data={player} />
          <Opponent />
          <PlayerStats data={player} />
          <PlayerItems data={player} />
          <div className="playerGaugeWrapper">
            <div>
              <PlayerGauge data={player} type="hitPoints" />
              <PlayerGauge data={player} type="physicalRage" />
            </div>
            <div>
              <PlayerGauge data={player} type="magicPoints" />
              <PlayerGauge data={player} type="magicalRage" />
            </div>
          </div>
          <div className="actionWrapper">
            <Action type="physical" data={player} actions={this.resolveAction} turn={playerTurn} />
            <Action type="magical" data={player} actions={this.resolveAction} turn={playerTurn} />
          </div>
        </div>
        {log &&
          <Logs data={log} onClick={this.nextRound} />
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Battle)
