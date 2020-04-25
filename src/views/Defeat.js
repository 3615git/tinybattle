import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState } from '../redux/actions/index'

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
          <div className="presentationArea">
            You're dead! Buy heirloom ?
          </div>
          <div className="actionArea">
            <button className="navigation" onClick={() => setGameState({ state: `hallOfFame` })}>Enter hall of fame</button>
            <button className="navigation" onClick={() => setGameState({ state: `welcome` })}>Start again !</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
