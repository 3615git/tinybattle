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

  if (item && item.type && item.id && item.score) return (
    <div className={`item_wrapper ${item.quality}`}>
      {item.cost &&
        <div className="itemCost physical">{item.cost}</div>
      }
      <ItemVisual item={item.type} level={item.id} />
      <span>+{item.score}</span>
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
