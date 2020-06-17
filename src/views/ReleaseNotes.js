import React, { Component } from 'react'
import { connect } from "react-redux"
import { setGameState, settings } from '../redux/actions/index'
import { version } from '../conf/version'

const mapStateToProps = state => {
  return {

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
    const { setGameState } = this.props

    // Diplay updates posts
    let releaseNotes = []
    for (let index = 0; index < version.length; index++) {
      const element = version[index];
      
      // Changes loop
      let changesList = []
      for (let newsIndex = 0; newsIndex < element.changes.length; newsIndex++) {
        const change = element.changes[newsIndex];
        changesList.push(
          <li className="change">{change}</li>
        )
      }

      releaseNotes.push(
        <div className="note">
          <div className="title">{element.version} "{element.code}"</div>
          <div className="date">{element.date}</div>
          {element.reset === `run` && <div className="reset">Major changes somewhere : your current run has to be reset. Sorry!</div>}
          <div className="description">{element.note}</div>
          <ul className="changesList">
            {changesList}
          </ul>
        </div>
      )
    }

    return [
      <div key="mainWrapper" className="mainWrapper wideScreen">
        <div className="appWrapper">
          <div className="presentationArea releaseNotes">
            <div className="notes">
              <div className="pagetitle">Game updates !</div>
              <div>Release notes</div>
              <div className="separator" />
                {releaseNotes}
            </div>
          </div>
          <div className="actionArea">
            <button className="navigation" onClick={() => setGameState({ state: `welcome` })}>Ok !</button>
          </div>
        </div>
      </div>
    ]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseNotes)
