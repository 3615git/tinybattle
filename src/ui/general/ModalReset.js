import React from 'react'
import { connect } from "react-redux"
import { settings } from '../../redux/actions/index'

/**
  * @desc Reset Modal
*/

const mapStateToProps = state => {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    settings: payload => dispatch(settings(payload)),
  }
}

const ModalReset = ({ settings }) => {

  // Display component
  return (
    <div className="credits">
      <div className="title margin-none">Reset the game</div>
      <p>Your run history, gold and items will be erased : are you sure ?</p>
      <button className="navigation" onClick={() => settings({ setting: `resetGame` })}>Yes! Start a new game</button>
    </div>
  )
}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(ModalReset)
