import React from 'react'
import PropTypes from 'prop-types'

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
      <div>WPN</div>
      <div>STF</div>
      <div>SLD</div>
      <div>NKL</div>
      <div>ITM</div>
    </div>
  )
}

// Applying propTypes definition and default values
PlayerItems.propTypes = propTypes
PlayerItems.defaultProps = defaultProps

// Exporting as default
export default PlayerItems
