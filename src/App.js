import React, { Component } from 'react'
import { connect } from "react-redux"
import { CSSTransition, SwitchTransition } from "react-transition-group"

import Welcome from './views/Welcome'
import GameCreate from './views/GameCreate'
import GameSelect from './views/GameSelect'
import LevelTransition from './views/LevelTransition'
import BattleIntro from './views/BattleIntro'
import Battle from './views/Battle'
import Victory from './views/Victory'
import Defeat from './views/Defeat'
import Shop from './views/Shop'
import HallOfFame from './views/HallOfFame'

import Modal from './ui/general/Modal'

import settings from './pics/ui/settings.svg'
import help from './pics/ui/help.svg'

import './css/app.scss'
import './css/buttons.scss'
import './css/animations.scss'
import './css/welcome.scss'
import './css/battleIntro.scss'
import './css/form.scss'
import './css/shop.scss'
import './css/battle_logs.scss'
import './css/battle_stats.scss'
import './css/victory.scss'
import './css/defeat.scss'
import './css/items.scss'

const mapStateToProps = state => {
  return {
    game: state.game.state
  }
}

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      openModal: false
    }
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

  render() {

    const { game } = this.props
    const { openModal } = this.state

    let view
    let ambiantFog = [
      <div className="smoke" key="smoke" />,
      <div className="fog" key="fog" />,
      // <div className="gradient" />
    ]

    let options
    let fullOptions = (
      <div className="optionsWrapper" key="options">
        <button className="option" onClick={() => this.openModal(`settings`)}><img src={settings} alt="Settings" /></button>
        <button className="option" onClick={() => this.openModal(`about`)}><img src={help} alt="Help" /></button>
      </div>
    )

    let smallOptions = (
      <div className="optionsWrapper" key="options">
        <button className="option" onClick={() => this.openModal(`settings`)}><img src={settings} alt="Settings" /></button>
      </div>
    )

    switch (game) {
      case `welcome`:
        view = <Welcome />
        options = fullOptions
        break;
      case `gameCreate`:
        view = <GameCreate />
        options = smallOptions
        break;
      case `gameSelect`:
        view = <GameSelect />
        options = smallOptions
        break;
      case `levelTransition`: 
        view = <LevelTransition />
        options = smallOptions
        break;
      case `battleIntro`:
        view = <BattleIntro />
        options = smallOptions
        break;
      case `battle`:
        view = <Battle />
        ambiantFog = []
        options = []
        break;
      case `victory`:
        view = <Victory />
        options = smallOptions
        break;
      case `defeat`:
        view = <Defeat />
        options = smallOptions
        break;
      case `shop`:
        view = <Shop />
        options = smallOptions
        break;
      case `hallOfFame`:
        view = <HallOfFame />
        ambiantFog = []
        options = smallOptions
        break;
      default:
        break;
    }

    return [
      <SwitchTransition key="switch">
        <CSSTransition
          key={game}
          timeout={2000}
          classNames={"fadeView_2000"}
          addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
          appear
        >
          {view}
        </CSSTransition>
      </SwitchTransition>,
      options,
      <Modal key="modalAbout" content="about" display={openModal === `about`} close={this.closeModal} />,
      <Modal key="modalSettings" content="settings" display={openModal === `settings`} close={this.closeModal} />,
      ambiantFog
    ]
    
  }
}

export default connect(mapStateToProps)(App)
