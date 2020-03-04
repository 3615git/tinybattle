import React, { Component } from 'react'
import Opponent from './Opponent'
import Logs from './Logs'
import Player from './Player'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    const opponent = {
      name: `Gorblog`,
      physicalAttack: this.diceRoll(20),
      hitPoints: this.diceRoll(100),
      magicPoints: 15
    }

    const player = {
      name: `Krapok`,
      physicalAttack: 8,
      hitPoints: 70,
      magicPoints: 40
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
    
    setTimeout(() => {
      this.refreshGame()
    }, 1000)
  }

  // Utils
  diceRoll = (sides) => {
    return Math.floor(Math.random() * sides) + 1
  }

  // Attacks
  physicalAttack = (player) => {
    let attack = player.physicalAttack
    const roll = this.diceRoll(20)

    let log = player.name + ` attacks !`

    if (roll <= 3) {
      attack -= parseInt(this.diceRoll(6))
      log += ` FUMBLE!`
    }
    if (roll >= 17) {
      attack += parseInt(this.diceRoll(6))
      log += ` CRITICAL!`
    }

    this.setState({log})

    return attack
  }

  refreshGame = () => {
    const { player, opponent, playerTurn } = this.state

    // Compute actions
    let activePlayer = !playerTurn ? player : opponent
    let passivePlayer = !playerTurn ? opponent : player

    // Physical attack
    const damage = this.physicalAttack(activePlayer)
    passivePlayer.hitPoints -= damage

    let updatedPlayer = !playerTurn ? activePlayer : passivePlayer
    let updatedOpponent = !playerTurn ? passivePlayer : activePlayer

    this.setState(prevState => ({
      playerTurn: !prevState.playerTurn
    }))

    // Log
    
    // Action resolution
    let log = passivePlayer.name + ` takes ` + damage + ` damage`

    // Dead
    if (passivePlayer.hitPoints <= 0) {
      log = passivePlayer.name + ` is dead`
    }

    setTimeout(() => {
      this.setState(prevState => ({
        player: updatedPlayer,
        opponent: updatedOpponent,
        log
      }))
      if (passivePlayer.hitPoints > 0) setTimeout(() => { this.refreshGame() }, 1000)
    }, 1000)
  }

  render() {
    const { player, opponent, playerTurn, log } = this.state

    return (
      <div className="App">
        <Opponent data={opponent} turn={!playerTurn} />
        <Player data={player} turn={playerTurn} />
        <Logs data={log} />
      </div>
    )
  }
}

export default App