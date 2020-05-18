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

const InstantButton = ({ attack, data }) => {

  // Component styling
  let onClick, icon, buttonClass, charges, label

  if (data) {
    icon = <ItemVisual item={data.type} level={data.id} />
    charges = data.charges
    label = data.label

    // Switch different buttons
    switch (data.effect) {
      case `quickheal`:
        onClick = () => attack({ type: `skill`, mode: `quickheal`, item: data })
        break;
      case `restore`:
        onClick = () => attack({ type: `skill`, mode: `quickheal`, item: data })
        break;
      case `upgrade`:
        onClick = () => attack({ type: `skill`, mode: `upgrade`, item: data })
        break;
      case `damage`:
        onClick = () => attack({ type: `skill`, mode: `damage`, item: data })
        break;
      case `sharpen`:
        onClick = () => attack({ type: `skill`, mode: `sharpen`, item: data })
        break;
      default:
        break;
    }
  } else {
    buttonClass = "disabled"
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
