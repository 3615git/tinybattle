import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState } from '../redux/actions/index'
import { legacyItemsCount, gameSettings } from '../conf/settings'
import Monster from '../ui/battle/Monster'

import logo2 from '../pics/ui/logo2.png'

const mapStateToProps = state => {
  return {
    game: state.game,
    player: state.player,
    opponent: state.opponent,
    score: state.score,
    monsterList: state.monsters
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
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    })
  }
  
  render() {
    const { game, opponent, setGameState, score, monsterList } = this.props

    // Legacy items count
    const legacyItems = legacyItemsCount(game.level)
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
              outline
            />
            <div className="leftInfo">
              <div>Run #{score.game.runs}</div>
              {score.run.round > 1 && <div>{score.run.round} rounds</div>}
              {score.run.round <= 1 && <div>Game starts !</div>}
              {!score.run.round && <div>Game starts !</div>}
            </div>
            <div className="logoWrapper" style={logoStyle}>
              <div className="logoCombine" style={wrapperStyle}>
                <span>{level}</span>
                <img src={logo2} className={level === game.level && "logo2"} alt="Logo2" />
              </div>
            </div>
            <div className="rightInfo">
              <div>Legacy lv. {legacyItems}</div>
              <div>Monsters lv. {monsterTier}</div>
            </div>
          </div>
        )
      } else {
        let wrapperStyle = { filter: `grayscale(100%)`, opacity: .4, transform: `scale(.8)` }
        // Incoming level
        roadmap.push(
          <div key={`incominglevel_${level}`}>
            <div className="logoWrapper" style={logoStyle}>
              <div className="logoCombine" style={wrapperStyle}>
                <span>{level}</span>
                <img src={logo2} className={level === game.level ? "logo2" : ""} alt="Logo2" />
              </div>
            </div>
          </div>
        )
      }
    }
    
    return (
      <div className="mainWrapper wideScreen">
        <div className="appWrapper">
          <div className="presentationArea levelTransition">
            <div className="roadmap">
              {roadmap}
            </div>
            {/* 
            </div>
            <div className="title">Level {game.level}</div>
            <div className="subTitle"></div>
            <div className="levelTiersWrapper">
              <div className={`levelTiers legacy_${legacyItems}`}>
                <div className="legend legacyColor"></div>
              </div>
              <div className={`levelTiers monsters_${monsterTier}`}>
                <div className="legend physicalColor"></div>
              </div>
            </div> */}
          </div>
          <div className="actionArea fixed">
            <button className="navigation bi_action" onClick={() => setGameState({ state: `battleIntro` })}>Next opponent !</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelTransition)
