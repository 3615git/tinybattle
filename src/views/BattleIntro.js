import React, { Component } from 'react'
import { connect } from "react-redux"

import Stats from '../ui/battle/Stats'
import { setGameState } from '../redux/actions/index'

const mapStateToProps = state => {
  return {
    player: state.player,
    opponent: state.opponent,
    game: state.game
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGameState: payload => dispatch(setGameState(payload))
  }
}

class BattleIntro extends Component {

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
  
  render() {
    
    const { opponent, game, setGameState } = this.props
    const { mode, portraitReady } = this.state

    // Monster display
    const portraitClasses = portraitReady ? `portrait ready` : `portrait`

    // Monster portrait size
    const portraitStyling = mode === `portrait` ? {
      width: `350px`
    } : {
      width: `400px`
    }
    
    return (
      <div className="mainWrapper wideScreen">
        <div className="appWrapper">
          <div className="presentationArea">
            <div className="bi_opponent">
              <div className="infos">
                <img id="portrait" className={portraitClasses} src={opponent.pic} style={portraitStyling} alt={opponent.name} />
              </div>
            </div>
            <div className="bi_text">
              <div className="bi_name">
                {opponent.name}
              </div>
              <Stats opponent />
            </div>
          </div>

          <div className="actionArea">
            <button className="navigation bi_action" onClick={() => setGameState({ state: `battle` })}>Start battle !</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BattleIntro)
