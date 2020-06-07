import React, { Component } from 'react'
import { connect } from "react-redux"
import { setGameState, settings } from '../redux/actions/index'

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

class AllReset extends Component {
  componentDidMount() {
    const { setGameState } = this.props
    setTimeout(() => {
      setGameState({ state: `welcome` })
    }, 1000);
  }

  render() {
    return [
      <div key="mainWrapper" className="mainWrapper wideScreen">
        <div className="appWrapper">
          <div className="presentationArea">
             Game erased !
          </div>
        </div>
      </div>
    ]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllReset)
