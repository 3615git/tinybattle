import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Vibrant from 'node-vibrant'

import EliteBackground from './EliteBackground'
import { monsterPic, monsterInfo } from '../../monsters/monster'

/**
  * @desc Functional opponent block, also smaller
*/

const propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  outline: PropTypes.oneOf(['shade', 'bright']),
  elite: PropTypes.bool.isRequired
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

  fetchPalette = (imgSrc) => {
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
    const { type } = this.props
    const pic = monsterPic(type)

    // Fetch colors
    this.fetchPalette(pic)

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
    const { type, name, outline, elite, monsterList } = this.props
    const { mode, portraitReady, color } = this.state
    const data = monsterInfo(type, 1, monsterList)

    // Get colors from scene
    // const monstercolor = color.vibrant
    const monsterbackground = color.darkVibrant

    // Component styling
    let defaultClasses = `opponentWrapper round turn static`
    if (outline === `shade`) defaultClasses = `opponentWrapper outline turn static`
    if (outline === `bright`) defaultClasses = `opponentWrapper outline bright turn static`
  
    // Add custom classes to defined classes
    const itemClasses = [defaultClasses].filter(val => val).join(` `)

    // Monster bg styling
    const wrapperStyle = {
      backgroundColor: monsterbackground
    }

    // Monster portrait size
    const portraitStyling = mode === `portrait` ? {
      width: `250px`,
      top: data.verticalPosition ? `${data.verticalPosition}%` : `50%`
    } : {
      width: `350px`,
      top: data.verticalPosition ? `${data.verticalPosition}%` : `50%`
    }

    // Monster display
    const portraitClasses = portraitReady ? `portrait ready` : `portrait`

    if (outline) {
      return (
        <div key="opponent" className={itemClasses}>
          <img id={`portrait_${type}`} className={portraitClasses} src={data.pic} style={portraitStyling} alt={name} />
        </div>
      )
    } else {
      return (
        <div key="opponent" className={itemClasses} style={wrapperStyle}>
          {elite && <EliteBackground />}
          <div className="infos">
            <div className="name">
              {elite 
                ? <div>{name}<div className="details"><span className="eliteMarker">Elite</span></div></div>
                : <div>{name}<div className="details"></div></div>
              }
            </div>
          </div>
          <img id={`portrait_${type}`} className={portraitClasses} src={data.pic} style={portraitStyling} alt={name} />
        </div>
      )
    }
  }
}

// Applying propTypes definition and default values
Monster.propTypes = propTypes
Monster.defaultProps = defaultProps

export default Monster
