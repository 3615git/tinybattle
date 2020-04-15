import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import { getStat } from '../../actions/combat/stats'

/**
  * @desc Caracs bar for player and monster
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

const StatCounter = ({ stat }) => {
  const {natural, temporary, items} = stat

  let currentStatValue = natural + temporary

  let variationClasses = ``
  if (currentStatValue > natural) variationClasses = `up`
  else if (currentStatValue < natural) variationClasses = `down`

  const itemClasses = [variationClasses].filter(val => val).join(` `)

  return (
    <div className={itemClasses}>
      {currentStatValue + items}
    </div>
  )
}

const Stats = ({ opponent, data }) => { 
  // Current player
  const activePlayer = opponent ? data.opponent : data.player

  // Component styling
  const defaultClasses = `playerStats`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Display component
  return (
    <div className={itemClasses}>
      <div><StatCounter stat={getStat(activePlayer, `STR`)} /><span>STR</span></div>
      <div><StatCounter stat={getStat(activePlayer, `DEX`)} /><span>DEX</span></div>
      <div><StatCounter stat={getStat(activePlayer, `CON`)} /><span>CON</span></div>
      <div><StatCounter stat={getStat(activePlayer, `MAG`)} /><span>MAG</span></div>
      <div><StatCounter stat={getStat(activePlayer, `LCK`)} /><span>LCK</span></div>
    </div>
  )
}

// Applying propTypes definition and default values
Stats.propTypes = propTypes
Stats.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps)(Stats)
