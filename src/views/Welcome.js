import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState } from '../redux/actions/index'

import '../css/app.css'
import '../css/items.css'
import '../css/animations.css'

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
    playerTurn: state.game.playerTurn,
    log: state.log
  }
}

class Welcome extends Component {

  render() {

    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          Welcome to Tiny Battle !

          <div onClick={() => setGameState({ state: `battle` })}>Start !</div>

        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Welcome)
