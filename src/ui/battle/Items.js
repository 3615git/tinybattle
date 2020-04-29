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

  function checkLegacy(type, char, legacy) {
    let effect
    if (legacy && legacy[type] && legacy[type][char]) effect = `legacy`
    return effect
  }

  console.log(data)

  // Display component
  return (
    <div className={itemClasses}>
      <Item item={activePlayer.items.STR} effect={checkLegacy(`items`, `STR`, data.game.legacy)} />
      <Item item={activePlayer.items.DEX} effect={checkLegacy(`items`, `DEX`, data.game.legacy)} />
      <Item item={activePlayer.items.CON} effect={checkLegacy(`items`, `CON`, data.game.legacy)} />
      <Item item={activePlayer.items.MAG} effect={checkLegacy(`items`, `MAG`, data.game.legacy)} />
      <Item item={activePlayer.items.LCK} effect={checkLegacy(`items`, `LCK`, data.game.legacy)} />
    </div>
  )
}

// Applying propTypes definition and default values
Items.propTypes = propTypes
Items.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps)(Items)
