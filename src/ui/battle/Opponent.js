import React, { Component } from 'react'
import { connect } from "react-redux"

import Bar from './Bar'
import StatsAndItems from './StatsAndItems'
import EliteBackground from './EliteBackground'

/**
  * @desc Main opponent block
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

class Opponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      portraitReady: false
    }
  }
  
  componentDidMount() {
    // Defining portrait or landscape mode for portraits
    var portrait = document.getElementById('portrait')
    let that = this

    portrait.addEventListener('load', function () {
      let mode = this.naturalWidth > this.naturalHeight ? `landscape` : `portrait`
      that.setState({
        mode,
        portraitReady: true
      })
    })
  }

  // Display component
  render() {
    const { data, turn, level, color } = this.props
    const { mode, portraitReady } = this.state

    // Get colors from scene
    const monstercolor = color.vibrant
    const monsterbackground = color.darkVibrant
    const appbackground = color.darkVibrant // color.darkMuted

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

    // Monster portrait size
    const portraitStyling = mode === `portrait` ? {
      width: `400px`
    } : {
        width: `500px`
    }

    // Monster display
    const portraitClasses = portraitReady ? `portrait ready` : `portrait`

    return [
      <div key="monsterOverlay" className="monsterOverlay" style={bgStyling} />,
      <div key="opponent" className={itemClasses} style={wrapperStyle}>
        {data.elite && <EliteBackground color={monstercolor} />}
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
        <img id="portrait" className={portraitClasses} src={data.pic} style={portraitStyling} alt={data.name} />
      </div>
    ]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Opponent)
