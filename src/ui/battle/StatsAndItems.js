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
  opponent: PropTypes.bool,
  humanoid: PropTypes.bool
}

const defaultProps = {
  opponent: false,
  humanoid: false
}

const mapStateToProps = state => {
  return {

  }
}

const StatsAndItems = ({ opponent, humanoid, forceData }) => { 
  // Component styling
  const defaultClasses = `statsAndItemsWrapper`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Display component
  return (
    <div className={itemClasses}>
      <div className="statsWrapper">
        <Stats opponent={opponent} forceData={forceData} />
        <Items opponent={opponent} forceData={forceData} />
      </div>
      {(humanoid || !opponent) &&
        <Weapons opponent={opponent} forceData={forceData} />
      }
    </div>
  )
}

// Applying propTypes definition and default values
StatsAndItems.propTypes = propTypes
StatsAndItems.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps)(StatsAndItems)
