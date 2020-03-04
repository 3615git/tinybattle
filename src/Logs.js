import React from 'react'
import PropTypes from 'prop-types'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const propTypes = {
  data: PropTypes.object.isRequired,
  turn: PropTypes.bool.isRequired
}

const defaultProps = {}

const Logs = ({ data }) => {

  // Component styling
  const defaultClasses = `LogsWrapper`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Display component
  return (
    <div className={itemClasses}>
      {data}
    </div>
  )
}

// Applying propTypes definition and default values
Logs.propTypes = propTypes
Logs.defaultProps = defaultProps

// Exporting as default
export default Logs
