import React, { Component } from 'react'
import { connect } from "react-redux"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import Welcome from './views/Welcome'
import BattleIntro from './views/BattleIntro'
import Battle from './views/Battle'

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
      case `battleIntro`:
        view = <BattleIntro />
        break;
      case `battle`:
        view = <Battle />
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
