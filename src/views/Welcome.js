import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState } from '../redux/actions/index'

// import logo from '../pics/ui/logo.png'

import '../css/app.scss'
import '../css/welcome.css'
import '../css/animations.scss'

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
      <div className="mainWrapper welcomeScreen">
        <div className="appWrapper">
          <div className="presentationArea">
            Champions of D20<br />
            <button className="navigation" onClick={() => setGameState({ state: `shop` })}>Shop demo</button>
            <button className="navigation" onClick={() => setGameState({ state: `battleIntro` })}>Battle intro demo</button>
            <button className="navigation" onClick={() => setGameState({ state: `defeat` })}>Defeat demo</button>
            <button className="navigation" onClick={() => setGameState({ state: `victory` })}>Victory demo</button>
          </div>
          <div className="actionArea">
            <button className="navigation" onClick={() => setGameState({ state: `gameCreate` })}>Start new game</button>
            <button className="navigation" onClick={() => setGameState({ state: `gameSelect` })}>Continue existing game</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
