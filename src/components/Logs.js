import React from 'react'
import { connect } from "react-redux"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import shield from '../pics/ui/shield.png'
import skullPic from '../pics/ui/hitBar_fumble.png'

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

const Logs = ({ log, playerTurn, color }) => {

  const { type, activePlayer, data } = log

  // Component styling
  const defaultClasses = `LogsWrapper`

  // Build log message
  let display
  let title, damage
  let wrapperStyling

  switch (type) {
    case `battleStart`:
      title = `Battle starts !`
      display = (
        <div>
          {title && <div className="title">{title}</div>}
        </div>
      )
      break;

    case `physicalAttack`:
      title = activePlayer.name + ` attacks !`
      damage = data.damage ? `<span class="damage">` + data.damage.damage + `</span> damage!` : `<span>No damage.</span>`
      
      // Hit text
      let hit

      if (data.hit.critical) { 
        hit = `Critical hit!`
        // wrapperStyling = playerTurn ? `animation-critical` : `opponent-animation-critical`
      } 
      else if (data.hit.fumble) {
        hit = `Fail !`
        // wrapperStyling = playerTurn ? `animation-fumble` : `opponent-animation-fumble`
      }
      else if (data.hit.hit) {
        hit = `Hit!` 
        // wrapperStyling = playerTurn ? `animation-hit` : `opponent-animation-hit`
      }
      else {
        hit = `Missed.`
        // wrapperStyling = playerTurn ? `animation-missed` : `opponent-animation-missed`
      }

      display = (
        <div>
          { title && <div className="title">{title}</div>}
          <HitBar type={type} hit={data.hit} color={color} />
          {hit && <div className="title">{data.hit.roll} : {hit}</div>}
          { damage && <div className="message" dangerouslySetInnerHTML={{ __html: damage }} /> }
        </div>
      )
      break;

    case `physicalDefend`:
      title = activePlayer.name + ` defends !`
      
      const shieldStyling = {
        marginRight: `15px`
      }

      const iconStyling = {
        position: `relative`,
        top: `-1px`,
        marginRight: `3px`
      }

      display = (
        <div className="log_defend">
          <img src={shield} style={shieldStyling} alt="Defence!" />
          <div>
            {title && <div className="title">{title}</div>}
            <div className="smallMessage">DEX <span className="logvalue">+{data.dexBonus}</span> - HP <span className="logvalue">+{data.healValue}</span></div>
            <ValueBar type={type} value={data.healRoll} maxValue={data.maxHeal} />
            <div className="tinyMessage"><img src={skullPic} style={iconStyling} alt="Opponent bonus" />STR<span className="logvalue">+{data.strBonus}</span> for opponent</div>
          </div>
        </div>
      )
      break;

    default:
        break;
  }

  // Add custom classes to defined classes
  const itemClasses = [defaultClasses, wrapperStyling].filter(val => val).join(` `)

  let logContent

  if (type === `physicalAttack`) logContent = (
    <div className={itemClasses}>
      {display}
    </div>
  ) 
  else logContent = (
    <div className={itemClasses}>
      {display}
    </div>
  )

  return (
    <div className="LogsContainer">
      <TransitionGroup component={null}>
        <CSSTransition
          key={+new Date()}
          timeout={600}
          classNames={playerTurn ? "playerLog" : "opponentLog"}
        >
          {logContent}
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(Logs)
