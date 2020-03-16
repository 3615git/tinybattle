import React from 'react'
import { connect } from "react-redux"

import HitBar from './HitBar'

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

const Logs = ({ log, playerTurn }) => {

  const { type, activePlayer, data } = log

  // Component styling
  const defaultClasses = `LogsWrapper`

  // Build log message
  let display
  let title, damage
  let wrapperStyling

  switch (type) {
    case `physicalAttack`:
      title = activePlayer.name + ` attacks !`
      damage = data.damage ? `<span class="damage">` + data.damage.damage + `</span> damage!` : `<span>No damage.</span>`
      
      // Hit text
      let hit

      if (data.hit.critical) { 
        hit = `Critical hit!`
        wrapperStyling = playerTurn ? `animation-critical` : `opponent-animation-critical`
      } 
      else if (data.hit.fumble) {
        hit = `Fail !`
        wrapperStyling = playerTurn ? `animation-fumble` : `opponent-animation-fumble`
      }
      else if (data.hit.hit) {
        hit = `Hit!` 
        wrapperStyling = playerTurn ? `animation-hit` : `opponent-animation-hit`
      }
      else {
        hit = `Missed.`
        wrapperStyling = playerTurn ? `animation-missed` : `opponent-animation-missed`
      }

      display = (
        <div>
          { title && <div className="title">{title}</div>}
          <HitBar type={type} hit={data.hit} />
          {hit && <div className="title">{data.hit.roll} : {hit}</div>}
          { damage && <div className="message" dangerouslySetInnerHTML={{ __html: damage }} /> }
        </div>
      )
      break;
    case `battleStart`:
      title = `Battle starts !`
      display = (
        <div>
          {title && <div className="title">{title}</div>}
        </div>
      )
      break;
    default:
        break;
  }

  // Add custom classes to defined classes
  const itemClasses = [defaultClasses, wrapperStyling].filter(val => val).join(` `)


  if (type === `physicalAttack`) return (
    // <div key={+new Date()} className={itemClasses}>
    <div className={itemClasses}>
      {display}
    </div>
  ) 
  else return (
    // <div key={+new Date()} className={itemClasses}>
    <div className={itemClasses}>
      {display}
    </div>
  )
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(Logs)
