import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import { attack } from '../redux/actions/index'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const propTypes = {
  type: PropTypes.string.isRequired
}

const defaultProps = {}


const mapStateToProps = state => {
  return {
    data: state.player,
    opponent: state.opponent,
    turn: state.playerTurn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    attack: payload => dispatch(attack(payload))
  }
}

const Action = ({ type, data, opponent, turn, attack }) => {

  // Component styling
  const defaultClasses = `opponentButtonWrapper`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  const portraitStyle = {
    backgroundImage: `url("${opponent.pic}")`,
    backgroundSize: `contain`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center center`
  }

  // Display component
  return (
    <div className={itemClasses} style={portraitStyle} onClick={() => attack({ type: type, mode: `attack` })}>
      <div>Next turn</div>
      <div>{opponent.name}</div>
    </div>
  )
}

// Applying propTypes definition and default values
Action.propTypes = propTypes
Action.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(Action)
