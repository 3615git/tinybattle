import React from 'react'
import PropTypes from 'prop-types'

import Item from './Item'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const propTypes = {
  data: PropTypes.object.isRequired
}

const defaultProps = {}

const PlayerItems = ({ data }) => {

  // Component styling
  const defaultClasses = `playerItems`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Display component
  return (
    <div className={itemClasses}>
      <div className="attack">
        <Item item="weapon" />
        <span>+2</span>
      </div>
      <div className="speed">
        <Item item="ring" />
        <span>+3</span>
      </div>
      <div className="armor">
        <Item item="armor" />
        <span>+1</span>
      </div>
      <div className="magic">
        <Item item="wand" />
        <span>+2</span>
      </div>
      <div className="luck">
        <Item item="trinket" />
        <span>+2</span>
      </div>
    </div>
  )
}

// Applying propTypes definition and default values
PlayerItems.propTypes = propTypes
PlayerItems.defaultProps = defaultProps

// Exporting as default
export default PlayerItems
