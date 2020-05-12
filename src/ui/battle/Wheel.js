import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { gameSettings } from "../../conf/settings"
import ItemVisual from './ItemVisual'
/**
  * @todo Wheel for "random" results
*/

const propTypes = {
  position: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
}

const defaultProps = {

}

class Wheel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rollPosition: 22.5
    }
  }

  componentDidMount() {
    const { position } = this.props
    this.rollDelay = setTimeout(() => {
      this.setState({
        rollPosition: (position * 45) + (16 * 45) + 22.5 - 45
      })
    }, 600)
  }

  componentWillUnmount() {
    clearTimeout(this.rollDelay)
  }

  render() {
    const { type } = this.props
    const { rollPosition } = this.state
    const wheelStyle = {
      transform: `rotate(${rollPosition}deg)`
    }

    // Display component
    return (
      <div className="wheelWrapper">
        <ul className="needleWrapper" style={wheelStyle}>
          <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
        </ul>

        <ul className='circle-container'>
          <li><ItemVisual item={gameSettings.icons[type][0]} level={gameSettings.icons[type][1]} /></li>
          <li><ItemVisual item={gameSettings.icons[`fumble`][0]} level={gameSettings.icons[`fumble`][1]} /></li>
          <li><ItemVisual item={gameSettings.icons[type][0]} level={gameSettings.icons[type][1]} /></li>
          <li><ItemVisual item={gameSettings.icons[`fumble`][0]} level={gameSettings.icons[`fumble`][1]} /></li>
          <li><ItemVisual item={gameSettings.icons[type][0]} level={gameSettings.icons[type][1]} /></li>
          <li><ItemVisual item={gameSettings.icons[`critical`][0]} level={gameSettings.icons[`critical`][1]} /></li>
          <li><ItemVisual item={gameSettings.icons[type][0]} level={gameSettings.icons[type][1]} /></li>
          <li><ItemVisual item={gameSettings.icons[`critical`][0]} level={gameSettings.icons[`critical`][1]} /></li>
        </ul>
      </div>
    )
  }
}

// Applying propTypes definition and default values
Wheel.propTypes = propTypes
Wheel.defaultProps = defaultProps

// Exporting as default
export default Wheel
