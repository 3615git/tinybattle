import React from 'react'
import { connect } from "react-redux"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import chroma from "chroma-js"

import { gameSettings } from "../../conf/settings"

import ItemVisual from './ItemVisual'
import Wheel from './Wheel'
import HitBar from './HitBar'
import ValueBar from './ValueBar'

/**
  * @desc Display what happened in the last battle action
*/

const mapStateToProps = state => {
  return {
    log: state.log,
    playerTurn: state.game.playerTurn
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const Logs = ({ log, playerTurn, color, skip }) => {

  const { type, data } = log

  // Component styling
  const defaultClasses = `LogsWrapper ${type}`

  // Build log message
  let effect, widget
  let wrapperStyling

  // Color styling
  const logStyle = playerTurn 
    ? { 
      background: chroma(color.darkMuted).alpha(0.96),
      borderColor: color.darkVibrant
     }
    : { }
  const eyeColor = { backgroundColor: color.vibrant }

  // Display special effects
  if (data && data.hit && (data.hit === `critical` || data.hit.critical)) effect = playerTurn ? <div className="effect_critical" /> : <div className="effect_critical_opponent" />
  if (data && data.hit && (data.hit === `fumble` || data.hit.fumble)) effect = playerTurn ? <div className="effect_fumble" /> : <div className="effect_fumble_opponent" />

  // Big switch for various cases
  switch (type) {

    case `block`:
      widget = <ValueBar type={type} value={data.healRoll} maxValue={data.maxHeal} />
      break;

    case `focus`:
      break;

    case `attack`:
      widget = <HitBar type={type} hit={data.hit} color={color} />
      break;

    case `cast`:
      widget = <HitBar type={type} hit={data.hit} color={color} />
      break;

    case `psyblast`:
      widget = <Wheel type="psyblast" position={data.wheelPosition} />
      break;

    default:
      break;
  }

  // Turn related stuff
  const turnClasses = !playerTurn ? `player` : `opponent`

  // Action icon
  let actionType, actionLevel
  if (type === `attack`) {
    actionType = log.activePlayer.weapons.STR && log.activePlayer.weapons.STR.type
    actionLevel = log.activePlayer.weapons.STR && log.activePlayer.weapons.STR.id
  }
  else if (type === `cast`) {
    actionType = log.activePlayer.weapons.MAG && log.activePlayer.weapons.MAG.type
    actionLevel = log.activePlayer.weapons.MAG && log.activePlayer.weapons.MAG.id
  }
  else {
    actionType = gameSettings.icons[type] && gameSettings.icons[type][0]
    actionLevel = gameSettings.icons[type] && gameSettings.icons[type][1]
  }

  // Action headers
  const turnTag = playerTurn 
  ? [
    <div key="montser_turnTag" className="turnTag" />,
    <div key="monster_turnColor" className="turnColor" style={eyeColor} />
  ]
  : [
      <div key="player_turnTag" className="turnTag" />,
      <div key="player_turnAction" className={`turnAction ${type}`}>
        <ItemVisual small item={actionType} level={actionLevel} />
      </div>
  ]

  // Add custom classes to defined classes
  const itemClasses = [defaultClasses, turnClasses, wrapperStyling].filter(val => val).join(` `)

  let logContent, containerStyle

  // Final display
  if (type) {
    containerStyle = {
      zIndex: 100,
      background: playerTurn ? chroma(color.darkMuted).alpha(0.5) : `rgba(33,53,38,.5)`
    }

    logContent = (
      <div className={itemClasses} onClick={()=>skip()}>
        <div className="log" style={logStyle}>
          {turnTag}
          <div className="title" dangerouslySetInnerHTML={{ __html: log.display.title }} />
          <div className="message" dangerouslySetInnerHTML={{ __html: log.display.message }} />
          {widget}
          <div className="note" dangerouslySetInnerHTML={{ __html: log.display.note }} />
        </div>
      </div>
    )
  } else {
    containerStyle = {
      zIndex: 0,
      background: `none`
    }
    logContent = <span/>
  }
  
  return (
    <div className="LogsContainer" style={containerStyle}>
      <TransitionGroup component={null}>
        <CSSTransition
          key={+new Date()}
          timeout={600}
          classNames={playerTurn ? "playerLog" : "opponentLog"}
        >
          {logContent}
        </CSSTransition>
      </TransitionGroup>
      {effect}
    </div>
  )
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(Logs)
