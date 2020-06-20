import React, { Component } from 'react'
import { connect } from "react-redux"
import { setGameState, settings } from '../redux/actions/index'

import death from '../pics/ui/death.png'
import portal from '../pics/ui/portal.png'

const mapStateToProps = state => {
  return {
    player: state.player
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGameState: payload => dispatch(setGameState(payload)),
    settings: payload => dispatch(settings(payload))
  }
}

class ReleaseNotes extends Component {
  componentDidMount() {

  }

  render() {
    const { setGameState, player } = this.props

    return [
      <div key="mainWrapper" className="mainWrapper wideScreen abyss">
        <div className="appWrapper">
          <div className="presentationArea">
            <div className="victoryWrapper">
              <div className="bigTitle abyss">The Abyss of Permadeath</div>
              <div>{player.name} gets ready for the final run.</div>
              <img src={portal} alt="Portal" />
              <div>
                <p>No one knows where the Abyss ends,<br />as no one ever escaped.</p>
                <p>You can't win, but how far will you go?</p>
              </div>
            </div>
          </div>
          <div className="actionArea">
            <button className="navigation picture" onClick={() => setGameState({ state: `levelTransition` })}><img src={death} alt="The Abyss of Permadeath"/>Enter the Abyss</button>
          </div>
        </div>
      </div>
    ]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseNotes)
