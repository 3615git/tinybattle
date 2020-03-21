import React, { Component } from 'react'
import { connect } from "react-redux"
import * as Vibrant from 'node-vibrant'

import Bar from './Bar'
import Stats from './Stats'

/**
  * @desc Main opponent block
*/

const mapStateToProps = state => {
  return { 
    data: state.opponent,
    turn: !state.game.playerTurn,
    level: state.game.level
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

class Opponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      monstercolor: `black`,
      monsterbackground: `rgba(0, 0, 0, 0.4)`
    }
  }

  fetchPalette = (imgSrc) => {
    Vibrant.from(imgSrc).getPalette()
      .then(palette => {
        this.setState({
          monstercolor: palette.Vibrant.getHex(),
          monsterbackground: palette.DarkVibrant.getHex(),
          appbackground: palette.DarkMuted.getHex()
        })
      })
  }

  componentDidMount() {
    const { data } = this.props
    this.fetchPalette(data.pic)
  }

  // Display component
  render() {
    const { data, turn, level } = this.props
    const { monstercolor, monsterbackground, appbackground } = this.state

    // Component styling
    const defaultClasses = `opponentWrapper`
    const turnClasses = turn ? `` : `turn`
  
    const wrapperStyle = !turn ? {
      background: monsterbackground,
      boxShadow: `rgba(0, 0, 0, 0.59) 0px 0px 11px 0px, 0px 0px 40px ${monstercolor}`
    } : {
      background: monsterbackground,
    }
  
    // Add custom classes to defined classes
    const itemClasses = [defaultClasses, turnClasses].filter(val => val).join(` `)

    // Monster bg styling
    const bgStyling = appbackground ? {
      backgroundColor: appbackground
    } : {

    }

    return [
      <div className="monsterOverlay" style={bgStyling} />,
      <div className={itemClasses} style={wrapperStyle}>
        <div className="level">Level {level}</div>
        <div className="infos">
          <img className="portrait" src={data.pic} alt={data.name} />
          <div className="name">{data.name}</div>
          <div className="job">{data.job}</div>
        </div>
        <Stats opponent />
        <Bar opponent type="hitPoints" color={monstercolor} />
      </div>
    ]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Opponent)
