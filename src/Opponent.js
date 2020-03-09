import React from 'react'
import PropTypes from 'prop-types'

import PlayerGauge from './PlayerGauge'
import PlayerStats from './PlayerStats'
import Logs from './Logs'

/**
  * @desc description of the component
  * @todo Use a todo tag to store future changes
*/

const propTypes = {
  data: PropTypes.object.isRequired,
  turn: PropTypes.bool.isRequired
}

const defaultProps = {}

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
      </div>
      <PlayerStats data={data} />
      <PlayerGauge data={data} type="hitPoints" />
    </div>
  )
}

// Applying propTypes definition and default values
Opponent.propTypes = propTypes
Opponent.defaultProps = defaultProps

// Exporting as default
export default Opponent
