import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import Stats from './Stats'
import Items from './Items'
import Weapons from './Weapons'

/**
  * @desc Wrapper for all stats and items
*/

const propTypes = {
  opponent: PropTypes.bool
}

const defaultProps = {
  opponent: false
}

const mapStateToProps = state => {
  return {

  }
}

const StatsAndItems = ({ opponent }) => { 
  // Component styling
  const defaultClasses = `statsAndItemsWrapper`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Display component
  return (
    <div className={itemClasses}>
      <div className="statsWrapper">
        <Stats opponent={opponent} />
        <Items opponent={opponent} />
      </div>
      <Weapons opponent={opponent} />
    </div>
  )
}

// Applying propTypes definition and default values
StatsAndItems.propTypes = propTypes
StatsAndItems.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps)(StatsAndItems)
