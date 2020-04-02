import React from 'react'
import { connect } from "react-redux"

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

  }
}

const EndGame = ({player, opponent, playerTurn }) => {

  // Component styling
  const defaultClasses = `endGame`

  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Player is dead
  if (player.hitPoints <= 0) return (
    <div className={itemClasses}>
      Player is dead
    </div>
  ) 
  else if (opponent.hitPoints <= 0) return (
    <div className={itemClasses}>
      Opponent is dead
    </div>
  ) 
  // Nothing to display
  else return null
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(EndGame)
