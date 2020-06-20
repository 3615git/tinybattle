import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState } from '../../redux/actions/index'
import { getLevelFromXp } from '../../actions/score/score'
import { getXpToLevel } from '../../actions/score/score'
import Bar from '../../ui/battle/Bar'
import death from '../../pics/ui/death.png'
import AnimatedNumber from "animated-number-react"

/**
  * @desc Display what happened when either player has lost the battle
*/

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
    game: state.game,
    playerTurn: state.game.playerTurn,
    dataLogs: state.dataLogs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGameState: payload => dispatch(setGameState(payload))
  }
}

class EndGame extends Component {
  constructor(props) {
    super(props)

    const { player } = this.props

    this.state = {
      xpBarValue: player.xp
    }
  }

  componentDidMount() {
    const { player, opponent } = this.props
    this.rollDelay = setTimeout(() => {
      this.setState({
        xpBarValue: player.xp + opponent.xp
      })
    }, 3500)
  }

  render() {

    const { player, opponent, game, display, setGameState, dataLogs } = this.props
    const { xpBarValue } = this.state

    // Component styling
    const defaultClasses = `endGame`

    // Add custom classes to defined classes
    const itemClasses = [defaultClasses].filter(val => val).join(` `)

    // Level and xp animations
    const playerLevel = getLevelFromXp(player.xp)
    const playerNextLevel = getLevelFromXp(player.xp + opponent.xp)

    let levelUp = playerNextLevel > playerLevel ? <span className="levelUp">Level up!<br /><span>You can now save up to {playerNextLevel} items!</span></span> : ``

    if (display) {
      // If player is dead
      let opponentNameStyle = {
        color: game.uicolor.vibrant
      }

      if (player.hitPoints === 0) {
        // Permadeath mode in loops
        if (game.loop) {
          return (
            <div className={`${itemClasses} active abyss`}>
              <div className="presentationArea">
                <div className="title defeat">Final blow!</div>
                <div className="subtitle">
                  {player.name} fought bravely, but the Abyss of Permadeath never loses.
                </div>
                <div className="subtitle">
                  <span style={opponentNameStyle}>{opponent.name}</span> won<br />
                  {dataLogs.length - 1 > 1
                    ? <span>{`${dataLogs.length - 1} rounds`}</span>
                    : <span>{`${dataLogs.length - 1} round !`}</span>
                  }
                </div>
                <img className="death" src={death} alt="You lose" />
              </div>
              <div className="actionArea">
                <button className="navigation" onClick={() => setGameState({ state: `permadeath` })}>You're dead</button>
              </div>
            </div>
          ) 
        }
        // Normal retreat
        else {
          return (
            <div className={`${itemClasses} active`}>
              <div className="presentationArea">
                <div className="title defeat">Defeat !</div>
                <div className="subtitle">
                  You quickly flee the battle,<br />trying to save as much as you can.
                </div>
                <div className="subtitle">
                  <span style={opponentNameStyle}>{opponent.name}</span> won<br />
                  {dataLogs.length - 1 > 1
                    ? <span>{`${dataLogs.length - 1} rounds`}</span>
                    : <span>{`${dataLogs.length - 1} round !`}</span>
                  }
                </div>
                <img className="death" src={death} alt="You lose" />
              </div>
              <div className="actionArea">
                <button className="navigation" onClick={() => setGameState({ state: `defeat` })}>Select saved items</button>
              </div>
            </div>
          ) 
        }
      }
      // If opponent is dead
      else if (opponent.hitPoints === 0) {
        return (
          <div className={`${itemClasses} active`}>
            <div className="presentationArea">
              <div className="title">Victory !</div>
              <div className="xpBarWrapper">
                <div>+
                  <AnimatedNumber
                    formatValue={value => value.toFixed(0)}
                    value={opponent.xp}
                  /> XP
                  {levelUp}
                </div>
                <div className="xpBar">
                  <div className="level">Lvl.{getLevelFromXp(player.xp)}</div>
                  <Bar type="xp" current={xpBarValue > getXpToLevel(playerLevel + 1) ? getXpToLevel(playerLevel + 1) : xpBarValue} ready={getXpToLevel(playerLevel + 1)} />
                  <div className="level">Lvl.{getLevelFromXp(player.xp)+1}</div>
                </div>
              </div>
              <div className="crackedImage">
                <img src={opponent.pic} alt={opponent.name} />
              </div>
              <div className="subtitle">
                You defeated
                <div className="opponentName" style={opponentNameStyle}>{opponent.name}</div>
                {dataLogs.length - 1 > 1
                  ? <span>in {`${dataLogs.length - 1} rounds`}</span>
                  : <span>in only {`${dataLogs.length - 1} round !`}</span>
                }
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
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(EndGame)
