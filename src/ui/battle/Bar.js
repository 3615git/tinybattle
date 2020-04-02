import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const propTypes = {
  type: PropTypes.string.isRequired,
  opponent: PropTypes.bool,
  color: PropTypes.string
}

const defaultProps = {
  opponent: false
}

const mapStateToProps = state => {
  return {
    connectedData: state
  }
}

const Bar = ({ connectedData, type, opponent, color }) => {
  // Current player
  const data = opponent ? connectedData.opponent : connectedData.player

  // Component styling
  const defaultClasses = `bar`

  // Gauge types
  let value, maxValue, size
  switch (type) {
    case `hitPoints`:
      value = data.hitPoints
      maxValue = data.maxHitPoints
      break
    case `magicPoints`:
      value = data.magicPoints
      maxValue = data.maxMagicPoints
      break
    case `stamina`:
      value = data.stamina
      maxValue = data.maxStamina
      break
    case `physicalRage`:
      value = data.physicalRage
      maxValue = data.maxPhysicalRage
      size = `small`
      break
    case `magicalRage`:
      value = data.magicalRage
      maxValue = data.maxMagicalRage
      size = `small`
      break
    case `xp`:
      value = data.xp
      maxValue = data.maxMagicalRage
      size = `tiny`
      break
    default :
      break
  }

  // Add custom classes to defined classes
  const itemClasses = [defaultClasses, type, size].filter(val => val).join(` `)

  // Compute gauge width
  const indicatorStyle = color ? {
    background: color,
    width: (value*100)/maxValue + `%`,
  } : {
    width: (value * 100) / maxValue + `%`,
  }

  // Display component
  return (
    <div className={itemClasses}>
      {size !== `tiny` &&
        <div className="value">{value}/{maxValue}</div>
      }
      <div className="indicator" style={indicatorStyle} />
    </div>
  )
}

// Applying propTypes definition and default values
Bar.propTypes = propTypes
Bar.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps)(Bar)
