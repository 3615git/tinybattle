import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState } from '../redux/actions/index'
import { gameSettings } from '../conf/settings'
import { getLevelFromXp } from '../actions/score/score'
import Monster from '../ui/battle/Monster'
import Element from '../ui/battle/Element'

import logo2 from '../pics/ui/logo2.png'

const mapStateToProps = state => {
  return {
    game: state.game,
    player: state.player,
    opponent: state.opponent,
    score: state.score,
    monsterList: state.monsters,
    opponentMap: state.game.opponentMap,
    loop: state.game.loop
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGameState: payload => dispatch(setGameState(payload))
  }
}

class LevelTransition extends Component {

  componentDidMount() {
    document.getElementById('currentLevel').scrollIntoView({
      behavior: 'instant',
      block: 'center',
      inline: 'center'
    })
  }
  
  render() {
    const { game, player, opponent, setGameState, score, monsterList, opponentMap, loop } = this.props

    // Legacy items count
    const legacyItems = getLevelFromXp(player.xp)
    // Monster tier render
    const monsterTier = Math.ceil(game.level / (gameSettings.maxLevel / gameSettings.zones))

    let logoStyle = { position: `relative` }

    // Render roadmap
    let roadmap = []
    for (let level = 1; level <= gameSettings.maxLevel; level++) {
     
      if (level < game.level) {
        // Past monster
        roadmap.push(
          <div key={`deadmonster_${level}`} className="deadMonster">
            <Monster
              type={score.run.history[level - 1][0]}
              name={score.run.history[level - 1][1]}
              elite={score.run.history[level - 1][2]}
              monsterList={monsterList}
            />
          </div>
        )

      } else if (level === game.level) {
        let wrapperStyle = { filter: `hue-rotate(${Math.round(level * (360 / gameSettings.maxLevel))}deg)` }
        // Current level
        roadmap.push(
          <div key={`currentlevel_${level}`} className="infoWrapper" id="currentLevel">
            <Monster
              type={opponent.job}
              name={opponent.name}
              elite={opponent.elite}
              monsterList={monsterList}
              outline="half"
            />
            <div className="leftInfo">
              {loop ? <div>Final run</div> : <div>Run #{score.game.runs}</div>}
              {score.run.round > 1 && <div>{score.run.round} rounds</div>}
              {score.run.round <= 1 && <div>Game starts !</div>}
              {!score.run.round && <div>Game starts !</div>}
              <br />
              {opponentMap[level-1].elite && <div><Element element="elite"/></div> }
              <div>{opponentMap[level-1].name}</div>
            </div>
            <div className="logoWrapper" style={logoStyle}>
              <div className="logoCombine" style={wrapperStyle}>
                <span>{level}</span>
                <img src={logo2} className={level === game.level && "logo2"} alt="Logo2" />
              </div>
            </div>
            <div className="rightInfo">
              <div>XP lv. {legacyItems}</div>
              {loop ? <div>Abyss monsters</div> : <div>Monsters lv. {monsterTier}</div>}
            </div>
          </div>
        )
      } else {
        let wrapperStyle = { filter: `grayscale(100%)`, opacity: .4, transform: `scale(.8)` }
        // Incoming level
        roadmap.push(
          <div key={`incominglevel_${level}`} className="nextLevel">
            <Monster
              type={opponentMap[level-1].job}
              name={opponentMap[level-1].name}
              elite={opponentMap[level-1].elite}
              monsterList={monsterList}
              outline={level % 5 === 0 ? "bright" : "shade"}
            />
            <div className="leftInfo">
              {opponentMap[level-1].elite && level % 5 === 0 && <div><Element element="elite"/></div> }
              {level % 5 === 0 && <div>{opponentMap[level-1].name}</div> }
            </div>
            <div className="logoWrapper" style={logoStyle}>
              <div className="logoCombine" style={wrapperStyle}>
                <span>{level}</span>
                <img src={logo2} className={level === game.level ? "logo2" : ""} alt="Logo2" />
              </div>
            </div>
            <div className="rightInfo">
              {level % 5 === 0 && <div>Boss</div> }
            </div>
          </div>
        )
      }
    }

    // Abyss or special ambiant color
    let appBodyClass = loop ? `mainWrapper wideScreen abyss` : `mainWrapper wideScreen`
    
    return (
      <div className={appBodyClass}>
        <div className="appWrapper">
          <div className="presentationArea levelTransition">
            <div className="roadmap">
              {roadmap}
            </div>
          </div>
          <div className="actionArea fixed">
            <button className={"navigation"} onClick={() => setGameState({ state: `battleIntro` })}>Next opponent !</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelTransition)
