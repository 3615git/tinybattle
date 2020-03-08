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

const PlayerStats = ({ data }) => {

  // Component styling
  const defaultClasses = `playerStats`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Display component
  return (
    <div className={itemClasses}>
      <div>{data.physicalAttack}</div>
      <div>{data.magicalAttack}</div>
      <div>{data.physicalResistance}</div>
      <div>{data.magicalResistance}</div>
      <div>{data.luck}</div>
    </div>
  )
}

// Applying propTypes definition and default values
PlayerStats.propTypes = propTypes
PlayerStats.defaultProps = defaultProps

// Exporting as default
export default PlayerStats
