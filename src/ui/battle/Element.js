import React from 'react'
import PropTypes from 'prop-types'

/**
  * @desc Item visual
*/

const propTypes = {
  element: PropTypes.string.isRequired
}

const defaultProps = {
}

const Element = ({ element }) => {

  // Component styling
  const defaultClasses = `elementWrapper`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses, element].filter(val => val).join(` `)

  // Display component
  return (
    <span className={itemClasses} />
  )
}

// Applying propTypes definition and default values
Element.propTypes = propTypes
Element.defaultProps = defaultProps

// Exporting as default
export default Element
