import React from 'react'
import { connect } from "react-redux"

import { setGameState } from '../../redux/actions/index'
import death from '../../pics/ui/death.png'

/**
  * @desc Display what happened when either player has lost the battle
*/

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
    game: state.game,
    playerTurn: state.game.playerTurn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGameState: payload => dispatch(setGameState(payload))
  }
}

const EndGame = ({ player, opponent, game, display, setGameState }) => {

  // Component styling
  const defaultClasses = `endGame`

  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  if (display) {
    // If player is dead
    let opponentNameStyle = {
      color: game.uicolor.vibrant
    }

    if (player.hitPoints === 0) {
      return (
        <div className={`${itemClasses} active`} onClick={() => setGameState({ state: `defeat` })}>
          <div className="presentationArea">
            <div className="title defeat">Defeat !</div>
            <div className="subtitle">
              <span style={opponentNameStyle}>{opponent.name}</span> won.<br />
              You're dead</div>
            <img className="death" src={death} alt="You're dead" />
          </div>
          <div className="actionArea">
            <button className="navigation" onClick={() => setGameState({ state: `defeat` })}>Select legacy</button>
          </div>
        </div>
      ) 
    }
    // If opponent is dead
    else if (opponent.hitPoints === 0) {
      return (
        <div className={`${itemClasses} active`} onClick={() => setGameState({ state: `victory` })}>
          <div className="presentationArea">
            <div className="title">Victory !</div>
            <div className="subtitle"><span style={opponentNameStyle}>{opponent.name}</span><br />is dead</div>
            <div className="crackedImage">
              <img src={opponent.pic} alt={opponent.name} />
            </div>
          </div>
          <div className="actionArea">
            <button className="navigation" onClick={() => setGameState({ state: `victory` })}>Loot !</button>
          </div>
        </div>
      ) 
    }
  }
  // Nothing to display
  else return <div className={itemClasses} />
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(EndGame)
