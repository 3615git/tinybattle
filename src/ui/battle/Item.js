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
  noPlus: PropTypes.bool,
  shop: PropTypes.string,
  displayChar: PropTypes.bool,
  animations: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    data: state,
    player: state.player
  }
}
class Item extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidUpdate(prevProps) {
    const { animations } = this.props

    if (animations) {
      if (prevProps.item && !this.props.item) {
        this.itemDeleted()
      }
    }
  }

  itemDeleted = () => {
    this.rollDelay = setTimeout(() => {
      this.setState({ itemState: "deleted" })
    }, gameSettings.itemStateDelay)
  }

  render() {
    const { player, item, effect, noPlus, shop, animateNumber, displayChar } = this.props
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

    // Sharpen marks
    let marks = []
    if (item && item.sharpen) {
      for (let index = 0; index < item.sharpen; index++) {
        marks.push(<div className="markWrapper"><div className="mark" /></div>)
      }
    }

    // Sharpened score
    let itemScore
    if (item && item.type && item.id) itemScore =  item.score

    if (item && item.sharpen) {
      let weaponScore = itemScore.split(`d`)
      itemScore = <span dangerouslySetInnerHTML={{ __html: `<span class="legacyColor">${weaponScore[0]}</span>d${weaponScore[1]}` }} />
    }

    // Advantage hints
    let advantage = "itemAdvantage"
    if (item && shop) {
      if (player[shop][item.char]) {
        if (itemScore > player[shop][item.char].score) advantage = "itemAdvantage up"
        if (itemScore < player[shop][item.char].score) advantage = "itemAdvantage down"
      }
      else {
        advantage = "itemAdvantage up"
      }
    } 

    if (item && item.type && item.id) return (
      <div className={itemClasses}>
        {item.cost &&
          <>
            <div className={`itemCost ${costType}`}>{item.cost}</div>
            {item.element !== `none` && <div className={`element ${item.element}`} /> }
          </>
        }
        {shop &&
          <div className={advantage} />
        }
        {item.sharpen &&
          <div className={`itemAlteration`}>{marks}</div>
        }
        {item.charges &&
          <div className={`itemCost charge`}>{item.charges}</div>
        }
        <ItemVisual item={item.type} level={item.id} />
        <span>
          {displayChar && item.char}
          {plusSign}
          {animateNumber 
            ? (<AnimatedNumber
              formatValue={value => value.toFixed(0)}
              value={item.score}
            />)
            : itemScore
          }
          {item.label}
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
