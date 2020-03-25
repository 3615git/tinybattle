import React from 'react'
import { connect } from "react-redux"

import Item from './Item'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const mapStateToProps = state => {
  return {
    STR: state.player.items.STR,
    DEX: state.player.items.DEX,
    CON: state.player.items.CON,
    MAG: state.player.items.MAG,
    LCK: state.player.items.LCK
  }
}

function renderItem(STAT) {
  if (STAT.type && STAT.id && STAT.score) return (
    <div>
      <Item item={STAT.type} level={STAT.id} />
      <span>+{STAT.score}</span>
    </div>
  ) 
  else return (
    <div />
  )
}

const Items = ({ STR, DEX, CON, MAG, LCK }) => {

  // Component styling
  const defaultClasses = `playerItems`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Display component
  return (
    <div className={itemClasses}>
      <div>
        <Item item={STR.type} level={STR.id} />
        <span>{STR.score}</span>
      </div>
      {renderItem(DEX)}
      {renderItem(CON)}
      <div className="position-relative">
        <div className="itemCost">{MAG.cost}</div>
        <Item item={MAG.type} level={MAG.id} />
        <span>{MAG.score}</span>
      </div>
      {renderItem(LCK)}
    </div>
  )
}

// Exporting as default
export default connect(mapStateToProps)(Items)
