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

const Weapons = ({ data, opponent }) => {

  const activePlayer = opponent ? data.opponent : data.player

  // Component styling
  const defaultClasses = `playerWeapons`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Display component
  return (
    <div className={itemClasses}>
      <div className="item_wrapper physical">
        {activePlayer.weapons.STR &&
          <>
            <Item item={activePlayer.weapons.STR.type} level={activePlayer.weapons.STR.id} />
            <span>{activePlayer.weapons.STR.score}</span>
          </>
        }
      </div>
      <div className="item_wrapper magical">
        {activePlayer.weapons.MAG &&
          <>
            <Item item={activePlayer.weapons.MAG.type} level={activePlayer.weapons.MAG.id} />
            <span>{activePlayer.weapons.MAG.score}</span>
          </>
        }
      </div>
    </div>
  )
}

// Applying propTypes definition and default values
Weapons.propTypes = propTypes
Weapons.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps)(Weapons)
