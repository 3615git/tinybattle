import React from 'react'
import PropTypes from 'prop-types'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.string
}

const defaultProps = {}

const PlayerGauge = ({ data, type, size }) => {

  // Component styling
  const defaultClasses = `playerGauge`

  // Gauge types
  let value, maxValue
  switch (type) {
    case `hitPoints`:
      value = data.hitPoints
      maxValue = data.maxHitPoints
      break
    case `magicPoints`:
      value = data.magicPoints
      maxValue = data.maxMagicPoints
      break
    case `physicalRage`:
      value = data.physicalRage
      maxValue = data.maxPhysicalRage
      break
    case `magicalRage`:
      value = data.magicalRage
      maxValue = data.maxMagicalRage
      break
    default :
      break
  }

  // Add custom classes to defined classes
  const itemClasses = [defaultClasses, type, size].filter(val => val).join(` `)

  // Compute gauge width
  const indicatorStyle = {
    width: (value*100)/maxValue + `%`
  }
  // Display component
  return (
    <div className={itemClasses}>
      <div className="indicator" style={indicatorStyle} />
    </div>
  )
}

// Applying propTypes definition and default values
PlayerGauge.propTypes = propTypes
PlayerGauge.defaultProps = defaultProps

// Exporting as default
export default PlayerGauge
