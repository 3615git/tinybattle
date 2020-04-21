import React, { Component } from 'react'
import { connect } from "react-redux"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import Welcome from './views/Welcome'
import GameCreate from './views/GameCreate'
import GameSelect from './views/GameSelect'
import BattleIntro from './views/BattleIntro'
import Battle from './views/Battle'
import Victory from './views/Victory'
import Defeat from './views/Defeat'
import Shop from './views/Shop'
import HallOfFame from './views/HallOfFame'

const mapStateToProps = state => {
  return {
    game: state.game.state
  }
}

class App extends Component {

  render() {

    const { game } = this.props
    let view

    switch (game) {
      case `welcome`:
        view = <Welcome />
        break;
      case `gameCreate`:
        view = <GameCreate />
        break;
      case `gameSelect`:
        view = <GameSelect />
        break;
      case `battleIntro`:
        view = <BattleIntro />
        break;
      case `battle`:
        view = <Battle />
        break;
      case `victory`:
        view = <Victory />
        break;
      case `defeat`:
        view = <Defeat />
        break;
      case `shop`:
        view = <Shop />
        break;
      case `hallOfFame`:
        view = <HallOfFame />
        break;
      default:
        break;
    }

    return (
      <TransitionGroup component={null}>
        <CSSTransition
          timeout={2000}
          classNames={"fadeView_2000"}
          appear
        >
          {view}
        </CSSTransition>
      </TransitionGroup>
    )
    
  }
}

export default connect(mapStateToProps)(App)
