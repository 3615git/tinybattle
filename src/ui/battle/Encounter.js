import React from 'react'
import { connect } from "react-redux"

/**
  * @desc Encounter stats for opponents
*/

const mapStateToProps = state => {
  return {
    history : state.score.alltime.opponents
  }
}

const Encounter = ({ type, history }) => {

  let title, victories, defeats

  if (history && history[type]) { 
    title = `Encounters : ${history[type].total}` 
    victories = history[type].victories 
      ? history[type].victories > 1 ? `${history[type].victories} victories` : `1 victory`
      : ``
    defeats = history[type].defeats 
      ? history[type].defeats > 1 ? `${history[type].defeats} defeats` : `1 defeat`
      : ``
  }
  else { title = "First encounter !"}

  return (
    <div className="encountersWrapper">
      <div className="title">{title}</div>
      <div className="stats">
        {victories && <span >{victories}</span>}
        {defeats && <span >{defeats}</span>}
      </div>
    </div>
  )
}

// Exporting as default
export default connect(mapStateToProps)(Encounter)
