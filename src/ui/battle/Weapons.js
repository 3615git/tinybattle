import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import Item from './Item'

/**
  * @desc magical and physical weapons
*/

const propTypes = {
  opponent: PropTypes.bool
}

const defaultProps = {

}

const mapStateToProps = state => {
  return {
    data: state
  }
}

const Weapons = ({ data, opponent, forceData }) => {

  let activePlayer = opponent ? data.opponent : data.player

  // Override store
  if (forceData) activePlayer = forceData

  // Component styling
  const defaultClasses = `playerWeapons`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Weapon quality


  // Display component
  return (
    <div className={itemClasses}>
      <Item item={activePlayer.weapons.STR} />
      <Item item={activePlayer.weapons.MAG} />
    </div>
  )
}

// Applying propTypes definition and default values
Weapons.propTypes = propTypes
Weapons.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps)(Weapons)
