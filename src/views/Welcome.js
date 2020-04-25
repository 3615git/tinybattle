import React, { Component } from 'react'
import { connect } from "react-redux"

import { setGameState } from '../redux/actions/index'
import sigil from '../pics/ui/sigil-white.svg'
import coverart from '../pics/ui/welcome.png'
import logo from '../pics/ui/logo.png'
import logo2 from '../pics/ui/logo2.png'

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
    
    return [
      <div key="mainWrapper" className="mainWrapper wideScreen">
        <div className="appWrapper">
          <div className="gradient" />
          <div className="presentationArea">
              <img src={coverart} className="coverArt" alt="Cover art" />
              <div className="homeSigil">
                <img src={sigil} alt="Sigil" />
              </div>
              <div className="logoWrapper">
                <div className="logoCombine">
                  <img src={logo2} className="logo2" alt="Logo2" />
                  <img src={logo} className="logo" alt="Logo" />
                </div>
              </div>
            {/* <button className="navigation" onClick={() => setGameState({ state: `shop` })}>Shop demo</button>
            <button className="navigation" onClick={() => setGameState({ state: `battleIntro` })}>Battle intro demo</button>
            <button className="navigation" onClick={() => setGameState({ state: `defeat` })}>Defeat demo</button>
            <button className="navigation" onClick={() => setGameState({ state: `victory` })}>Victory demo</button> */}
          </div>
          <div className="actionArea">
            <button className="navigation" onClick={() => setGameState({ state: `gameCreate` })}>New game</button>
            <button className="navigation" onClick={() => setGameState({ state: `gameSelect` })} disabled>Continue</button>
            <div className="version">0.0.0 alpha</div>
          </div>
        </div>
      </div>
    ]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
