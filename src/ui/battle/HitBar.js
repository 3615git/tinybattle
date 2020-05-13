import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import { criticalChance, fumbleChance } from '../../actions/combat/hit'
import { gameSettings } from '../../conf/settings'

/**
  * @desc Display an animated hit bar
*/

const propTypes = {
  type: PropTypes.string.isRequired,
  hit: PropTypes.object.isRequired,
  color: PropTypes.object
}

const defaultProps = {
  color: false,
  playerTurn: false
}

const mapStateToProps = state => {
  return {
    connectedData: state
  }
}


class HitBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rollPosition: 0
    }
  }

  componentDidMount() {
    const { hit } = this.props
    this.rollDelay = setTimeout(() => {
      this.setState({
        rollPosition: hit.roll
      })
    }, gameSettings.widgetDelay)
  }

  componentWillUnmount() {
    clearTimeout(this.rollDelay)
  }

  render() {
    const { connectedData, color, hit, type } = this.props
    const { rollPosition } = this.state
    // Current player
    const opponent = connectedData.game.playerTurn
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
      let style = {}
      // Compute current class
      if (index <= fumbleLimit) limit = `fumble`
      else if (index >= criticalLimit) {
        limit = `critical`
        style = opponent ? { backgroundColor: color.vibrant } : {}
      }
      else if(index >= hitLimit) {
        limit = `hit`
        style = opponent ? { backgroundColor: color.darkVibrant } : {}
      }
      else limit = `miss`

      limit = type + ` ` + limit

      stages.push(
        <div key={index} className={limit} style={style} />
      )
    }

    for (let index = 1; index <= roll; index++) {

      let rollMarker
      // Compute roll indicator
      if (index === rollPosition) rollMarker = <div className="roll"></div>

      position.push(
        <div key={index}>{rollMarker}</div>
      )
    }

    // Animate
    const indicatorStyle = {
      width: (rollPosition * 5)  + `%`,
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
}

// Applying propTypes definition and default values
HitBar.propTypes = propTypes
HitBar.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps)(HitBar)
