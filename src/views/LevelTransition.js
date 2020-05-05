import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState } from '../redux/actions/index'
import { legacyItemsCount } from '../conf/settings'

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
    const legacyItemsDisplay = legacyItems === 1 ? `` : `s`

    // Monster tier render
    let monsterTier
    if (legacyItems === 1) monsterTier = `I`
    else if (legacyItems === 2) monsterTier = `II`
    else if (legacyItems === 3) monsterTier = `II`
    else if (legacyItems === 4) monsterTier = `IV`
    else if (legacyItems === 5) monsterTier = `V`

    return (
      <div className="mainWrapper wideScreen">
        <div className="appWrapper">
          <div className="presentationArea levelTransition">
            <div className="title">Level {game.level}</div>
            <div className="subTitle">{player.name}</div>
            <div className="subTitle">Legacy item{legacyItemsDisplay} : <span className="legacyColor">{legacyItems}</span></div>
            <div className="subTitle">Monster tier : <span className="physicalColor">{monsterTier}</span></div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelTransition)
