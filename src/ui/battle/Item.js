import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import AnimatedNumber from "animated-number-react"

import { gameSettings } from "../../conf/settings"
import ItemVisual from './ItemVisual'

/**
  * @desc item block
*/

const propTypes = {
  item: PropTypes.object,
  effect: PropTypes.string,
  animateNumber: PropTypes.bool,
  noPlus: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    data: state
  }
}
class Item extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidUpdate(prevProps) {
    // if (
    //   (prevProps.item.char !== this.props.item.char) &&
    //   (prevProps.item.id !== this.props.item.id) &&
    //   (prevProps.item.price !== this.props.item.price) &&
    //   (prevProps.item.quality !== this.props.item.quality) &&
    //   (prevProps.item.reward !== this.props.item.reward) &&
    //   (prevProps.item.score !== this.props.item.char) &&
    //   (prevProps.item.type !== this.props.item.type)
    // ) {
    //   this.itemChange()
    // }
    if (prevProps.item && !this.props.item) {
      this.itemDeleted()
    }
  }

  itemDeleted = () => {
    this.rollDelay = setTimeout(() => {
      this.setState({ itemState: "deleted" })
    }, gameSettings.itemStateDelay)
  }

  render() {
    const { item, effect, noPlus, animateNumber } = this.props
    const { itemState } = this.state

    // Plus sign for bonus items
    const plusSign = ((item && item.cost) || noPlus) ? `` : `+`

    // Weapon cost type
    let costType
    if (item && item.char && item.char === `STR`) costType = `physical`
    if (item && item.char && item.char === `MAG`) costType = `magical`

    // Elemental glow
    const defaultClasses = `item_wrapper`
    const glowClasses = item && item.element ? 'glow_' + item.element : ``
    const qualityClasses = item && item.quality ? item.quality : ``
    const effectClasses = effect ? `animation-` + effect : ``
    const updateClasses = itemState ? `animation-` + itemState : ``
    const itemClasses = [defaultClasses, qualityClasses, glowClasses, effectClasses, updateClasses].filter(val => val).join(` `)
    const emptyItemClasses = [defaultClasses, updateClasses].filter(val => val).join(` `)

    if (item && item.type && item.id) return (
      <div className={itemClasses}>
        {item.cost &&
          <>
            <div className={`itemCost ${costType}`}>{item.cost}</div>
            {item.element !== `none` && <div className={`element ${item.element}`} /> }
          </>
        }
        <ItemVisual item={item.type} level={item.id} />
        <span>
          {plusSign}
          {animateNumber 
            ? (<AnimatedNumber
              formatValue={value => value.toFixed(0)}
              value={item.score}
            />)
            : item.score
          }
          
        </span>
      </div>
    )
    else return (
      <div className={emptyItemClasses} />
    )
  }
}

// Applying propTypes definition and default values
Item.propTypes = propTypes

// Exporting as default
export default connect(mapStateToProps)(Item)
