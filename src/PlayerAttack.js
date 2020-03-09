import React from 'react'
import PropTypes from 'prop-types'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const propTypes = {
  data: PropTypes.object.isRequired,
  turn: PropTypes.bool.isRequired,
  actions: PropTypes.func.isRequired
}

const defaultProps = {}

const PlayerAttack = ({ data, turn, actions }) => {

  // Component styling
  const defaultClasses = `buttons`
  const turnClasses = turn ? `turn` : ``
  // Add custom classes to defined classes
  const itemClasses = [defaultClasses, turnClasses].filter(val => val).join(` `)

  // Display component
  return (
    <div className={itemClasses}>
      <a className="physical secondary" onClick={() => actions(`physicalDefend`)}>Defend</a>
      <a className="physical primary" onClick={() => actions(`physicalAttack`)}>Attack</a>
      <a className="physical secondary" onClick={() => actions(`physicalCharge`)}>Charge</a>
    </div>
  )
}

// Applying propTypes definition and default values
PlayerAttack.propTypes = propTypes
PlayerAttack.defaultProps = defaultProps

// Exporting as default
export default PlayerAttack
