import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Vibrant from 'node-vibrant'

import StatsAndItems from './StatsAndItems'
import EliteBackground from './EliteBackground'

/**
  * @desc Functional opponent block, also smaller
*/

const propTypes = {
  type: PropTypes.string.isRequired
}

const defaultProps = {

}

class Monster extends Component {

  constructor(props) {
    super(props)

    this.state = {
      portraitReady: false,
      color: {
        vibrant: `black`,
        darkVibrant: `rgba(0, 0, 0, 0.4)`,
        darkMuted: `rgba(0, 0, 0, 0.4)`
      }
    }
  }

  fetchPalette = (imgSrc, data) => {
    if (!imgSrc) console.log(data)
    Vibrant.from(imgSrc).getPalette()
      .then(palette => {
        this.setState({
          color: {
            vibrant: palette.Vibrant.getHex(),
            darkVibrant: palette.DarkVibrant.getHex(),
            darkMuted: palette.DarkMuted.getHex()
          }
        })
      })
  }
  
  componentDidMount() {
    const { type, data } = this.props
    // Fetch colors
    this.fetchPalette(data.pic, data)

    // Defining portrait or landscape mode for portraits
    var portrait = document.getElementById('portrait_'+type)
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
    const { type, data, level } = this.props
    const { mode, portraitReady, color } = this.state

    // Get colors from scene
    // const monstercolor = color.vibrant
    const monsterbackground = color.darkVibrant

    // Component styling
    const defaultClasses = `opponentWrapper` // removed "small" for offset testing
  
    // Add custom classes to defined classes
    const itemClasses = [defaultClasses, data.element].filter(val => val).join(` `)

    // Monster bg styling
    const wrapperStyle = {
      backgroundColor: monsterbackground
    }

    // Monster portrait size
    const portraitStyling = mode === `portrait` ? {
      width: `400px`,
      top: data.verticalPosition ? `${data.verticalPosition}%` : `50%`
    } : {
      width: `500px`,
      top: data.verticalPosition ? `${data.verticalPosition}%` : `50%`
    }

    // Monster display
    const portraitClasses = portraitReady ? `portrait ready` : `portrait`

    return (
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
        <StatsAndItems opponent humanoid={data.humanoid} forceData={data} />
        <img id={`portrait_${type}`} className={portraitClasses} src={data.pic} style={portraitStyling} alt={data.name} />
      </div>
    )
  }
}

// Applying propTypes definition and default values
Monster.propTypes = propTypes
Monster.defaultProps = defaultProps

export default Monster
