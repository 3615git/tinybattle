import React, { Component } from 'react'
import { connect } from "react-redux"

import Opponent from '../components/Opponent'
import Infos from '../components/Infos'
import Stats from '../components/Stats'
import Items from '../components/Items'
import Bars from '../components/Bars'
import Actions from '../components/Actions'
import Logs from '../components/Logs'

import '../css/app.css'
import '../css/items.css'

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
    playerTurn: state.playerTurn,
    log: state.log
  }
}

class Battle extends Component {

  // makeLog = (action, roll, special, result) => {
  //   const { player, opponent, playerTurn } = this.props
  //   let activePlayer = playerTurn ? { ...player } : { ...opponent }
  //   let targetPlayer = !playerTurn ? { ...player } : { ...opponent }

  //   const log = {
  //     activePlayer, targetPlayer, action, roll, special, result
  //   }
  //   this.setState({ log })
  // }

  // // Attacks
  // physicalSpecial = () => {
  //   const { player, opponent, playerTurn } = this.props
  //   let activePlayer = playerTurn ? { ...player } : { ...opponent }
  //   let targetPlayer = !playerTurn ? { ...player } : { ...opponent }

  //   let result = activePlayer.STR

  //   // todo : add item bonus

  //   let special
  //   const roll = diceRoll(20)

  //   if (roll <= 3) {
  //     result -= parseInt(diceRoll(6))
  //     special = `fumble`
  //   }
  //   if (roll >= 17) {
  //     result += parseInt(diceRoll(6))
  //     special = `critical`
  //   }

  //   // todo : remove shield/dodge

  //   // Special attack!
  //   result = result * 3

  //   // Final HP count
  //   targetPlayer.hitPoints -= result

  //   // Rage
  //   rage(`physical`, targetPlayer, result)

  //   // Display result
  //   this.makeLog(`physicalSpecial`, roll, special, result)

  //   return {
  //     player: playerTurn ? activePlayer : targetPlayer,
  //     opponent: !playerTurn ? activePlayer : targetPlayer
  //   }
  // }

  // opponentAction = () => {
  //   setTimeout(() => {
  //     this.resolveAction(`physicalAttack`)
  //   }, 1000);
  // }

  // nextRound = () => {
  //   this.setState({
  //     log: null
  //   })
  //   this.refreshGame()
  // }

  // refreshGame = () => {
  //   const { player, opponent } = this.props
  //   let log

  //   // Player lost
  //   if (player.hitPoints <= 0) {
  //     log = player.name + ` is dead.`
  //     this.setState({ log })
  //   }
  //   // Next opponent
  //   else if (opponent.hitPoints <= 0) {
  //     log = opponent.name + ` is dead.`
  //     this.setState({ log })
  //   }
  //   // Keep going
  //   else {
  //     this.setState(prevState => ({
  //       playerTurn: !prevState.playerTurn
  //     }))

  //     if (this.props.playerTurn) this.opponentAction()
  //   }
  // }

  render() {
    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          <Opponent />
          <Logs />
          <Infos />
          <Stats />
          <Items />
          <Bars />
          <Actions />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Battle)
