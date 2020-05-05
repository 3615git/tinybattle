import React from 'react'
import { connect } from "react-redux"

/**
  * @desc Display detailed logs of battle
*/

const mapStateToProps = state => {
  return {
    log: state.log,
    playerTurn: state.game.playerTurn
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const DataLogs = ({ log, playerTurn, color }) => {

  return (
    <div className="DataLogsWrapper">
      Plop
    </div>
  )

}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(DataLogs)
