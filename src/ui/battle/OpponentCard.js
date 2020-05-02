import React, { Component } from 'react'
import { connect } from "react-redux"

import Bar from './Bar'
import StatsAndItems from './StatsAndItems'
import EliteBackground from './EliteBackground'

/**
  * @desc Small opponent block, without picture
*/

const mapStateToProps = state => {
  return { 
    data: state.opponent,
    level: state.game.level
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

class OpponentCard extends Component {

  // Display component
  render() {
    const { data, level, color } = this.props

    // Get colors from scene
    const monstercolor = color.vibrant
    const monsterbackground = color.darkVibrant
    const appbackground = color.darkVibrant // color.darkMuted

    // Component styling
    const defaultClasses = `opponentWrapper`
  
    const wrapperStyle = {
      background: monsterbackground,
    }
  
    // Add custom classes to defined classes
    const itemClasses = [defaultClasses].filter(val => val).join(` `)

    // Monster bg styling
    const bgStyling = appbackground ? {
      backgroundColor: appbackground
    } : {

    }

    return [
      <div key="monsterOverlay" className="monsterOverlay" style={bgStyling} />,
      <div key="opponent" className={itemClasses} style={wrapperStyle}>
        {data.elite && <EliteBackground />}
        <div className="infos">
          <div className="level">Level {level}</div>
          <div className="name">
            {data.elite 
              ? <div>{data.name}<div className="details"><span className={data.element}>{data.element}</span><span className="eliteMarker">Elite</span></div></div>
              : <div>{data.name}<div className="details"><span className={data.element}>{data.element}</span></div></div>
            }
          </div>
        </div>
        <StatsAndItems opponent humanoid={data.humanoid} />
        <Bar opponent type="hitPoints" color={monstercolor} />
      </div>
    ]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpponentCard)
