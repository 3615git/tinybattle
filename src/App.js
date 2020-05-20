import React, { Component } from 'react'
import { connect } from "react-redux"
import { CSSTransition, SwitchTransition } from "react-transition-group"

// Get CSV master file for monsters list
import Papa from 'papaparse'
import monsterData from './monsters/monsterdata.csv'

 // Import redux actions
import { settings } from './redux/actions/index'


// Import views
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
import MonstersDemo from './views/MonstersDemo'

// Import UI utils
import Modal from './ui/general/Modal'

// Import pictures
import settingsPic from './pics/ui/settings.svg'
import help from './pics/ui/help.svg'

// Import style
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
import './css/wheel.scss'

const mapStateToProps = state => {
  return {
    game: state.game.state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    settings: payload => dispatch(settings(payload))
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
    const { settings } = this.props
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

    const { game } = this.props
    const { openModal } = this.state

    let view
    let ambiantFog = (
      <div className="fogWrapper">
        <div className="smoke" key="smoke" />
        <div className="fog" key="fog" />
      </div>
    )

    let options
    let fullOptions = (
      <div className="optionsWrapper" key="options">
        <button className="option" onClick={() => this.openModal(`settings`)}><img src={settingsPic} alt="Settings" /></button>
        <button className="option" onClick={() => this.openModal(`about`)}><img src={help} alt="Help" /></button>
      </div>
    )

    let smallOptions = (
      <div className="optionsWrapper" key="options">
        <button className="option" onClick={() => this.openModal(`settings`)}><img src={settingsPic} alt="Settings" /></button>
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
        options = []
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
      ambiantFog
    ]
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
