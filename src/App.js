import React, { Component } from 'react'
import Opponent from './Opponent'
import Logs from './Logs'
import PlayerInfo from './PlayerInfo'
import PlayerStats from './PlayerStats'
import PlayerItems from './PlayerItems'
import PlayerGauge from './PlayerGauge'
import Action from './Action'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    const opponent = {
      name: `Gorblog the Great`,
      STR: this.diceRoll(20),
      DEX: this.diceRoll(20),
      CON: this.diceRoll(10),
      MAG: this.diceRoll(10),
      LCK: this.diceRoll(6),
      hitPoints: 70,
      maxHitPoints: 70,
      physicalRage: 0,
      maxPhysicalRage: 20
    }

    const player = {
      name: `Rémi`,
      xp: 0,
      level: 1,
      STR: 8,
      DEX: 5,
      CON: 2,
      MAG: 3,
      LCK: 2,
      gold: 35,
      hitPoints: 70,
      maxHitPoints: 70,
      magicPoints: 30,
      maxMagicPoints: 30,
      physicalRage: 0,
      maxPhysicalRage: 20,
      magicalRage: 12,
      maxMagicalRage: 30,
    }

    this.state = {
      'opponent': opponent,
      'player': player,
      'playerTurn': true
    }
  }

  componentDidMount() {

  }

  // Utils
  diceRoll = (sides) => {
    return Math.floor(Math.random() * sides) + 1
  }

  makeLog = (action, roll, special, result) => {
    const { player, opponent, playerTurn } = this.state
    let activePlayer = playerTurn ? { ...player } : { ...opponent }
    let targetPlayer = !playerTurn ? { ...player } : { ...opponent }

    const log ={
      activePlayer, targetPlayer, action, roll, special, result
    }
    this.setState({log})
  }

  // Attacks
  physicalAttack = () => {
    const { player, opponent, playerTurn } = this.state
    let activePlayer = playerTurn ? { ...player } : { ...opponent }
    let targetPlayer = !playerTurn ? { ...player } : { ...opponent }

    let result = activePlayer.STR

    // todo : add item bonus

    let special
    const roll = this.diceRoll(20)

    if (roll <= 3) {
      result -= parseInt(this.diceRoll(6))
      special = `fumble`
    }
    if (roll >= 17) {
      result += parseInt(this.diceRoll(6))
      special = `critical`
    }

    // todo : remove shield/dodge

    // Final HP count
    targetPlayer.hitPoints -= result
    
    // Rage
    this.rage(`physical`, targetPlayer, result)

    // Display result
    this.makeLog(`physicalAttack`, roll, special, result)

    return {
      player: playerTurn ? activePlayer : targetPlayer,
      opponent: !playerTurn ? activePlayer : targetPlayer
    }
  }

  physicalSpecial = () => {
    const { player, opponent, playerTurn } = this.state
    let activePlayer = playerTurn ? { ...player } : { ...opponent }
    let targetPlayer = !playerTurn ? { ...player } : { ...opponent }

    let result = activePlayer.STR

    // todo : add item bonus

    let special
    const roll = this.diceRoll(20)

    if (roll <= 3) {
      result -= parseInt(this.diceRoll(6))
      special = `fumble`
    }
    if (roll >= 17) {
      result += parseInt(this.diceRoll(6))
      special = `critical`
    }

    // todo : remove shield/dodge

    // Special attack!
    result = result * 3

    // Final HP count
    targetPlayer.hitPoints -= result
    
    // Rage
    this.rage(`physical`, targetPlayer, result)

    // Display result
    this.makeLog(`physicalSpecial`, roll, special, result)

    return {
      player: playerTurn ? activePlayer : targetPlayer,
      opponent: !playerTurn ? activePlayer : targetPlayer
    }
  }

  // Rage management
  rage = (type, player, value) => {
    if (type === `physical`) {
      player.physicalRage = (player.physicalRage + value > player.maxPhysicalRage) ? player.maxPhysicalRage : player.physicalRage + value
    }
    if (type === `magical`) {
      player.magicalRage = (player.magicalRage + value > player.maxMagicalRage) ? player.maxMagicalRage : player.magicalRage + value
    }

    return player
  }

  resetRage = (type, player) => {
    if (type === `physical`) {
      player.physicalRage = 0
    }
    if (type === `magical`) {
      player.magicalRage = 0
    }

    return player
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
    const { player, opponent } = this.state
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
  
      if (this.state.playerTurn) this.opponentAction()
    }
  }

  render() {
    const { player, opponent, playerTurn, log } = this.state

    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          <PlayerInfo data={player} />
          <Opponent 
            data={opponent} 
            turn={!playerTurn} 
          />
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

export default App