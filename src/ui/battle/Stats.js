import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import { getStat, listBuff } from '../../actions/combat/stats'
import { setCharToElements } from "../../conf/settings_items"

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

const StatCounter = (char, activePlayer) => {

  // Get stats values
  let stat = getStat(activePlayer, char)
  const { natural, temporary, items } = stat

  let currentStatValue = natural + temporary

  // Currently active bushs for UI
  let uiBuffs = listBuff(char, activePlayer)
  let displayBuffs = []
  let displaySets = []
  let setItemBonusDisplayed = []

  for (let index = 0; index < uiBuffs.length; index++) {
    const uiBuff = uiBuffs[index]
    const uiBuffDirection = uiBuff.value > 0 ? `up` : `down`

    // Set items have a special display
    if (uiBuff.origin === `setItems`) {
      if (setItemBonusDisplayed.indexOf(uiBuff.stat) === -1) {
        displaySets.push(
          <span key={`buff_ui_${index}`} className={`setBuff`}>
            {activePlayer.setItems[setCharToElements[uiBuff.stat]]}
          </span>
        )
        setItemBonusDisplayed.push(uiBuff.stat)
      } 
    } 
    // Other malus/bonus display
    else {
      displayBuffs.push(
        <span key={`buff_ui_${index}`} className={`statBuff ${uiBuff.origin} ${uiBuffDirection}`} />
      )
    }
  }

  let variationClasses = ``
  if (currentStatValue > natural) variationClasses = `up`
  else if (currentStatValue < natural) variationClasses = `down`

  // Value glow for sets
  let setGlow = setItemBonusDisplayed.indexOf(char) !== -1 ? "text_glow_"+setCharToElements[char] : ``

  const itemClasses = ["statWrapper", variationClasses].filter(val => val).join(` `)

  return (
    <div>
      <div className={itemClasses}>
        <div className={setGlow}>{currentStatValue + items}</div>
        <div className="uiBuffWrapper">
          {displayBuffs}
        </div>
      </div>
      <span className={`char ${char}`}>{char} {displaySets}</span>
    </div>
  )
}

const Stats = ({ opponent, data, forceData }) => { 
  // Current player
  let activePlayer = opponent ? data.opponent : data.player

  // Override store
  if (forceData) activePlayer = forceData

  // Component styling
  const defaultClasses = `playerStats`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Display component
  return (
    <div className={itemClasses}>
      {StatCounter(`STR`, activePlayer)}
      {StatCounter(`DEX`, activePlayer)}
      {StatCounter(`CON`, activePlayer)}
      {StatCounter(`MAG`, activePlayer)}
      {StatCounter(`LCK`, activePlayer)}
    </div>
  )
}

// Applying propTypes definition and default values
Stats.propTypes = propTypes
Stats.defaultProps = defaultProps

// Exporting as default
export default connect(mapStateToProps)(Stats)
