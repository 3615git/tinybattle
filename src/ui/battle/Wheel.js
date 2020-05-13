import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { gameSettings } from "../../conf/settings"
import ItemVisual from './ItemVisual'

/**
  * Wheel for "random" results
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
        rollPosition: (position * 45) + (16 * 45) + 112.5
      })
    }, gameSettings.widgetDelay)
  }

  componentWillUnmount() {
    clearTimeout(this.rollDelay)
  }

  render() {
    const { type, items, position } = this.props
    const { rollPosition } = this.state
    const wheelStyle = {
      transform: `rotate(${rollPosition}deg)`
    } 

    console.log(position)
    console.log(items)

    // Type or item wheel
    let wheelItems
    if (items) {
      wheelItems = (
        <>
          <li><ItemVisual item={items[0].item.type} level={items[0].item.id} /></li>
          <li><ItemVisual item={items[1].item.type} level={items[1].item.id} /></li>
          <li><ItemVisual item={items[2].item.type} level={items[2].item.id} /></li>
          <li><ItemVisual item={gameSettings.icons[`fumble`][0]} level={gameSettings.icons[`fumble`][1]} /></li>
          <li><ItemVisual item={items[4].item.type} level={items[4].item.id} /></li>
          <li><ItemVisual item={items[5].item.type} level={items[5].item.id} /></li>
          <li><ItemVisual item={items[6].item.type} level={items[6].item.id} /></li>
          <li><ItemVisual item={gameSettings.icons[`fumble`][0]} level={gameSettings.icons[`fumble`][1]} /></li>
        </>
      )
    } else {
      wheelItems = (
        <>
          <li><ItemVisual item={gameSettings.icons[type][0]} level={gameSettings.icons[type][1]} /></li>
          <li><ItemVisual item={gameSettings.icons[`critical`][0]} level={gameSettings.icons[`critical`][1]} /></li>
          <li><ItemVisual item={gameSettings.icons[type][0]} level={gameSettings.icons[type][1]} /></li>
          <li><ItemVisual item={gameSettings.icons[`fumble`][0]} level={gameSettings.icons[`fumble`][1]} /></li>
          <li><ItemVisual item={gameSettings.icons[type][0]} level={gameSettings.icons[type][1]} /></li>
          <li><ItemVisual item={gameSettings.icons[`fumble`][0]} level={gameSettings.icons[`fumble`][1]} /></li>
          <li><ItemVisual item={gameSettings.icons[type][0]} level={gameSettings.icons[type][1]} /></li>
          <li><ItemVisual item={gameSettings.icons[`critical`][0]} level={gameSettings.icons[`critical`][1]} /></li>
        </>
      )
    }

    // Display component
    return (
      <div className="wheelWrapper">
        <ul className="needleWrapper" style={wheelStyle}>
          <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
        </ul>

        <ul className='circle-container'>
          {wheelItems}
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
