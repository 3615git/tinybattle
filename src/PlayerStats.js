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
      <div>{data.STR}<span>STR</span></div>
      <div>{data.DEX}<span>DEX</span></div>
      <div>{data.CON}<span>CON</span></div>
      <div>{data.MAG}<span>MAG</span></div>
      <div>{data.LCK}<span>LCK</span></div>
    </div>
  )
}

// Applying propTypes definition and default values
PlayerStats.propTypes = propTypes
PlayerStats.defaultProps = defaultProps

// Exporting as default
export default PlayerStats
