import React from 'react'
import PropTypes from 'prop-types'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  turn: PropTypes.bool.isRequired,
  actions: PropTypes.func.isRequired
}

const defaultProps = {}

const PlayerAttack = ({ type, data, turn, actions }) => {

  // Component styling
  const defaultClasses = `buttons`
  const turnClasses = turn ? `turn` : ``
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses, turnClasses].filter(val => val).join(` `)

  // Display component
  return (
    <div className={itemClasses}>
      <button className={type +" secondary"} onClick={() => actions(`physicalDefend`)}>Defend</button>
      <button className={type +" primary"} onClick={() => actions(`physicalAttack`)}>Attack</button>
      <button className={type +" secondary"} onClick={() => actions(`physicalCharge`)}>Charge</button>
    </div>
  )
}

// Applying propTypes definition and default values
PlayerAttack.propTypes = propTypes
PlayerAttack.defaultProps = defaultProps

// Exporting as default
export default PlayerAttack
