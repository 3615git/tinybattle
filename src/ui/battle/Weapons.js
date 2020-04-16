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

  // Weapon quality


  // Display component
  return (
    <div className={itemClasses}>
      <div className="item_wrapper physical">
        {activePlayer.weapons.STR 
          ?
            <>
              <div className="itemCost physical">{activePlayer.weapons.STR.cost}</div>
              <Item item={activePlayer.weapons.STR.type} level={activePlayer.weapons.STR.id} />
              <span className={`weaponQuality physical ${activePlayer.weapons.STR.quality}`} />
              <span>{activePlayer.weapons.STR.score}</span>
            </>
          : 
            <>
              <span className="half-transparent">No weapon</span>
            </>
        }

      </div>
      <div className="item_wrapper magical">
        {activePlayer.weapons.MAG 
          ?
            <>
              <div className="itemCost magical">{activePlayer.weapons.MAG.cost}</div>
              <Item item={activePlayer.weapons.MAG.type} level={activePlayer.weapons.MAG.id} />
              <span className={`weaponQuality magical ${activePlayer.weapons.MAG.quality}`} />
              <span>{activePlayer.weapons.MAG.score}</span>
            </>
          :
            <>
              <span className="half-transparent">No weapon</span>
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
