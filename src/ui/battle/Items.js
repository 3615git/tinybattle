import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import Item from './Item'

/**
  * @desc items bar for player and opponent
*/

const propTypes = {
  opponent: PropTypes.bool
}

const defaultProps = {
  opponent: false
}

const mapStateToProps = state => {
  return {
    data: state
  }
}

function renderItem(item) {
  if (item && item.type && item.id && item.score) return (
    <div className={`item_wrapper ${item.quality}`}>
      {item.cost &&
        <div className="itemCost physical">{item.cost}</div>
      }
      <Item item={item.type} level={item.id} />
      <span>+{item.score}</span>
    </div>
  ) 
  else return (
    <div className="item_wrapper" />
  )
}

const Items = ({ data, opponent }) => {

  const activePlayer = opponent ? data.opponent : data.player

  // Component styling
  const defaultClasses = `playerItems`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Display component
  return (
    <div className={itemClasses}>
      {renderItem(activePlayer.items.STR)}
      {renderItem(activePlayer.items.DEX)}
      {renderItem(activePlayer.items.CON)}
      {renderItem(activePlayer.items.MAG)}
      {renderItem(activePlayer.items.LCK)}
    </div>
  )
}

// Applying propTypes definition and default values
Items.propTypes = propTypes
Items.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps)(Items)
