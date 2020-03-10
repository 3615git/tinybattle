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

const PlayerInfo = ({ data }) => {

  // Component styling
  const defaultClasses = `playerInfo`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Display component
  return (
    <div className={itemClasses}>
      <div>{data.gold} Gold</div>
      <div>{data.name}</div>
      <div>Level {data.level} - {data.xp} xp</div>
    </div>
  )
}

// Applying propTypes definition and default values
PlayerInfo.propTypes = propTypes
PlayerInfo.defaultProps = defaultProps

// Exporting as default
export default PlayerInfo
