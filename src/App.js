import React, { Component } from 'react'
import { connect } from "react-redux"
import { CSSTransition, SwitchTransition } from "react-transition-group"

// Get CSV master file for monsters list
import Papa from 'papaparse'
import monsterData from './monsters/monsterdata.csv'

 // Import redux actions
import { settings, setGameState } from './redux/actions/index'

// Import views
import Welcome from './views/Welcome'
import AllReset from './views/AllReset'
import ReleaseNotes from './views/ReleaseNotes'
import GameCreate from './views/GameCreate'
import LevelTransition from './views/LevelTransition'
import BattleIntro from './views/BattleIntro'
import Battle from './views/Battle'
import Victory from './views/Victory'
import Defeat from './views/Defeat'
import Shop from './views/Shop'
import EndGame from './views/EndGame'
import HallOfFame from './views/HallOfFame'
import MonstersDemo from './views/MonstersDemo'

// Import UI utils
import Modal from './ui/general/Modal'

// Import pictures
import help from './pics/ui/help.svg'
import close from './pics/ui/close.svg'
import score from './pics/ui/score.svg'

// Import current version number
import { version } from './conf/version'

// Import style
import './css/app.scss'
import './css/buttons.scss'
import './css/animations.scss'
import './css/welcome.scss'
import './css/levelTransition.scss'
import './css/battleIntro.scss'
import './css/form.scss'
import './css/shop.scss'
import './css/battle_logs.scss'
import './css/battle_stats.scss'
import './css/victory.scss'
import './css/defeat.scss'
import './css/hall.scss'
import './css/items.scss'
import './css/wheel.scss'
import './css/releasenotes.scss'
import './css/smallscreen.scss'

const mapStateToProps = state => {
  return {
    game: state.game.state,
    tutorial: state.game.tutorial,
    currentVersion: state.version,
    monsters: state.monsters
  }
}

function mapDispatchToProps(dispatch) {
  return {
    settings: payload => dispatch(settings(payload)),
    setGameState: payload => dispatch(setGameState(payload))
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

  componentDidMount() {
    const { settings, currentVersion, monsters } = this.props

    // Never played : apply current version
    if (monsters) {
      if (version[0].version !== currentVersion) {
        if (!version[0].reset) settings({ setting: `setVersion` })
      }
    } else settings({ setting: `setVersion` })

    // Send raw csv to reducer
    Papa.parse(monsterData, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        settings({ setting: `createMonsters`, data: results.data })
      }
    })
  }

  render() {

    const { game, tutorial, setGameState, settings } = this.props
    const { openModal } = this.state

    let view
    let ambiantFog = (
      <div className="fogWrapper" key="fogwrapper">
        <div className="smoke" key="smoke" />
        <div className="fog" key="fog" />
      </div>
    )

    let options
    let fullOptions = (
      <div className="optionsWrapper" key="options">
        <button className="option" onClick={() => this.openModal(`about`)}><img src={help} alt="About" /></button>
        <button className="option" onClick={() => setGameState({ state: `hallOfFame` })}><img src={score} alt="Score" /></button>
        {/* <button className="option" onClick={() => this.openModal(`settings`)}><img src={settingsPic} alt="Settings" /></button> */}
      </div>
    )

    let smallOptions = (
      <div className="optionsWrapper" key="options">
        <button className="option" onClick={() => setGameState({ state: `quit` })}><img src={close} alt="Quit" /></button>
        {/* <button className="option" onClick={() => this.openModal(`settings`)}><img src={settingsPic} alt="Settings" /></button> */}
      </div>
    )

    let helpOptions = (
      <div className="optionsWrapper help" key="options">
        <button className="option fade" onClick={() => this.openModal(`help`)}><img src={help} alt="Help" /></button>
      </div>
    )

    switch (game) {
      case `welcome`:
        view = <Welcome />
        options = fullOptions
        break;
      case `allReset`:
        view = <AllReset />
        options = []
        break;
      case `releaseNotes`:
        view = <ReleaseNotes />
        options = []
        break;
      case `gameCreate`:
        view = <GameCreate />
        options = smallOptions
        break;
      case `levelTransition`: 
        view = <LevelTransition />
        options = []
        break;
      case `battleIntro`:
        view = <BattleIntro />
        options = []
        break;
      case `battle`:
        // Detect first visit ever
        if (!tutorial) {
          // Display welcome modal, update store
          settings({ setting: `tutorial` })
          this.setState({ openModal: `first` })
        }
        view = <Battle />
        ambiantFog = []
        options = helpOptions
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
      case `endgame`:
        view = <EndGame />
        options = smallOptions
        break;
      case `hallOfFame`:
        view = <HallOfFame />
        options = smallOptions
        break;
      case `monstersDemo`:
        view = <MonstersDemo />
        options = []
        break;
      default:
        break;
    }

    return [
      <SwitchTransition key="switch">
        <CSSTransition
          key={game}
          timeout={1000}
          classNames={"fadeView_1000"}
          addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
          appear
        >
          {view}
        </CSSTransition>
      </SwitchTransition>,
      options,
      <Modal key="modalAbout" content="about" display={openModal === `about`} close={this.closeModal} />,
      <Modal key="modalSettings" content="settings" display={openModal === `settings`} close={this.closeModal} />,
      <Modal key="modalHelp" content="help" display={openModal === `help`} close={this.closeModal} />,
      <Modal key="modalFirst" content="first" display={openModal === `first`} close={this.closeModal} />,
      ambiantFog
    ]
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
