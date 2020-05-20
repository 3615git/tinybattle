import React, { Component } from 'react'
import { connect } from "react-redux"

import { clog } from '../utils/utils'

import { setGameState, settings } from '../redux/actions/index'
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
    setGameState: payload => dispatch(setGameState(payload)),
    settings: payload => dispatch(settings(payload))
  }
}

class Welcome extends Component {

  componentDidMount() {

  }

  newGame = () => {
    const { setGameState, settings, player } = this.props
    clog(`newGame`, `function`)
    settings({ setting: `createPlayer`, style: 'warrior' })
    settings({ setting: `preference`, type: `playerName`, value: player && player.name ? player.name : `` })
    setGameState({ state: `gameCreate` })
  }

  render() {

    const { setGameState } = this.props
    
    return [
      <div key="mainWrapper" className="mainWrapper wideScreen">
        <div className="appWrapper">
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
            {/* 
            <button className="navigation" onClick={() => setGameState({ state: `battleIntro` })}>Battle intro demo</button>
            <button className="navigation" onClick={() => setGameState({ state: `defeat` })}>Defeat demo</button> 
            <button className="navigation" onClick={() => setGameState({ state: `victory` })}>Victory demo</button>
            */}
            
          </div>
          <div className="actionArea">
            <button className="navigation" onClick={() => this.newGame()}>New game</button>
            <button className="navigation" onClick={() => setGameState({ state: `gameSelect` })} disabled>Continue</button>
            <button className="navigation" onClick={() => setGameState({ state: `shop` })}>Enter shop</button>
            <div className="version">0.0.0 alpha</div>
          </div>
        </div>
      </div>
    ]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
