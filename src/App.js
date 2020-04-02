import React, { Component } from 'react'
import { connect } from "react-redux"
import Welcome from './views/Welcome'
import Battle from './views/Battle'

const mapStateToProps = state => {
  return {
    game: state.game
  }
}

class App extends Component {
  render() {

    const { game } = this.props

    switch (game.state) {
      case `welcome`:
        return (<Welcome />)
      case `battle`:
        return (<Battle />)
      default:
        break;
    }
    
  }
}

export default connect(mapStateToProps)(App)
