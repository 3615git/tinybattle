import React from 'react'
import { connect } from "react-redux"

import Item from './Item'
import Bar from './Bar'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const mapStateToProps = state => {
  return {
    name: state.player.name,
    job: state.player.job,
    level: state.player.level,
    xp: state.player.xp,
    gold: state.player.gold  }
}

const Infos = ({ name, job, level, xp, gold }) => {

  // Component styling
  const defaultClasses = `playerInfo`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Display component
  return (
    <div className="playerInfoWrapper">
      <div className={itemClasses}>
        <div className="gold">
          <Item item="coins" level={5} small />
          <span>{gold}</span>
        </div>
        <div className="player">
          <span className="name">{name}</span>
        </div>
        <div className="level">
          <Bar type="xp" />
        </div>
      </div>
    </div>
  )
}

// Exporting as default
export default connect(mapStateToProps)(Infos)
