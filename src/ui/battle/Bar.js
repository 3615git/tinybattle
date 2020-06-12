import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

/**
  * @desc Bar UI component (HP, etc)
*/

const propTypes = {
  type: PropTypes.string,
  opponent: PropTypes.bool,
  color: PropTypes.string,
  current: PropTypes.number,
  ready: PropTypes.number,
}

const defaultProps = {
  opponent: false
}

const mapStateToProps = state => {
  return {
    connectedData: state
  }
}

const Bar = ({ connectedData, type, opponent, color, current, ready }) => {
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
      size = `big`
      break
    case `magicPoints`:
      value = data.magicPoints
      maxValue = data.maxMagicPoints
      size = `small`
      break
    case `stamina`:
      value = data.stamina
      maxValue = data.maxStamina
      size = `small`
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
        value = current
        maxValue = ready
        size = `big`
        break
    default:
      value = current
      maxValue = ready
      size = `small`
      break
  }

  // Add custom classes to defined classes
  const itemClasses = [defaultClasses, type, size].filter(val => val).join(` `)

  // Compute gauge width
  let indicatorStyle = color ? {
    background: color,
    width: (value*100)/maxValue + `%`,
  } : {
    width: (value * 100) / maxValue + `%`,
  }

  // Small numbers are displayeds a blocks
  let indicator

  if (maxValue <= 5) {
    let blocks = []
    let blockWidth = 100 / maxValue + `%`
    for (let index = 0; index < maxValue; index++) {
      indicatorStyle = {
        background: index < value ? color : `none`,
        width: blockWidth
      }
      blocks.push(
        <div key={`barb_block_${index}`} className="indicator" style={indicatorStyle} />
      )
    }
    indicator = blocks
  } else {
    indicator = <div className="indicator" style={indicatorStyle} />
  }

  // Display component
  return (
    <div className={itemClasses}>
      {size === `big` && <div className="value">{value}/{maxValue}</div>}
      {indicator}
    </div>
  )
}

// Applying propTypes definition and default values
Bar.propTypes = propTypes
Bar.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps)(Bar)
