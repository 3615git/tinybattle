import React from 'react'
import PropTypes from 'prop-types'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const propTypes = {
  item: PropTypes.string,
  level: PropTypes.number,
  small: PropTypes.bool
}

const defaultProps = {
  small: false
}

const ItemVisual = ({ item, level, small }) => {

  // Component styling
  const defaultClasses = `item`
  // Item reference
  const itemReference = item+'_'+level
  // Size
  const itemSize = small ? `small` : ``
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses, itemReference, itemSize].filter(val => val).join(` `)

  // Display component
  if (item && level) return (
    <div className={itemClasses} />
  ) 
  else return null
}

// Applying propTypes definition and default values
ItemVisual.propTypes = propTypes
ItemVisual.defaultProps = defaultProps

// Exporting as default
export default ItemVisual
