import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

/**
  * @desc Display an animated value bar
*/

const propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired
}

const defaultProps = {

}

const mapStateToProps = state => {
  return {
    connectedData: state
  }
}

const ValueBar = ({ connectedData, type, value, maxValue }) => {

  // Component styling
  const defaultClasses = `hitbar`

  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Compute value bar stages
  let stages = []
  let position = []

  for (let index = 1; index <= maxValue; index++) {
    stages.push(
      <div key={index} className={type} />
    )
  }

  for (let index = 1; index <= value; index++) {
    let rollMarker
    // Compute roll indicator
    if (index === value) rollMarker = <div className="roll"></div>

    position.push(
      <div key={index}>{rollMarker}</div>
    )
  }

  // Animate
  const indicatorStyle = {
    width: (value * (100/maxValue))  + `%`,
  }

  // Display component
  return (
    <div className={itemClasses}>
      <div style={indicatorStyle} className="wrapper position">
        {position}
      </div>
      <div className="wrapper stages">{stages}</div>
    </div>
  )
}

// Applying propTypes definition and default values
ValueBar.propTypes = propTypes
ValueBar.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps)(ValueBar)
