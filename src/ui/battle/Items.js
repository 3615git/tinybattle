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

const Items = ({ data, opponent }) => {

  const activePlayer = opponent ? data.opponent : data.player

  // Component styling
  const defaultClasses = `playerItems`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Display component
  return (
    <div className={itemClasses}>
      <Item item={activePlayer.items.STR} />
      <Item item={activePlayer.items.DEX} />
      <Item item={activePlayer.items.CON} />
      <Item item={activePlayer.items.MAG} />
      <Item item={activePlayer.items.LCK} />
    </div>
  )
}

// Applying propTypes definition and default values
Items.propTypes = propTypes
Items.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps)(Items)
