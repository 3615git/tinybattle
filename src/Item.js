import React from 'react'
import PropTypes from 'prop-types'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const propTypes = {
  item: PropTypes.string.isRequired
}

const defaultProps = {}

const Item = ({ item }) => {

  // Component styling
  const defaultClasses = `item`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses, item].filter(val => val).join(` `)

  // Display component
  return (
    <div className={itemClasses} />
  )
}

// Applying propTypes definition and default values
Item.propTypes = propTypes
Item.defaultProps = defaultProps

// Exporting as default
export default Item
