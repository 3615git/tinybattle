import React from 'react'
import { connect } from "react-redux"
import sigil from '../pics/ui/sigil.svg'

/**
  * @desc Display turn indicator in the background
  * @todo : return null when not opponent turn (+ transition)
*/

const mapStateToProps = state => {
  return {
    playerTurn: state.game.playerTurn
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const TurnIndicator = ({ playerTurn, color }) => {

  // Component styling
  const defaultClasses = `turnIndicator`
  const turnClasses = playerTurn ? `turn` : ``
  const turnStyle = playerTurn ? {} : { fill: color.darkVibrant }

  // Add custom classes to defined classes
  const itemClasses = [defaultClasses, turnClasses].filter(val => val).join(` `)

  return (
    <div className={itemClasses}>
      <img src={sigil} className="opponent" alt="player turn" style={turnStyle} />
    </div>
  )
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(TurnIndicator)
