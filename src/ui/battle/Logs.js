import React, { Component } from 'react'
import { connect } from "react-redux"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import chroma from "chroma-js"

import { gameSettings } from "../../conf/settings"

import ItemVisual from './ItemVisual'
import Wheel from './Wheel'
import HitBar from './HitBar'
import ValueBar from './ValueBar'
import Delayed from '../general/Delayed'

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

class Logs extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.log.display && (prevState.message !== nextProps.log.display.message)) {
      return {
        message: nextProps.log.display.message,
        note: nextProps.log.display.note
      }
    }

    // Return null to indicate no change to state.
    return null;
  }

  render() {
    const { log, playerTurn, color, skip } = this.props
    const { message, note } = this.state
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
    if (data && data.hit && (data.hit === `critical` || data.hit.critical)) effect = playerTurn ? <Delayed waitBeforeShow={1200}><div className="effect_critical" /></Delayed> : <Delayed waitBeforeShow={1200}><div className="effect_critical_opponent" /></Delayed>
    if (data && data.hit && (data.hit === `fumble` || data.hit.fumble)) effect = playerTurn ? <Delayed waitBeforeShow={1200}><div className="effect_fumble" /></Delayed> : <Delayed waitBeforeShow={1200}><div className="effect_fumble_opponent" /></Delayed>

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

      case `stun`:
        widget = <Wheel type="stun" position={data.wheelPosition} />
        break;

      case `itembreak`:
        widget = <Wheel type="itembreak" items={data.wheelPositions} position={data.wheelPosition} />
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

      // Delayed or immediate display
      let displayMessage, displayNote
      if (log.delay === `immediate`) {
        displayMessage = <div className="message" dangerouslySetInnerHTML={{ __html: message }} />
        displayNote = <div className="note" dangerouslySetInnerHTML={{ __html: note }} />
      } else {
        displayMessage = <Delayed waitBeforeShow={1700} placeholder={<div className="message">Rolling...</div>}><div className="message" dangerouslySetInnerHTML={{ __html: message }} /></Delayed>
        displayNote = <Delayed waitBeforeShow={1700} placeholder={<div className="note">Rolling...</div>}><div className="note" dangerouslySetInnerHTML={{ __html: note }} /></Delayed>
      }

      logContent = (
        <div className={itemClasses} onClick={()=>skip()}>
          <div className="log" style={logStyle}>
            {turnTag}
            <div className="title" dangerouslySetInnerHTML={{ __html: log.display.title }} />
            {displayMessage}
            {widget}
            {displayNote}
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
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(Logs)
