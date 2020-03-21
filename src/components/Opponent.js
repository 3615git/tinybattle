import React, { Component } from 'react'
import { connect } from "react-redux"

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

  // Display component
  render() {
    const { data, turn, level, color } = this.props

    // Get colors from scene
    const monstercolor = color.vibrant
    const monsterbackground = color.darkVibrant
    const appbackground = color.darkMuted

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
      <div key="monsterOverlay" className="monsterOverlay" style={bgStyling} />,
      <div key="opponent" className={itemClasses} style={wrapperStyle}>
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
