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

function renderItem(STAT) {
  if (STAT && STAT.type && STAT.id && STAT.score) return (
    <div className="position-relative">
      {STAT.cost &&
        <div className="itemCost physical">{STAT.cost}</div>
      }
      <Item item={STAT.type} level={STAT.id} />
      <span>+{STAT.score}</span>
    </div>
  ) 
  else return (
    <div />
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
