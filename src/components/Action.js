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
    turn: state.game.playerTurn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    attack: payload => dispatch(attack(payload))
  }
}

const Action = ({ type, data, opponent, turn, attack }) => {

  // Component styling
  const defaultClasses = `buttons`
  const turnClasses = turn ? `turn` : ``
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses, turnClasses].filter(val => val).join(` `)

  // Compute special actions
  let specialPhysical = data.physicalRage === data.maxPhysicalRage
  let specialMagical = data.magicalRage === data.maxMagicalRage

  // Wordings
  let w_Defend, w_Attack, w_Special
  let buttonSpecial, actionSpecial

  function notready() {}

  if (type === `physical`) {
    w_Defend = `Defend`
    w_Attack = `Attack`
    w_Special = `Special`
    buttonSpecial = specialPhysical ? type +" special" : type +" special disabled"
    actionSpecial = specialPhysical ? attack : notready
  } 
  else {
    w_Defend = `Focus`
    w_Attack = `Cast`
    w_Special = `Special`
    buttonSpecial = specialMagical ? type +" special" : type +" special disabled"
    actionSpecial = specialMagical ? attack : notready
  }

  // Display component
  return (
    <div className={itemClasses}>
      <button className={type + " defend"} onClick={() => attack({ type: type, mode: `defend` })}>{w_Defend}</button>
      <button className={type + " attack"} onClick={() => attack({ type: type, mode: `attack` })}>{w_Attack}</button>
      <button className={buttonSpecial} onClick={() => actionSpecial({ type: type, mode: `special` })}>{w_Special}</button>
    </div>
  )
}

// Applying propTypes definition and default values
Action.propTypes = propTypes
Action.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(Action)
