import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import { attack, settings } from '../../redux/actions/index'
import ItemVisual from './ItemVisual'

/**
  * @desc Instant buttons
*/

const propTypes = {
  id: PropTypes.number
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
    attack: payload => dispatch(attack(payload)),
    settings: payload => dispatch(settings(payload))
  }
}

const InstantButton = ({ id, attack, settings, data, onSell }) => {

  // Component styling
  let onClick, icon, buttonClass, charges, label

  if (data) {
    icon = <ItemVisual item={data.type} level={data.id} />
    charges = data.charges
    label = data.label

    // Switch different buttons
    switch (data.effect) {
      case `quickheal`:
        onClick = () => attack({ type: `skill`, mode: `quickheal`, item: data, id: id })
        break;
      case `upgrade`:
        onClick = () => attack({ type: `skill`, mode: `upgrade`, item: data, id: id })
        break;
      case `restore`:
        onClick = () => attack({ type: `skill`, mode: `restore`, item: data, id: id })
        break;
      case `damage`:
        onClick = () => attack({ type: `skill`, mode: `damage`, item: data, id: id })
        break;
      case `sharpen`:
        onClick = () => attack({ type: `skill`, mode: `sharpen`, item: data, id: id })
        break;
      default:
        break;
    }
    // Shop mode override
    if (onSell) {
      onClick = () => onSell(id, data)
    }
  } else {
    buttonClass = "disabled"
  }

  const actionClass = [`instant`, buttonClass].filter(val => val).join(` `)
  
  // Display component
  if (onSell && data) {
    return (
      <div className="storeItemWrapper">
        <button className={actionClass} onClick={onClick}>
          {charges > 0 && <span className="counter">{charges}</span>}
          {label && <span className="power">{label}</span>}
          {icon}
        </button>
        <span className="itemPrice"><ItemVisual item="coins" level={5} small />{data.reward}</span>
      </div>
    )
  } else {
    return (
      <button className={actionClass} onClick={onClick}>
        {charges > 0 && <span className="counter">{charges}</span>}
        {label && <span className="power">{label}</span>}
        {icon}
      </button>
    )
  }
}

// Applying propTypes definition and default values
InstantButton.propTypes = propTypes
InstantButton.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(InstantButton)
