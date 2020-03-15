import React, { Component } from 'react'
import { connect } from "react-redux"

import Opponent from '../components/Opponent'
import Infos from '../components/Infos'
import Stats from '../components/Stats'
import Items from '../components/Items'
import Bars from '../components/Bars'
import Actions from '../components/Actions'
import Logs from '../components/Logs'

import '../css/app.css'
import '../css/items.css'
import '../css/animations.css'

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
    playerTurn: state.playerTurn,
    log: state.log
  }
}

class Battle extends Component {
  render() {
    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          <Opponent />
          <Logs />
          <Infos />
          <Stats />
          <Items />
          <Bars />
          <Actions />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Battle)
