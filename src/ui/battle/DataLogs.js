import React from 'react'
import { connect } from "react-redux"
import chroma from "chroma-js"

import ItemVisual from './ItemVisual'

/**
  * @desc Display detailed logs of battle
*/

const mapStateToProps = state => {
  return {
    dataLogs: state.dataLogs,
    game: state.game,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const DataLogs = ({ dataLogs, game }) => {

  // Shade color
  let shadeStyle = {
    background: `linear-gradient(0deg, rgba(0,0,0,0) 0%, ${chroma(game.uicolor.darkMuted).darken(1).desaturate(.4)} 100%)`
  }

  let logs = []
  for (let index = 0; index < dataLogs.length; index++) {
    const log = dataLogs[index]
    logs.push(
      <li key={`datalog_${index}`}><ItemVisual item={log.icon[0]} level={log.icon[1]} small /><span dangerouslySetInnerHTML={{ __html: log.log }} /></li>
    )
  }

  return (
    <div className="dataLogsWrapper">
      <div className="dataLogShadow" style={shadeStyle} />
      <ul className="dataLogs">
        {logs}
      </ul>
    </div>
  )

}

// Exporting as default
export default connect(mapStateToProps, mapDispatchToProps)(DataLogs)
