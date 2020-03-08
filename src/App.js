import React, { Component } from 'react'
import Opponent from './Opponent'
import Logs from './Logs'
import PlayerInfo from './PlayerInfo'
import PlayerStats from './PlayerStats'
import PlayerItems from './PlayerItems'
import PlayerGauge from './PlayerGauge'
import PlayerAttack from './PlayerAttack'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    const opponent = {
      name: `Gorblog`,
      physicalAttack: this.diceRoll(20),
      magicalAttack: this.diceRoll(20),
      hitPoints: 70,
      maxHitPoints: 70
    }

    const player = {
      name: `Krapok`,
      level: 1,
      xp: 0,
      gold: 35,
      physicalAttack: 8,
      magicalAttack: 5,
      physicalResistance: 2,
      magicalResistance: 3,
      luck: 2,
      hitPoints: 70,
      maxHitPoints: 70,
      magicPoints: 30,
      maxMagicPoints: 30,
      physicalRage: 4,
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
    this.setState(prevState => ({
      log: `Go!`
    }))
  }

  // Utils
  diceRoll = (sides) => {
    return Math.floor(Math.random() * sides) + 1
  }

  // Attacks
  physicalAttack = () => {
    const { player, opponent, playerTurn } = this.state
    let activePlayer = playerTurn ? { ...player } : { ...opponent }
    let targetPlayer = !playerTurn ? { ...player } : { ...opponent }

    let attack = activePlayer.physicalAttack
    const roll = this.diceRoll(20)

    let log = activePlayer.name + ` attacks !`

    if (roll <= 3) {
      attack -= parseInt(this.diceRoll(6))
      log += ` FUMBLE!`
    }
    if (roll >= 17) {
      attack += parseInt(this.diceRoll(6))
      log += ` CRITICAL!`
    }

    // Action resolution
    log += targetPlayer.name + ` takes ` + attack + ` damage!`

    // New HP count
    targetPlayer.hitPoints -= attack
    
    this.setState({log})

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
      default:
        break;
    }

    // Log and apply
    this.setState(prevState => ({
      player: updatedData.player,
      opponent: updatedData.opponent
    }))

    // Next player
    setTimeout(() => { this.refreshGame() }, 1000)
  }

  opponentAction = () => {
    const { playerTurn } = this.state
    if (!playerTurn) this.resolveAction(`physicalAttack`)
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
  
      if (!this.state.playerTurn) this.opponentAction()
    }
  }

  render() {
    const { player, opponent, playerTurn, log } = this.state

    return (
      <div className="mainWrapper rpgui-container">
        <div className="appWrapper rpgui-content">
          <PlayerInfo data={player} />
          <Opponent data={opponent} turn={!playerTurn} />
          <PlayerStats data={player} />
          <PlayerItems data={player} />
          <PlayerGauge data={player} type="hitPoints" />
          <PlayerGauge data={player} type="physicalRage" />
          <PlayerGauge data={player} type="magicPoints" />
          <PlayerGauge data={player} type="magicalRage" />
          <PlayerAttack type="physical" data={player} actions={this.resolveAction} turn={playerTurn} />
          <PlayerAttack type="magical" data={player} actions={this.resolveAction} turn={playerTurn} />
          <Logs data={log} />
        </div>
      </div>
    )
  }
}

export default App