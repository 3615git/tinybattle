import React from 'react'
import PropTypes from 'prop-types'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const propTypes = {
  data: PropTypes.object.isRequired,
  turn: PropTypes.bool.isRequired
}

const defaultProps = {}

const Player = ({ data, turn }) => {

  // Component styling
  const defaultClasses = `playerWrapper`
  const turnClasses = turn ? `turn` : ``
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses, turnClasses].filter(val => val).join(` `)

  // Display component
  return (
    <div className={itemClasses}>
      <h2>{data.name}</h2>
      <p>Attack : {data.physicalAttack}</p>
      <p>HP : {data.hitPoints}</p>
      <p>MP : {data.magicPoints}</p>
    </div>
  )
}

// Applying propTypes definition and default values
Player.propTypes = propTypes
Player.defaultProps = defaultProps

// Exporting as default
export default Player
