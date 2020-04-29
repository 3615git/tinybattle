import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import ItemVisual from './ItemVisual'

/**
  * @desc item block
*/

const propTypes = {
  item: PropTypes.object,
  effect: PropTypes.string,
  noPlus: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    data: state
  }
}

const Item = ({ item, effect, noPlus }) => {
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
  const effectClasses = effect ? `animation-`+effect : ``
  const itemClasses = [defaultClasses, qualityClasses, glowClasses, effectClasses].filter(val => val).join(` `)

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
        {item.score}
      </span>
    </div>
  )
  else return (
    <div className="item_wrapper" />
  )
}

// Applying propTypes definition and default values
Item.propTypes = propTypes

// Exporting as default
export default connect(mapStateToProps)(Item)
