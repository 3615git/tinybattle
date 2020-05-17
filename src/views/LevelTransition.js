import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState } from '../redux/actions/index'
import { legacyItemsCount, gameSettings } from '../conf/settings'

import logo2 from '../pics/ui/logo2.png'

const mapStateToProps = state => {
  return {
    game: state.game,
    player: state.player
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGameState: payload => dispatch(setGameState(payload))
  }
}

class LevelTransition extends Component {

  componentDidMount() {
    const { setGameState } = this.props
    // Auto move to BattleIntro
    setTimeout(function () {
      setGameState({ state: `battleIntro` })
    }, 2000)
  }
  
  render() {
    const { game, player } = this.props

    // Legacy items count
    const legacyItems = legacyItemsCount(game.level)
    // Monster tier render
    const monsterTier = Math.ceil(game.level / (gameSettings.maxLevel / gameSettings.zones))

    let logoStyle = { position: `relative` }

    // Color rotation
    let wrapperStyle = {
      filter: `hue-rotate(${Math.round(game.level * (360/gameSettings.maxLevel))}deg)`
    }
    
    return (
      <div className="mainWrapper wideScreen">
        <div className="appWrapper">
          <div className="presentationArea levelTransition highIndex">
            <div className="logoWrapper" style={logoStyle}>
              <div className="logoCombine" style={wrapperStyle}>
                <span>{game.level}</span>
                <img src={logo2} className="logo2" alt="Logo2" />
              </div>
            </div>
            <div className="title">Level {game.level}</div>
            <div className="subTitle">{player.name}</div>
            <div className="levelTiersWrapper">
              <div className={`levelTiers legacy_${legacyItems}`}>
                <div className="legend legacyColor">Legacy<br />level {legacyItems}</div>
              </div>
              <div className={`levelTiers monsters_${monsterTier}`}>
                <div className="legend physicalColor">Monsters<br />tier {monsterTier}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelTransition)
