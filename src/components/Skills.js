import React from 'react'
import { connect } from "react-redux"

import Item from './Item'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const mapStateToProps = state => {
  return {
    data: state.player,
    turn: state.playerTurn
  }
}

const Skills = ({ data }) => {

  // Component styling
  const defaultClasses = `playerSkills`
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses].filter(val => val).join(` `)

  // Display component
  return (
    <div className={itemClasses}>
      <div>
        <Item item="axe" level={3} />
        <span>+2</span>
      </div>
      <div>
        <Item item="ring" level={10} />
        <span>+3</span>
      </div>
      <div>
        <Item item="shield" level={14} />
        <span>+1</span>
      </div>
      <div>
        <Item item="magic" level={2} />
        <span>+2</span>
      </div>
      <div>
        <Item item="amulet" level={6} />
        <span>+2</span>
      </div>
    </div>
  )
}

// Exporting as default
export default connect(mapStateToProps)(Skills)
