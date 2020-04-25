import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import ItemVisual from './ItemVisual'

/**
  * @desc item block
*/

const propTypes = {
  item: PropTypes.object
}

const mapStateToProps = state => {
  return {
    data: state
  }
}

const Item = ({ item }) => {
  const plusSign = (item && item.cost) ? `` : `+`

  // Weapon cost type
  let costType
  if (item && item.char && item.char === `STR`) costType = `physical`
  if (item && item.char && item.char === `MAG`) costType = `magical`

  // Elemental glow
  let glow
  if (item && item.element) glow = 'glow_' + item.element

  if (item && item.type && item.id && item.score) return (
    <div className={`item_wrapper ${item.quality} ${glow}`}>
      {item.cost &&
        <>
          <div className={`itemCost ${costType}`}>{item.cost}</div>
          {item.element !== `none` && <div className={`element ${item.element}`} /> }
        </>
      }
      <ItemVisual item={item.type} level={item.id} />
      <span>
        {plusSign}     
        {item.score}</span>
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
