import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import { gameSettings } from "../../conf/settings"
import { attack } from '../../redux/actions/index'
import ItemVisual from './ItemVisual'

/**
  * @desc Instant buttons
*/

const propTypes = {
  type: PropTypes.string
}

const defaultProps = {}

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent
  }
}

function mapDispatchToProps(dispatch) {
  return {
    attack: payload => dispatch(attack(payload))
  }
}

const InstantButton = ({ type, player, opponent, attack, data }) => {

  // Component styling
  let onClick, icon, buttonClass, charges, label

  if (data) {
    icon = <ItemVisual item={data.type} level={data.id} />
    charges = data.charges
    label = data.label
  } else {
    buttonClass = "disabled"
  }

  // Switch different buttons
  switch (type) {
    case `block`:
      onClick = () => attack({ type: `physical`, mode: `defend` })
      buttonClass = ""
      break;
    default:
      break;
  }

  const actionClass = [`instant`, buttonClass].filter(val => val).join(` `)
  
  // Display component
  return (
    <button className={actionClass} onClick={onClick}>
      {charges && <span className="counter">{charges}</span>}
      {label && <span className="power">{label}</span>}
      {icon}
    </button>
  )
}

// Applying propTypes definition and default values
InstantButton.propTypes = propTypes
InstantButton.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(InstantButton)
