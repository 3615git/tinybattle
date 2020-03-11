import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const propTypes = {
  opponent: PropTypes.bool
}

const defaultProps = {
  opponent: false
}

const mapStateToProps = state => {
  return {
    data: state
  }
}

const Stats = ({ opponent, data }) => { 
  // Current player
  const caracs = opponent ? data.opponent : data.player

  // Component styling
  const defaultClasses = `playerStats`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Display component
  return (
    <div className={itemClasses}>
      <div>{caracs.STR}<span>STR</span></div>
      <div>{caracs.DEX}<span>DEX</span></div>
      <div>{caracs.CON}<span>CON</span></div>
      <div>{caracs.MAG}<span>MAG</span></div>
      <div>{caracs.LCK}<span>LCK</span></div>
    </div>
  )
}

// Applying propTypes definition and default values
Stats.propTypes = propTypes
Stats.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps)(Stats)
