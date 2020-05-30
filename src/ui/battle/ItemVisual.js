import React from 'react'
import PropTypes from 'prop-types'

/**
  * @desc Item visual
*/

const propTypes = {
  item: PropTypes.string,
  level: PropTypes.number,
  small: PropTypes.bool,
  big: PropTypes.bool
}

const defaultProps = {
  small: false,
  big: false
}

const ItemVisual = ({ item, level, small, big }) => {

  // Component styling
  const defaultClasses = `item`
  // Item reference
  const itemReference = item+'_'+level
  // Size
  const itemSize = small ? `small` : ``
  const itemSizeBig = big ? `big` : ``
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses, itemReference, itemSize, itemSizeBig].filter(val => val).join(` `)
  // Display component
  if (item && (typeof level === "number")) return (
    <span className={itemClasses} />
  ) 
  else return null
}

// Applying propTypes definition and default values
ItemVisual.propTypes = propTypes
ItemVisual.defaultProps = defaultProps

// Exporting as default
export default ItemVisual
