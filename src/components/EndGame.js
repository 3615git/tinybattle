import React from 'react'
import { connect } from "react-redux"
import { useSpring, animated } from 'react-spring'

/**
  * @desc Display what happened when either player has lost the battle
*/

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
    playerTurn: state.playerTurn
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

  const props = useSpring({ opacity: 1, from: { opacity: 0 } })

  // Player is dead
  if (player.hitPoints <= 0) return (
    <animated.div style={props} className={itemClasses}>
      Player is dead
    </animated.div>
  ) 
  else if (opponent.hitPoints <= 0) return (
    <animated.div style={props} className={itemClasses}>
      Opponent is dead
    </animated.div>
  ) 
  // Nothing to display
  else return null
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(EndGame)
