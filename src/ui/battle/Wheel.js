import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { gameSettings } from "../../conf/settings"
import ItemVisual from './ItemVisual'
import { getRandomInt } from '../../utils/utils'

/**
  * Wheel for "random" results
*/

const propTypes = {
  position: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  customFumble: PropTypes.array
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
      let naturalRoll = getRandomInt(-3, 3)
      this.setState({
        rollPosition: (position * 45) + (16 * 45) + 112.5 + 360 + naturalRoll
      })
    }, gameSettings.widgetDelay)
  }

  componentWillUnmount() {
    clearTimeout(this.rollDelay)
  }

  render() {
    const { type, items, customFumble } = this.props
    const { rollPosition } = this.state

    // More natural wheel roll
    let bezier1 = getRandomInt(50, 58) / 100
    let bezier2 = getRandomInt(-37, 18) / 100
    let bezier3 = getRandomInt(39, 100) / 100
    let bezier4 = getRandomInt(60, 140) / 100

    const wheelStyle = {
      transform: `rotate(${rollPosition}deg)`,
      transition: `transform 1.5s cubic-bezier(${bezier1},${bezier2},${bezier3},${bezier4})`
    } 

    // Fumble icon
    let fumbleIcon
    if (customFumble) {
      fumbleIcon = customFumble
    } else {
      fumbleIcon = [gameSettings.icons[`fumble`][0], gameSettings.icons[`fumble`][1]]
    }

    // Type or item wheel
    let wheelItems
    
    if (items) {
      wheelItems = (
        <>
          <li><ItemVisual item={items[0] === `fumble` ? fumbleIcon[0] : items[0].item.type} level={items[0] === `fumble` ? fumbleIcon[1] : items[0].item.id} /></li>
          <li><ItemVisual item={items[1] === `fumble` ? fumbleIcon[0] : items[1].item.type} level={items[1] === `fumble` ? fumbleIcon[1] : items[1].item.id} /></li>
          <li><ItemVisual item={items[2] === `fumble` ? fumbleIcon[0] : items[2].item.type} level={items[2] === `fumble` ? fumbleIcon[1] : items[2].item.id} /></li>
          <li><ItemVisual item={fumbleIcon[0]} level={fumbleIcon[1]} /></li>
          <li><ItemVisual item={items[4] === `fumble` ? fumbleIcon[0] : items[4].item.type} level={items[4] === `fumble` ? fumbleIcon[1] : items[4].item.id} /></li>
          <li><ItemVisual item={items[5] === `fumble` ? fumbleIcon[0] : items[5].item.type} level={items[5] === `fumble` ? fumbleIcon[1] : items[5].item.id} /></li>
          <li><ItemVisual item={items[6] === `fumble` ? fumbleIcon[0] : items[6].item.type} level={items[6] === `fumble` ? fumbleIcon[1] : items[6].item.id} /></li>
          <li><ItemVisual item={fumbleIcon[0]} level={fumbleIcon[1]} /></li>
        </>
      )
    } else {
      wheelItems = (
        <>
          <li><ItemVisual item={gameSettings.icons[type][0]} level={gameSettings.icons[type][1]} /></li>
          <li><ItemVisual item={gameSettings.icons[`critical`][0]} level={gameSettings.icons[`critical`][1]} /></li>
          <li><ItemVisual item={gameSettings.icons[type][0]} level={gameSettings.icons[type][1]} /></li>
          <li><ItemVisual item={fumbleIcon[0]} level={fumbleIcon[1]} /></li>
          <li><ItemVisual item={gameSettings.icons[type][0]} level={gameSettings.icons[type][1]} /></li>
          <li><ItemVisual item={fumbleIcon[0]} level={fumbleIcon[1]} /></li>
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
