import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState } from '../redux/actions/index'

const mapStateToProps = state => {
  return {
    game: state.game
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
    const { game } = this.props
    
    return (
      <div className="mainWrapper wideScreen">
        <div className="appWrapper">
          <div className="presentationArea">
              <div className="title">Level {game.level}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelTransition)
