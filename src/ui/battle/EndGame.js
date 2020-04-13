import React from 'react'
import { connect } from "react-redux"

import { setGameState } from '../../redux/actions/index'

/**
  * @desc Display what happened when either player has lost the battle
*/

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
    playerTurn: state.game.playerTurn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGameState: payload => dispatch(setGameState(payload))
  }
}

const EndGame = ({ player, opponent, setGameState }) => {

  // Component styling
  const defaultClasses = `endGame`

  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Player is dead
  if (player.hitPoints <= 0) return (
    <div className={itemClasses}>
      Player is dead
      <button onClick={() => setGameState({ state: `welcome` })}>Start again !</button>
    </div>
  ) 
  else if (opponent.hitPoints <= 0) return (
    <div className={itemClasses}>
      Opponent is dead
      <button onClick={() => setGameState({ state: `battleIntro` })}>Next level !</button>
    </div>
  ) 
  // Nothing to display
  else return null
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(EndGame)
