import React, { Component } from 'react'
import { connect } from "react-redux"

import { clog } from '../utils/utils'

import { setGameState, settings } from '../redux/actions/index'
import sigil from '../pics/ui/sigil-white.svg'
import coverart from '../pics/ui/welcome.png'
import logo from '../pics/ui/logo.png'
import logo2 from '../pics/ui/logo2.png'

// Import UI utils
import Modal from '../ui/general/Modal'

const mapStateToProps = state => {
  return {
    game: state.game,
    player: state.player,
    opponent: state.opponent,
    playerTurn: state.game.playerTurn,
    log: state.log,
    score: state.score
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGameState: payload => dispatch(setGameState(payload)),
    settings: payload => dispatch(settings(payload))
  }
}

class Welcome extends Component {

  constructor(props) {
    super(props)

    this.state = {
      openModal: false
    }
  }

  componentDidMount() {

  }

  openModal = (modal) => {
    this.setState({
      openModal: modal
    })
  }

  closeModal = () => {
    this.setState({
      openModal: false
    })
  }

  newGame = () => {
    const { setGameState, settings, player } = this.props
    clog(`newGame`, `function`)
    settings({ setting: `createPlayer`, style: 'warrior' })
    settings({ setting: `preference`, type: `playerName`, value: player && player.name ? player.name : `` })
    setGameState({ state: `gameCreate` })
  }

  render() {
    const { openModal } = this.state
    const { setGameState, game, player, score } = this.props

    // Start button
    let startButton
    if (game.quitState && player && player.name) {
      startButton = <button className="navigation" onClick={() => setGameState({ state: game.quitState })}>Continue<span>{player.name} - Run #{score.game.runs} - lvl. {game.level}</span></button>
    } else {
      // Secondary start button
      let innerStartButton
      if (score && score.game && score.game.runs) innerStartButton = <>New run <span>{player.name} - Run #{score.game.runs + 1}</span></>
      else innerStartButton = "Start new game"
      startButton = <button className="navigation" onClick={() => this.newGame()}>{innerStartButton}</button>
    }
    
    return [
      <Modal key="modalReset" content="reset" display={openModal === `reset`} close={this.closeModal} />,
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
            <button className="navigation" onClick={() => setGameState({ state: `hallOfFame` })}>HOF</button>
            <button className="navigation" onClick={() => setGameState({ state: `monstersDemo` })}>Monsters demo</button>   
            <button className="navigation" onClick={() => setGameState({ state: `hallOfFame` })}>HOF</button>
            <button className="navigation" onClick={() => setGameState({ state: `monstersDemo` })}>Monsters demo</button>   
          */}
            
          </div>
          <div className="actionArea">
            {startButton}
            {score && score.game && score.game.runs && <button className="textOnly" onClick={() => this.openModal(`reset`)}>New game</button>}
            <div className="version">0.0.9</div>
          </div>
        </div>
      </div>
    ]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
