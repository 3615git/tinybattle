import React from 'react'
import { connect } from "react-redux"

import Bar from './Bar'
import Stats from './Stats'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const mapStateToProps = state => {
  return { 
    data: state.opponent,
    turn: !state.playerTurn
  }
}

const Opponent = ({ data, turn }) => {

  // Component styling
  const defaultClasses = `opponentWrapper`
  const turnClasses = turn ? `turn` : ``
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses, turnClasses].filter(val => val).join(` `)

  // Display component
  return (
    <div className={itemClasses}>
      <div className="infos">
        <div className="portrait" />
        <div className="name">{data.name}</div>
        <div className="job">{data.job}</div>
      </div>
      <Stats opponent />
      <Bar opponent type="hitPoints" />
    </div>
  )
}

export default connect(mapStateToProps)(Opponent)
