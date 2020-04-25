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
            You win! Loot dead ennemy.
          </div>
          <div className="actionArea">
            <button className="navigation" onClick={() => setGameState({ state: `shop` })}>Enter shop</button>
            <button className="navigation" onClick={() => setGameState({ state: `levelTransition` })}>Enter next round</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
