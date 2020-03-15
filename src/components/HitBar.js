import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import { criticalChance, fumbleChance } from '../combat/hit'

/**
  * @desc Display an animated hit bar
*/

const propTypes = {
  type: PropTypes.string.isRequired,
  hit: PropTypes.object.isRequired
}

const defaultProps = {

}

const mapStateToProps = state => {
  return {
    connectedData: state
  }
}

const HitBar = ({ connectedData, type, hit }) => {
  // Current player
  const opponent = connectedData.playerTurn
  const data = opponent ? connectedData.opponent : connectedData.player

  // Component styling
  const defaultClasses = `hitbar`

  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Get limits
  let fumbleLimit = fumbleChance(data)
  let hitLimit = hit.toHit
  let criticalLimit = criticalChance(data)
  let roll = hit.roll

  // Compute hit stages
  let stages = []
  let position = []
  for (let index = 1; index <= 20; index++) {

    let limit
    // Compute current class
    if (index <= fumbleLimit) limit = `fumble`
    else if (index >= criticalLimit) limit = `critical`
    else if(index >= hitLimit) limit = `hit`
    else limit = `miss`

    stages.push(
      <div key={index} className={limit} />
    )
  }

  for (let index = 1; index <= roll; index++) {

    let rollMarker
    // Compute roll indicator
    if (index === roll) rollMarker = <div className="roll"></div>

    position.push(
      <div key={index}>{rollMarker}</div>
    )
  }

  // Animate
  const indicatorStyle = {
    width: (roll * 5)  + `%`,
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
HitBar.propTypes = propTypes
HitBar.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps)(HitBar)
