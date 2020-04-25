import React, { Component } from 'react'
import { connect } from "react-redux"
import * as Vibrant from 'node-vibrant'

import { setGameState, settings } from '../redux/actions/index'
import Opponent from '../ui/battle/Opponent'

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
    game: state.game
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGameState: payload => dispatch(setGameState(payload)),
    settings: payload => dispatch(settings(payload))
  }
}

class BattleIntro extends Component {

  constructor(props) {
    super(props)

    this.state = {
      // portraitReady: false,
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

  startBattle = () => {
    const { monstercolor } = this.state
    const { settings, setGameState } = this.props

    settings({ setting: `setUIColor`, color: monstercolor })
    setGameState({ state: `battle` })
  }

  componentDidMount() {
    const { opponent } = this.props
    this.fetchPalette(opponent.pic)
  }
  
  render() {
    
    const { opponent, setGameState } = this.props
    const { monstercolor } = this.state
    
    return (
      <div className="mainWrapper wideScreen">
        <div className="appWrapper">
          <Opponent color={monstercolor}/>
          <div className="bi_text">
            <div className="bi_name">
              {opponent.name}
            </div>
          </div>
          <div className="actionArea">
            <button className="navigation bi_action" onClick={() => this.startBattle()}>Start battle !</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BattleIntro)
