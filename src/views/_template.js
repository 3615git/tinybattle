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

function mapDispatchToProps(dispatch) {
  return {
    setGameState: payload => dispatch(setGameState(payload))
  }
}

class Welcome extends Component {

  render() {

    const { setGameState } = this.props
    
    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          Welcome to Tiny Battle !

          <button onClick={() => setGameState({ state: `battle` })}>Start !</button>

        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
