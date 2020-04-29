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

const EndGame = ({ player, opponent }) => {

  // Component styling
  const defaultClasses = `endGame`

  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Player is dead
  if (player.hitPoints <= 0) {
    return (
      <div className={`${itemClasses} active`}>
        Player is dead
      </div>
    ) 
    }
  else if (opponent.hitPoints <= 0) {
    return (
      <div className={`${itemClasses} active`}>
        Opponent is dead
      </div>
    ) 
    }
  // Nothing to display
  else return <div className={itemClasses} />
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(EndGame)
