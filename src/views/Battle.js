import React, { Component } from 'react'
import { connect } from "react-redux"
import * as Vibrant from 'node-vibrant'

import EndGame from '../components/EndGame'
import TurnIndicator from '../components/TurnIndicator'
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
    playerTurn: state.game.playerTurn,
    log: state.log
  }
}

class Battle extends Component {
  constructor(props) {
    super(props)

    this.state = {
      monstercolor: {
        vibrant: `black`,
        darkVibrant: `rgba(0, 0, 0, 0.4)`,
        darkMuted: `rgba(0, 0, 0, 0.4)`
      }
    }
  }

  fetchPalette = (imgSrc) => {
    Vibrant.from(imgSrc).getPalette()
      .then(palette => {
        this.setState({
          monstercolor: {
            vibrant: palette.Vibrant.getHex(),
            darkVibrant: palette.DarkVibrant.getHex(),
            darkMuted: palette.DarkMuted.getHex()
          }
        })
      })
  }

  componentDidMount() {
    const { opponent } = this.props
    this.fetchPalette(opponent.pic)
  }

  render() {

    const { monstercolor } = this.state

    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          <EndGame />
          <TurnIndicator color={monstercolor} />
          <Opponent color={monstercolor} />
          <Logs color={monstercolor} />
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
