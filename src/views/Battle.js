import React, { Component } from 'react'
import { connect } from "react-redux"
import * as Vibrant from 'node-vibrant'

import EndGame from '../ui/battle/EndGame'
import Opponent from '../ui/battle/Opponent'
import Infos from '../ui/battle/Infos'
import Stats from '../ui/battle/Stats'
import Items from '../ui/battle/Items'
import Bars from '../ui/battle/Bars'
import Actions from '../ui/battle/Actions'
import Logs from '../ui/battle/Logs'

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
    const { playerTurn } = this.props

    const playerAreaClass = playerTurn ? `playerArea playerTurn` : `playerArea opponentTurn`

    return (
      <div className="mainWrapper">
        <div className="appWrapper">
          <EndGame />
          <Infos />
          <Opponent color={monstercolor} />
          <Logs color={monstercolor} />
          <div className={playerAreaClass}>
            <Stats />
            <Items />
            <Bars />
            <Actions />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Battle)
